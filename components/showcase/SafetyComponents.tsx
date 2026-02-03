"use client";

import * as React from "react";
import { ModerationBadge, ModerationDetails, PIIDetectionDisplay, FactCheckDisplay, SafetyFiltersPanel, ContentWarningBanner, SafetyShield } from "@/components/ai/guardrails";
import { ComponentCard } from "./ComponentCard";

const safeResult = {
  flagged: false,
  categories: { hate: false, harassment: false, violence: false },
  categoryScores: { hate: 0.01, harassment: 0.02, violence: 0.01 }
};

const flaggedResult = {
  flagged: true,
  categories: { hate: false, harassment: false, violence: true },
  categoryScores: { hate: 0.01, harassment: 0.05, violence: 0.85 }
};

export function SafetyComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Moderation Badge"
        description="Content safety status"
      >
        <div className="flex gap-4 items-center">
          <ModerationBadge result={safeResult} />
          <ModerationBadge result={flaggedResult} showCategories />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Safety Shield"
        description="Inline safety indicators"
      >
        <div className="flex gap-4">
          <SafetyShield status="safe" tooltip="Content is safe" />
          <SafetyShield status="warning" tooltip="Content may require review" />
          <SafetyShield status="blocked" tooltip="Content was blocked" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Moderation Details"
        description="Detailed safety analysis"
      >
        <ModerationDetails result={flaggedResult} />
      </ComponentCard>

      <ComponentCard
        title="PII Detection"
        description="Personally Identifiable Information"
      >
        <PIIDetectionDisplay
          detections={[
            { type: "email", value: "user@example.com", start: 8, end: 24, confidence: 0.99 },
            { type: "phone", value: "555-0123", start: 33, end: 41, confidence: 0.95 }
          ]}
          originalText="Contact user@example.com or call 555-0123 for support."
        />
      </ComponentCard>

      <ComponentCard
        title="Fact Check"
        description="Claim verification"
      >
        <FactCheckDisplay
          results={[
            {
              claim: "The earth is flat.",
              verdict: "refuted",
              confidence: 0.99,
              explanation: "Scientific consensus confirms Earth is an oblate spheroid.",
              sources: [{ title: "NASA Earth Science", url: "https://nasa.gov" }]
            },
            {
              claim: "Water boils at 100°C at sea level.",
              verdict: "supported",
              confidence: 0.95,
              explanation: "Standard boiling point of water at 1 atm pressure."
            }
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Safety Filters"
        description="Configure content filters"
      >
        <SafetyFiltersPanel
          filters={[
            { id: "profanity", name: "Profanity Filter", description: "Block profane language", enabled: true, sensitivity: "medium", category: "language" },
            { id: "pii", name: "Redact PII", description: "Automatically redact personal information", enabled: true, sensitivity: "high", category: "privacy" },
            { id: "competitors", name: "Block Competitor Mentions", description: "Filter out competitor references", enabled: false, sensitivity: "low", category: "business" }
          ]}
          onFilterChange={(id, enabled) => console.log("Filter change:", id, enabled)}
          onSensitivityChange={(id, sensitivity) => console.log("Sensitivity change:", id, sensitivity)}
        />
      </ComponentCard>

      <ComponentCard
        title="Content Warning"
        description="User warning banner"
      >
        <ContentWarningBanner
          type="other"
          message="This response may contain generated content that is inaccurate or misleading."
          onProceed={() => console.log("Proceed")}
          onGoBack={() => console.log("Go back")}
        />
      </ComponentCard>
    </div>
  );
}
