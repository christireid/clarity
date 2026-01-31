"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ComponentCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function ComponentCard({ title, description, children, className }: ComponentCardProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card text-card-foreground shadow-sm", className)}>
      <div className="p-6">
        <h3 className="text-lg font-semibold leading-none tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground mt-2 mb-4">{description}</p>
        <div className="mt-4 rounded-lg border border-border bg-background/50 p-4 md:p-6 flex items-center justify-center min-h-[150px] relative overflow-hidden">
          <div className="w-full relative z-10">
            {children}
          </div>
          {/* Background Grid Pattern for visual interest */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
               style={{ 
                 backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
                 backgroundSize: '20px 20px' 
               }} 
          />
        </div>
      </div>
    </div>
  );
}
