
import React, { useState, useEffect, useCallback } from 'react';
import { CallType, CallStatus, SystemStatus, Message, Sender } from '../types';
import { INBOUND_USER_SCRIPT, OUTBOUND_USER_SCRIPT } from '../constants';
import { TranscriptView } from './TranscriptView';
import { ControlBar } from './ControlBar';
import { startChatSession, getAiResponse, endChatSession, getInitialGreeting } from '../services/geminiService';

const CallTypeSelector: React.FC<{ onSelect: (type: CallType) => void }> = ({ onSelect }) => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-2xl font-bold text-gray-300 mb-4">Automated Call Center System</h2>
        <p className="text-gray-400 mb-8 max-w-md">
            Select a call type to begin a simulation. The system will use Gemini to generate responses with ultra-low latency.
        </p>
        <div className="flex space-x-4">
            <button onClick={() => onSelect(CallType.INBOUND)} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-105">
                Simulate Inbound Call
            </button>
            <button onClick={() => onSelect(CallType.OUTBOUND)} className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-105">
                Simulate Outbound Call
            </button>
        </div>
    </div>
);


export const CallPanel: React.FC = () => {
    const [callType, setCallType] = useState<CallType | null>(null);
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.IDLE);
    const [systemStatus, setSystemStatus] = useState<SystemStatus>(SystemStatus.READY);
    const [transcript, setTranscript] = useState<Message[]>([]);
    const [userScriptIndex, setUserScriptIndex] = useState(0);

    const resetState = useCallback(() => {
        setCallType(null);
        setCallStatus(CallStatus.IDLE);
        setSystemStatus(SystemStatus.READY);
        setTranscript([]);
        setUserScriptIndex(0);
        endChatSession();
    }, []);

    const handleAiResponse = useCallback(async (userMessage: string) => {
        setSystemStatus(SystemStatus.THINKING);
        try {
            const aiMessage = await getAiResponse(userMessage);
            setTranscript(prev => [...prev, aiMessage]);
            setSystemStatus(SystemStatus.READY);
        } catch (error) {
            console.error(error);
            setSystemStatus(SystemStatus.ERROR);
            const errorMessage: Message = {
                sender: Sender.AI,
                text: "I'm sorry, I encountered a system error. Please try again later.",
                timestamp: new Date().toLocaleTimeString()
            };
            setTranscript(prev => [...prev, errorMessage]);
        }
    }, []);

    const startCall = useCallback(async (type: CallType) => {
        if (!process.env.API_KEY) {
            alert("API_KEY environment variable not set. Cannot start call.");
            return;
        }
        
        setCallType(type);
        setCallStatus(CallStatus.ACTIVE);
        setSystemStatus(SystemStatus.THINKING);
        
        try {
            startChatSession(type);
            const initialMessage = await getInitialGreeting();
            setTranscript([initialMessage]);
            setSystemStatus(SystemStatus.READY);
        } catch (error) {
            console.error("Failed to initialize chat:", error);
            setSystemStatus(SystemStatus.ERROR);
            resetState();
        }
    }, [resetState]);

    useEffect(() => {
        if (systemStatus === SystemStatus.READY && callStatus === CallStatus.ACTIVE && callType) {
            const userScript = callType === CallType.INBOUND ? INBOUND_USER_SCRIPT : OUTBOUND_USER_SCRIPT;
            if (userScriptIndex < userScript.length) {
                const userMessageText = userScript[userScriptIndex];

                const userTurnTimeout = setTimeout(() => {
                    const userMessage: Message = {
                        sender: Sender.USER,
                        text: userMessageText,
                        timestamp: new Date().toLocaleTimeString(),
                    };
                    setTranscript(prev => [...prev, userMessage]);
                    setUserScriptIndex(prev => prev + 1);
                    handleAiResponse(userMessageText);
                }, 2000); // Simulate user thinking time

                return () => clearTimeout(userTurnTimeout);
            } else if(transcript.length > 1) { // Call ends after script is done
                const endTimeout = setTimeout(() => {
                    setCallStatus(CallStatus.ENDED);
                }, 3000);
                 return () => clearTimeout(endTimeout);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [systemStatus, callStatus, callType, userScriptIndex, handleAiResponse]);

    if (callStatus === CallStatus.IDLE) {
        return <CallTypeSelector onSelect={startCall} />;
    }

    return (
        <div className="flex flex-col h-full">
            <TranscriptView transcript={transcript} />
            <ControlBar
                callStatus={callStatus}
                systemStatus={systemStatus}
                onEndCall={resetState}
            />
        </div>
    );
};
