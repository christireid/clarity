"use client";

import * as React from "react";
import { CodeBlock } from "@/components/ai/code-block";
import { Sandbox } from "@/components/ai/sandbox";
import { CodeDiff } from "@/components/ai/code-diff";
import { Terminal as TerminalComponent } from "@/components/ai/terminal";
import { FileTree } from "@/components/ai/file-tree";
import { WebPreview } from "@/components/ai/web-preview";
import { CodeEditor, MultiFileEditor, InlineEditor } from "@/components/ai/code-editor";
import { MDXHeading1, MDXHeading2, MDXParagraph, MDXBlockquote, MDXCodeBlock, MDXCallout, MDXTabs, MDXAccordion, MDXCard, MDXCardGrid, MDXSteps, MDXStep, MDXComponents } from "@/components/ai/mdx";
import { ComponentCard } from "./ComponentCard";

export function CodeComponents() {
  const sampleCode = `import React from 'react';

function Button({ children, variant = 'primary' }) {
  return (
    <button className={\`btn btn-\${variant}\`}>
      {children}
    </button>
  );
}

export default Button;`;

  const oldCode = `function greet(name) {
  console.log("Hello " + name);
}`;

  const newCode = `function greet(name: string): void {
  console.log(\`Hello, \${name}!\`);
}`;

  return (
    <div className="space-y-8">
      <ComponentCard
        title="Code Block"
        description="Syntax highlighted code with actions"
      >
        <CodeBlock
          code={sampleCode}
          language="tsx"
          filename="Button.tsx"
          showLineNumbers
          highlightLines={[4, 5, 6]}
          onCopy={() => console.log("Copied")}
        />
      </ComponentCard>

      <ComponentCard
        title="Sandbox"
        description="Code execution with output"
      >
        <Sandbox
          title="React Component"
          status="success"
          files={[
            { name: "App.tsx", content: sampleCode, language: "tsx" },
            { name: "styles.css", content: ".btn { padding: 8px 16px; }", language: "css" },
          ]}
          output="Component rendered successfully"
        />
      </ComponentCard>

      <ComponentCard
        title="Code Diff"
        description="Side-by-side and unified diff views"
      >
        <CodeDiff
          oldCode={oldCode}
          newCode={newCode}
          language="typescript"
          oldTitle="Before"
          newTitle="After"
        />
      </ComponentCard>

      <ComponentCard
        title="Terminal"
        description="Interactive terminal component"
      >
        <TerminalComponent
          lines={[
            { type: "input", content: "npm install @ai-chat/components" },
            { type: "output", content: "Installing dependencies..." },
            { type: "success", content: "Successfully installed 42 packages" },
            { type: "input", content: "npm run dev" },
            { type: "output", content: "Starting development server..." },
            { type: "info", content: "Ready on http://localhost:3000" },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="File Tree"
        description="Navigable file structure"
      >
        <FileTree
          files={[
            {
              id: "1",
              name: "src",
              type: "directory",
              children: [
                { id: "2", name: "components", type: "directory", children: [
                  { id: "3", name: "Button.tsx", type: "file" },
                  { id: "4", name: "Card.tsx", type: "file" },
                ]},
                { id: "5", name: "App.tsx", type: "file" },
                { id: "6", name: "index.tsx", type: "file" },
              ],
            },
            { id: "7", name: "package.json", type: "file" },
            { id: "8", name: "tsconfig.json", type: "file" },
          ]}
          onSelect={(file) => console.log("Selected:", file)}
        />
      </ComponentCard>

      <ComponentCard
        title="Web Preview"
        description="Embedded web content preview"
      >
        <WebPreview
          url="https://example.com"
          title="Example Website"
        />
      </ComponentCard>

      <ComponentCard
        title="Code Editor"
        description="Full-featured code editor with syntax highlighting"
      >
        <div className="h-[300px]">
          <CodeEditor
            value={sampleCode}
            language="tsx"
            onChange={(code) => console.log("Changed:", code)}
            theme="dark"
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Multi-File Editor"
        description="Editor with multiple file tabs"
      >
        <div className="h-[350px]">
          <MultiFileEditor
            files={[
              { id: "1", name: "App.tsx", content: sampleCode, language: "tsx" },
              { id: "2", name: "styles.css", content: ".btn { padding: 8px 16px; }", language: "css" },
              { id: "3", name: "utils.ts", content: "export const add = (a: number, b: number) => a + b;", language: "typescript" },
            ]}
            activeFileId="1"
            onFileChange={(id, content) => console.log("File changed:", id)}
            onFileSelect={(id) => console.log("Selected:", id)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Inline Editor"
        description="Compact inline code editing"
      >
        <InlineEditor
          value="const greeting = 'Hello, World!';"
          language="javascript"
          onChange={(code) => console.log("Changed:", code)}
        />
      </ComponentCard>

      {/* MDX Components */}
      <ComponentCard
        title="MDX Headings"
        description="Styled markdown headings with anchor links"
      >
        <div className="space-y-4">
          <MDXHeading1 id="intro">Introduction</MDXHeading1>
          <MDXHeading2 id="getting-started">Getting Started</MDXHeading2>
        </div>
      </ComponentCard>

      <ComponentCard
        title="MDX Paragraph & Quote"
        description="Styled text blocks for documentation"
      >
        <div className="space-y-4">
          <MDXParagraph>
            This is a standard paragraph with proper typography for documentation. It supports **bold** and *italic* text naturally.
          </MDXParagraph>
          <MDXBlockquote>
            This is a highlighted blockquote for important information or quotes from documentation.
          </MDXBlockquote>
        </div>
      </ComponentCard>

      <ComponentCard
        title="MDX Code Block"
        description="Syntax-highlighted code with copy functionality"
      >
        <MDXCodeBlock language="typescript" filename="example.ts">
{`interface User {
  id: string;
  name: string;
  email: string;
}

function createUser(data: Partial<User>): User {
  return { id: crypto.randomUUID(), ...data } as User;
}`}
        </MDXCodeBlock>
      </ComponentCard>

      <ComponentCard
        title="MDX Callouts"
        description="Highlighted information boxes"
      >
        <div className="space-y-4">
          <MDXCallout type="note" title="Note">
            This is a helpful tip for users reading the documentation.
          </MDXCallout>
          <MDXCallout type="warning" title="Warning">
            Be careful with this configuration option.
          </MDXCallout>
          <MDXCallout type="danger" title="Danger">
            This action cannot be undone!
          </MDXCallout>
        </div>
      </ComponentCard>

      <ComponentCard
        title="MDX Tabs"
        description="Tabbed content for multiple code examples"
      >
        <MDXTabs
          items={[
            { label: "npm", value: "npm", content: <code>npm install @ai/components</code> },
            { label: "yarn", value: "yarn", content: <code>yarn add @ai/components</code> },
            { label: "pnpm", value: "pnpm", content: <code>pnpm add @ai/components</code> },
          ]}
          defaultValue="npm"
        />
      </ComponentCard>

      <ComponentCard
        title="MDX Steps"
        description="Step-by-step instructions"
      >
        <MDXSteps>
          <MDXStep title="Install Dependencies" number={1}>
            Run the install command to add the package to your project.
          </MDXStep>
          <MDXStep title="Configure Your App" number={2}>
            Add the provider to your root component.
          </MDXStep>
          <MDXStep title="Start Building" number={3}>
            Import and use the components in your application.
          </MDXStep>
        </MDXSteps>
      </ComponentCard>

      <ComponentCard
        title="MDX Card Grid"
        description="Grid layout for feature cards"
      >
        <MDXCardGrid columns={3}>
          <MDXCard title="Fast" icon="⚡">
            Optimized for performance with lazy loading and code splitting.
          </MDXCard>
          <MDXCard title="Accessible" icon="♿">
            Built with accessibility in mind, following WCAG guidelines.
          </MDXCard>
          <MDXCard title="Customizable" icon="🎨">
            Fully themeable with CSS variables and Tailwind support.
          </MDXCard>
        </MDXCardGrid>
      </ComponentCard>
    </div>
  );
}
