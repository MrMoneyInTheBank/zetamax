"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

const ClerkPortal = () => {
  return (
    <div className="fixed right-4 top-4 z-30">
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <CustomSignInButton />
      </SignedOut>
    </div>
  );
};

const CustomSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <div className="fixed top-4 right-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-violet-500">
        <button className="relative rounded-xl bg-white/0 transition-colors hover:bg-white/20 p-1">
          <LogIn size={45} />
        </button>
      </div>
    </SignInButton>
  );
};

export default ClerkPortal;
