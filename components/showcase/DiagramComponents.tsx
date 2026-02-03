"use client";

import * as React from "react";
import { MermaidDiagram } from "@/components/ai/mermaid-diagram";
import { LinkPreview, RichLinkEmbed, SourceChip } from "@/components/ai/link-preview";
import { SimpleTooltip, InfoTooltip, RichTooltip, CodeTooltip, ShortcutTooltip } from "@/components/ai/rich-tooltip";
import { ComponentCard } from "./ComponentCard";
import { Button } from "@/components/ui/button";

export function DiagramComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Mermaid Diagram"
        description="Render diagrams from code"
      >
        <div className="space-y-4">
          <MermaidDiagram
            code={`graph TD
  A[Start] --> B{Is it working?}
  B -- Yes --> C[Great!]
  B -- No --> D[Debug]
  D --> B`}
          />
          <MermaidDiagram
            code={`sequenceDiagram
  participant User
  participant AI
  User->>AI: Ask question
  AI-->>User: Thinking...
  AI->>AI: Process query
  AI-->>User: Answer`}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Rich Link Embed"
        description="Embed content from URLs"
      >
        <RichLinkEmbed
          links={[
            {
              url: "https://github.com/facebook/react",
              title: "facebook/react",
              description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
              siteName: "GitHub",
              image: "https://opengraph.githubassets.com/1/facebook/react",
            },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Source Chip"
        description="Compact source citation"
      >
        <div className="flex flex-wrap gap-2">
          <SourceChip index={1} title="React Documentation" url="https://react.dev" />
          <SourceChip index={2} title="GitHub" url="https://github.com" />
          <SourceChip index={3} title="Stack Overflow" url="https://stackoverflow.com" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Tooltips"
        description="Contextual information on hover"
      >
        <div className="flex flex-wrap gap-4">
          <SimpleTooltip content="This is a simple tooltip">
            <Button variant="outline">Simple</Button>
          </SimpleTooltip>

          <InfoTooltip content="This provides additional information about a feature or setting." />

          <RichTooltip
            title="Rich Tooltip"
            description="Tooltips can contain rich content like formatted text and metadata."
            metadata={[
              { label: "Type", value: "Info" },
              { label: "Version", value: "1.0" },
            ]}
          >
            <Button variant="outline">Rich</Button>
          </RichTooltip>

          <CodeTooltip
            language="typescript"
            code="const sum = (a, b) => a + b;"
          >
            <Button variant="outline">Code</Button>
          </CodeTooltip>

          <ShortcutTooltip label="Open command palette" shortcut={["⌘", "K"]}>
            <Button variant="outline">Shortcut</Button>
          </ShortcutTooltip>
        </div>
      </ComponentCard>
    </div>
  );
}
