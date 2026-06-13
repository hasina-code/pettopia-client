"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { PlusCircle, ListOrdered, GitPullRequest } from "lucide-react";

export default function Sidebar({ onClickLink }) {
  const pathname = usePathname();

  const getLinkStyle = (path) => {
    const isActive = pathname === path;
    return `flex items-center gap-3 p-3 rounded-lg transition-colors ${
      isActive 
        ? "bg-pink-500 text-white" 
        : "text-slate-300 hover:bg-slate-800"
    }`;
  };

  return (
    <nav className="space-y-3">
      <Link
        href="/dashboard/add-pet"
        className={getLinkStyle("/dashboard/add-pet")}
        onClick={onClickLink}
      >
        <PlusCircle size={18} />
        Add Pet
      </Link>
      
      <Link
        href="/dashboard/my-listings"
        className={getLinkStyle("/dashboard/my-listings")}
        onClick={onClickLink}
      >
        <ListOrdered size={18} />
        My Listings
      </Link>
      
      <Link
        href="/dashboard/my-requests"
        className={getLinkStyle("/dashboard/my-requests")}
        onClick={onClickLink}
      >
        <GitPullRequest size={18} />
        My Requests
      </Link>
    </nav>
  );
}