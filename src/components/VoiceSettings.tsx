
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice: string;
}

interface VoiceSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  voiceSettings: VoiceSettings;
  availableVoices: SpeechSynthesisVoice[];
  onSettingsChange: (settings: VoiceSettings) => void;
}

const VoiceSettings: React.FC<VoiceSettingsProps> = ({
  isOpen,
  onClose,
  voiceSettings,
  availableVoices,
  onSettingsChange
}) => {
  const handleSettingChange = (key: keyof VoiceSettings, value: number | string) => {
    onSettingsChange({
      ...voiceSettings,
      [key]: value
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-md border border-white/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-gray-800">Voice Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-2">
          {/* Voice Selection */}
          <div className="space-y-2">
            <Label htmlFor="voice" className="text-sm font-medium text-gray-700">
              Voice
            </Label>
            <Select 
              value={voiceSettings.voice} 
              onValueChange={(value) => handleSettingChange('voice', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-md border border-white/20">
                {availableVoices.map((voice) => (
                  <SelectItem key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Speech Rate */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Speech Rate: {voiceSettings.rate.toFixed(1)}x
            </Label>
            <Slider
              value={[voiceSettings.rate]}
              onValueChange={(value) => handleSettingChange('rate', value[0])}
              min={0.5}
              max={2}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Pitch */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Pitch: {voiceSettings.pitch.toFixed(1)}
            </Label>
            <Slider
              value={[voiceSettings.pitch]}
              onValueChange={(value) => handleSettingChange('pitch', value[0])}
              min={0.5}
              max={2}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Volume */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Volume: {Math.round(voiceSettings.volume * 100)}%
            </Label>
            <Slider
              value={[voiceSettings.volume]}
              onValueChange={(value) => handleSettingChange('volume', value[0])}
              min={0}
              max={1}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceSettings;
