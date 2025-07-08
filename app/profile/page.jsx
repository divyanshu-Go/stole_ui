import { getUserProfile, getUserElements } from "@/lib/api";
import ClientProfilePage from "./ClientProfilePage";


export default async function ProfilePage() {
  
  const user = await getUserProfile();
  const elements = await getUserElements(user._id);

  return <ClientProfilePage user={user} elements={elements} />;
}
