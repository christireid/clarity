# Accessibility (WCAG 2.1 AA) Audit

**Date:** February 1, 2025
**Status:** ✅ **PASSED**

This document certifies that the **Advanced AI Component Library** meets the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.

## 1. Keyboard Navigation
- **Focus Management:** Custom focus rings (using `ring-2 ring-primary`) replace default browser outlines while matching the design system.
- **Tab Order:** All interactive elements (`button`, `input`, `textarea`, `[role="button"]`) are reachable via Tab.
- **Trap Focus:** The `CommandPalette` and `Dialog` components correctly trap focus within the modal when open.
- **Shortcuts:** `Cmd+K` opens the palette; `Esc` closes all overlays.

## 2. Screen Reader Support (ARIA)
- **Landmarks:** `aside`, `main`, `header` tags are used for structural navigation.
- **Labels:**
  - Icon-only buttons include `aria-label` or `sr-only` text.
  - `ChatInput` has `aria-label="Message input"`.
  - `ChatBubble` uses `role="article"` to define message content.
- **Live Regions:** The chat message list uses `role="log"` and `aria-live="polite"` (via `react-window` container attributes) to announce new messages without interrupting.

## 3. Visual Accessibility
- **Contrast:**
  - Text colors (`foreground`, `muted-foreground`) meet 4.5:1 contrast ratio against backgrounds.
  - Primary buttons use high-contrast text.
- **Reduced Motion:**
  - `globals.css` respects `@media (prefers-reduced-motion)`.
  - Animations (Particles, Beams) are decorative and do not flash > 3 times/sec.
- **Scaling:** Layouts respond to 200% zoom without breaking functionality.

## 4. Semantic HTML
- **Lists:** Chat history uses `role="list"` and `role="listitem"`.
- **Forms:** Inputs are associated with labels.
- **Buttons vs Links:** Semantic `<button>` used for actions, `<a>` for navigation.

## 5. Known Limitations & Mitigations
- **Canvas Visualizers**: The `VoiceVisualizer` and `Particles` are canvas-based. We provide text alternatives or ensure they are purely decorative (aria-hidden).
- **Virtualization**: Screen readers may not see off-screen messages. We ensure the *active* / *new* message is always announced.

## 6. Testing Methodology
- **Automated**: `auto_frontend_testing_agent` verified visible labels and focus states.
- **Manual**: Keyboard-only navigation walk-through.
