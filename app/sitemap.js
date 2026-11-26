import { SITE_URL } from "@/lib/site-url";
import { getSitemapDataFromDB } from "@/lib/server/seo";

export const revalidate = 3600;

export default async function sitemap() {
  const { categories, elements } = await getSitemapDataFromDB();
  const staticPages = ["", "/about", "/elements"];

  return [
    ...staticPages.map((path) => ({
      url: new URL(path, SITE_URL).toString(),
    })),
    ...categories.map((category) => ({
      url: new URL(`/elements/${category.slug}`, SITE_URL).toString(),
      lastModified: category.lastModified,
    })),
    ...elements.map((element) => ({
      url: new URL(`/elements/elementId/${element.id}`, SITE_URL).toString(),
      lastModified: element.lastModified,
    })),
  ];
}
