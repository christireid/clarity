"use client";

import React from "react";
import { Particles } from "@/components/ai/particles";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Code, MessageSquare, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Typewriter effect component
function Typewriter({ words }: { words: string[] }) {
  const [currentWord, setCurrentWord] = React.useState(0);
  const [currentText, setCurrentText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const word = words[currentWord];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(word.substring(0, currentText.length + 1));
        if (currentText === word) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(word.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWord((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWord, words]);

  return (
    <span className="text-primary">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// Feature cards
const features = [
  {
    icon: MessageSquare,
    title: "Chat SDK",
    description: "Full-featured chat with streaming",
  },
  {
    icon: Bot,
    title: "Agent UI",
    description: "Tool calling & workflows",
  },
  {
    icon: Code,
    title: "Code Blocks",
    description: "Syntax highlighting & diffs",
  },
];

export function HeroSection() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-border bg-gradient-to-b from-background to-muted/30 mb-12">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <Particles
          quantity={80}
          staticity={40}
          ease={50}
          className="h-full w-full opacity-50"
          color="#a855f7"
        />
        {/* Gradient overlays */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-16 md:px-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg">
            <Sparkles className="w-4 h-4 text-violet-500" />
            <span className="text-sm font-medium">Production Ready</span>
            <Badge variant="secondary" className="text-xs">
              v2.0
            </Badge>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Build{" "}
              <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                Intelligent
              </span>{" "}
              Chat Interfaces
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive React component library for{" "}
              <Typewriter
                words={[
                  "AI Chat Applications",
                  "Token Optimization",
                  "Generative UI",
                  "Agent Workflows",
                  "RAG Systems",
                ]}
              />
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="h-12 px-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-lg shadow-violet-500/25"
              onClick={() => (window.location.href = "/advanced-ai")}
            >
              <Zap className="w-4 h-4 mr-2" />
              Try Live Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
              onClick={() =>
                document
                  .getElementById("components")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Components
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-border hover:bg-background/80 transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                  <feature.icon className="h-5 w-5 text-violet-500" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">35+</div>
              <div className="text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">200+</div>
              <div className="text-muted-foreground">Components</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">100%</div>
              <div className="text-muted-foreground">TypeScript</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-0" />
    </div>
  );
}
