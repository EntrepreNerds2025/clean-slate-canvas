import { createFileRoute } from "@tanstack/react-router";
import { getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  phone: z.string().trim().min(1, "Please enter your phone number.").max(40),
  subject: z.string().trim().min(1, "Please enter a subject.").max(150),
  message: z.string().trim().min(1, "Please enter your message.").max(2000),
  botcheck: z.string().optional(),
});

function respond(body: { ok: boolean; error?: string }, status = 200) {
  return Response.json(body, {
    status,
    headers: { "cache-control": "no-store" },
  });
}

async function hashRateLimitKey(ip: string, salt: string) {
  const bytes = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const origin = request.headers.get("origin");
        const fetchSite = request.headers.get("sec-fetch-site");
        let crossOrigin = fetchSite === "cross-site";

        if (origin) {
          try {
            crossOrigin = crossOrigin || new URL(origin).host !== new URL(request.url).host;
          } catch {
            crossOrigin = true;
          }
        }

        if (crossOrigin) {
          return respond({ ok: false, error: "This request could not be verified." }, 403);
        }

        let formData: FormData;
        try {
          formData = await request.formData();
        } catch {
          return respond({ ok: false, error: "Please complete the form and try again." }, 400);
        }

        const parsed = contactSchema.safeParse(Object.fromEntries(formData.entries()));
        if (!parsed.success) {
          return respond(
            { ok: false, error: parsed.error.issues[0]?.message ?? "Please check your details." },
            400,
          );
        }

        // Silently accept honeypot submissions without storing bot entries.
        if (parsed.data.botcheck) {
          return respond({ ok: true });
        }

        const serviceKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];
        if (!serviceKey) {
          console.error("Contact submission storage is not configured.");
          return respond({ ok: false, error: "Messages are temporarily unavailable. Please try again later." }, 500);
        }

        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
          const ipHash = await hashRateLimitKey(ip, serviceKey);
          const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

          const { count, error: rateLimitError } = await supabaseAdmin
            .from("contact_submissions")
            .select("id", { count: "exact", head: true })
            .eq("ip_hash", ipHash)
            .gte("created_at", oneHourAgo);

          if (rateLimitError) {
            console.error("Contact submission rate-limit check failed.", { code: rateLimitError.code });
            return respond({ ok: false, error: "Your message could not be saved. Please try again." }, 500);
          }

          if ((count ?? 0) >= 5) {
            return respond({ ok: false, error: "Too many messages. Please try again later." }, 429);
          }

          const { botcheck: _botcheck, ...submission } = parsed.data;
          const { error: insertError } = await supabaseAdmin
            .from("contact_submissions")
            .insert({ ...submission, ip_hash: ipHash });

          if (insertError) {
            console.error("Contact submission insert failed.", { code: insertError.code });
            return respond({ ok: false, error: "Your message could not be saved. Please try again." }, 500);
          }

          return respond({ ok: true }, 201);
        } catch (error) {
          console.error("Unexpected contact submission error.", error);
          return respond({ ok: false, error: "Your message could not be saved. Please try again." }, 500);
        }
      },
    },
  },
});
