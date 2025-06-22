"use client";

import { useUser } from "@clerk/nextjs";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { UserContext } from "@/contexts/userContext";
import { ClerkPortal } from "@/components/clerk-components/user-profile/user-profile";
import Analytics from "@/components/custom-components/analytics/analytics";
import { GamePanel } from "@/components/custom-components/game-panel/game-panel";
import { LocalScoresContext } from "@/contexts/localScoresContext";
import { Github } from "@/components/custom-components/github/github";

export default function Home() {
  const { user } = useUser();
  const [localScores, setLocalScores] = useLocalStorage<number[]>("scores", []);

  return (
    <>
      <ClerkPortal />
      <Github />
      <UserContext.Provider value={user?.id || ""}>
        <LocalScoresContext.Provider value={{ localScores, setLocalScores }}>
          <section>
            <div className="hidden xs:block">
              <GamePanel />
              <Analytics />
            </div>
          </section>
        </LocalScoresContext.Provider>
      </UserContext.Provider>
    </>
  );
}
