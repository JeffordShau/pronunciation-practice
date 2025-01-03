import React from 'react';

const PromptCard = ({ prompt, isSelected, onSelect }) => {
    return (
        <div 
        className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
            isSelected 
            ? 'bg-blue-100 border-2 border-blue-500' 
            : 'bg-white border-2 border-gray-200 hover:border-blue-300'
        }`}
        onClick={onSelect}
        >
        <div className="flex items-center justify-between">
            <p className="text-lg font-medium">{prompt}</p>
            {isSelected && (
            <span className="text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </span>
            )}
        </div>
        </div>
    );
};

export default PromptCard;
