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
import {
  TextShimmer,
  TypingAnimation,
  FadeInText,
  GradientText,
  StreamingText,
  CharacterReveal,
  CounterAnimation,
} from "@/components/ai/text-effects";
import { AuroraText, AuroraCard } from "@/components/ai/animated/aurora-background";
import { AnimatedGradient, MeshGradient, GradientBorder, ShimmerEffect } from "@/components/ai/animated/gradient-effects";
import { Spotlight, SpotlightCard, MultiSpotlight } from "@/components/ai/animated/spotlight";
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

      {/* SECTION: Advanced Text Effects */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Advanced Text Effects</h3>
        <div className="space-y-8">
          <ComponentCard
            title="Text Shimmer"
            description="Loading shimmer effect on text"
          >
            <TextShimmer text="Loading content..." className="text-2xl font-bold" />
          </ComponentCard>

          <ComponentCard
            title="Typing Animation"
            description="Character-by-character with cursor"
          >
            <TypingAnimation
              text="Hello! I am typing this message..."
              speed={50}
              cursor
              className="text-lg"
            />
          </ComponentCard>

          <ComponentCard
            title="Fade In Text"
            description="Word-by-word fade in effect"
          >
            <FadeInText
              text="Each word fades in one after another creating a smooth reveal effect"
              wordDelay={150}
              className="text-lg"
            />
          </ComponentCard>

          <ComponentCard
            title="Gradient Text"
            description="Animated gradient color text"
          >
            <GradientText
              text="Beautiful Gradient"
              colors={["#3b82f6", "#8b5cf6", "#ec4899", "#3b82f6"]}
              animated
              className="text-4xl font-bold"
            />
          </ComponentCard>

          <ComponentCard
            title="Streaming Text"
            description="AI-style streaming response"
          >
            <StreamingText
              text="This simulates how AI models stream their responses in real-time, chunk by chunk."
              speed={30}
              chunkSize={3}
              cursor
              className="text-base"
            />
          </ComponentCard>

          <ComponentCard
            title="Character Reveal"
            description="Characters animate in from different directions"
          >
            <div className="space-y-4">
              <CharacterReveal text="Left to Right" direction="left" className="text-xl font-bold" />
              <CharacterReveal text="From Center" direction="center" charDelay={50} className="text-xl font-bold" />
            </div>
          </ComponentCard>

          <ComponentCard
            title="Counter Animation"
            description="Animated number counting"
          >
            <div className="flex gap-8 text-4xl font-bold">
              <div>
                <CounterAnimation from={0} to={1000} duration={2000} />
                <span className="text-sm text-muted-foreground block">Users</span>
              </div>
              <div>
                $<CounterAnimation from={0} to={99999} duration={2000} formatter={(v) => Math.round(v).toLocaleString()} />
                <span className="text-sm text-muted-foreground block">Revenue</span>
              </div>
            </div>
          </ComponentCard>

          <ComponentCard
            title="Aurora Text"
            description="Text with aurora glow effect"
          >
            <AuroraText className="text-4xl font-bold">
              Aurora Glow Text
            </AuroraText>
          </ComponentCard>

          <ComponentCard
            title="Aurora Card"
            description="Card with animated aurora border"
          >
            <AuroraCard className="max-w-md mx-auto">
              <div className="p-6">
                <h4 className="font-bold text-lg mb-2">Featured Content</h4>
                <p className="text-muted-foreground text-sm">
                  This card has an animated aurora border effect that smoothly cycles through colors.
                </p>
              </div>
            </AuroraCard>
          </ComponentCard>
        </div>
      </div>

      {/* SECTION: Gradient Effects */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Gradient Effects</h3>
        <div className="space-y-8">
          <ComponentCard
            title="Animated Gradient"
            description="Smoothly transitioning color gradient"
          >
            <div className="h-40 rounded-lg overflow-hidden">
              <AnimatedGradient
                colors={["#3b82f6", "#8b5cf6", "#ec4899"]}
                speed={3}
              />
            </div>
          </ComponentCard>

          <ComponentCard
            title="Mesh Gradient"
            description="Multi-point organic gradient"
          >
            <div className="h-40 rounded-lg overflow-hidden">
              <MeshGradient
                colors={["#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"]}
              />
            </div>
          </ComponentCard>

          <ComponentCard
            title="Gradient Border"
            description="Animated gradient border effect"
          >
            <GradientBorder className="inline-block">
              <div className="px-6 py-4 bg-background rounded-lg">
                <p className="font-medium">Content with gradient border</p>
              </div>
            </GradientBorder>
          </ComponentCard>

          <ComponentCard
            title="Shimmer Effect"
            description="Loading shimmer animation"
          >
            <div className="space-y-2">
              <ShimmerEffect className="h-4 w-3/4 rounded" />
              <ShimmerEffect className="h-4 w-1/2 rounded" />
              <ShimmerEffect className="h-4 w-2/3 rounded" />
            </div>
          </ComponentCard>
        </div>
      </div>

      {/* SECTION: Spotlight Effects */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Spotlight Effects</h3>
        <div className="space-y-8">
          <ComponentCard
            title="Spotlight"
            description="Animated spotlight effect"
          >
            <div className="relative h-40 bg-zinc-900 rounded-lg overflow-hidden flex items-center justify-center">
              <Spotlight />
              <span className="z-10 text-white font-bold">Spotlight Effect</span>
            </div>
          </ComponentCard>

          <ComponentCard
            title="Spotlight Card"
            description="Card with spotlight hover effect"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <SpotlightCard className="p-6">
                <h4 className="font-bold mb-2">Feature One</h4>
                <p className="text-sm text-muted-foreground">Hover to see the spotlight effect</p>
              </SpotlightCard>
              <SpotlightCard className="p-6">
                <h4 className="font-bold mb-2">Feature Two</h4>
                <p className="text-sm text-muted-foreground">Interactive lighting follows cursor</p>
              </SpotlightCard>
            </div>
          </ComponentCard>

          <ComponentCard
            title="Multi Spotlight"
            description="Multiple spotlights effect"
          >
            <div className="relative h-40 bg-zinc-900 rounded-lg overflow-hidden flex items-center justify-center">
              <MultiSpotlight count={3} />
              <span className="z-10 text-white font-bold">Multi Spotlight</span>
            </div>
          </ComponentCard>
        </div>
      </div>
    </div>
  );
}
