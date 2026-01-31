"use client";

import * as React from "react";
import { FloatingElement, SpotlightCursor, MorphBlob, ParticleBurst, FlipCard3D, WaveText, ShimmerBorder, BreathEffect, Shake, BounceIn } from "@/components/ai/advanced-animations";
import { ComponentCard } from "./ComponentCard";
import { Button } from "@/components/ui/button";

export function AdvancedFxComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Spotlight Cursor"
        description="Spotlight follows cursor"
      >
        <div className="relative h-40 w-full overflow-hidden rounded-md border bg-zinc-950">
          <SpotlightCursor />
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
            Move Cursor Here
          </div>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Shimmer Border"
        description="Animated border effect"
      >
        <div className="flex justify-center p-8">
          <ShimmerBorder>
            <Button className="bg-black text-white hover:bg-black/90">Shimmer Button</Button>
          </ShimmerBorder>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Floating Element"
        description="Continuous floating animation"
      >
        <div className="flex justify-center h-40 items-center">
          <FloatingElement>
            <div className="w-20 h-20 bg-blue-500 rounded-full shadow-lg" />
          </FloatingElement>
        </div>
      </ComponentCard>
    </div>
  );
}
