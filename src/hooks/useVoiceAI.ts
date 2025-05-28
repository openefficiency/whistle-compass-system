
import { useState, useCallback, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice: string;
}

export const useVoiceAI = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    rate: 1,
    pitch: 1,
    volume: 0.8,
    voice: ''
  });
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Check browser support
  const isSupported = useCallback(() => {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  }, []);

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      
      const loadVoices = () => {
        const voices = synthRef.current?.getVoices() || [];
        setAvailableVoices(voices);
        if (voices.length > 0 && !voiceSettings.voice) {
          setVoiceSettings(prev => ({ ...prev, voice: voices[0].name }));
        }
      };

      loadVoices();
      synthRef.current.onvoiceschanged = loadVoices;
    }
  }, [voiceSettings.voice]);

  // Initialize speech recognition
  useEffect(() => {
    if (!isSupported()) return;

    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognitionClass();
    
    if (recognitionRef.current) {
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        setTranscript(finalTranscript + interimTranscript);

        if (finalTranscript) {
          handleSendMessage(finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: `Error: ${event.error}`,
          variant: "destructive"
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported()) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser",
        variant: "destructive"
      });
      return;
    }

    if (recognitionRef.current && !isListening) {
      setTranscript('');
      setIsListening(true);
      recognitionRef.current.start();
    }
  }, [isListening, isSupported, toast]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  const speak = useCallback((text: string) => {
    if (!synthRef.current) return;

    // Stop any current speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = availableVoices.find(v => v.name === voiceSettings.voice);
    
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.rate = voiceSettings.rate;
    utterance.pitch = voiceSettings.pitch;
    utterance.volume = voiceSettings.volume;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  }, [voiceSettings, availableVoices]);

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const handleSendMessage = useCallback(async (message: string) => {
    if (!message.trim() || isProcessing) return;

    setIsProcessing(true);
    setTranscript('');

    const userMessage: ConversationMessage = {
      role: 'user',
      content: message.trim(),
      timestamp: new Date().toISOString()
    };

    setConversation(prev => [...prev, userMessage]);

    try {
      const { data, error } = await supabase.functions.invoke('voice-ai-chat', {
        body: {
          message: message.trim(),
          conversationHistory: conversation.slice(-10)
        }
      });

      if (error) throw error;

      const assistantMessage: ConversationMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: data.timestamp
      };

      setConversation(prev => [...prev, assistantMessage]);
      speak(data.response);

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  }, [conversation, isProcessing, speak, toast]);

  const clearConversation = useCallback(() => {
    setConversation([]);
    setTranscript('');
  }, []);

  return {
    isListening,
    isSpeaking,
    transcript,
    conversation,
    isProcessing,
    voiceSettings,
    availableVoices,
    isSupported: isSupported(),
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    handleSendMessage,
    clearConversation,
    setVoiceSettings
  };
};
