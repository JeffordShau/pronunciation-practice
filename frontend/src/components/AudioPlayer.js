import React from 'react';

const AudioPlayer = ({ audioBlob }) => {
    if (!audioBlob) return null;

    return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-medium mb-4">録音した音声 (Recorded Audio)</h2>
        <div className="flex flex-col items-center">
        <audio 
            controls 
            src={URL.createObjectURL(audioBlob)}
            className="w-full max-w-md"
        >
            Your browser does not support the audio element.
        </audio>
        </div>
    </div>
    );
};

export default AudioPlayer;
