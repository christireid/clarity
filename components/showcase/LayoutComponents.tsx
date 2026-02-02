"use client";

import * as React from "react";
import {
  LayoutContainer,
  SidebarLayout,
  SplitPanelLayout,
  ThreeColumnLayout,
  HeaderLayout,
  CardGridLayout,
  CenteredLayout,
  FullscreenLayout,
  ScrollShadow,
} from "@/components/ai/layout";
import {
  CollapsiblePanel,
  ResizablePanel,
  DrawerPanel,
  FloatingPanel,
  SplitPanel,
  PanelToggle,
  ToolbarPanel,
} from "@/components/ai/panels";
import { ComponentCard } from "./ComponentCard";
import { Button } from "@/components/ui/button";
import { Settings, FileText, Code } from "lucide-react";

export function LayoutComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Sidebar Layout"
        description="Responsive sidebar with collapsible navigation"
      >
        <div className="h-[300px] border rounded-lg overflow-hidden">
          <SidebarLayout
            sidebar={
              <div className="p-4 space-y-2">
                <div className="h-8 bg-muted rounded" />
                <div className="h-8 bg-muted rounded" />
                <div className="h-8 bg-muted rounded" />
              </div>
            }
            sidebarWidth={200}
          >
            <div className="p-4">
              <h3 className="font-semibold mb-2">Main Content</h3>
              <p className="text-sm text-muted-foreground">
                This is the main content area. The sidebar can be collapsed.
              </p>
            </div>
          </SidebarLayout>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Split Panel Layout"
        description="Resizable split view with draggable divider"
      >
        <div className="h-[250px] border rounded-lg overflow-hidden">
          <SplitPanelLayout
            left={
              <div className="p-4 h-full bg-muted/30">
                <h4 className="font-medium mb-2">Left Panel</h4>
                <p className="text-sm text-muted-foreground">Drag the divider to resize</p>
              </div>
            }
            right={
              <div className="p-4 h-full bg-muted/30">
                <h4 className="font-medium mb-2">Right Panel</h4>
                <p className="text-sm text-muted-foreground">Content on the right side</p>
              </div>
            }
            defaultSplit={50}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Three Column Layout"
        description="Three-panel layout with collapsible sidebars"
      >
        <div className="h-[250px] border rounded-lg overflow-hidden">
          <ThreeColumnLayout
            left={
              <div className="p-4">
                <h4 className="font-medium text-sm">Navigation</h4>
              </div>
            }
            center={
              <div className="p-4">
                <h4 className="font-medium mb-2">Main Content</h4>
                <p className="text-sm text-muted-foreground">
                  Click the panel buttons to toggle sidebars
                </p>
              </div>
            }
            right={
              <div className="p-4">
                <h4 className="font-medium text-sm">Details</h4>
              </div>
            }
            leftWidth={150}
            rightWidth={180}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Header Layout"
        description="Layout with sticky header and optional footer"
      >
        <div className="h-[200px] border rounded-lg overflow-hidden">
          <HeaderLayout
            header={
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="font-semibold">App Header</span>
                <div className="flex gap-2">
                  <div className="h-8 w-8 bg-muted rounded-full" />
                </div>
              </div>
            }
            footer={
              <div className="px-4 py-2 text-sm text-muted-foreground">
                Footer content
              </div>
            }
          >
            <div className="p-4">
              <p className="text-sm text-muted-foreground">
                Main content with header above and footer below
              </p>
            </div>
          </HeaderLayout>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Card Grid Layout"
        description="Responsive grid for card-based layouts"
      >
        <CardGridLayout columns={3} gap="md">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-4 bg-muted rounded-lg text-center">
              Card {i}
            </div>
          ))}
        </CardGridLayout>
      </ComponentCard>

      <ComponentCard
        title="Centered Layout"
        description="Container with centered content and max-width"
      >
        <CenteredLayout maxWidth="md">
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-sm">Centered content with max-width constraint</p>
          </div>
        </CenteredLayout>
      </ComponentCard>

      <ComponentCard
        title="Scroll Shadow"
        description="Scroll container with shadow indicators"
      >
        <div className="h-[150px] border rounded-lg overflow-hidden">
          <ScrollShadow>
            <div className="p-4 space-y-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="p-3 bg-muted rounded">
                  Scrollable item {i}
                </div>
              ))}
            </div>
          </ScrollShadow>
        </div>
      </ComponentCard>

      {/* Panel Components */}
      <ComponentCard
        title="Collapsible Panel"
        description="Expandable section with header"
      >
        <div className="space-y-2">
          <CollapsiblePanel
            title="Settings"
            icon={<Settings className="h-4 w-4" />}
            defaultOpen
          >
            <div className="space-y-2">
              <div className="h-8 bg-muted/50 rounded" />
              <div className="h-8 bg-muted/50 rounded" />
            </div>
          </CollapsiblePanel>
          <CollapsiblePanel
            title="Documents"
            icon={<FileText className="h-4 w-4" />}
            badge={<span className="text-xs bg-accent text-accent-foreground px-1.5 py-0.5 rounded">3</span>}
          >
            <div className="space-y-2">
              <div className="h-8 bg-muted/50 rounded" />
              <div className="h-8 bg-muted/50 rounded" />
              <div className="h-8 bg-muted/50 rounded" />
            </div>
          </CollapsiblePanel>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Split Panel"
        description="Two-panel layout with resizable divider"
      >
        <div className="h-[200px] border rounded-lg overflow-hidden">
          <SplitPanel
            left={
              <div className="p-4 bg-muted/20 h-full">
                <h4 className="font-medium text-sm mb-2">Left Panel</h4>
                <p className="text-xs text-muted-foreground">Drag divider to resize</p>
              </div>
            }
            right={
              <div className="p-4 bg-muted/20 h-full">
                <h4 className="font-medium text-sm mb-2">Right Panel</h4>
                <p className="text-xs text-muted-foreground">Content here</p>
              </div>
            }
            defaultSplit={40}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Toolbar Panel"
        description="Panel with toolbar buttons"
      >
        <ToolbarPanel position="top">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <FileText className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Code className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
          <div className="flex-1" />
          <Button size="sm">Save</Button>
        </ToolbarPanel>
      </ComponentCard>

      <ComponentCard
        title="Panel Toggle Buttons"
        description="Toggle visibility of panels"
      >
        <div className="flex items-center gap-4">
          <PanelToggle position="left" isOpen={true} onClick={() => {}} />
          <PanelToggle position="right" isOpen={false} onClick={() => {}} />
          <PanelToggle position="bottom" isOpen={true} onClick={() => {}} />
        </div>
      </ComponentCard>
    </div>
  );
}
