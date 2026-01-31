"use client";

import * as React from "react";
import { MessageSkeleton, CodeBlockSkeleton, ShimmerText } from "@/components/ai/skeletons";
import { LoadingDots } from "@/components/ai/animations";
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
    </div>
  );
}
