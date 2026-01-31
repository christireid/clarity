"use client";

import * as React from "react";
import { Marquee, Confetti, ScrollProgress, Parallax, StackedCards, AnimatedTabs, InfiniteCarousel, RevealOnScroll, BentoGrid } from "@/components/ai/ui-pattern-animations";
import { ComponentCard } from "./ComponentCard";

export function UIPatternsComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Marquee"
        description="Scrolling text marquee"
      >
        <div className="relative flex h-20 w-full flex-col items-center justify-center overflow-hidden rounded-md border bg-background md:shadow-xl">
          <Marquee pauseOnHover className="[--duration:20s]">
            {["React", "Next.js", "Tailwind", "TypeScript", "Vercel"].map((item) => (
              <div key={item} className="mx-4 font-bold">{item}</div>
            ))}
          </Marquee>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Bento Grid"
        description="Grid layout for features"
      >
        <BentoGrid 
          items={[
            { title: "Feature 1", description: "Desc 1", header: <div className="h-full w-full bg-red-100" />, className: "md:col-span-2" },
            { title: "Feature 2", description: "Desc 2", header: <div className="h-full w-full bg-blue-100" />, className: "md:col-span-1" },
            { title: "Feature 3", description: "Desc 3", header: <div className="h-full w-full bg-green-100" />, className: "md:col-span-1" },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Animated Tabs"
        description="Tabs with sliding indicator"
      >
        <AnimatedTabs 
          tabs={["Account", "Password", "Settings"]} 
          onChange={(tab) => console.log(tab)}
        />
      </ComponentCard>
    </div>
  );
}
