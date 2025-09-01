
import React, { useEffect, useRef } from 'react';
import { Message, Sender } from '../types';

interface TranscriptViewProps {
    transcript: Message[];
}

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isAI = message.sender === Sender.AI;
    const bubbleClasses = isAI
        ? 'bg-blue-600/50 rounded-br-none'
        : 'bg-gray-700 rounded-bl-none self-end';
    const wrapperClasses = isAI ? 'justify-start' : 'justify-end';

    return (
        <div className={`flex w-full ${wrapperClasses} animate-fade-in`}>
            <div className={`max-w-xl p-4 rounded-2xl ${bubbleClasses}`}>
                <p className="text-white whitespace-pre-wrap">{message.text}</p>
                <p className="text-xs text-gray-400 mt-2 text-right">{message.timestamp}</p>
            </div>
        </div>
    );
};


export const TranscriptView: React.FC<TranscriptViewProps> = ({ transcript }) => {
    const endOfMessagesRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [transcript]);

    return (
        <div className="flex-1 overflow-y-auto p-4 bg-gray-900/50 rounded-lg scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            <div className="space-y-6">
                {transcript.map((msg, index) => (
                    <MessageBubble key={index} message={msg} />
                ))}
                <div ref={endOfMessagesRef} />
            </div>
        </div>
    );
};
