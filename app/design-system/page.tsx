"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
 * Minimal Design System with Pastel Gradient Accents
 * Inspired by Ant Design & shadcn aesthetics
 */

export default function DesignSystemShowcase() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Hero Section - Ultra Minimal */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            {/* Pastel Badge - First accent */}
            <div className="inline-flex items-center gap-2 gradient-pastel-animated rounded-full px-3 py-1 text-xs font-medium text-neutral-700">
              <Sparkles className="w-3 h-3" />
              Minimal Design System
            </div>
            
            {/* Neutral Title */}
            <h1 className="text-5xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
              Less is More
            </h1>
            
            {/* Subdued Description */}
            <p className="text-neutral-500 dark:text-neutral-400 max-w-md mx-auto text-sm">
              Ultra-minimal with strategic pastel gradient accents
            </p>
            
            {/* Minimal Buttons */}
            <div className="flex gap-3 justify-center pt-2">
              <Button className="gradient-pastel-blue text-neutral-700 px-5 py-2 rounded-lg text-sm border-0 hover:opacity-90 transition-opacity">
                Get Started
              </Button>
              <Button variant="outline" className="px-5 py-2 rounded-lg text-sm">
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section className="py-16 px-4 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full glass flex items-center justify-center">
                <Layout className="w-4 h-4 text-neutral-600" />
              </div>
              <h3 className="font-medium text-sm text-neutral-900 dark:text-neutral-50">Minimal</h3>
              <p className="text-xs text-neutral-500">Clean & focused</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full glass flex items-center justify-center">
                <Layers className="w-4 h-4 text-neutral-600" />
              </div>
              <h3 className="font-medium text-sm text-neutral-900 dark:text-neutral-50">Glass</h3>
              <p className="text-xs text-neutral-500">Subtle transparency</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full gradient-pastel-purple flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-neutral-700" />
              </div>
              <h3 className="font-medium text-sm text-neutral-900 dark:text-neutral-50">Accents</h3>
              <p className="text-xs text-neutral-500">Pastel gradients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pastel Gradients - Strategic Showcase */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Pastel Accents</h2>
            <p className="text-xs text-neutral-500">
              Use sparingly for emphasis
            </p>
          </div>

          <div className="grid grid-cols-5 gap-3">
            <div className="aspect-square rounded-lg gradient-pastel-pink" />
            <div className="aspect-square rounded-lg gradient-pastel-purple" />
            <div className="aspect-square rounded-lg gradient-pastel-blue" />
            <div className="aspect-square rounded-lg gradient-pastel-mint" />
            <div className="aspect-square rounded-lg gradient-pastel-peach" />
          </div>

          {/* Animated Gradient */}
          <div className="h-24 rounded-lg gradient-pastel-animated flex items-center justify-center">
            <span className="text-sm font-medium text-neutral-700">Animated Pastel Gradient</span>
          </div>
        </div>
      </section>

      {/* Glassmorphism - Subtle */}
      <section className="py-16 px-4 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Glassmorphism</h2>
            <p className="text-xs text-neutral-500">
              Ultra-subtle transparency
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Subtle Glass */}
            <div className="glass rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Subtle</span>
                <Layers className="w-3 h-3 text-neutral-400" />
              </div>
              <p className="text-xs text-neutral-500">Light frosting</p>
            </div>

            {/* Medium Glass */}
            <div className="glass-medium rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Medium</span>
                <Layers className="w-3 h-3 text-neutral-400" />
              </div>
              <p className="text-xs text-neutral-500">Balanced blur</p>
            </div>

            {/* Heavy Glass */}
            <div className="glass-heavy rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Heavy</span>
                <Layers className="w-3 h-3 text-neutral-400" />
              </div>
              <p className="text-xs text-neutral-500">Strong effect</p>
            </div>
          </div>
        </div>
      </section>

      {/* Components - Minimal */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Components</h2>
            <p className="text-xs text-neutral-500">
              Clean and functional
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Buttons */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Buttons</h3>
              <div className="space-y-2">
                {/* Pastel accent button */}
                <Button className="w-full gradient-pastel-purple text-neutral-700 border-0 text-sm h-9">
                  Pastel Accent
                </Button>
                {/* Neutral button */}
                <Button variant="outline" className="w-full text-sm h-9">
                  Neutral Outline
                </Button>
                {/* Ghost button */}
                <Button variant="ghost" className="w-full text-sm h-9">
                  Ghost
                </Button>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Inputs</h3>
              <div className="space-y-2">
                <Input 
                  placeholder="Minimal input" 
                  className="text-sm h-9 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
                />
                <Input 
                  type="email" 
                  placeholder="Email address" 
                  className="text-sm h-9 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
                />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  className="text-sm h-9 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Badges & Pills - Strategic Accents */}
      <section className="py-16 px-4 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Strategic Accents</h2>
            <p className="text-xs text-neutral-500">
              Use color intentionally
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <span className="gradient-pastel-pink px-3 py-1 rounded-full text-xs font-medium text-neutral-700">
              New
            </span>
            <span className="gradient-pastel-purple px-3 py-1 rounded-full text-xs font-medium text-neutral-700">
              Featured
            </span>
            <span className="gradient-pastel-blue px-3 py-1 rounded-full text-xs font-medium text-neutral-700">
              Popular
            </span>
            <span className="gradient-pastel-mint px-3 py-1 rounded-full text-xs font-medium text-neutral-700">
              Success
            </span>
            <span className="gradient-pastel-peach px-3 py-1 rounded-full text-xs font-medium text-neutral-700">
              Updated
            </span>
          </div>

          {/* Animated Badge */}
          <div className="flex justify-center">
            <span className="gradient-pastel-animated px-4 py-2 rounded-full text-sm font-medium text-neutral-700">
              <Sparkles className="w-3 h-3 inline mr-1" />
              Animated Accent
            </span>
          </div>
        </div>
      </section>

      {/* Typography - Minimal */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Typography</h2>
            <p className="text-xs text-neutral-500">
              Geist Sans - Clean & modern
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 glass rounded-lg">
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">Heading 1</h1>
              <p className="text-xs text-neutral-500">3rem / 48px - Bold</p>
            </div>
            <div className="p-4 glass rounded-lg">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">Heading 2</h2>
              <p className="text-xs text-neutral-500">1.5rem / 24px - Bold</p>
            </div>
            <div className="p-4 glass rounded-lg">
              <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-2">Body text - The quick brown fox jumps over the lazy dog</p>
              <p className="text-xs text-neutral-500">0.875rem / 14px - Regular</p>
            </div>
            <div className="p-4 glass rounded-lg">
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">Small text - Supporting information and captions</p>
              <p className="text-xs text-neutral-500">0.75rem / 12px - Regular</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Minimal with Pastel Accent */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="glass-heavy rounded-xl p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Ready to start?</h2>
            <p className="text-sm text-neutral-500 max-w-sm mx-auto">
              Ultra-minimal design with strategic pastel accents
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <Button className="gradient-pastel-mint text-neutral-700 px-5 py-2 rounded-lg text-sm border-0">
                <Code className="w-3 h-3 mr-1.5" />
                Documentation
              </Button>
              <Button variant="outline" className="px-5 py-2 rounded-lg text-sm">
                <Zap className="w-3 h-3 mr-1.5" />
                Examples
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
