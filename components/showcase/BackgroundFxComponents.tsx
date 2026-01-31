"use client";

import * as React from "react";
import { AuroraBackground, GradientMesh, NoiseTexture, AnimatedWaves, RadialGradient, SpotlightGrid, AnimatedGrid, RetroGrid, Starfield } from "@/components/ai/background-animations";
import { ComponentCard } from "./ComponentCard";

export function BackgroundFxComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Aurora Background"
        description="Animated aurora effect"
      >
        <div className="relative h-40 w-full overflow-hidden rounded-md">
          <AuroraBackground>
            <div className="z-10 flex items-center justify-center h-full text-white font-bold">Aurora</div>
          </AuroraBackground>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Retro Grid"
        description="Retro moving grid"
      >
        <div className="relative h-40 w-full overflow-hidden rounded-md border flex items-center justify-center">
          <RetroGrid />
          <span className="z-10 font-bold bg-white/80 px-2 rounded">Retro Grid</span>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Spotlight Grid"
        description="Grid illuminated by spotlight"
      >
        <div className="relative h-40 w-full overflow-hidden rounded-md bg-black">
          <SpotlightGrid />
        </div>
      </ComponentCard>
    </div>
  );
}
