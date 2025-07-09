import Test from "@/components/Test";
import { getUserProfile } from "@/lib/api";

export default async function App() {
  const user= await getUserProfile();
  return (
    <div className="b">
      {/* Your navigation menu here */}
    </div>
  );
}
