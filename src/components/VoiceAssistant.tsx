"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Volume2, VolumeX, Settings, MessageCircle } from "lucide-react"
import { useVoiceAI } from "@/hooks/useVoiceAI"
import { cn } from "@/lib/utils"
import VoiceSettings from "./VoiceSettings"
import ConversationModal from "./ConversationModal"

export default function VoiceAssistant() {
  const [showSettings, setShowSettings] = useState(false)
  const [showConversation, setShowConversation] = useState(false)

  const {
    isListening,
    isSpeaking,
    transcript,
    conversation,
    isProcessing,
    isSupported,
    startListening,
    stopListening,
    stopSpeaking,
    voiceSettings,
    availableVoices,
    setVoiceSettings,
    clearConversation,
  } = useVoiceAI()

  if (!isSupported) {
    return (
      <div className="fixed bottom-6 right-6 bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-full p-4">
        <div className="text-red-400 text-sm">Voice features not supported</div>
      </div>
    )
  }

  const handleMicClick = () => {
    if (isListening) {
      stopListening()
    } else {
      if (isSpeaking) {
        stopSpeaking()
      }
      startListening()
    }
  }

  return (
    <>
      {/* Floating Voice Assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Transcript Display */}
        {(transcript || isProcessing) && (
          <div className="mb-4 max-w-sm p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
            <div className="text-white text-sm">
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                transcript
              )}
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex flex-col space-y-3">
          {/* Settings and Conversation Buttons */}
          <div className="flex space-x-2">
            <Button
              onClick={() => setShowConversation(true)}
              size="sm"
              variant="secondary"
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-full h-10 w-10 p-0"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>

            <Button
              onClick={() => setShowSettings(true)}
              size="sm"
              variant="secondary"
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-full h-10 w-10 p-0"
            >
              <Settings className="h-4 w-4" />
            </Button>

            {isSpeaking && (
              <Button
                onClick={stopSpeaking}
                size="sm"
                variant="secondary"
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-full h-10 w-10 p-0"
              >
                <VolumeX className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Main Microphone Button */}
          <div className="relative">
            {/* Pulse Animation */}
            {(isListening || isSpeaking) && (
              <div className="absolute inset-0 rounded-full">
                <div
                  className={cn(
                    "absolute inset-0 rounded-full animate-ping opacity-75",
                    isListening ? "bg-red-500" : "bg-blue-500",
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-2 rounded-full animate-pulse opacity-50",
                    isListening ? "bg-red-400" : "bg-blue-400",
                  )}
                />
              </div>
            )}

            <Button
              onClick={handleMicClick}
              disabled={isProcessing}
              size="lg"
              className={cn(
                "relative z-10 h-16 w-16 rounded-full transition-all duration-300 shadow-2xl",
                "bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
                "backdrop-blur-md border border-white/20",
                isListening && "from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700",
                isSpeaking && "from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700",
              )}
            >
              {isListening ? (
                <MicOff className="h-8 w-8 text-white" />
              ) : isSpeaking ? (
                <Volume2 className="h-8 w-8 text-white animate-pulse" />
              ) : (
                <Mic className="h-8 w-8 text-white" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Voice Settings Modal */}
      <VoiceSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        voiceSettings={voiceSettings}
        availableVoices={availableVoices}
        onSettingsChange={setVoiceSettings}
      />

      {/* Conversation History Modal */}
      <ConversationModal
        isOpen={showConversation}
        onClose={() => setShowConversation(false)}
        conversation={conversation}
        onClear={clearConversation}
      />
    </>
  )
}
