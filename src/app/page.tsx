import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">UNICEF Donation</h1>
      <nav className="mt-4 flex gap-4">
        <Link href="/donate" className="text-blue-600 underline">
          Donate
        </Link>
        <Link href="/campaign" className="text-blue-600 underline">
          Campaign
        </Link>
      </nav>
    </div>
  );
}
