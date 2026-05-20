import Link from "next/link";
import { Button } from "@heroui/react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 text-center">
      <h1 className="text-9xl font-black text-emerald-600 tracking-tight">404</h1>
      <h2 className="text-3xl font-bold mt-4 text-slate-800">Oops! Pet ran away</h2>
      <p className="text-slate-500 mt-2 max-w-md">
        The page you are looking for doesn't exist or might have been moved to another adoption shelter.
      </p>
      <Link href="/" className="mt-6">
        <Button className="bg-emerald-600 text-white font-bold rounded-xl px-6 py-2 shadow-md hover:bg-emerald-700 transition-colors">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}