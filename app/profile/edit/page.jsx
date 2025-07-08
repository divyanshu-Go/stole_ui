import EditProfileClient from "./EditProfileClient";
import { getUserProfile } from "@/lib/api";

export default async function EditProfilePage() {
  const user = await getUserProfile(); // ✅ server-side fetch

  return <EditProfileClient user={user} />;
}
