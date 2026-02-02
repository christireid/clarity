"use client";

import * as React from "react";
import {
  VoiceSelector,
  SpeechInput,
  TranscriptionDisplay,
  TextToSpeech,
  AudioTranscriber,
  MicButton,
} from "@/components/ai/speech";
import { ComponentCard } from "./ComponentCard";

const sampleVoices = [
  { id: "en-us-1", name: "Sarah", language: "English (US)", gender: "female" as const },
  { id: "en-us-2", name: "James", language: "English (US)", gender: "male" as const },
  { id: "en-gb-1", name: "Emma", language: "English (UK)", gender: "female" as const },
  { id: "es-1", name: "Carlos", language: "Spanish", gender: "male" as const },
  { id: "fr-1", name: "Marie", language: "French", gender: "female" as const },
];

const sampleTranscription = {
  text: "Hello, this is a sample transcription of spoken audio. The system detected this text with high confidence.",
  confidence: 0.94,
  language: "en-US",
  segments: [
    { text: "Hello, this is a sample", start: 0, end: 1.5, confidence: 0.96 },
    { text: "transcription of spoken audio.", start: 1.5, end: 3.2, confidence: 0.93 },
    { text: "The system detected this text", start: 3.2, end: 5.0, confidence: 0.95 },
    { text: "with high confidence.", start: 5.0, end: 6.5, confidence: 0.92 },
  ],
};

export function SpeechComponents() {
  const [selectedVoice, setSelectedVoice] = React.useState("en-us-1");

  return (
    <div className="space-y-8">
      <ComponentCard
        title="Mic Button"
        description="Compact microphone button for voice input"
      >
        <div className="flex items-center gap-4">
          <MicButton size="sm" />
          <MicButton size="md" />
          <MicButton size="lg" />
          <MicButton size="md" isListening />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Voice Selector"
        description="Select from available text-to-speech voices"
      >
        <div className="max-w-xs">
          <VoiceSelector
            voices={sampleVoices}
            selectedVoice={selectedVoice}
            onSelect={setSelectedVoice}
            onPreview={(id) => console.log("Preview voice:", id)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Speech Input"
        description="Voice-to-text input with audio visualization"
      >
        <div className="max-w-lg">
          <SpeechInput
            onTranscript={(text) => console.log("Transcript:", text)}
            language="en-US"
            placeholder="Click the microphone to start speaking..."
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Transcription Display"
        description="Display transcription results with segments"
      >
        <div className="max-w-lg">
          <TranscriptionDisplay
            result={sampleTranscription}
            showSegments
            onRetry={() => console.log("Retry")}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Text to Speech"
        description="Convert text to spoken audio"
      >
        <div className="max-w-lg">
          <TextToSpeech
            text="Hello! This is a sample text that will be converted to speech."
            voices={sampleVoices}
            selectedVoice={selectedVoice}
            onVoiceChange={setSelectedVoice}
            onSpeak={(text, voice) => console.log("Speaking:", text, voice)}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Audio Transcriber"
        description="Upload audio files for transcription"
      >
        <div className="max-w-lg">
          <AudioTranscriber
            onTranscribe={(file) => console.log("Transcribing:", file.name)}
            isProcessing={false}
          />
        </div>
      </ComponentCard>
    </div>
  );
}
