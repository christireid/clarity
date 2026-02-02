"use client";

import * as React from "react";
import { ChatGPTClone, ClaudeClone, PerplexityClone } from "@/components/ai/chat-clones";
import { ManusChat, EmergentChat, LoveableChat } from "@/components/ai/chat-clones-extended";
import { TwitterPost, LinkedInPost, RedditPost } from "@/components/ai/social-posts";
import { V0Clone, V0ArtifactCard, V0GenerationStatus } from "@/components/ai/v0-clone";
import { ComponentCard } from "./ComponentCard";

// Consolidated Platform Clones - each with distinct UX patterns
export function CloneComponents() {
  const sampleMessages = [
    { id: "1", role: "user" as const, content: "What is the best way to learn programming?" },
    { id: "2", role: "assistant" as const, content: "Learning programming effectively involves several key strategies:\n\n1. **Start with fundamentals** - Choose a beginner-friendly language like Python or JavaScript\n2. **Practice daily** - Consistency is more important than long sessions\n3. **Build projects** - Apply what you learn to real problems\n4. **Read other's code** - Learn from open source projects\n5. **Join communities** - Engage with other developers" },
    { id: "3", role: "user" as const, content: "Can you give me a simple Python example?" },
  ];

  return (
    <div className="space-y-8">
      {/* Sidebar Navigation Pattern */}
      <ComponentCard
        title="ChatGPT Clone"
        description="Sidebar navigation with conversation history"
      >
        <div className="h-[500px] border border-border rounded-lg overflow-hidden">
          <ChatGPTClone
            messages={sampleMessages}
            onSendMessage={(msg) => console.log("Send:", msg)}
          />
        </div>
      </ComponentCard>

      {/* Minimal Clean Design Pattern */}
      <ComponentCard
        title="Claude Clone"
        description="Minimal clean interface with model selector"
      >
        <div className="h-[500px] border border-border rounded-lg overflow-hidden">
          <ClaudeClone
            messages={sampleMessages}
            onSendMessage={(msg) => console.log("Send:", msg)}
          />
        </div>
      </ComponentCard>

      {/* Search + Sources Pattern */}
      <ComponentCard
        title="Perplexity Clone"
        description="Search-focused with inline sources and focus modes"
      >
        <div className="h-[500px] border border-border rounded-lg overflow-hidden">
          <PerplexityClone
            messages={[
              ...sampleMessages,
              {
                id: "4",
                role: "assistant" as const,
                content: "Here's a simple Python example that demonstrates basic concepts:",
                sources: [
                  { title: "Python Documentation", url: "https://docs.python.org" },
                  { title: "Real Python", url: "https://realpython.com" },
                ],
              },
            ]}
            onSendMessage={(msg) => console.log("Send:", msg)}
          />
        </div>
      </ComponentCard>

      {/* Developer Tools Pattern */}
      <ComponentCard
        title="Manus Chat"
        description="Developer-focused with slash commands"
      >
        <ManusChat className="h-[600px]" />
      </ComponentCard>

      {/* Agent/Tool Display Pattern */}
      <ComponentCard
        title="Emergent Chat"
        description="Agent-focused with tool metadata display"
      >
        <EmergentChat className="h-[600px]" />
      </ComponentCard>

      {/* Creative/Emotional Pattern */}
      <ComponentCard
        title="Loveable Chat"
        description="Friendly creative interface with reactions"
      >
        <LoveableChat className="h-[600px]" />
      </ComponentCard>

      {/* Social Media Clones */}
      <ComponentCard
        title="Twitter/X Post"
        description="Social post with engagement actions"
      >
        <div className="max-w-xl mx-auto border rounded-lg overflow-hidden">
          <TwitterPost
            author={{
              name: "AI Developer",
              handle: "aidev",
              verified: true,
            }}
            content="Just shipped a new feature using AI-assisted coding! 🚀 The future of development is here. What tools are you using to boost your productivity?"
            timestamp={new Date(Date.now() - 3600000)}
            stats={{
              replies: 42,
              retweets: 156,
              likes: 892,
              views: 15400,
            }}
            onLike={() => console.log("Liked")}
            onRetweet={() => console.log("Retweeted")}
            onReply={() => console.log("Reply")}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="LinkedIn Post"
        description="Professional network post format"
      >
        <div className="max-w-xl mx-auto">
          <LinkedInPost
            author={{
              name: "Sarah Johnson",
              title: "VP of Engineering at TechCorp",
              connection: "2nd",
            }}
            content="Excited to share that our team has successfully implemented AI-powered code review! 🎉\n\nKey learnings from this journey:\n\n1. Start small - pilot with one team first\n2. Focus on developer experience\n3. Measure impact with real metrics\n4. Iterate based on feedback\n\nThe results: 40% faster reviews, 25% fewer bugs in production.\n\nWhat's your experience with AI in the development workflow?"
            timestamp={new Date(Date.now() - 7200000)}
            stats={{
              reactions: 234,
              comments: 45,
              reposts: 12,
            }}
            reactions={[
              { type: "👍", count: 180 },
              { type: "🎉", count: 42 },
              { type: "💡", count: 12 },
            ]}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Reddit Post"
        description="Community discussion format"
      >
        <div className="max-w-xl mx-auto">
          <RedditPost
            subreddit="programming"
            author="curious_dev"
            title="What's the best approach for implementing AI chat in a React app?"
            content="I'm building a chat application and want to add AI capabilities. Looking for recommendations on libraries, best practices, and architecture patterns. Has anyone here implemented something similar?"
            timestamp={new Date(Date.now() - 14400000)}
            stats={{
              upvotes: 342,
              comments: 89,
              awards: ["🥇", "💡"],
            }}
            flair="Discussion"
          />
        </div>
      </ComponentCard>

      {/* v0 Clone - Code Generation Interface */}
      <ComponentCard
        title="v0 Clone"
        description="AI-powered component generation interface"
      >
        <div className="h-[600px] border border-border rounded-lg overflow-hidden">
          <V0Clone
            onGenerate={(prompt) => console.log("Generate:", prompt)}
            generatedCode={`export function Button({ children }) {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      {children}
    </button>
  );
}`}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="v0 Artifact Card"
        description="Generated component preview card"
      >
        <div className="max-w-md">
          <V0ArtifactCard
            title="Button Component"
            description="A customizable button with hover states"
            code={`<Button variant="primary">Click me</Button>`}
            preview="https://picsum.photos/400/200"
            onCopy={() => console.log("Copied")}
            onEdit={() => console.log("Edit")}
            onFork={() => console.log("Fork")}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="v0 Generation Status"
        description="Progress indicator for code generation"
      >
        <div className="space-y-4 max-w-md">
          <V0GenerationStatus status="generating" progress={45} message="Generating component..." />
          <V0GenerationStatus status="complete" progress={100} message="Component ready!" />
          <V0GenerationStatus status="error" message="Generation failed. Please try again." />
        </div>
      </ComponentCard>
    </div>
  );
}
