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
        <BentoGrid>
          <div className="md:col-span-2 bg-red-100/50 p-4 rounded-lg">
            <h3 className="font-semibold">Feature 1</h3>
            <p className="text-sm text-muted-foreground">Description 1</p>
          </div>
          <div className="bg-blue-100/50 p-4 rounded-lg">
            <h3 className="font-semibold">Feature 2</h3>
            <p className="text-sm text-muted-foreground">Description 2</p>
          </div>
          <div className="bg-green-100/50 p-4 rounded-lg">
            <h3 className="font-semibold">Feature 3</h3>
            <p className="text-sm text-muted-foreground">Description 3</p>
          </div>
        </BentoGrid>
      </ComponentCard>

      <ComponentCard
        title="Animated Tabs"
        description="Tabs with sliding indicator"
      >
        <AnimatedTabs
          tabs={[
            { id: "account", label: "Account", content: <div className="p-4">Account settings content</div> },
            { id: "password", label: "Password", content: <div className="p-4">Password settings content</div> },
            { id: "settings", label: "Settings", content: <div className="p-4">General settings content</div> }
          ]}
        />
      </ComponentCard>
    </div>
  );
}
