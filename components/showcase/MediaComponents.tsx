"use client";

import * as React from "react";
import { SourcesList, WebSearchResults, LinkPreview } from "@/components/ai/sources";
import { AudioPlayer, MicrophoneInput, ImageGallery } from "@/components/ai/media";
import { ComponentCard } from "./ComponentCard";

export function MediaComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Sources List"
        description="Display search results and sources"
      >
        <SourcesList
          sources={[
            { id: "1", title: "React Documentation", url: "https://react.dev", description: "Official React documentation", favicon: "https://react.dev/favicon.ico" },
            { id: "2", title: "Next.js Guide", url: "https://nextjs.org", description: "The React Framework for the Web" },
            { id: "3", title: "TypeScript Handbook", url: "https://typescriptlang.org", description: "Learn TypeScript from the ground up" },
          ]}
          onSourceClick={(source) => console.log("Clicked:", source)}
        />
      </ComponentCard>

      <ComponentCard
        title="Web Search Results"
        description="Display web search results"
      >
        <WebSearchResults
          query="React best practices"
          results={[
            { id: "1", title: "React Best Practices 2024", url: "https://example.com/react", snippet: "Learn the latest React patterns and best practices for building modern applications..." },
            { id: "2", title: "Clean Code in React", url: "https://example.com/clean", snippet: "Discover how to write maintainable and scalable React code..." },
          ]}
          isLoading={false}
        />
      </ComponentCard>

      <ComponentCard
        title="Link Preview"
        description="Rich link previews"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <LinkPreview
            url="https://github.com"
            title="GitHub"
            description="Where the world builds software"
            image="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          />
          <LinkPreview
            url="https://vercel.com"
            title="Vercel"
            description="Develop. Preview. Ship."
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Audio Player"
        description="Music-style audio playback"
      >
        <AudioPlayer
          src="https://example.com/audio.mp3"
          title="Sample Track"
          artist="AI Generated"
          coverArt="https://via.placeholder.com/300"
        />
      </ComponentCard>

      <ComponentCard
        title="Microphone Input"
        description="Voice input with visualization"
      >
        <MicrophoneInput
          onTranscript={(text) => console.log("Transcript:", text)}
          onRecordingStart={() => console.log("Recording started")}
          onRecordingStop={() => console.log("Recording stopped")}
        />
      </ComponentCard>

      <ComponentCard
        title="Image Gallery"
        description="Display image collections"
      >
        <ImageGallery
          images={[
            { id: "1", src: "https://picsum.photos/400/300?1", alt: "Image 1", caption: "Generated image 1" },
            { id: "2", src: "https://picsum.photos/400/300?2", alt: "Image 2", caption: "Generated image 2" },
            { id: "3", src: "https://picsum.photos/400/300?3", alt: "Image 3", caption: "Generated image 3" },
            { id: "4", src: "https://picsum.photos/400/300?4", alt: "Image 4", caption: "Generated image 4" },
          ]}
          onImageClick={(image) => console.log("Clicked:", image)}
        />
      </ComponentCard>
    </div>
  );
}
