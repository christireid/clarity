"use client";

import React from "react";
import { Particles } from "@/components/ai/particles";
import { Typewriter } from "@/components/ai/text-animations";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden border border-border bg-black/5 dark:bg-white/5 mb-12 flex flex-col items-center justify-center text-center p-8">
      {/* Background Particles */}
      <div className="absolute inset-0 z-0">
        <Particles 
          quantity={100}
          staticity={30}
          ease={70}
          className="h-full w-full"
          color="#a855f7" // Purple accent
        />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-6 max-w-3xl">
        <Badge variant="outline" className="bg-background/50 backdrop-blur-sm animate-fade-in border-primary/20 text-primary">
          <Sparkles className="w-3 h-3 mr-2" />
          v2.0 Now Available
        </Badge>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
          Build <span className="text-primary">Intelligent</span> Interfaces
        </h1>

        <div className="text-lg md:text-xl text-muted-foreground h-12">
          <Typewriter 
            text={["Streaming Chat SDK", "Generative UI System", "Token Optimization", "RAG Integration"]} 
            speed={50}
            loop
            waitTime={2000}
            cursorChar="|"
          />
        </div>

        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button size="lg" className="h-12 px-8 rounded-full shadow-lg shadow-primary/20" onClick={() => window.location.href = '/advanced-ai'}>
            <Zap className="w-4 h-4 mr-2" />
            Live Demo
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 rounded-full bg-background/50 backdrop-blur-sm" onClick={() => document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Components
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0" />
    </div>
  );
}
