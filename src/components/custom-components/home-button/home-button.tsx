import { House } from "lucide-react";
import Link from "next/link";
import { CustomButton } from "../custom-button/custom-button";

export const HomeButton = () => {
  return (
    <CustomButton top="4" left="4">
      <Link href="/" target="_blank">
        <House color={"white"} size={45} />
      </Link>
    </CustomButton>
  );
};
