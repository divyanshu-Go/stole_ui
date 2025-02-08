"use client"

import { LoginForm } from '@/components/Forms';
import Link from 'next/link';

export default function LoginPage() {
  return (

    <div className="min-h-screen bg-gray-50 py-12 px-4  flex-1 items-center">
      <div className="max-w-md mx-auto  ">
        <LoginForm />
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}