"use client";

import * as React from "react";
import {
  ThumbsFeedback,
  StarRating,
  EmojiFeedback,
  DetailedFeedback,
  QuickFeedback,
  ReportIssue,
  FeedbackActions,
} from "@/components/ai/feedback";
import { ComponentCard } from "./ComponentCard";

export function FeedbackComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Thumbs Feedback"
        description="Simple thumbs up/down feedback"
      >
        <div className="flex items-center gap-8">
          <ThumbsFeedback size="sm" onFeedback={(data) => console.log("Feedback:", data)} />
          <ThumbsFeedback size="md" showLabels onFeedback={(data) => console.log("Feedback:", data)} />
          <ThumbsFeedback size="lg" onFeedback={(data) => console.log("Feedback:", data)} />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Star Rating"
        description="5-star rating system"
      >
        <div className="space-y-4">
          <StarRating size="sm" onChange={(rating) => console.log("Rating:", rating)} />
          <StarRating size="md" value={3} showValue onChange={(rating) => console.log("Rating:", rating)} />
          <StarRating size="lg" value={4} onChange={(rating) => console.log("Rating:", rating)} />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Emoji Feedback"
        description="Satisfaction scale with emojis"
      >
        <div className="space-y-4">
          <EmojiFeedback size="sm" onFeedback={(data) => console.log("Feedback:", data)} />
          <EmojiFeedback size="md" onFeedback={(data) => console.log("Feedback:", data)} />
          <EmojiFeedback size="lg" onFeedback={(data) => console.log("Feedback:", data)} />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Quick Feedback"
        description="Popover with quick feedback options"
      >
        <QuickFeedback
          onFeedback={(data) => console.log("Quick feedback:", data)}
          messageId="msg-123"
        />
      </ComponentCard>

      <ComponentCard
        title="Detailed Feedback"
        description="Dialog for detailed feedback submission"
      >
        <DetailedFeedback
          onSubmit={(data) => console.log("Detailed feedback:", data)}
          messageId="msg-123"
        />
      </ComponentCard>

      <ComponentCard
        title="Report Issue"
        description="Report problems with AI responses"
      >
        <ReportIssue
          onSubmit={(data) => console.log("Report:", data)}
          messageId="msg-123"
        />
      </ComponentCard>

      <ComponentCard
        title="Feedback Actions"
        description="Combined feedback controls for messages"
      >
        <FeedbackActions
          messageId="msg-123"
          onFeedback={(data) => console.log("Feedback:", data)}
          onReport={(data) => console.log("Report:", data)}
          showDetailed
        />
      </ComponentCard>
    </div>
  );
}
