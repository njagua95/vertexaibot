import React, { useState, useEffect } from 'react';
import { Mic, StopCircle } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface TranscriptionBotProps {
  isRecording: boolean;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
  onTranscriptionComplete: (transcription: string) => void;
}

const TranscriptionBot: React.FC<TranscriptionBotProps> = ({
  isRecording,
  setIsRecording,
  onTranscriptionComplete,
}) => {
  const [transcription, setTranscription] = useState('');
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    setTranscription(transcript);
  }, [transcript]);

  const startRecording = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
    setIsRecording(true);
  };

  const stopRecording = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);
    
    // Simulate processing with Vertex AI
    const processedTranscription = `Processed: ${transcription}`;
    setTranscription(processedTranscription);
    onTranscriptionComplete(processedTranscription);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        {isRecording ? (
          <button
            onClick={stopRecording}
            className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center"
          >
            <StopCircle className="mr-2" />
            Stop Recording
          </button>
        ) : (
          <button
            onClick={startRecording}
            className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center"
          >
            <Mic className="mr-2" />
            Start Recording
          </button>
        )}
      </div>
      <div className="w-full bg-gray-100 p-4 rounded-lg min-h-[100px]">
        <p className="text-gray-700">{transcription || 'Transcription will appear here...'}</p>
      </div>
    </div>
  );
};

export default TranscriptionBot;