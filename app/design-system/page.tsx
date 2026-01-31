"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Sparkles,
  Zap,
  Code,
  Palette,
  Layout,
  Box,
  Type,
  Layers,
} from "lucide-react";

/**
 * Design System Showcase - Glassmorphism Theme
 * Demonstrates the minimal sophisticated design system
 */

export default function DesignSystemShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* Hero Section - Minimal */}
      <section className="relative overflow-hidden py-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-sm">
              <Sparkles className="w-3.5 h-3.5 text-primary-500" />
              <span className="text-xs font-medium">Design System v2.0</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight">
              <span className="gradient-text">Minimal Glassmorphism</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Refined design system with enhanced glass effects
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <Button className="gradient-primary text-white px-6 py-2.5 rounded-lg hover-lift text-sm">
                Get Started
              </Button>
              <Button variant="outline" className="glass-hover px-6 py-2.5 rounded-lg text-sm">
                Components
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Design Tokens Section - Minimal */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Design Tokens</h2>
            <p className="text-sm text-muted-foreground">
              Consistent foundation with minimal spacing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Colors */}
            <div className="card-glass space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <Palette className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Colors</h3>
                  <p className="text-xs text-muted-foreground">Palette</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <div className="w-7 h-7 rounded-md bg-primary-500" />
                <div className="w-7 h-7 rounded-md bg-accent-500" />
                <div className="w-7 h-7 rounded-md bg-success-500" />
                <div className="w-7 h-7 rounded-md bg-warning-500" />
              </div>
            </div>

            {/* Typography */}
            <div className="card-glass space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Type className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Typography</h3>
                  <p className="text-xs text-muted-foreground">Geist</p>
                </div>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs">Extra Small</p>
                <p className="text-sm">Small</p>
                <p className="text-base font-medium">Base</p>
              </div>
            </div>

            {/* Spacing */}
            <div className="card-glass space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Layout className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Spacing</h3>
                  <p className="text-xs text-muted-foreground">Minimal</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="h-1.5 bg-primary-500 rounded-full" style={{ width: '4px' }} />
                <div className="h-1.5 bg-primary-500 rounded-full" style={{ width: '8px' }} />
                <div className="h-1.5 bg-primary-500 rounded-full" style={{ width: '12px' }} />
                <div className="h-1.5 bg-primary-500 rounded-full" style={{ width: '16px' }} />
              </div>
            </div>

            {/* Radius */}
            <div className="card-glass space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Box className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Radius</h3>
                  <p className="text-xs text-muted-foreground">Corners</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <div className="w-8 h-8 bg-accent-500 rounded-sm" />
                <div className="w-8 h-8 bg-accent-500 rounded-md" />
                <div className="w-8 h-8 bg-accent-500 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Glassmorphism Components - Enhanced */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Enhanced Glassmorphism</h2>
            <p className="text-sm text-muted-foreground">
              Stronger blur with minimal padding
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Glass Card - Subtle */}
            <div className="glass rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">Subtle</h3>
                <Layers className="w-4 h-4 text-primary-500" />
              </div>
              <p className="text-xs text-muted-foreground">
                Light glass with enhanced blur
              </p>
              <Button variant="ghost" size="sm" className="w-full text-xs h-8">
                View
              </Button>
            </div>

            {/* Glass Card - Medium */}
            <div className="glass-medium rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">Medium</h3>
                <Layers className="w-4 h-4 text-accent-500" />
              </div>
              <p className="text-xs text-muted-foreground">
                Balanced visibility
              </p>
              <Button variant="ghost" size="sm" className="w-full text-xs h-8">
                View
              </Button>
            </div>

            {/* Glass Card - Heavy */}
            <div className="glass-heavy rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">Heavy</h3>
                <Layers className="w-4 h-4 text-success-500" />
              </div>
              <p className="text-xs text-muted-foreground">
                Maximum frosted effect
              </p>
              <Button variant="ghost" size="sm" className="w-full text-xs h-8">
                View
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Components - Minimal */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Interactive Elements</h2>
            <p className="text-sm text-muted-foreground">
              Smooth micro-interactions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Buttons */}
            <div className="glass-medium rounded-xl p-5 space-y-4">
              <h3 className="text-lg font-semibold">Buttons</h3>
              <div className="space-y-2.5">
                <Button className="w-full gradient-primary text-white hover-lift text-sm h-9">
                  Primary Gradient
                </Button>
                <Button variant="outline" className="w-full glass-hover text-sm h-9">
                  Glass Outline
                </Button>
                <Button variant="ghost" className="w-full text-sm h-9">
                  Ghost
                </Button>
              </div>
            </div>

            {/* Inputs */}
            <div className="glass-medium rounded-xl p-5 space-y-4">
              <h3 className="text-lg font-semibold">Inputs</h3>
              <div className="space-y-2.5">
                <Input 
                  placeholder="Glass input" 
                  className="input-glass text-sm h-9"
                />
                <Input 
                  type="email" 
                  placeholder="Email" 
                  className="input-glass text-sm h-9"
                />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  className="input-glass text-sm h-9"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Showcase - Minimal */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">
              <span className="gradient-text">Gradients</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Smooth color transitions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="h-32 rounded-xl gradient-primary flex items-center justify-center hover-lift">
              <span className="text-white font-medium text-sm">Primary</span>
            </div>
            <div className="h-32 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center hover-lift">
              <span className="text-white font-medium text-sm">Blue</span>
            </div>
            <div className="h-32 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center hover-lift">
              <span className="text-white font-medium text-sm">Purple</span>
            </div>
          </div>
        </div>
      </section>

      {/* Animation Showcase - Minimal */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Animations</h2>
            <p className="text-sm text-muted-foreground">
              Performant micro-animations
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="glass-medium rounded-xl p-4 hover-lift">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 animate-float" />
              <h4 className="font-semibold mt-3 text-sm">Float</h4>
              <p className="text-xs text-muted-foreground">Motion</p>
            </div>

            <div className="glass-medium rounded-xl p-4 hover-lift">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 animate-pulse" />
              <h4 className="font-semibold mt-3 text-sm">Pulse</h4>
              <p className="text-xs text-muted-foreground">Beat</p>
            </div>

            <div className="glass-medium rounded-xl p-4 hover-lift">
              <div className="w-10 h-10 rounded-lg gradient-primary animate-gradient" />
              <h4 className="font-semibold mt-3 text-sm">Gradient</h4>
              <p className="text-xs text-muted-foreground">Flow</p>
            </div>

            <div className="glass-medium rounded-xl p-4 hover-lift">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 animate-shimmer" />
              <h4 className="font-semibold mt-3 text-sm">Shimmer</h4>
              <p className="text-xs text-muted-foreground">Shine</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Minimal */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="glass-heavy rounded-2xl p-8 text-center space-y-4">
            <h2 className="text-3xl font-bold">Ready to build?</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Start using the minimal glassmorphism system
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <Button className="gradient-primary text-white px-6 py-2.5 rounded-lg hover-lift text-sm">
                <Code className="w-4 h-4 mr-1.5" />
                Docs
              </Button>
              <Button variant="outline" className="glass-hover px-6 py-2.5 rounded-lg text-sm">
                <Zap className="w-4 h-4 mr-1.5" />
                Start
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
