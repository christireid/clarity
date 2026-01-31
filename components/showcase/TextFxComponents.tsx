"use client";

import * as React from "react";
import { Typewriter, TextReveal, FlipText, ScrambleText, AnimatedGradientText, SplitText, NumberTicker, MorphingText, GlitchText } from "@/components/ai/text-animations";
import { ComponentCard } from "./ComponentCard";

export function TextFxComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Typewriter"
        description="Typewriter text effect"
      >
        <Typewriter text="This is a typewriter effect..." />
      </ComponentCard>

      <ComponentCard
        title="Text Reveal"
        description="Reveal text on scroll or load"
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
        description="Animated number counter"
      >
        <div className="text-4xl font-bold">
          <NumberTicker value={1234} />
        </div>
      </ComponentCard>
    </div>
  );
}
