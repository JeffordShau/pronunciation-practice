import React from 'react';

const ScoreDisplay = ({ score }) => {
    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-500';
        if (score >= 60) return 'text-yellow-500';
        return 'text-red-500';
    };

    const getScoreMessage = (score) => {
        if (score >= 80) return 'Excellent pronunciation!';
        if (score >= 60) return 'Good effort! Keep practicing.';
        return 'Need more practice. Try again!';
    };

    return (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Pronunciation Score</h2>
        <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
            {score}/100
        </div>
        <p className="mt-2 text-gray-600">{getScoreMessage(score)}</p>
        
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
            <div 
            className={`h-2.5 rounded-full ${getScoreColor(score)}`}
            style={{ width: `${score}%` }}
            ></div>
        </div>
        </div>
    );
};

export default ScoreDisplay;
