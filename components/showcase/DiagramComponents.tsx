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
            chart={`graph TD
  A[Start] --> B{Is it working?}
  B -- Yes --> C[Great!]
  B -- No --> D[Debug]
  D --> B`}
          />
          <MermaidDiagram
            chart={`sequenceDiagram
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
          url="https://github.com/facebook/react"
          title="facebook/react"
          description="A declarative, efficient, and flexible JavaScript library for building user interfaces."
          siteName="GitHub"
          image="https://opengraph.githubassets.com/1/facebook/react"
        />
      </ComponentCard>

      <ComponentCard
        title="Source Chip"
        description="Compact source citation"
      >
        <div className="flex flex-wrap gap-2">
          <SourceChip index={1} domain="react.dev" url="https://react.dev" />
          <SourceChip index={2} domain="github.com" url="https://github.com" />
          <SourceChip index={3} domain="stackoverflow.com" url="https://stackoverflow.com" />
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
          
          <InfoTooltip content="This provides additional information about a feature or setting.">
            <Button variant="outline">Info</Button>
          </InfoTooltip>
          
          <RichTooltip 
            title="Rich Tooltip" 
            content="Tooltips can contain rich content like bold text, lists, and more."
            footer="Click to learn more"
          >
            <Button variant="outline">Rich</Button>
          </RichTooltip>
          
          <CodeTooltip 
            language="typescript" 
            code="const sum = (a, b) => a + b;"
          >
            <Button variant="outline">Code</Button>
          </CodeTooltip>
          
          <ShortcutTooltip shortcut={["⌘", "K"]} description="Open command palette">
            <Button variant="outline">Shortcut</Button>
          </ShortcutTooltip>
        </div>
      </ComponentCard>
    </div>
  );
}
