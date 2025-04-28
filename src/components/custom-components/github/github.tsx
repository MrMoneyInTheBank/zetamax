import { Github as GithubIcon } from "lucide-react";
import Link from "next/link";
import { CustomButton } from "../custom-button/custom-button";

export const Github = () => {
  return (
    <CustomButton top="4" left="4">
      <Link href="https://github.com/MrMoneyInTheBank/zetamax" target="_blank">
        <GithubIcon color={"white"} size={45} />
      </Link>
    </CustomButton>
  );
};
