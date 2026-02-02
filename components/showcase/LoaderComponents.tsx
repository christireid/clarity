"use client";

import * as React from "react";
import { MessageSkeleton, CodeBlockSkeleton, ShimmerText, CardSkeleton, TableSkeleton } from "@/components/ai/skeletons";
import { LoadingDots, TypingCursor, PulseRing } from "@/components/ai/animations";
import { Loader, MessageLoading, ProgressLoader, StreamingLoader } from "@/components/ai/loaders";
import { RetryLogic, RetryIndicator, OfflineQueue } from "@/components/ai/retry-logic";
import { StreamingText, StreamingIndicator } from "@/components/ai/streaming";
import { ComponentCard } from "./ComponentCard";

export function LoaderComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Message Skeleton"
        description="Loading placeholder for messages"
      >
        <div className="space-y-4">
          <MessageSkeleton />
          <MessageSkeleton variant="assistant" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Code Block Skeleton"
        description="Loading placeholder for code"
      >
        <CodeBlockSkeleton lines={8} />
      </ComponentCard>

      <ComponentCard
        title="Shimmer Text"
        description="Animated text loading effect"
      >
        <div className="space-y-4">
          <ShimmerText text="Generating response..." />
          <ShimmerText text="Analyzing your query and preparing a detailed answer..." />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Loading Dots"
        description="Simple animated dots"
      >
        <div className="flex items-center gap-8">
          <LoadingDots />
          <LoadingDots size="lg" />
          <LoadingDots color="accent" />
        </div>
      </ComponentCard>

      {/* Loader Variants */}
      <ComponentCard
        title="Loader Variants"
        description="Different loading spinner styles"
      >
        <div className="flex items-center gap-8">
          <Loader variant="spinner" size="sm" />
          <Loader variant="spinner" size="md" />
          <Loader variant="dots" size="md" />
          <Loader variant="pulse" size="md" />
        </div>
      </ComponentCard>

      {/* Message Loading */}
      <ComponentCard
        title="Message Loading"
        description="AI is generating response"
      >
        <MessageLoading
          label="Claude is thinking..."
          showDots
        />
      </ComponentCard>

      {/* Progress Loader */}
      <ComponentCard
        title="Progress Loader"
        description="Loading with progress indication"
      >
        <div className="space-y-4">
          <ProgressLoader progress={30} label="Uploading file..." />
          <ProgressLoader progress={65} label="Processing data..." />
          <ProgressLoader progress={90} label="Almost done..." />
        </div>
      </ComponentCard>

      {/* Typing Cursor */}
      <ComponentCard
        title="Typing Cursor"
        description="Blinking cursor animation"
      >
        <div className="flex items-center gap-2 text-lg">
          <span>Generating response</span>
          <TypingCursor />
        </div>
      </ComponentCard>

      {/* Card Skeleton */}
      <ComponentCard
        title="Card Skeleton"
        description="Loading placeholder for cards"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </ComponentCard>

      {/* Table Skeleton */}
      <ComponentCard
        title="Table Skeleton"
        description="Loading placeholder for tables"
      >
        <TableSkeleton rows={4} columns={4} />
      </ComponentCard>

      {/* Streaming Indicator */}
      <ComponentCard
        title="Streaming Indicator"
        description="Shows active streaming state"
      >
        <div className="flex items-center gap-4">
          <StreamingIndicator active label="Receiving data..." />
          <StreamingIndicator active={false} label="Complete" />
        </div>
      </ComponentCard>

      {/* Streaming Text */}
      <ComponentCard
        title="Streaming Text"
        description="Text appearing character by character"
      >
        <StreamingText
          text="This text appears character by character, simulating a streaming AI response..."
          speed={30}
        />
      </ComponentCard>

      {/* Retry Indicator */}
      <ComponentCard
        title="Retry Indicator"
        description="Shows retry attempts"
      >
        <RetryIndicator
          attempt={2}
          maxAttempts={3}
          message="Connection failed, retrying..."
          onCancel={() => console.log("Cancel retry")}
        />
      </ComponentCard>

      {/* Offline Queue */}
      <ComponentCard
        title="Offline Queue"
        description="Messages queued while offline"
      >
        <OfflineQueue
          items={[
            { id: "1", message: "First queued message", timestamp: new Date(Date.now() - 60000) },
            { id: "2", message: "Second queued message", timestamp: new Date(Date.now() - 30000) },
          ]}
          onRetry={() => console.log("Retry all")}
          onClear={() => console.log("Clear queue")}
        />
      </ComponentCard>
    </div>
  );
}
