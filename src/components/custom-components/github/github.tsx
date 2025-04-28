import { Github as GithubIcon } from "lucide-react";
import Link from "next/link";

export const Github = () => {
  return (
    <div className="fixed top-4 left-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-violet-500">
      <button className="relative rounded-xl bg-white/0 transition-colors hover:bg-white/20 p-1">
        <Link
          href="https://github.com/MrMoneyInTheBank/zetamax"
          target="_blank"
        >
          <GithubIcon color={"white"} size={45} />
        </Link>
      </button>
    </div>
  );
};
