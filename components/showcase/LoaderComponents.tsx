"use client";

import * as React from "react";
import { MessageSkeleton, CodeBlockSkeleton, ShimmerText, CardSkeleton, TableSkeleton, StreamingText, ProgressLoader } from "@/components/ai/skeletons";
import { LoadingDots, TypingCursor, PulseRing } from "@/components/ai/animations";
import { Loader, MessageLoading } from "@/components/ai/loaders";
import { RetryIndicator, OfflineQueue } from "@/components/ai/retry-logic";
import { StreamStatus, WordStream } from "@/components/ai/streaming";
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
          <MessageSkeleton />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Code Block Skeleton"
        description="Loading placeholder for code"
      >
        <CodeBlockSkeleton />
      </ComponentCard>

      <ComponentCard
        title="Shimmer Text"
        description="Animated text loading effect"
        stretch
      >
        <div className="space-y-4">
          <ShimmerText lines={2} />
          <ShimmerText lines={4} />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Loading Dots"
        description="Simple animated dots"
      >
        <div className="flex items-center gap-8">
          <LoadingDots />
          <LoadingDots size={12} />
          <LoadingDots color="hsl(var(--primary))" />
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
          text="Claude is thinking..."
          variant="dots"
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

      {/* Stream Status */}
      <ComponentCard
        title="Stream Status"
        description="Shows active streaming state"
      >
        <div className="flex items-center gap-4">
          <StreamStatus status="streaming" tokensPerSecond={45} />
          <StreamStatus status="complete" totalTokens={256} />
        </div>
      </ComponentCard>

      {/* Streaming Text */}
      <ComponentCard
        title="Streaming Text"
        description="Text appearing character by character"
      >
        <StreamingText
          text="This text appears character by character, simulating a streaming AI response..."
          isStreaming
        />
      </ComponentCard>

      {/* Retry Indicator */}
      <ComponentCard
        title="Retry Indicator"
        description="Shows retry attempts"
      >
        <RetryIndicator
          state={{
            status: "retrying",
            attempt: 2,
            maxAttempts: 3,
            nextRetryIn: 3000,
            error: new Error("Connection failed, retrying...")
          }}
          onCancel={() => console.log("Cancel retry")}
        />
      </ComponentCard>

      {/* Offline Queue */}
      <ComponentCard
        title="Offline Queue"
        description="Messages queued while offline"
      >
        <OfflineQueue
          messages={[
            { id: "1", content: "First queued message", timestamp: new Date(Date.now() - 60000), status: "queued" },
            { id: "2", content: "Second queued message", timestamp: new Date(Date.now() - 30000), status: "queued" },
          ]}
          onRetryAll={() => console.log("Retry all")}
        />
      </ComponentCard>
    </div>
  );
}
