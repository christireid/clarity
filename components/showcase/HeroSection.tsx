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
    <span className="text-primary font-sans">
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
    <div className="relative w-full rounded-2xl overflow-hidden glass-panel mb-12">
      {/* Background Effects - Glassmorphism */}
      <div className="absolute inset-0 z-0">
        <Particles
          quantity={60}
          staticity={50}
          ease={60}
          className="h-full w-full opacity-40"
          color="#3b82f6"
        />
        {/* Soft gradient overlays for depth */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-16 md:px-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-button">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium font-sans">Production Ready</span>
            <Badge variant="secondary" className="text-xs font-sans">
              v2.0
            </Badge>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-sans">
              Build{" "}
              <span className="bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
                Intelligent
              </span>{" "}
              Chat Interfaces
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
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
              className="h-12 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg font-sans"
              onClick={() => (window.location.href = "/advanced-ai")}
            >
              <Zap className="w-4 h-4 mr-2" />
              Try Live Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 rounded-full glass-button font-sans"
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
                className="flex flex-col items-center gap-2 p-4 rounded-xl glass-card"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold font-sans">{feature.title}</h3>
                <p className="text-sm text-muted-foreground text-center font-sans">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-4 text-sm font-sans">
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
