"use client";

import * as React from "react";
import { SourcesList, WebSearchResults, LinkPreview } from "@/components/ai/sources";
import { AudioPlayer, MicrophoneInput, ImageGallery } from "@/components/ai/media";
import { DownloadButton, DownloadCard, DownloadManager } from "@/components/ai/download";
import { ShareButton, ShareCard, QRCodeShare, EmbedCode } from "@/components/ai/share";
import { ImageGenerationCard, ImageGenerationPreview, ImageGenerationGrid, ImagePromptInput } from "@/components/ai/image-generation";
import { FileAttachmentCard, FileList, FileIcon } from "@/components/ai/file-viewer";
import { FilePreview } from "@/components/ai/rich-embeds";
import { Attachments } from "@/components/ai/attachments";
import { URLPreview, TweetEmbed, YouTubeEmbed, GitHubRepoEmbed } from "@/components/ai/rich-embeds";
import { Carousel, ItemCarousel, HeroCarousel } from "@/components/ai/carousel";
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
            { id: "1", title: "React Documentation", url: "https://react.dev", snippet: "Official React documentation", favicon: "https://react.dev/favicon.ico" },
            { id: "2", title: "Next.js Guide", url: "https://nextjs.org", snippet: "The React Framework for the Web" },
            { id: "3", title: "TypeScript Handbook", url: "https://typescriptlang.org", snippet: "Learn TypeScript from the ground up" },
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
          isSearching={false}
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
          track={{
            id: "1",
            title: "Sample Track",
            artist: "AI Generated",
            audioUrl: "https://example.com/audio.mp3",
            duration: 180,
            coverUrl: "https://via.placeholder.com/300"
          }}
        />
      </ComponentCard>

      <ComponentCard
        title="Microphone Input"
        description="Voice input with visualization"
      >
        <MicrophoneInput
          onTranscript={(text) => console.log("Transcript:", text)}
          onStart={() => console.log("Recording started")}
          onStop={() => console.log("Recording stopped")}
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

      {/* Download Components */}
      <ComponentCard
        title="Download Button"
        description="Download files with progress"
      >
        <div className="flex gap-4">
          <DownloadButton
            url="/api/download/file.pdf"
            filename="document.pdf"
            label="Download PDF"
          />
          <DownloadButton
            url="/api/download/data.json"
            filename="data.json"
            label="Export JSON"
            variant="outline"
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Download Card"
        description="File download with metadata"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <DownloadCard
            item={{
              id: "1",
              name: "project-report.pdf",
              url: "/downloads/report.pdf",
              size: 2457600,
              type: "application/pdf",
              status: "completed",
              progress: 100
            }}
          />
          <DownloadCard
            item={{
              id: "2",
              name: "dataset.csv",
              url: "/downloads/data.csv",
              size: 16567296,
              type: "text/csv",
              status: "downloading",
              progress: 45
            }}
          />
        </div>
      </ComponentCard>

      {/* Share Components */}
      <ComponentCard
        title="Share Button"
        description="Share content with others"
      >
        <ShareButton
          url="https://example.com/shared/abc123"
          title="Check out this conversation"
          onShare={(platform) => console.log("Shared to:", platform)}
        />
      </ComponentCard>

      <ComponentCard
        title="Share Card"
        description="Full share card with options"
      >
        <ShareCard
          url="https://example.com/conversation/123"
          title="AI Chat Conversation"
        />
      </ComponentCard>

      <ComponentCard
        title="Embed Code"
        description="Copy embed code for websites"
      >
        <EmbedCode
          url="https://example.com/embed/123"
          width={600}
          height={400}
        />
      </ComponentCard>

      {/* Image Generation */}
      <ComponentCard
        title="Image Prompt Input"
        description="AI image generation interface"
      >
        <ImagePromptInput
          value=""
          onChange={(value) => console.log("Value:", value)}
          onGenerate={() => console.log("Generate")}
        />
      </ComponentCard>

      <ComponentCard
        title="Image Generation Card"
        description="Display generated images"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ImageGenerationCard
            image={{
              id: "1",
              url: "https://picsum.photos/400/400?10",
              prompt: "A futuristic city at sunset",
              model: "DALL-E 3",
              createdAt: new Date(),
              width: 1024,
              height: 1024,
              status: "complete"
            }}
            onDownload={() => console.log("Download")}
          />
        </div>
      </ComponentCard>

      {/* File Preview */}
      <ComponentCard
        title="File Preview"
        description="Preview different file types"
      >
        <div className="h-[300px] border rounded-lg overflow-hidden">
          <FilePreview
            name="example.ts"
            type="code"
            size="1 KB"
            url="/files/example.ts"
          />
        </div>
      </ComponentCard>

      {/* Attachments */}
      <ComponentCard
        title="Attachments"
        description="Display message attachments"
      >
        <Attachments
          files={[
            { id: "1", name: "document.pdf", size: 1024000, type: "application/pdf" },
            { id: "2", name: "image.png", size: 512000, type: "image/png", preview: "https://picsum.photos/100/100" },
            { id: "3", name: "data.json", size: 2048, type: "application/json" },
          ]}
          onRemove={(id) => console.log("Remove:", id)}
          onPreview={(file) => console.log("Preview:", file)}
        />
      </ComponentCard>

      {/* Rich Embeds */}
      <ComponentCard
        title="Rich Embeds"
        description="Embed external content"
      >
        <div className="space-y-4">
          <URLPreview
            url="https://youtube.com/watch?v=example"
            title="Introduction to AI"
            description="Learn the basics of artificial intelligence"
          />
          <GitHubRepoEmbed
            owner="vercel"
            repo="next.js"
          />
        </div>
      </ComponentCard>

      {/* Carousel */}
      <ComponentCard
        title="Media Carousel"
        description="Swipeable media carousel"
      >
        <Carousel>
          {[
            <img key="1" src="https://picsum.photos/600/300?20" alt="Slide 1" className="rounded-lg" />,
            <img key="2" src="https://picsum.photos/600/300?21" alt="Slide 2" className="rounded-lg" />,
            <img key="3" src="https://picsum.photos/600/300?22" alt="Slide 3" className="rounded-lg" />
          ]}
        </Carousel>
      </ComponentCard>
    </div>
  );
}
