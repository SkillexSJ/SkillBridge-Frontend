"use client";

//**
// THIS SVG ANIMATION IS FROM SKIPER UI */

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React, { useRef } from "react";
import { CheckCircle2, Search, Calendar, Brain, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

// --- CONSTANTS & PATH DATA ---
const width = 1278;
const height = 2319;
// Original User SVG Geometry
const pathData =
  "M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89";

const ScrollJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Track scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. Smooth physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // --- ANIMATION MAPPINGS ---

  // Header: Fades out
  const headerOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);
  const headerY = useTransform(smoothProgress, [0, 0.08], [0, -50]);

  // Path Line Progress
  const pathLength = useTransform(smoothProgress, [0, 0.85], [0, 1]);

  // Steps: Fade In (Optimized Start Times)
  const opacity1 = useTransform(smoothProgress, [0.05, 0.15], [0, 1]);
  const scale1 = useTransform(smoothProgress, [0.05, 0.15], [0.8, 1]);

  const opacity2 = useTransform(smoothProgress, [0.25, 0.35], [0, 1]);
  const scale2 = useTransform(smoothProgress, [0.25, 0.35], [0.8, 1]);

  const opacity3 = useTransform(smoothProgress, [0.45, 0.55], [0, 1]);
  const scale3 = useTransform(smoothProgress, [0.45, 0.55], [0.8, 1]);

  const opacity4 = useTransform(smoothProgress, [0.65, 0.75], [0, 1]);
  const scale4 = useTransform(smoothProgress, [0.65, 0.75], [0.8, 1]);

  // 3. Prevent rendering on mobile to save resources
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Initial check
    checkIsDesktop();

    // Listener (optional, but good for resizing)
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  if (!isDesktop) return <section ref={containerRef} className="hidden" />;

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-background hidden md:block"
      style={{ height: "400vh" }}
    >
      {/* STICKY CONTAINER */}
      <div className="sticky top-0 w-full h-dvh overflow-hidden">
        {/* LAYER 1: SVG Path  */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="relative w-full h-full max-w-5xl flex items-center justify-center">
            {/* The SVG Line */}
            <CleanLinePath progress={pathLength} />
          </div>
        </div>

        {/* LAYER 2: Header */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="absolute top-[12%] md:top-[5%] left-0 w-full z-20 flex flex-col items-center justify-start text-center px-4"
        >
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter bg-linear-to-b from-foreground to-foreground/40 bg-clip-text text-transparent">
            Transforming <br /> Ambition into <br /> Achievement
          </h1>
          <p className="mt-2 max-w-lg text-muted-foreground font-medium">
            Follow the path to your success with SkillBridge
          </p>
        </motion.div>

        {/* LAYER 3:  */}
        <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto z-10 pointer-events-none">
          {/* Step 1 */}
          <motion.div
            style={{ opacity: opacity1, scale: scale1 }}
            className="absolute top-[28%] md:top-[15%] left-[5%] md:left-[15%] w-56 md:w-80 p-4 md:p-6 bg-card/90 backdrop-blur-md border border-[#00b262]/20 rounded-2xl shadow-xl"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#00b262]/10 rounded-full flex items-center justify-center mb-2 md:mb-4 text-[#00b262]">
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <h3 className="text-base md:text-2xl font-bold">
              Browse & Discover
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">
              Find expert tutors across 50+ subjects filtered by your needs.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            style={{ opacity: opacity2, scale: scale2 }}
            className="absolute top-[44%] md:top-[32%] right-[5%] md:right-[15%] w-56 md:w-80 p-4 md:p-6 bg-card/90 backdrop-blur-md border border-[#00b262]/20 rounded-2xl shadow-xl"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#00b262]/10 rounded-full flex items-center justify-center mb-2 md:mb-4 text-[#00b262]">
              <Calendar className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <h3 className="text-base md:text-2xl font-bold">Book Session</h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">
              Instant booking with automated scheduling.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            style={{ opacity: opacity3, scale: scale3 }}
            className="absolute top-[60%] md:top-[49%] left-[5%] md:left-[15%] w-56 md:w-80 p-4 md:p-6 bg-card/90 backdrop-blur-md border border-[#00b262]/20 rounded-2xl shadow-xl"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#00b262]/10 rounded-full flex items-center justify-center mb-2 md:mb-4 text-[#00b262]">
              <Brain className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <h3 className="text-base md:text-2xl font-bold">Learn & Connect</h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">
              Connect with highly qualified tutors.
            </p>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            style={{ opacity: opacity4, scale: scale4 }}
            className="absolute top-[76%] md:top-[66%] right-[5%] md:right-[15%] w-56 md:w-80 p-4 md:p-6 bg-card/90 backdrop-blur-md border border-[#00b262]/20 rounded-2xl shadow-xl"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#00b262]/10 rounded-full flex items-center justify-center mb-2 md:mb-4 text-[#00b262]">
              <Eye className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <h3 className="text-base md:text-2xl font-bold">Grow & Watch</h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">
              Visualize your progress with SkillBridge.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { ScrollJourney as Skiper19 };

// --- HELPERS ---

const Badge = ({ text }: { text: string }) => (
  <div className="flex items-center gap-1 md:gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-[10px] md:text-sm font-semibold text-secondary-foreground backdrop-blur-sm">
    <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-[#00b262]" />
    {text}
  </div>
);

const CleanLinePath = ({ progress }: { progress: any }) => {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className="w-full h-full max-w-5xl opacity-90"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="gradient-green" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00b262" stopOpacity="0" />
          <stop offset="10%" stopColor="#00b262" stopOpacity="0.8" />
          <stop offset="90%" stopColor="#00b262" stopOpacity="1" />
          <stop offset="100%" stopColor="#00b262" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Ghost Path */}
      <path
        d={pathData}
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="20"
        strokeLinecap="round"
      />

      {/* Animated Path */}
      <motion.path
        d={pathData}
        stroke="url(#gradient-green)"
        strokeWidth="20"
        strokeLinecap="round"
        style={{ pathLength: progress }}
      />
    </svg>
  );
};
