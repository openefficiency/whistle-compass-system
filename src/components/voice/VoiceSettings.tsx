"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface VoiceSettings {
  rate: number
  pitch: number
  volume: number
  voice: string
}

interface VoiceSettingsProps {
  isOpen: boolean
  onClose: () => void
  voiceSettings: VoiceSettings
  availableVoices: SpeechSynthesisVoice[]
  onSettingsChange: (settings: VoiceSettings) => void
}

export default function VoiceSettings({
  isOpen,
  onClose,
  voiceSettings,
  availableVoices,
  onSettingsChange,
}: VoiceSettingsProps) {
  const updateSetting = (key: keyof VoiceSettings, value: number | string) => {
    onSettingsChange({
      ...voiceSettings,
      [key]: value,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Voice Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="voice">Voice</Label>
            <Select value={voiceSettings.voice} onValueChange={(value) => updateSetting("voice", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent>
                {availableVoices.map((voice) => (
                  <SelectItem key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="rate">Speech Rate: {voiceSettings.rate.toFixed(1)}</Label>
            <Slider
              id="rate"
              min={0.5}
              max={2}
              step={0.1}
              value={[voiceSettings.rate]}
              onValueChange={([value]) => updateSetting("rate", value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="pitch">Pitch: {voiceSettings.pitch.toFixed(1)}</Label>
            <Slider
              id="pitch"
              min={0.5}
              max={2}
              step={0.1}
              value={[voiceSettings.pitch]}
              onValueChange={([value]) => updateSetting("pitch", value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="volume">Volume: {Math.round(voiceSettings.volume * 100)}%</Label>
            <Slider
              id="volume"
              min={0}
              max={1}
              step={0.1}
              value={[voiceSettings.volume]}
              onValueChange={([value]) => updateSetting("volume", value)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
