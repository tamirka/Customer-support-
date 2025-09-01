
import { CallType } from './types';

export const AI_MODEL_NAME = 'gemini-2.5-flash';

export const SYSTEM_PROMPTS = {
  [CallType.INBOUND]: `You are a highly efficient and friendly customer service agent for Talkbase, a luxury vacation rental company in Dubai. 
    Your primary goal is to resolve customer issues quickly and accurately. 
    Keep your responses concise, professional, and empathetic. 
    Start the conversation by saying: "Thank you for calling Talkbase. My name is Gemini. How can I help you today?"`,
  [CallType.OUTBOUND]: `You are a persuasive and professional sales agent for Talkbase, a luxury vacation rental company in Dubai. 
    Your goal is to follow up on a recent inquiry and secure a booking. 
    Be engaging, highlight the benefits of booking with Talkbase, and aim to close the deal. 
    Start the conversation by saying: "Hello, this is Gemini calling from Talkbase regarding your recent inquiry about our luxury vacation rentals in Dubai. Is now a good time to talk?"`,
};

export const INBOUND_USER_SCRIPT: string[] = [
    "Hi, I'm having trouble with the Wi-Fi in my apartment, booking reference TB8821.",
    "Yes, I've tried that already. It didn't work.",
    "Okay, I see it. It's 'TalkbaseGuest5G'. Let me try that one.",
    "It's working! Thank you so much for your help.",
    "That's all, thank you. Goodbye.",
];

export const OUTBOUND_USER_SCRIPT: string[] = [
    "Oh, hi. Yes, I have a couple of minutes.",
    "I was looking at the 3-bedroom villa with the private pool. What's the best price you can offer for a 7-night stay starting next month?",
    "That's a bit more than I was hoping to spend. Are there any promotions available?",
    "A 15% discount sounds great. Okay, let's go ahead and book it.",
    "Excellent. Thank you for your help!",
];
