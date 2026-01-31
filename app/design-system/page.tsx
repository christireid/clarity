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
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium">Design System v2.0</span>
            </div>
            <h1 className="text-6xl font-bold">
              <span className="gradient-text">Minimal Sophisticated</span>
              <br />
              Glassmorphism
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive design system inspired by Prompt Kit & shadcn with unique modern aesthetics
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="gradient-primary text-white px-8 py-6 rounded-xl hover-lift">
                Get Started
              </Button>
              <Button variant="outline" className="glass-hover px-8 py-6 rounded-xl">
                View Components
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Design Tokens Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold">Design Tokens</h2>
            <p className="text-muted-foreground">
              Consistent, scalable, and customizable design foundation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Colors */}
            <div className="card-glass space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Colors</h3>
                  <p className="text-sm text-muted-foreground">Sophisticated palette</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary-500" />
                <div className="w-8 h-8 rounded-lg bg-accent-500" />
                <div className="w-8 h-8 rounded-lg bg-success-500" />
                <div className="w-8 h-8 rounded-lg bg-warning-500" />
              </div>
            </div>

            {/* Typography */}
            <div className="card-glass space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Type className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Typography</h3>
                  <p className="text-sm text-muted-foreground">Geist Sans & Mono</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs">Extra Small</p>
                <p className="text-sm">Small</p>
                <p className="text-base">Base</p>
                <p className="text-lg font-semibold">Large</p>
              </div>
            </div>

            {/* Spacing */}
            <div className="card-glass space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Layout className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Spacing</h3>
                  <p className="text-sm text-muted-foreground">4px base unit</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-primary-500 rounded-full" style={{ width: '4px' }} />
                <div className="h-2 bg-primary-500 rounded-full" style={{ width: '8px' }} />
                <div className="h-2 bg-primary-500 rounded-full" style={{ width: '16px' }} />
                <div className="h-2 bg-primary-500 rounded-full" style={{ width: '32px' }} />
              </div>
            </div>

            {/* Radius */}
            <div className="card-glass space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Box className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Radius</h3>
                  <p className="text-sm text-muted-foreground">Smooth corners</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-10 h-10 bg-accent-500 rounded-sm" />
                <div className="w-10 h-10 bg-accent-500 rounded-md" />
                <div className="w-10 h-10 bg-accent-500 rounded-lg" />
                <div className="w-10 h-10 bg-accent-500 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Glassmorphism Components */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold">Glassmorphism Components</h2>
            <p className="text-muted-foreground">
              Beautiful translucent components with backdrop blur
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Glass Card - Subtle */}
            <div className="glass rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Subtle Glass</h3>
                <Layers className="w-5 h-5 text-primary-500" />
              </div>
              <p className="text-sm text-muted-foreground">
                Light glassmorphism effect with subtle backdrop blur
              </p>
              <div className="pt-4 border-t border-white/10">
                <Button variant="ghost" size="sm" className="w-full">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Glass Card - Medium */}
            <div className="glass-medium rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Medium Glass</h3>
                <Layers className="w-5 h-5 text-accent-500" />
              </div>
              <p className="text-sm text-muted-foreground">
                Balanced glassmorphism with enhanced visibility
              </p>
              <div className="pt-4 border-t border-white/10">
                <Button variant="ghost" size="sm" className="w-full">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Glass Card - Heavy */}
            <div className="glass-heavy rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Heavy Glass</h3>
                <Layers className="w-5 h-5 text-success-500" />
              </div>
              <p className="text-sm text-muted-foreground">
                Strong glassmorphism with maximum frosted effect
              </p>
              <div className="pt-4 border-t border-white/10">
                <Button variant="ghost" size="sm" className="w-full">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Components */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold">Interactive Elements</h2>
            <p className="text-muted-foreground">
              Smooth transitions and hover effects
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Buttons */}
            <div className="glass-medium rounded-2xl p-8 space-y-6">
              <h3 className="text-xl font-semibold">Buttons</h3>
              <div className="space-y-4">
                <Button className="w-full gradient-primary text-white hover-lift">
                  Primary Gradient
                </Button>
                <Button variant="outline" className="w-full glass-hover">
                  Glass Outline
                </Button>
                <Button variant="ghost" className="w-full">
                  Ghost Button
                </Button>
              </div>
            </div>

            {/* Inputs */}
            <div className="glass-medium rounded-2xl p-8 space-y-6">
              <h3 className="text-xl font-semibold">Inputs</h3>
              <div className="space-y-4">
                <Input 
                  placeholder="Glass input field" 
                  className="input-glass"
                />
                <Input 
                  type="email" 
                  placeholder="Email address" 
                  className="input-glass"
                />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  className="input-glass"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Showcase */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold">
              <span className="gradient-text">Gradient System</span>
            </h2>
            <p className="text-muted-foreground">
              Beautiful gradient combinations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="h-48 rounded-2xl gradient-primary flex items-center justify-center hover-lift">
              <span className="text-white font-semibold text-lg">Primary → Accent</span>
            </div>
            <div className="h-48 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center hover-lift">
              <span className="text-white font-semibold text-lg">Blue → Cyan</span>
            </div>
            <div className="h-48 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center hover-lift">
              <span className="text-white font-semibold text-lg">Purple → Pink</span>
            </div>
          </div>
        </div>
      </section>

      {/* Animation Showcase */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold">Animation System</h2>
            <p className="text-muted-foreground">
              Smooth, performant animations with custom easing
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="glass-medium rounded-2xl p-6 hover-lift">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 animate-float" />
              <h4 className="font-semibold mt-4">Float</h4>
              <p className="text-sm text-muted-foreground">Floating motion</p>
            </div>

            <div className="glass-medium rounded-2xl p-6 hover-lift">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 animate-pulse" />
              <h4 className="font-semibold mt-4">Pulse</h4>
              <p className="text-sm text-muted-foreground">Pulsing effect</p>
            </div>

            <div className="glass-medium rounded-2xl p-6 hover-lift">
              <div className="w-12 h-12 rounded-lg gradient-primary animate-gradient" />
              <h4 className="font-semibold mt-4">Gradient</h4>
              <p className="text-sm text-muted-foreground">Animated gradient</p>
            </div>

            <div className="glass-medium rounded-2xl p-6 hover-lift">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 animate-shimmer" />
              <h4 className="font-semibold mt-4">Shimmer</h4>
              <p className="text-sm text-muted-foreground">Shimmer effect</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-heavy rounded-3xl p-12 text-center space-y-6">
            <h2 className="text-4xl font-bold">Ready to build?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start using this design system in your projects today
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="gradient-primary text-white px-8 py-6 rounded-xl hover-lift">
                <Code className="w-5 h-5 mr-2" />
                View Documentation
              </Button>
              <Button variant="outline" className="glass-hover px-8 py-6 rounded-xl">
                <Zap className="w-5 h-5 mr-2" />
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
