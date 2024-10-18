import axios from 'axios';
import { saveAs } from 'file-saver';

const VERTEX_AI_ENDPOINT = 'YOUR_VERTEX_AI_ENDPOINT';
const API_KEY = 'YOUR_API_KEY';

// List of languages supported by Vertex AI Speech-to-Text
// This is not an exhaustive list, add more as needed
export const SUPPORTED_LANGUAGES = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'es-ES', name: 'Spanish (Spain)' },
  { code: 'fr-FR', name: 'French (France)' },
  { code: 'de-DE', name: 'German (Germany)' },
  { code: 'it-IT', name: 'Italian (Italy)' },
  { code: 'ja-JP', name: 'Japanese (Japan)' },
  { code: 'ko-KR', name: 'Korean (South Korea)' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'ru-RU', name: 'Russian (Russia)' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  // Add more languages as needed
];

export async function transcribeAudio(file: File, languageCode: string): Promise<string> {
  // Convert the file to base64
  const base64Audio = await fileToBase64(file);

  // Prepare the request payload
  const payload = {
    audio: { content: base64Audio },
    config: {
      languageCode: languageCode,
      model: 'latest_long',
    },
  };

  try {
    const response = await axios.post(VERTEX_AI_ENDPOINT, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    // Extract the transcription from the response
    const transcription = response.data.results[0].alternatives[0].transcript;

    // Save the transcription to a file
    const blob = new Blob([transcription], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `transcription_${new Date().toISOString()}.txt`);

    return transcription;
  } catch (error) {
    console.error('Error calling Vertex AI:', error);
    throw new Error('Failed to transcribe audio');
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
}

// Function to save the original audio file
export function saveAudioFile(file: File) {
  saveAs(file, `original_audio_${new Date().toISOString()}.${file.name.split('.').pop()}`);
}