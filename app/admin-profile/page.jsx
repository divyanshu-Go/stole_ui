import { getUserProfile, getAllElements } from "@/lib/api";
import AdminClientPage from "./AdminClientPage";

export default async function AdminProfilePage() {
  const user = await getUserProfile();
  const allElements = await getAllElements();

  // Filter and sort elements (pending/rejected/approved only)
  const filtered = allElements.filter(
    (el) =>
      el.status === "pending" ||
      el.status === "rejected" ||
      el.status === "approved"
  );

  const sorted = filtered.sort((a, b) => {
    if (a.status === "pending" && b.status === "rejected") return -1;
    if (a.status === "rejected" && b.status === "pending") return 1;
    return 0;
  });

  return <AdminClientPage user={user} elements={sorted} />;
}
