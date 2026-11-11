import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Q Wilson – Inspire, Connect and Captivate" },
      { name: "description", content: "Q Wilson – Inspire, Connect and Captivate." },
      { property: "og:title", content: "Q Wilson – Inspire, Connect and Captivate" },
      { property: "og:description", content: "Q Wilson – Inspire, Connect and Captivate." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  beforeLoad: () => {
    throw redirect({ href: "/index.html" });
  },
});
