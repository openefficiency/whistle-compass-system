"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Settings, MessageSquare, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useVoiceAI } from "@/hooks/useVoiceAI"
import VoiceSettings from "@/components/voice/VoiceSettings"
import ConversationModal from "@/components/voice/ConversationModal"

export default function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<
    Array<{ role: string; content: string; timestamp: Date }>
  >([])

  const { isListening, startListening, stopListening, isSupported, transcript: currentTranscript } = useVoiceAI()

  const responseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentTranscript && !isListening) {
      setTranscript(currentTranscript)
      setIsProcessing(true)

      // Simulate AI processing
      setTimeout(() => {
        const aiResponse = "I've received your report. Would you like to provide more details about the incident?"
        setResponse(aiResponse)
        setIsProcessing(false)

        // Add to conversation history
        setConversationHistory((prev) => [
          ...prev,
          { role: "user", content: currentTranscript, timestamp: new Date() },
          { role: "assistant", content: aiResponse, timestamp: new Date() },
        ])

        // Text-to-speech
        const utterance = new SpeechSynthesisUtterance(aiResponse)
        window.speechSynthesis.speak(utterance)
      }, 1500)
    }
  }, [currentTranscript, isListening])

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight
    }
  }, [response, conversationHistory])

  const handleToggle = () => {
    if (isMinimized) {
      setIsMinimized(false)
    } else {
      if (isListening) {
        stopListening()
      }
      setIsMinimized(true)
    }
  }

  const handleClose = () => {
    if (isListening) {
      stopListening()
    }
    setIsMinimized(true)
  }

  const handleMicToggle = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
      setTranscript("")
      setResponse("")
    }
  }

  return (
    <>
      {isMinimized ? (
        <Button
          onClick={handleToggle}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-teal-600 hover:bg-teal-700"
          size="icon"
        >
          <Mic className="h-6 w-6" />
        </Button>
      ) : (
        <div className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-xl border overflow-hidden">
          <div className="bg-teal-600 text-white p-3 flex items-center justify-between">
            <h3 className="font-medium">Voice Assistant</h3>
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-teal-700 rounded-full">
                    <Settings className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <VoiceSettings />
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-teal-700 rounded-full">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <ConversationModal history={conversationHistory} />
                </SheetContent>
              </Sheet>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-8 w-8 text-white hover:bg-teal-700 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div ref={responseRef} className="p-4 h-64 overflow-y-auto bg-gray-50">
            {transcript && (
              <div className="mb-4">
                <div className="bg-gray-200 rounded-lg p-3 ml-auto max-w-[80%] inline-block">
                  <p className="text-sm">{transcript}</p>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="flex justify-center my-4">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            )}

            {response && (
              <div className="mb-4">
                <div className="bg-teal-100 rounded-lg p-3 mr-auto max-w-[80%] inline-block">
                  <p className="text-sm">{response}</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t flex justify-center">
            <Button
              onClick={handleMicToggle}
              className={`h-12 w-12 rounded-full ${
                isListening ? "bg-red-500 hover:bg-red-600" : "bg-teal-600 hover:bg-teal-700"
              }`}
              size="icon"
              disabled={!isSupported}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
