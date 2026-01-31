"use client";

import * as React from "react";
import { Particles, Sparkles, Meteors, GridPattern, DotPattern, FloatingParticles } from "@/components/ai/particles";
import { AnimatedBeam, AnimatedBeamMultiple, IntegrationBeamDiagram, FlowBeam } from "@/components/ai/animated-beam";
import { ComponentCard } from "./ComponentCard";

export function VisualEffectsComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Particles"
        description="Animated background particles"
      >
        <div className="relative h-40 bg-black rounded-md overflow-hidden">
          <Particles quantity={100} staticity={50} ease={50} />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Animated Beams"
        description="Connecting nodes with beams"
      >
        <div className="relative h-40 flex items-center justify-center bg-background border rounded-md">
          <IntegrationBeamDiagram />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Meteors"
        description="Falling meteor effect"
      >
        <div className="relative h-40 bg-slate-950 rounded-md overflow-hidden flex items-center justify-center">
          <Meteors number={20} />
          <span className="text-white z-10 font-bold">Meteor Effect</span>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Grid Pattern"
        description="Background grid patterns"
      >
        <div className="relative h-40 w-full overflow-hidden border rounded-md bg-background">
          <GridPattern width={40} height={40} x={-1} y={-1} strokeDasharray={"4 2"} className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" />
        </div>
      </ComponentCard>
    </div>
  );
}
