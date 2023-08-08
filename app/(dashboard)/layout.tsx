import React from "react";
import Link from "next/link";
import { SignOutButton, UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <nav>
          <div className="navbar bg-base-100">
            <div className="flex-1">
              <a className="btn btn-ghost normal-case text-xl">Mood.ai</a>
            </div>
            <div className="flex-none gap-2">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-24 md:w-auto"
                />
              </div>
              <div className="dropdown dropdown-end">
                <div className="h-full w-full px-6 flex items-center justify-end">
                  <UserButton afterSignOutUrl="/"/>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div>{children}</div>
    </>
  );
}
