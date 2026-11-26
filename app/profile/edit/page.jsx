import EditProfileClient from "./EditProfileClient";
import { getCurrentUserFromDB } from "@/lib/server/user";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditProfilePage() {
  const user = await getCurrentUserFromDB();
  if (!user) redirect("/login");

  return <EditProfileClient user={user} />;
}
