"use client";

import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { LoginButton } from "@/components/custom-components/login-button/login-button";
import { LogIn } from "lucide-react";

export const ClerkPortal = () => {
  return (
    <div className="fixed right-4 top-4">
      <ClerkLoading>
        <LoginButton loading={true} />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <CustomSignInButton />
        </SignedOut>
      </ClerkLoaded>
    </div>
  );
};

const CustomSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <div className="fixed top-4 right-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-violet-500">
        <button className="relative rounded-xl bg-white/0 transition-colors hover:bg-white/20 p-1">
          <LogIn color={"white"} size={45} />
        </button>
      </div>
    </SignInButton>
  );
};
