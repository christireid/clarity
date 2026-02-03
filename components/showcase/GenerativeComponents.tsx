"use client";

import * as React from "react";
import { StreamingText, SuggestionChips, GeneratedForm, ProcessSteps, PredictiveAction, ApprovalRequest, CollapsibleOutput, QuickActions } from "@/components/ai/generative-ui";
import { ContentPartRenderer, ContentPartsList, ImageGallery as ContentGallery } from "@/components/ai/content-parts";
import { Steps, ReasoningSteps, ThoughtChain } from "@/components/ai/steps";
import { CodeGenerator, EmailGenerator, WritingGenerator, ImagePromptGenerator } from "@/components/ai/generators";
import { QuestionFlow, Question, QuestionOption } from "@/components/ai/question-flow";
import { AIPromptPanel, AIPromptMinimal } from "@/components/ai/ai-prompt-panel";
import { ComponentCard } from "./ComponentCard";
import { Copy, RefreshCw, Share2, Save } from "lucide-react";

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
            { id: "title", label: "Project Title", type: "text", required: true },
            { id: "description", label: "Description", type: "textarea" },
            { id: "type", label: "Type", type: "select", options: [{ label: "Web", value: "web" }, { label: "Mobile", value: "mobile" }, { label: "Desktop", value: "desktop" }] }
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
            { id: "1", title: "Analysis", status: "completed", description: "Analyzing requirements" },
            { id: "2", title: "Design", status: "in-progress", description: "Generating component structure" },
            { id: "3", title: "Implementation", status: "pending", description: "Writing code" }
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
          onAccept={() => console.log("Accepted")}
          onReject={() => console.log("Rejected")}
        />
      </ComponentCard>

      <ComponentCard
        title="Approval Request"
        description="Human-in-the-loop verification"
      >
        <ApprovalRequest
          title="Deploy to Production"
          description="Ready to deploy version 1.2.0 to production environment."
          details={[
            { label: "Updated API endpoints", value: "3 files" },
            { label: "Fixed login bug", value: "auth.ts" },
            { label: "Improved performance", value: "20% faster" }
          ]}
          onApprove={() => console.log("Approved")}
          onDeny={() => console.log("Denied")}
        />
      </ComponentCard>

      <ComponentCard
        title="Collapsible Output"
        description="Hiding verbose content"
      >
        <CollapsibleOutput
          title="Analysis Logs"
          badge="3 issues"
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
            { id: "copy", label: "Copy", icon: <Copy className="h-4 w-4" /> },
            { id: "refresh", label: "Regenerate", icon: <RefreshCw className="h-4 w-4" /> },
            { id: "share", label: "Share", icon: <Share2 className="h-4 w-4" /> },
            { id: "save", label: "Save", icon: <Save className="h-4 w-4" /> }
          ]}
          onSelect={(action) => console.log("Selected:", action.label)}
        />
      </ComponentCard>

      {/* Content Parts */}
      <ComponentCard
        title="Content Parts"
        description="Render different content types"
      >
        <div className="space-y-4">
          <ContentPartRenderer
            part={{
              id: "text-1",
              type: "text",
              text: "This is a text content part with **markdown** support."
            }}
          />
          <ContentPartRenderer
            part={{
              id: "code-1",
              type: "code",
              language: "typescript",
              code: `function hello() {\n  console.log("Hello!");\n}`
            }}
          />
          <ContentPartRenderer
            part={{
              id: "image-1",
              type: "image",
              url: "https://picsum.photos/400/200",
              alt: "Sample image"
            }}
          />
        </div>
      </ComponentCard>

      {/* Steps Component */}
      <ComponentCard
        title="Steps Indicator"
        description="Multi-step process visualization"
      >
        <Steps
          items={[
            { key: "1", title: "Setup", status: "complete" },
            { key: "2", title: "Configure", status: "active" },
            { key: "3", title: "Deploy", status: "pending" },
          ]}
          current={1}
        />
      </ComponentCard>

      <ComponentCard
        title="Reasoning Steps"
        description="AI thinking process"
      >
        <ReasoningSteps
          steps={[
            { key: "1", title: "Analyzing the user's request", status: "complete" },
            { key: "2", title: "Gathering relevant context", status: "complete" },
            { key: "3", title: "Formulating response", status: "active" },
            { key: "4", title: "Validating output", status: "pending" },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="Thought Chain"
        description="Chain of thought visualization"
      >
        <ThoughtChain
          items={[
            { key: "1", title: "Observation", description: "The user is asking about React hooks" },
            { key: "2", title: "Reasoning", description: "Hooks allow state in functional components" },
            { key: "3", title: "Plan", description: "I should explain useState and useEffect first" },
            { key: "4", title: "Action", description: "Provide a practical example" },
          ]}
        />
      </ComponentCard>

      {/* Generators */}
      <ComponentCard
        title="Code Generator"
        description="AI-powered code generation"
      >
        <CodeGenerator
          onGenerate={async (prompt, options) => {
            console.log("Generate code:", prompt, options);
            return `// Generated code for: ${prompt}`;
          }}
        />
      </ComponentCard>

      <ComponentCard
        title="Email Generator"
        description="AI-powered email composition"
      >
        <EmailGenerator
          onGenerate={async (params) => {
            console.log("Generate email:", params);
            return `Generated email for: ${params.purpose}`;
          }}
        />
      </ComponentCard>

      <ComponentCard
        title="Writing Generator"
        description="AI-powered content writing"
      >
        <WritingGenerator
          onGenerate={async (params) => {
            console.log("Generate writing:", params);
            return `Generated content for: ${params.topic}`;
          }}
        />
      </ComponentCard>

      {/* Question Flow */}
      <ComponentCard
        title="Question Flow"
        description="Interactive question wizard"
      >
        <QuestionFlow
          questions={[
            {
              id: "1",
              question: "What type of project are you building?",
              type: "single-choice",
              options: [
                { value: "web", label: "Web Application" },
                { value: "mobile", label: "Mobile App" },
                { value: "api", label: "API Service" },
              ],
            },
            {
              id: "2",
              question: "Which framework do you prefer?",
              type: "single-choice",
              options: [
                { value: "react", label: "React" },
                { value: "vue", label: "Vue" },
                { value: "angular", label: "Angular" },
              ],
            },
          ]}
          onComplete={(answers) => console.log("Answers:", answers)}
        />
      </ComponentCard>

      {/* AI Prompt Panel */}
      <ComponentCard
        title="AI Prompt Panel"
        description="Full-featured prompt interface"
      >
        <div className="h-[300px] border rounded-lg overflow-hidden">
          <AIPromptPanel
            onSubmit={(prompt) => console.log("Submit:", prompt)}
            placeholder="Ask me anything..."
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="AI Prompt Minimal"
        description="Compact prompt input"
      >
        <AIPromptMinimal
          onSubmit={(prompt) => console.log("Submit:", prompt)}
          placeholder="Quick question..."
        />
      </ComponentCard>
    </div>
  );
}
