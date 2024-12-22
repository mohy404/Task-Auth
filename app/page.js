import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Welcome to the App</h1>
      <div className="space-x-4">
        <Link href="/login" className="px-4 py-2 text-white bg-indigo-600 rounded-md">
          Login
        </Link>
        <Link href="/register" className="px-4 py-2 text-white bg-green-600 rounded-md">
          Register
        </Link>
      </div>
    </div>
  );
}
