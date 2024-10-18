# Vertex AI Transcription Bot

This project is a web-based transcription bot that uses Google's Vertex AI Speech-to-Text API to transcribe audio files and live speech. It supports multiple languages and allows users to upload audio files or record speech directly in the browser.

## Features

- Transcribe uploaded audio files
- Live speech-to-text transcription
- Support for multiple languages
- Save original audio files and transcriptions
- User-friendly interface with drag-and-drop file upload

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (v6 or later)
- A Google Cloud Platform account with Vertex AI Speech-to-Text API enabled
- API credentials for Vertex AI

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/vertex-ai-transcription-bot.git
   ```

2. Navigate to the project directory:
   ```
   cd vertex-ai-transcription-bot
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your Vertex AI credentials:
   ```
   VITE_VERTEX_AI_ENDPOINT=your_vertex_ai_endpoint
   VITE_API_KEY=your_api_key
   ```

## Usage

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

3. Use the interface to upload audio files or record live speech for transcription.

4. Select the appropriate language for transcription from the dropdown menu.

5. View the transcription results and download the transcribed text files.

## Contributing

Contributions to the Vertex AI Transcription Bot are welcome. Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

If you have any questions or feedback, please open an issue on the GitHub repository.