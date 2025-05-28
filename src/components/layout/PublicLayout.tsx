import type { ReactNode } from "react"
import HomeHeader from "@/components/HomeHeader"
import Footer from "@/components/Footer"
import VoiceAssistant from "@/components/voice/VoiceAssistant"

interface PublicLayoutProps {
  children: ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <HomeHeader />
      <main className="flex-1">{children}</main>
      <Footer />
      <VoiceAssistant />
    </div>
  )
}
