import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-svh w-full flex items-center justify-center gap-4">
      <Link href="/login" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">Login</Link>
      <Link href="/register" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">Register</Link>
    </div>
  );
}
