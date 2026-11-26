import { SITE_URL } from "@/lib/site-url";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/profile", "/admin-profile", "/add-component"],
    },
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
  };
}
