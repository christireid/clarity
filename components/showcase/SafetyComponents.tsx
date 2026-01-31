"use client";

import * as React from "react";
import { ModerationBadge, ModerationDetails, PIIDetectionDisplay, FactCheckDisplay, SafetyFiltersPanel, ContentWarningBanner } from "@/components/ai/guardrails";
import { ComponentCard } from "./ComponentCard";

export function SafetyComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Moderation Badge"
        description="Content safety status"
      >
        <div className="flex gap-4">
          <ModerationBadge status="safe" />
          <ModerationBadge status="warning" />
          <ModerationBadge status="flagged" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Moderation Details"
        description="Detailed safety analysis"
      >
        <ModerationDetails 
          categories={[
            { name: "Hate Speech", score: 0.01, flagged: false },
            { name: "Harassment", score: 0.05, flagged: false },
            { name: "Self-Harm", score: 0.00, flagged: false },
            { name: "Violence", score: 0.85, flagged: true }
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="PII Detection"
        description="Personally Identifiable Information"
      >
        <PIIDetectionDisplay 
          detected={[
            { type: "Email", value: "user@example.com", position: [10, 26] },
            { type: "Phone", value: "555-0123", position: [45, 53] }
          ]}
          text="Contact user@example.com or call 555-0123 for support."
        />
      </ComponentCard>

      <ComponentCard
        title="Fact Check"
        description="Claim verification"
      >
        <FactCheckDisplay 
          claim="The earth is flat."
          verdict="False"
          confidence={0.99}
          sources={["NASA", "Science Daily"]}
        />
      </ComponentCard>

      <ComponentCard
        title="Safety Filters"
        description="Configure content filters"
      >
        <SafetyFiltersPanel 
          filters={[
            { id: "profanity", label: "Profanity Filter", enabled: true },
            { id: "pii", label: "Redact PII", enabled: true },
            { id: "competitors", label: "Block Competitor Mentions", enabled: false }
          ]}
          onToggle={(id) => console.log("Toggle:", id)}
        />
      </ComponentCard>

      <ComponentCard
        title="Content Warning"
        description="User warning banner"
      >
        <ContentWarningBanner 
          message="This response may contain generated content that is inaccurate or misleading."
          onDismiss={() => {}}
        />
      </ComponentCard>
    </div>
  );
}
