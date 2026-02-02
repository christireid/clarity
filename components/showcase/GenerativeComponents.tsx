"use client";

import * as React from "react";
import { StreamingText, SuggestionChips, GeneratedForm, ProcessSteps, PredictiveAction, ApprovalRequest, CollapsibleOutput, QuickActions } from "@/components/ai/generative-ui";
import { ContentPartRenderer, ContentPartsList, ImageGallery as ContentGallery } from "@/components/ai/content-parts";
import { Steps, ReasoningSteps, ThoughtChain } from "@/components/ai/steps";
import { CodeGenerator, EmailGenerator, WritingGenerator, ImagePromptGenerator } from "@/components/ai/generators";
import { QuestionFlow, Question, QuestionOption } from "@/components/ai/question-flow";
import { AIPromptPanel, PromptInput, PromptHistory } from "@/components/ai/ai-prompt-panel";
import { ComponentCard } from "./ComponentCard";

export function GenerativeComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Streaming Text"
        description="Typewriter effect for AI responses"
      >
        <StreamingText 
          text="This text is being streamed character by character to simulate an AI generating a response in real-time."
          speed={30}
        />
      </ComponentCard>

      <ComponentCard
        title="Suggestion Chips"
        description="Quick follow-up actions"
      >
        <SuggestionChips 
          suggestions={[
            "Tell me more",
            "Give an example",
            "Explain the code",
            "Refactor this"
          ]}
          onSelect={(s) => console.log(s)}
        />
      </ComponentCard>

      <ComponentCard
        title="Generated Form"
        description="AI-generated input form"
      >
        <GeneratedForm 
          fields={[
            { name: "title", label: "Project Title", type: "text", required: true },
            { name: "description", label: "Description", type: "textarea" },
            { name: "type", label: "Type", type: "select", options: ["Web", "Mobile", "Desktop"] }
          ]}
          onSubmit={(data) => console.log(data)}
        />
      </ComponentCard>

      <ComponentCard
        title="Process Steps"
        description="Visualizing multi-step processes"
      >
        <ProcessSteps 
          steps={[
            { title: "Analysis", status: "completed", description: "Analyzing requirements" },
            { title: "Design", status: "active", description: "Generating component structure" },
            { title: "Implementation", status: "pending", description: "Writing code" }
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Predictive Action"
        description="Anticipating user needs"
      >
        <PredictiveAction 
          title="Create Unit Tests?"
          description="I noticed you just wrote a new component. Would you like me to generate tests for it?"
          confidence={0.85}
          onConfirm={() => console.log("Confirmed")}
          onDismiss={() => console.log("Dismissed")}
        />
      </ComponentCard>

      <ComponentCard
        title="Approval Request"
        description="Human-in-the-loop verification"
      >
        <ApprovalRequest 
          title="Deploy to Production"
          description="Ready to deploy version 1.2.0 to production environment."
          changes={[
            "Updated API endpoints",
            "Fixed login bug",
            "Improved performance"
          ]}
          onApprove={() => console.log("Approved")}
          onReject={() => console.log("Rejected")}
        />
      </ComponentCard>

      <ComponentCard
        title="Collapsible Output"
        description="Hiding verbose content"
      >
        <CollapsibleOutput 
          title="Analysis Logs"
          preview="Found 3 potential issues in the codebase..."
        >
          <div className="p-4 bg-muted rounded-md font-mono text-xs">
            [INFO] Scanning src/components...
            [WARN] Unused variable in Button.tsx
            [WARN] Missing prop type in Card.tsx
            [INFO] Scan complete. 3 files analyzed.
          </div>
        </CollapsibleOutput>
      </ComponentCard>

      <ComponentCard
        title="Quick Actions"
        description="Context-aware shortcuts"
      >
        <QuickActions
          actions={[
            { icon: "copy", label: "Copy", onClick: () => {} },
            { icon: "refresh", label: "Regenerate", onClick: () => {} },
            { icon: "share", label: "Share", onClick: () => {} },
            { icon: "save", label: "Save", onClick: () => {} }
          ]}
        />
      </ComponentCard>

      {/* Content Parts */}
      <ComponentCard
        title="Content Parts"
        description="Render different content types"
      >
        <div className="space-y-4">
          <TextPart content="This is a text content part with **markdown** support." />
          <CodePart language="typescript" code={`function hello() {\n  console.log("Hello!");\n}`} />
          <FilePart name="document.pdf" size="2.4 MB" type="application/pdf" />
          <ToolResultPart
            tool="web_search"
            result={{ found: 5, query: "React hooks" }}
            status="success"
          />
        </div>
      </ComponentCard>

      {/* Steps Component */}
      <ComponentCard
        title="Steps Indicator"
        description="Multi-step process visualization"
      >
        <Steps current={2}>
          <Step title="Setup" description="Configure your environment" />
          <Step title="Install" description="Install dependencies" />
          <Step title="Build" description="Build your project" />
          <Step title="Deploy" description="Deploy to production" />
        </Steps>
      </ComponentCard>

      {/* Question Flow */}
      <ComponentCard
        title="Question Flow"
        description="Interactive questionnaire"
      >
        <QuestionFlow
          questions={[
            {
              id: "1",
              text: "What type of project are you building?",
              options: [
                { label: "Web Application", value: "web" },
                { label: "Mobile App", value: "mobile" },
                { label: "API/Backend", value: "api" },
              ],
            },
          ]}
          currentQuestion={0}
          onAnswer={(q, a) => console.log("Answer:", q, a)}
          onComplete={(answers) => console.log("Complete:", answers)}
        />
      </ComponentCard>

      {/* AI Prompt Panel */}
      <ComponentCard
        title="AI Prompt Panel"
        description="Dedicated prompt interface"
      >
        <AIPromptPanel
          placeholder="Describe what you want to create..."
          suggestions={[
            "Generate a landing page",
            "Create a dashboard",
            "Build an API endpoint",
          ]}
          onSubmit={(prompt) => console.log("Prompt:", prompt)}
          showHistory
        />
      </ComponentCard>

      {/* Text Generator */}
      <ComponentCard
        title="Text Generator"
        description="Generate text content"
      >
        <TextGenerator
          placeholder="Enter a topic or prompt..."
          modes={["creative", "professional", "casual"]}
          onGenerate={(prompt, mode) => console.log("Generate:", prompt, mode)}
          isGenerating={false}
        />
      </ComponentCard>

      {/* Code Generator */}
      <ComponentCard
        title="Code Generator"
        description="Generate code snippets"
      >
        <CodeGenerator
          languages={["typescript", "python", "rust", "go"]}
          onGenerate={(prompt, language) => console.log("Generate code:", prompt, language)}
          isGenerating={false}
        />
      </ComponentCard>
    </div>
  );
}
