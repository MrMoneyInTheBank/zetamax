import { ClerkPortal } from "@/components/clerk-components/user-profile/user-profile";
import { GamePanel } from "@/components/custom-components/game-panel/game-panel";

export default function Home() {
  return (
    <>
      <ClerkPortal />
      <section className="h-screen bg-gradient-to-tl from-primary-light via-secondary-dark to-primary-dark">
        <GamePanel />
      </section>
    </>
  );
}
