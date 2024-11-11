"use client";

import ClerkPortal from "@/components/clerk-components/user-profile/user-profile";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const data = useQuery(api.getEverything.getEverything);
  console.log(data);
  return (
    <>
      <ClerkPortal />
    </>
  );
}
