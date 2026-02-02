"use client";

import * as React from "react";
import { VoiceButton, VoiceRecorder, TextToSpeechButton, VoiceVisualizer, VoiceInputField } from "@/components/ai/voice-button";
import { AudioPlayer, AudioActionButton } from "@/components/ai/audio-player";
import { ComponentCard } from "./ComponentCard";

function VoiceInputFieldDemo() {
  const [value, setValue] = React.useState("");
  return (
    <VoiceInputField
      value={value}
      onChange={setValue}
      onSubmit={() => console.log("Submit:", value)}
      placeholder="Type or speak..."
    />
  );
}

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
        <VoiceVisualizer isActive={true} bars={7} />
      </ComponentCard>

      <ComponentCard
        title="Voice Input Field"
        description="Input with integrated voice typing"
      >
        <VoiceInputFieldDemo />
      </ComponentCard>

      {/* Audio Player Components */}
      <ComponentCard
        title="Audio Player"
        description="Full-featured audio player with playback controls"
      >
        <AudioPlayer
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          title="Sample Audio Track"
          subtitle="Sound Helix"
          variant="card"
          onPlay={() => console.log("Playing")}
          onPause={() => console.log("Paused")}
          onEnded={() => console.log("Ended")}
        />
      </ComponentCard>

      <ComponentCard
        title="Audio Action Button"
        description="Compact audio control buttons with different states"
      >
        <div className="flex items-center gap-4">
          <AudioActionButton status="default" onClick={() => console.log("Default")} />
          <AudioActionButton status="loading" onClick={() => console.log("Loading")} />
          <AudioActionButton status="playing" onClick={() => console.log("Playing")} />
          <AudioActionButton status="error" onClick={() => console.log("Error")} />
        </div>
      </ComponentCard>
    </div>
  );
}
