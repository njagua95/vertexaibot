import React, { useState } from 'react';
import { Mic, StopCircle, FileText, Upload } from 'lucide-react';
import TranscriptionBot from './components/TranscriptionBot';
import TranscriptionHistory from './components/TranscriptionHistory';
import FileUpload from './components/FileUpload';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptions, setTranscriptions] = useState<string[]>([]);

  const handleTranscriptionComplete = (transcription: string) => {
    setTranscriptions([...transcriptions, transcription]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Vertex AI Transcription Bot</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <TranscriptionBot
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          onTranscriptionComplete={handleTranscriptionComplete}
        />
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Upload className="mr-2" />
            Upload Audio File
          </h2>
          <FileUpload onTranscriptionComplete={handleTranscriptionComplete} />
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FileText className="mr-2" />
            Transcription History
          </h2>
          <TranscriptionHistory transcriptions={transcriptions} />
        </div>
      </div>
    </div>
  );
}

export default App;