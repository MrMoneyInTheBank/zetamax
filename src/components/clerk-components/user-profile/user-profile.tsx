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

export const ClerkPortal = () => {
  return (
    <div className="fixed right-4 top-4 z-30">
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
      <LoginButton />
    </SignInButton>
  );
};
