"use client";

import * as React from "react";
// Background & Particle Effects
import { Particles, Meteors, GridPattern } from "@/components/ai/particles";
import { IntegrationBeamDiagram } from "@/components/ai/animated-beam";
import { AuroraBackground, RetroGrid, SpotlightGrid } from "@/components/ai/background-animations";
// Interactive Effects
import { Ripple, Magnetic, CardTilt, Gooey } from "@/components/ai/interactive-animations";
import { FloatingElement, SpotlightCursor, ShimmerBorder } from "@/components/ai/advanced-animations";
// Text Effects
import { Typewriter, TextReveal, ScrambleText, AnimatedGradientText, NumberTicker } from "@/components/ai/text-animations";
import { ComponentCard } from "./ComponentCard";
import { Button } from "@/components/ui/button";

// Consolidated Effects - organized by type with no redundancy
export function EffectsComponents() {
  return (
    <div className="space-y-12">
      {/* SECTION: Background Effects */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Background Effects</h3>
        <div className="space-y-8">
          <ComponentCard
            title="Particles"
            description="Animated floating particles"
          >
            <div className="relative h-40 bg-black rounded-md overflow-hidden">
              <Particles quantity={100} staticity={50} ease={50} />
            </div>
          </ComponentCard>

          <ComponentCard
            title="Aurora Background"
            description="Animated aurora borealis effect"
          >
            <div className="relative h-40 w-full overflow-hidden rounded-md">
              <AuroraBackground>
                <div className="z-10 flex items-center justify-center h-full text-white font-bold">Aurora</div>
              </AuroraBackground>
            </div>
          </ComponentCard>

          <ComponentCard
            title="Meteors"
            description="Falling meteor particle effect"
          >
            <div className="relative h-40 bg-slate-950 rounded-md overflow-hidden flex items-center justify-center">
              <Meteors number={20} />
              <span className="text-white z-10 font-bold">Meteor Effect</span>
            </div>
          </ComponentCard>

          <ComponentCard
            title="Grid Pattern"
            description="Masked grid background"
          >
            <div className="relative h-40 w-full overflow-hidden border rounded-md bg-background">
              <GridPattern width={40} height={40} x={-1} y={-1} strokeDasharray={"4 2"} className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" />
            </div>
          </ComponentCard>

          <ComponentCard
            title="Retro Grid"
            description="Animated perspective grid"
          >
            <div className="relative h-40 w-full overflow-hidden rounded-md border flex items-center justify-center">
              <RetroGrid />
              <span className="z-10 font-bold bg-white/80 px-2 rounded">Retro Grid</span>
            </div>
          </ComponentCard>

          <ComponentCard
            title="Animated Beams"
            description="Connecting nodes with animated beams"
          >
            <div className="relative h-40 flex items-center justify-center bg-background border rounded-md">
              <IntegrationBeamDiagram />
            </div>
          </ComponentCard>
        </div>
      </div>

      {/* SECTION: Interactive Effects */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Interactive Effects</h3>
        <div className="space-y-8">
          <ComponentCard
            title="Ripple Effect"
            description="Click-triggered ripple animation"
          >
            <div className="relative h-40 flex items-center justify-center border rounded-md overflow-hidden">
              <p className="z-10 font-bold text-2xl">Click Me</p>
              <Ripple />
            </div>
          </ComponentCard>

          <ComponentCard
            title="Magnetic Button"
            description="Element attracted to cursor"
          >
            <div className="flex justify-center p-8">
              <Magnetic>
                <Button>Magnetic</Button>
              </Magnetic>
            </div>
          </ComponentCard>

          <ComponentCard
            title="3D Card Tilt"
            description="Perspective tilt on hover"
          >
            <div className="flex justify-center p-4">
              <CardTilt className="w-64 h-40 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-xl flex items-center justify-center text-white font-bold">
                Hover Me
              </CardTilt>
            </div>
          </ComponentCard>

          <ComponentCard
            title="Spotlight Cursor"
            description="Spotlight follows cursor position"
          >
            <div className="relative h-40 w-full overflow-hidden rounded-md border bg-zinc-950">
              <SpotlightCursor />
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                Move Cursor Here
              </div>
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

          <ComponentCard
            title="Gooey Effect"
            description="SVG filter for blob merging"
          >
            <div className="h-40 flex items-center justify-center bg-black rounded-md relative overflow-hidden">
              <Gooey />
            </div>
          </ComponentCard>

          <ComponentCard
            title="Shimmer Border"
            description="Animated gradient border"
          >
            <div className="flex justify-center p-8">
              <ShimmerBorder>
                <Button className="bg-black text-white hover:bg-black/90">Shimmer Button</Button>
              </ShimmerBorder>
            </div>
          </ComponentCard>
        </div>
      </div>

      {/* SECTION: Text Effects */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Text Effects</h3>
        <div className="space-y-8">
          <ComponentCard
            title="Typewriter"
            description="Character-by-character typing"
          >
            <Typewriter text="This is a typewriter effect..." />
          </ComponentCard>

          <ComponentCard
            title="Text Reveal"
            description="Animated text reveal on load"
          >
            <TextReveal text="Reveal your text with style." />
          </ComponentCard>

          <ComponentCard
            title="Scramble Text"
            description="Matrix-style text scramble"
          >
            <ScrambleText text="ENCRYPTED DATA" />
          </ComponentCard>

          <ComponentCard
            title="Animated Gradient Text"
            description="Text with animated gradient fill"
          >
            <AnimatedGradientText className="text-4xl font-bold">
              Gradient Text
            </AnimatedGradientText>
          </ComponentCard>

          <ComponentCard
            title="Number Ticker"
            description="Animated counter animation"
          >
            <div className="text-4xl font-bold">
              <NumberTicker value={1234} />
            </div>
          </ComponentCard>
        </div>
      </div>
    </div>
  );
}
