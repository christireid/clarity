"use client";

import * as React from "react";
import { VoiceButton, VoiceRecorder, TextToSpeechButton, VoiceVisualizer, VoiceInputField } from "@/components/ai/voice-button";
import { ComponentCard } from "./ComponentCard";

export function VoiceComponents() {
  return (
    <div className="space-y-8">
      <ComponentCard
        title="Voice Recorder"
        description="Record audio input"
      >
        <VoiceRecorder 
          onRecordingComplete={(blob) => console.log("Recorded:", blob)}
        />
      </ComponentCard>

      <ComponentCard
        title="Text to Speech"
        description="Read text aloud"
      >
        <TextToSpeechButton text="Hello, this is a test of text to speech." />
      </ComponentCard>

      <ComponentCard
        title="Voice Visualizer"
        description="Audio waveform visualization"
      >
        <VoiceVisualizer isRecording={true} />
      </ComponentCard>

      <ComponentCard
        title="Voice Input Field"
        description="Input with integrated voice typing"
      >
        <VoiceInputField 
          onSubmit={(text) => console.log("Voice Input:", text)}
        />
      </ComponentCard>
    </div>
  );
}
