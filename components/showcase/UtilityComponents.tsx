"use client";

import * as React from "react";
import {
  CopyButton,
  CopyToClipboard,
  CopyCodeBlock,
  PasteButton,
} from "@/components/ai/copy-button";
import {
  PasswordInput,
  PasswordStrengthIndicator,
  PasswordGenerator,
  PasswordConfirmation,
  PasswordSecurityBadge,
  calculatePasswordStrength,
} from "@/components/ai/password";
import { ComponentCard } from "./ComponentCard";

const sampleCode = `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

export default greet;`;

export function UtilityComponents() {
  const [password, setPassword] = React.useState("");
  const strength = calculatePasswordStrength(password);

  return (
    <div className="space-y-8">
      {/* Copy Components */}
      <ComponentCard
        title="Copy Button"
        description="Button to copy text to clipboard"
      >
        <div className="flex items-center gap-4">
          <CopyButton text="Hello, World!" size="xs" />
          <CopyButton text="Hello, World!" size="sm" />
          <CopyButton text="Hello, World!" size="md" />
          <CopyButton text="Hello, World!" size="lg" showLabel label="Copy" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Copy to Clipboard"
        description="Text display with copy button"
      >
        <div className="space-y-4">
          <CopyToClipboard text="sk-ant-api-key-xxxxx" />
          <CopyToClipboard
            text="https://api.example.com/v1/users/12345/profile"
            truncate
            maxLength={40}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Copy Code Block"
        description="Code snippet with copy functionality"
      >
        <CopyCodeBlock
          code={sampleCode}
          language="typescript"
          onCopy={() => console.log("Code copied")}
        />
      </ComponentCard>

      <ComponentCard
        title="Paste Button"
        description="Button to paste from clipboard"
      >
        <div className="flex items-center gap-4">
          <PasteButton
            onPaste={(text) => console.log("Pasted:", text)}
            size="sm"
          />
          <PasteButton
            onPaste={(text) => console.log("Pasted:", text)}
            size="md"
            variant="outline"
          />
        </div>
      </ComponentCard>

      {/* Password Components */}
      <ComponentCard
        title="Password Input"
        description="Input with visibility toggle and strength indicator"
      >
        <div className="max-w-sm space-y-4">
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            showStrength
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Password Strength Indicator"
        description="Visual indicator of password strength"
      >
        <div className="max-w-sm space-y-4">
          <PasswordStrengthIndicator
            strength={calculatePasswordStrength("weak")}
          />
          <PasswordStrengthIndicator
            strength={calculatePasswordStrength("Medium1")}
          />
          <PasswordStrengthIndicator
            strength={calculatePasswordStrength("StrongPass123!")}
            showChecks
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Password Generator"
        description="Generate secure random passwords"
      >
        <div className="max-w-sm">
          <PasswordGenerator
            onGenerate={(pw) => console.log("Generated:", pw)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Password Confirmation"
        description="Confirm password matches"
      >
        <div className="max-w-sm">
          <PasswordConfirmation
            password="MySecurePass123!"
            onConfirmChange={(match) => console.log("Match:", match)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Password Security Badge"
        description="Badge showing password strength level"
      >
        <div className="flex items-center gap-4">
          <PasswordSecurityBadge strength={calculatePasswordStrength("weak")} />
          <PasswordSecurityBadge strength={calculatePasswordStrength("Medium1")} />
          <PasswordSecurityBadge strength={calculatePasswordStrength("StrongPass123!")} />
        </div>
      </ComponentCard>
    </div>
  );
}
