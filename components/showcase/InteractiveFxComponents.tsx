"use client";

import * as React from "react";
import { Ripple, Magnetic, CardTilt, LiquidButton, Dock, MouseTrail, Gooey } from "@/components/ai/interactive-animations";
import { ComponentCard } from "./ComponentCard";
import { Button } from "@/components/ui/button";

export function InteractiveFxComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Ripple Effect"
        description="Click ripple animation"
      >
        <div className="relative h-40 flex items-center justify-center border rounded-md overflow-hidden">
          <p className="z-10 font-bold text-2xl">Click Me</p>
          <Ripple />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Magnetic Button"
        description="Button attracted to cursor"
      >
        <div className="flex justify-center p-8">
          <Magnetic>
            <Button>Magnetic</Button>
          </Magnetic>
        </div>
      </ComponentCard>

      <ComponentCard
        title="3D Card Tilt"
        description="Card tilts on hover"
      >
        <div className="flex justify-center p-4">
          <CardTilt className="w-64 h-40 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-xl flex items-center justify-center text-white font-bold">
            Hover Me
          </CardTilt>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Gooey Effect"
        description="SVG filter for gooey merging"
      >
        <div className="h-40 flex items-center justify-center bg-black rounded-md relative overflow-hidden">
          <Gooey />
        </div>
      </ComponentCard>
    </div>
  );
}
