import { LogIn } from "lucide-react";

interface LoginButtonProps {
  loading?: boolean;
}

export const LoginButton = ({ loading }: LoginButtonProps) => {
  return (
    <div
      className={`fixed top-4 right-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-violet-500 ${loading ? "animate-pulse" : ""}`}
    >
      <button className="relative rounded-xl bg-white/0 transition-colors hover:bg-white/20 p-1">
        <LogIn color={"white"} size={45} />
      </button>
    </div>
  );
};
