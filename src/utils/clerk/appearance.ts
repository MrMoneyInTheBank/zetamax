import { Appearance } from "@clerk/types/dist/index";

export const clerkAppearance: Appearance = {
  variables: { colorPrimary: "#6b42b7" },
  signIn: {
    elements: {
      modalContent: {
        margin: "auto",
      },
    },
  },
  userButton: {
    elements: {
      avatarBox: {
        height: "54px",
        width: "54px",
      },
      userButtonAvatarBox: {
        height: "54px",
        width: "54px",
      },
    },
  },
};
