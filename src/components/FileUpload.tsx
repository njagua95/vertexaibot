import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { transcribeAudio, saveAudioFile, SUPPORTED_LANGUAGES } from '../utils/vertexAI';

interface FileUploadProps {
  onTranscriptionComplete: (transcription: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onTranscriptionComplete }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        // Save the original audio file
        saveAudioFile(file);

        // Transcribe the audio
        const transcription = await transcribeAudio(file, selectedLanguage);
        onTranscriptionComplete(transcription);
      } catch (error) {
        console.error('Error transcribing file:', error);
        alert('Error transcribing file. Please try again.');
      }
    }
  }, [onTranscriptionComplete, selectedLanguage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'audio/*' });

  return (
    <div>
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto mb-4 text-gray-400" size={48} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the audio file here...</p>
        ) : (
          <p className="text-gray-500">Drag and drop an audio file here, or click to select a file</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;