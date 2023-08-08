import Link from "next/link";
import { auth, SignOutButton } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth();
  // let href = userId ? "/journal" : "/new-user";
  let href = userId ? "/journal" : "/new-user";
  return (
    <main className="w-screen h-screen bg-black flex justify-center items-center text-white ">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">The best journal app, period.</h1>
        <p className="text-3xl text-white/70 mb-4">
          The best app for tracking your mood throughout your life
        </p>
        <Link href={href}>
          <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">
            Get Started
          </button>
        </Link>
        {userId ? <SignOutButton>Sign Out</SignOutButton> : null}
      </div>
    </main>
  );
}
