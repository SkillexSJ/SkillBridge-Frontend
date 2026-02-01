/**
 * NODE PACKAGES
 */
import Link from "next/link";
import Image from "next/image";

/**
 * COMPONENTS
 */
import { GradientBars } from "@/components/Layouts/GradientLayout";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid  min-h-screen lg:grid-cols-2">
      <div className="relative hidden bg-zinc-900 lg:flex items-center justify-center">
        <GradientBars
          colors={["rgba(0,0,0,0)", "rgba(0, 178, 98, 0.3)", "rgba(0,0,0,0)"]}
        />
        <Image
          src="/logo.svg"
          alt="SkillBridge Logo"
          width={500}
          height={500}
          className="w-1/2 opacity-100"
          priority
        />
        <div className="absolute bottom-10 left-10 text-white z-10 max-w-lg">
          <h2 className="text-3xl font-bold mb-4">Master New Skills</h2>
          <p className="text-lg text-zinc-200">
            Join our community of expert tutors and motivated learners to
            achieve your goals.
          </p>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              className="h-32 translate-x-3  md:translate-x-0 w-auto object-contain"
              alt="Skill Bridge"
              width={150}
              height={60}
              priority
            />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
    </div>
  );
}
