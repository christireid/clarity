"use client";

import * as React from "react";
import {
  SearchResultCard,
  SearchResultsList,
  WebSearch,
  AISearchSummary,
  SearchStatus,
  SearchChip,
} from "@/components/ai/web-search";
import { ComponentCard } from "./ComponentCard";

const sampleResults = [
  {
    id: "1",
    title: "React Documentation - Getting Started",
    url: "https://react.dev/learn",
    snippet: "Learn React step by step with our comprehensive guide. Start building user interfaces with components and hooks.",
    siteName: "React",
    publishedDate: new Date(Date.now() - 86400000 * 7),
    type: "web" as const,
  },
  {
    id: "2",
    title: "Understanding React Hooks - A Complete Guide",
    url: "https://example.com/react-hooks",
    snippet: "Hooks let you use state and other React features without writing a class. Learn useState, useEffect, and custom hooks.",
    siteName: "Dev Blog",
    publishedDate: new Date(Date.now() - 86400000 * 3),
    type: "web" as const,
  },
  {
    id: "3",
    title: "Building Modern Web Apps with Next.js",
    url: "https://nextjs.org/docs",
    snippet: "Next.js is a React framework that gives you building blocks to create web applications. Learn about routing, rendering, and more.",
    siteName: "Next.js",
    publishedDate: new Date(Date.now() - 86400000),
    type: "web" as const,
  },
];

export function SearchComponents() {
  const [searchResults, setSearchResults] = React.useState(sampleResults);
  const [isSearching, setIsSearching] = React.useState(false);

  return (
    <div className="space-y-8">
      <ComponentCard
        title="Web Search"
        description="Full search interface with filters"
      >
        <WebSearch
          onSearch={(query) => {
            console.log("Search:", query);
            setIsSearching(true);
            setTimeout(() => setIsSearching(false), 1500);
          }}
          results={searchResults}
          isSearching={isSearching}
          initialQuery="React hooks"
        />
      </ComponentCard>

      <ComponentCard
        title="Search Result Card"
        description="Individual search result display"
      >
        <div className="space-y-2 max-w-xl">
          <SearchResultCard
            result={sampleResults[0]}
            onSave={(id) => console.log("Save:", id)}
            onFeedback={(id, type) => console.log("Feedback:", id, type)}
          />
          <SearchResultCard
            result={sampleResults[1]}
            compact
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Search Results List"
        description="List of search results"
      >
        <div className="max-w-xl">
          <SearchResultsList
            results={sampleResults}
            onSave={(id) => console.log("Save:", id)}
            onFeedback={(id, type) => console.log("Feedback:", id, type)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="AI Search Summary"
        description="AI-generated summary with sources"
      >
        <div className="max-w-xl">
          <AISearchSummary
            query="How do React hooks work?"
            summary="React Hooks are functions that let you use state and other React features in functional components. The most commonly used hooks are useState for managing state, useEffect for handling side effects, and useContext for accessing context. Custom hooks allow you to extract component logic into reusable functions."
            sources={sampleResults}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Search Status"
        description="Search state indicators"
      >
        <div className="space-y-4">
          <SearchStatus status="idle" />
          <SearchStatus status="searching" />
          <SearchStatus status="complete" resultCount={42} />
          <SearchStatus status="error" error="Network connection failed" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Search Chips"
        description="Inline search query display"
      >
        <div className="flex flex-wrap gap-2">
          <SearchChip
            query="React hooks"
            onClick={() => console.log("Clicked")}
            onRemove={() => console.log("Removed")}
          />
          <SearchChip
            query="TypeScript generics"
            onClick={() => console.log("Clicked")}
          />
          <SearchChip
            query="Next.js routing"
            onClick={() => console.log("Clicked")}
            onRemove={() => console.log("Removed")}
          />
        </div>
      </ComponentCard>
    </div>
  );
}
