"use client";

import * as React from "react";
import {
  TranslationIndicator,
  LanguageSelector,
  TranslateButton,
  AutoTranslateMessage,
  LanguageDetectionBadge,
  COMMON_LANGUAGES,
} from "@/components/ai/translation";
import { ComponentCard } from "./ComponentCard";

export function TranslationComponents() {
  const [selectedLang, setSelectedLang] = React.useState("en");
  const [isTranslating, setIsTranslating] = React.useState(false);

  return (
    <div className="space-y-8">
      <ComponentCard
        title="Language Selector"
        description="Dropdown to select a language"
      >
        <div className="max-w-xs">
          <LanguageSelector
            value={selectedLang}
            onChange={setSelectedLang}
            languages={COMMON_LANGUAGES}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Translation Indicator"
        description="Shows translation source and target"
      >
        <div className="space-y-2">
          <TranslationIndicator
            originalLanguage="es"
            translatedLanguage="en"
            onShowOriginal={() => console.log("Show original")}
          />
          <TranslationIndicator
            originalLanguage="ja"
            translatedLanguage="en"
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Translate Button"
        description="Button with language selection dropdown"
      >
        <div className="flex items-center gap-4">
          <TranslateButton
            onTranslate={(lang) => console.log("Translate to:", lang)}
            languages={COMMON_LANGUAGES.slice(0, 6)}
          />
          <TranslateButton
            onTranslate={(lang) => console.log("Translate to:", lang)}
            isTranslating
          />
          <TranslateButton
            onTranslate={(lang) => console.log("Translate to:", lang)}
            isTranslated
            onShowOriginal={() => console.log("Show original")}
          />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Language Detection Badge"
        description="Badge showing detected language"
      >
        <div className="flex items-center gap-4">
          <LanguageDetectionBadge detectedLanguage="en" confidence={0.98} />
          <LanguageDetectionBadge detectedLanguage="es" confidence={0.85} />
          <LanguageDetectionBadge detectedLanguage="ja" confidence={0.92} />
          <LanguageDetectionBadge detectedLanguage="zh" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="Auto Translate Message"
        description="Message with automatic translation support"
      >
        <div className="max-w-lg space-y-6">
          <AutoTranslateMessage
            originalContent="Bonjour! Comment allez-vous aujourd'hui? J'espère que vous passez une excellente journée."
            translatedContent="Hello! How are you today? I hope you are having a great day."
            originalLanguage="fr"
            targetLanguage="en"
            onTranslate={(lang) => {
              console.log("Translate to:", lang);
              setIsTranslating(true);
              setTimeout(() => setIsTranslating(false), 1500);
            }}
          />
          <AutoTranslateMessage
            originalContent="Hola! Esta es una demostración del componente de traducción automática."
            isTranslating={isTranslating}
            onTranslate={(lang) => {
              console.log("Translate to:", lang);
              setIsTranslating(true);
              setTimeout(() => setIsTranslating(false), 1500);
            }}
          />
        </div>
      </ComponentCard>
    </div>
  );
}
