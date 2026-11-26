import { getCurrentUserFromDB } from "@/lib/server/user";
import { getAllElementsFromDB } from "@/lib/server/element";
import { redirect } from "next/navigation";
import AdminClientPage from "./AdminClientPage";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const user = await getCurrentUserFromDB();
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/unauthorized");
  const allElements = await getAllElementsFromDB();

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
