import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex bg-gradient-to-tl from-primary-light via-secondary-dark to-primary-dark text-white items-center justify-around h-screen">
      <SignIn />
    </div>
  );
}
