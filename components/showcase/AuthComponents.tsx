"use client";

import * as React from "react";
import { LoginForm, SignUpForm, PasswordStrength, OTPInput, APIKeyDisplay, ProfileCard, ProfileEditor } from "@/components/ai/auth";
import { ComponentCard } from "./ComponentCard";

export function AuthComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Login Form"
        description="Standard authentication form"
      >
        <div className="max-w-sm">
          <LoginForm 
            onSubmit={(data) => console.log("Login:", data)}
            onForgotPassword={() => console.log("Forgot password")}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Sign Up Form"
        description="Registration with validation"
      >
        <div className="max-w-sm">
          <SignUpForm 
            onSubmit={(data) => console.log("Sign up:", data)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Password Strength"
        description="Visual strength indicator"
      >
        <div className="max-w-sm space-y-4">
          <PasswordStrength password="weak" />
          <PasswordStrength password="Medium123" />
          <PasswordStrength password="Strong!Password@123" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="OTP Input"
        description="One-time password field"
      >
        <OTPInput 
          length={6}
          onComplete={(code) => console.log("OTP:", code)}
        />
      </ComponentCard>

      <ComponentCard
        title="API Key Display"
        description="Secure key management"
      >
        <APIKeyDisplay
          apiKey="sk-test-1234567890abcdef"
          name="Production API Key"
          createdAt={new Date(Date.now() - 86400000 * 30)}
          lastUsed={new Date(Date.now() - 3600000)}
          onRevoke={() => console.log("Revoked")}
          onRegenerate={() => console.log("Regenerate")}
        />
      </ComponentCard>

      <ComponentCard
        title="Profile Card"
        description="User information summary"
      >
        <ProfileCard 
          user={{
            name: "John Doe",
            email: "john@example.com",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
            role: "Developer"
          }}
        />
      </ComponentCard>
    </div>
  );
}
