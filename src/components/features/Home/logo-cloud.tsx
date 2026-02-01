import { InfiniteSlider } from "@/components/ui/infinite-slider";
import Image from "next/image";

export function LogoCloud() {
  return (
    <div className="mask-[linear-gradient(to_right,transparent,black,transparent)] overflow-hidden py-4">
      <InfiniteSlider gap={42} reverse speed={50} speedOnHover={25}>
        {logos.map((logo) => (
          <Image
            alt={logo.alt}
            className="pointer-events-none h-4 select-none md:h-5 dark:brightness-0 dark:invert"
            width={90}
            height={90}
            key={`logo-${logo.alt}`}
            loading="lazy"
            src={logo.src}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}

const logos = [
  {
    src: "/coursera.svg",
    alt: "Coursera Logo",
  },
  {
    src: "/udemy.svg",
    alt: "Udemy Logo",
  },
  {
    src: "/khan_academy.svg",
    alt: "Khan Academy Logo",
  },
  {
    src: "https://storage.efferd.com/logo/turso-wordmark.svg",
    alt: "Turso Logo",
  },
  {
    src: "https://storage.efferd.com/logo/vercel-wordmark.svg",
    alt: "Vercel Logo",
  },
  {
    src: "https://storage.efferd.com/logo/github-wordmark.svg",
    alt: "GitHub Logo",
  },
  {
    src: "https://storage.efferd.com/logo/claude-wordmark.svg",
    alt: "Claude AI Logo",
  },
  {
    src: "https://storage.efferd.com/logo/clerk-wordmark.svg",
    alt: "Clerk Logo",
  },
];
