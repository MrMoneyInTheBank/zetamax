import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { clerkAppearance } from "@/utils/clerk/appearance";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkPortal } from "@/components/clerk-components/user-profile/user-profile";
import { ScreenSizeWarning } from "@/components/custom-components/screensize-warning/screensize-warning";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zetamax",
  description: "Zetamac, but modern",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={clerkAppearance} afterSignOutUrl={"/"}>
      <html lang="en">
        <body
          className={`${inter.className} min-h-full bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 bg-purple-950`}
        >
          <ConvexClientProvider>
            <ClerkPortal />
            {children}
            <ScreenSizeWarning className="block xs:hidden" />
          </ConvexClientProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
