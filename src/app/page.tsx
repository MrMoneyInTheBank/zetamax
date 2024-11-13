"use client";

import { useUser } from "@clerk/nextjs";
import { UserContext } from "@/contexts/userContext";
import { ClerkPortal } from "@/components/clerk-components/user-profile/user-profile";
import Analytics from "@/components/custom-components/analytics/analytics";
import { GamePanel } from "@/components/custom-components/game-panel/game-panel";

export default function Home() {
  const { user } = useUser();

  return (
    <>
      <ClerkPortal />
      <UserContext.Provider value={user?.id || ""}>
        <section className="h-screen bg-gradient-to-tl from-primary-light via-secondary-dark to-primary-dark">
          <GamePanel />
          <Analytics />
        </section>
      </UserContext.Provider>
    </>
  );
}
