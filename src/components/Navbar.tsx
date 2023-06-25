import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/Button";
import { signIn } from "next-auth/react";

export const Navbar = () => {
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2 ">
      <div className="container max-w-7x h-full mx-auto flex items-center justify-between gap-2 ">
        {/* logo */}
        <Link href="/" className="flex gap-2 items-center ">
          <p className="hidden text-zinc-700 text-sm font-medium md:block ">
            Rockcode
          </p>
        </Link>

        {/* search bar */}

        <button className={buttonVariants()} onClick={() => signIn()}>
          Sign In
        </button>
      </div>
    </div>
  );
};
