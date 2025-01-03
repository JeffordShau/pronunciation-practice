import React, { useState } from 'react';
import Header from './components/Header';
import AudioRecorder from './components/AudioRecorder';
import AudioPlayer from './components/AudioPlayer';
import ScoreDisplay from './components/ScoreDisplay';
import { PROMPTS } from './utils/constants';

const App = () => {
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [pronunciationScore, setPronunciationScore] = useState(null);
  const [currentAudioBlob, setCurrentAudioBlob] = useState(null);

  const prompts = PROMPTS;

  const handlePromptChange = (event) => {
    setSelectedPrompt(event.target.value);
    setPronunciationScore(null);
    setCurrentAudioBlob(null);
  };

  const handleAudioRecorded = (blob) => {
    setCurrentAudioBlob(blob);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <label 
              htmlFor="prompt-select" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select a Prompt
            </label>
            <br/>
            <select
              id="prompt-select"
              value={selectedPrompt}
              onChange={handlePromptChange}
              className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select a Prompt Below</option>
              {prompts.map((prompt, index) => (
                <option key={index} value={prompt}>
                  {prompt}
                </option>
              ))}
            </select>
          </div>

          {selectedPrompt && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <p className="text-xl text-gray-800">{selectedPrompt}</p>
            </div>
          )}

          {selectedPrompt && (
            <AudioRecorder 
              prompt={selectedPrompt}
              onScoreReceived={setPronunciationScore}
              onAudioRecorded={handleAudioRecorded}
            />
          )}

          {currentAudioBlob && (
            <AudioPlayer audioBlob={currentAudioBlob} />
          )}

          {pronunciationScore && (
            <ScoreDisplay score={pronunciationScore} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
