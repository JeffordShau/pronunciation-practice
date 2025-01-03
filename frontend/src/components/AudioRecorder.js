import React, { useState, useRef } from 'react';
import { sendAudioForAssessment } from '../services/api';

const AudioRecorder = ({ prompt, onScoreReceived, onAudioRecorded }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);

    const startRecording = async () => {
        try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        chunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
            chunksRef.current.push(event.data);
            }
        };

        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
            setAudioBlob(blob);
            onAudioRecorded(blob); // Send the blob to parent component
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
        } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Error accessing microphone. Please ensure microphone permissions are granted.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    const handleSubmit = async () => {
        if (!audioBlob) return;

        setIsProcessing(true);
        try {
        const result = await sendAudioForAssessment(audioBlob, prompt);
        onScoreReceived(result.score);
        } catch (error) {
        console.error('Error submitting audio:', error);
        alert('Failed to process audio. Please try again.');
        } finally {
        setIsProcessing(false);
        }
    };

    return (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-col items-center space-y-4">
            <div className="text-lg font-medium mb-2">
            {isRecording ? '録音中... (Recording...)' : '録音準備完了 (Ready to record)'}
            </div>

            <div className="flex space-x-4">
            <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`px-6 py-2 rounded-full font-medium ${
                isRecording
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
                disabled={isProcessing}
            >
                {isRecording ? '停止 (Stop)' : '録音開始 (Start)'}
            </button>

            {audioBlob && !isRecording && (
                <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-medium"
                disabled={isProcessing}
                >
                {isProcessing ? '処理中... (Processing...)' : '送信 (Submit)'}
                </button>
            )}
            </div>
        </div>
        </div>
    );
};

export default AudioRecorder;
