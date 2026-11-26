import { getCurrentUserFromDB, getUserElementsFromDB } from "@/lib/server/user";
import { redirect } from "next/navigation";
import ClientProfilePage from "./ClientProfilePage";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Your Profile",
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  const user = await getCurrentUserFromDB();
  if (!user) redirect("/login");
  const elements = await getUserElementsFromDB(user._id);

  return <ClientProfilePage user={user} elements={elements} />;
}
