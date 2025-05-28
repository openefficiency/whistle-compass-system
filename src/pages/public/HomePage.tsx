"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mic } from "lucide-react"
import PublicLayout from "@/components/layout/PublicLayout"
import VoiceAssistant from "@/components/voice/VoiceAssistant"
import { useVoiceAI } from "@/hooks/useVoiceAI"

const HomePage = () => {
  const { startListening, isSupported } = useVoiceAI()
  const [stats] = useState({
    openCases: 10,
    resolvedCases: 8,
    rewardsIssued: "$8,000",
    bountyAvailable: "$92,000",
  })

  const handleSpeakUpClick = () => {
    if (isSupported) {
      startListening()
    }
  }

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-800 to-teal-700 text-white py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Speak Up to Make the World Better</h1>
              <p className="text-lg md:text-xl mb-8">
                Our secure whistleblower system empowers you to report concerns with complete confidentiality. Your
                voice matters in creating a safer, more ethical workplace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white hover:bg-gray-100 text-teal-700"
                  onClick={handleSpeakUpClick}
                  disabled={!isSupported}
                >
                  <Mic className="mr-2 h-5 w-5" />
                  {isSupported ? "Speak Up Now" : "Voice Not Supported"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-teal-700"
                >
                  Write Report
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 text-center">
                <Mic className="h-24 w-24 mx-auto mb-4 text-white/80" />
                <p className="text-white/90">Click the microphone to start speaking with our AI assistant</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-500 mb-2">Open Cases</h3>
              <p className="text-4xl font-bold text-teal-700">{stats.openCases}</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-500 mb-2">Resolved</h3>
              <p className="text-4xl font-bold text-teal-700">{stats.resolvedCases}</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-500 mb-2">Rewards Issued</h3>
              <p className="text-4xl font-bold text-teal-700">{stats.rewardsIssued}</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-500 mb-2">Bounty Available</h3>
              <p className="text-4xl font-bold text-teal-700">{stats.bountyAvailable}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-teal-100 text-teal-800 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Speak Up</h3>
              <p className="text-gray-600">
                Use our secure voice AI to report your concerns. Your conversation is encrypted and your identity
                protected.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-teal-100 text-teal-800 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Investigation</h3>
              <p className="text-gray-600">
                Our trained ethics officers and investigators will review your report and take appropriate action.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-teal-100 text-teal-800 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Resolution & Reward</h3>
              <p className="text-gray-600">
                Issues are resolved professionally with potential crypto rewards for valid disclosures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Your Security Is Our Priority</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">100% Anonymous</h3>
              <p className="text-gray-600">Your identity remains completely protected throughout the process.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">AI-Powered</h3>
              <p className="text-gray-600">Advanced voice AI ensures natural conversations without human bias.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">Crypto Rewards</h3>
              <p className="text-gray-600">Anonymous rewards paid in cryptocurrency for valid disclosures.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">Independent Review</h3>
              <p className="text-gray-600">Reports are reviewed by an independent ethics committee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Voice AI Assistant */}
      <VoiceAssistant />
    </PublicLayout>
  )
}

export default HomePage
