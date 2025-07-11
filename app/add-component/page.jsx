// app/add-component/page.jsx
import { getCategory } from "@/lib/api";
import ComponentSubmission from "./ComponentSubmission";

export default async function AddComponentPage() {
  const categories = await getCategory();

  return <ComponentSubmission categories={categories} />;
}
