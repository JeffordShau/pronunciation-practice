import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const sendAudioForAssessment = async (audioBlob, prompt) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');
    formData.append('text', prompt);

    try {
        const response = await axios.post(`${API_BASE_URL}/api/assess`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to assess pronunciation');
    }
};
