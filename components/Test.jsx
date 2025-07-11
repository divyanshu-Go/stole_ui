// app/components/Test.jsx
import Link from 'next/link';
import { getUserProfile } from '@/lib/api';

export default async function Test() {
  const user = await getUserProfile(); // Server-side
  console.log(user);

  return (
    <nav className="flex justify-between items-center p-4 shadow bg-white">
      <h1 className="text-xl font-bold">MyApp</h1>
      <div>
        {user ? (
          <span className="text-blue-600">Welcome, {user.name}</span>
        ) : (
          <Link href="/signup" className="text-blue-600">Sign up</Link>
        )}
      </div>
    </nav>
  );
}
