"use client";

import * as React from "react";
import { VoiceButton, VoiceRecorder, TextToSpeechButton, VoiceVisualizer, VoiceInputField } from "@/components/ai/voice-button";
import { AudioPlayer, AudioActionButton } from "@/components/ai/audio-player";
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

      {/* Audio Player Components */}
      <ComponentCard
        title="Audio Player"
        description="Full-featured audio player with playback controls"
      >
        <AudioPlayer
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          title="Sample Audio Track"
          artist="Sound Helix"
          duration={120}
          onPlay={() => console.log("Playing")}
          onPause={() => console.log("Paused")}
          onEnded={() => console.log("Ended")}
        />
      </ComponentCard>

      <ComponentCard
        title="Audio Action Button"
        description="Compact audio control buttons"
      >
        <div className="flex items-center gap-4">
          <AudioActionButton action="play" onClick={() => console.log("Play")} />
          <AudioActionButton action="pause" onClick={() => console.log("Pause")} />
          <AudioActionButton action="stop" onClick={() => console.log("Stop")} />
          <AudioActionButton action="rewind" onClick={() => console.log("Rewind")} />
          <AudioActionButton action="forward" onClick={() => console.log("Forward")} />
        </div>
      </ComponentCard>
    </div>
  );
}
