
export enum CallType {
  INBOUND = 'inbound',
  OUTBOUND = 'outbound',
}

export enum CallStatus {
  IDLE = 'idle',
  ACTIVE = 'active',
  ENDED = 'ended',
}

export enum SystemStatus {
  READY = 'Ready',
  THINKING = 'Thinking',
  SPEAKING = 'Speaking',
  ERROR = 'Error',
}

export enum Sender {
    USER = 'User',
    AI = 'AI',
}

export interface Message {
  sender: Sender;
  text: string;
  timestamp: string;
}

export interface GroundingChunk {
  web: {
    uri: string;
    title: string;
  }
}
