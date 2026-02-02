"use client";

import * as React from "react";
import {
  ThemeProvider,
  ThemeToggle,
  ThemeModeSelector,
  ColorPresetSelector,
  RadiusSelector,
  ThemeSettingsPanel,
  ThemePreview,
  CompactThemeSwitcher,
} from "@/components/ai/theme";
import { ComponentCard } from "./ComponentCard";

export function ThemeComponents() {
  return (
    <ThemeProvider>
      <div className="space-y-8">
        <ComponentCard
          title="Theme Toggle"
          description="Simple button to cycle through themes"
        >
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <span className="text-sm text-muted-foreground">
              Click to toggle light/dark/system
            </span>
          </div>
        </ComponentCard>

        <ComponentCard
          title="Compact Theme Switcher"
          description="Pill-style theme switcher for headers"
        >
          <CompactThemeSwitcher />
        </ComponentCard>

        <ComponentCard
          title="Theme Mode Selector"
          description="Dropdown to select theme mode"
        >
          <ThemeModeSelector />
        </ComponentCard>

        <ComponentCard
          title="Color Preset Selector"
          description="Choose from predefined color themes"
        >
          <ColorPresetSelector />
        </ComponentCard>

        <ComponentCard
          title="Radius Selector"
          description="Adjust border radius globally"
        >
          <RadiusSelector />
        </ComponentCard>

        <ComponentCard
          title="Theme Preview"
          description="Preview of theme colors and components"
        >
          <div className="max-w-xs">
            <ThemePreview />
          </div>
        </ComponentCard>

        <ComponentCard
          title="Theme Settings Panel"
          description="Complete theme customization panel"
        >
          <div className="max-w-sm">
            <ThemeSettingsPanel />
          </div>
        </ComponentCard>
      </div>
    </ThemeProvider>
  );
}
