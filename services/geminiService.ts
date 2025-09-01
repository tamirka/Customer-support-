
import { GoogleGenAI, Chat } from "@google/genai";
import { AI_MODEL_NAME, SYSTEM_PROMPTS } from '../constants';
import { CallType, Message, Sender } from '../types';

let ai: GoogleGenAI | null = null;
if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

let chatSession: Chat | null = null;

export const startChatSession = (callType: CallType): void => {
    if (!ai) {
        console.error("Gemini API key not configured.");
        throw new Error("Gemini API key not configured.");
    }
    chatSession = ai.chats.create({
        model: AI_MODEL_NAME,
        config: {
            systemInstruction: SYSTEM_PROMPTS[callType],
            // Disable thinking for ultra-low latency, crucial for call center applications.
            thinkingConfig: { thinkingBudget: 0 }
        }
    });
};

export const getInitialGreeting = async (): Promise<Message> => {
    if (!chatSession) {
        throw new Error("Chat session not initialized.");
    }
    // For some models, the initial system prompt response needs a trigger.
    // We send an empty message or a simple greeting to get the conversation started.
    const response = await chatSession.sendMessage({ message: "Start conversation." });
    
    return {
        sender: Sender.AI,
        text: response.text,
        timestamp: new Date().toLocaleTimeString(),
    };
};


export const getAiResponse = async (userMessage: string): Promise<Message> => {
    if (!chatSession) {
        throw new Error("Chat session not initialized.");
    }
    try {
        const result = await chatSession.sendMessage({ message: userMessage });
        const text = result.text;

        return {
            sender: Sender.AI,
            text: text,
            timestamp: new Date().toLocaleTimeString(),
        };
    } catch (error) {
        console.error("Error getting AI response:", error);
        throw new Error("Failed to get response from AI.");
    }
};

export const endChatSession = (): void => {
    chatSession = null;
};
