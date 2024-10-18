import React from 'react';

interface TranscriptionHistoryProps {
  transcriptions: string[];
}

const TranscriptionHistory: React.FC<TranscriptionHistoryProps> = ({ transcriptions }) => {
  return (
    <div className="space-y-4">
      {transcriptions.length === 0 ? (
        <p className="text-gray-500 italic">No transcriptions yet.</p>
      ) : (
        transcriptions.map((transcription, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Transcription {index + 1}:</p>
            <p className="mt-1">{transcription}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default TranscriptionHistory;