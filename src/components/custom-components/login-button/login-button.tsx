import { LogIn } from "lucide-react";
import { CustomButton } from "../custom-button/custom-button";

interface LoginButtonProps {
  loading?: boolean;
}

export const LoginButton = ({ loading }: LoginButtonProps) => {
  return (
    <CustomButton top="4" right="4" loading={loading}>
      <LogIn color={"white"} size={45} />
    </CustomButton>
  );
};
