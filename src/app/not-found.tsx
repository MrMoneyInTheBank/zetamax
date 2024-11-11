import GradientShadowButton from "@/components/hover-components/gradient-shadow-button/gradient-shadow-button";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-white bg-gradient-to-tl from-primary-light via-secondary-dark to-primary-dark">
      <h1 className="text-center text-8xl font-extrabold opacity-65">404</h1>
      <h1 className="text-center text-2xl font-bold mt-4">
        Sorry, we couldn&apos;t find this page.
      </h1>
      <Link href={"/"} className="mt-4">
        <GradientShadowButton text="Return Home" />
      </Link>
    </section>
  );
}
