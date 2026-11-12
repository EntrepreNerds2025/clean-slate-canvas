import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pastor Q Wilson" },
      { name: "description", content: "Pastor Q Wilson: Lead Pastor of Toronto Impact Church, wedding officiant for 200+ couples, and speaker for schools, churches and events across the Greater Toronto Area." },
      { property: "og:title", content: "Pastor Q Wilson" },
      { property: "og:description", content: "Pastor Q Wilson: Lead Pastor of Toronto Impact Church, wedding officiant for 200+ couples, and speaker for schools, churches and events across the Greater Toronto Area." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  beforeLoad: () => {
    throw redirect({ href: "/index.html" });
  },
});
