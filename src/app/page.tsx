"use client";

import { useUser } from "@clerk/nextjs";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { UserContext } from "@/contexts/userContext";
import { ClerkPortal } from "@/components/clerk-components/user-profile/user-profile";
import Analytics from "@/components/custom-components/analytics/analytics";
import { GamePanel } from "@/components/custom-components/game-panel/game-panel";
import { LocalScoresContext } from "@/contexts/localScoresContext";

export default function Home() {
  const { user } = useUser();
  const [localScores, setLocalScores] = useLocalStorage<number[]>("scores", []);

  return (
    <>
      <ClerkPortal />
      <UserContext.Provider value={user?.id || ""}>
        <LocalScoresContext.Provider value={{ localScores, setLocalScores }}>
          <section className="h-screen bg-gradient-to-tl from-primary-light via-secondary-dark to-primary-dark">
            <GamePanel />
            <Analytics />
          </section>
        </LocalScoresContext.Provider>
      </UserContext.Provider>
    </>
  );
}
