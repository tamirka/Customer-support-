
import React from 'react';
import { Header } from './components/Header';
import { CallPanel } from './components/CallPanel';

const App: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4 selection:bg-blue-500/30">
        <div className="w-full max-w-4xl h-[90vh] max-h-[800px] bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl shadow-blue-500/10 flex flex-col">
            <Header />
            <main className="flex-1 p-6 overflow-hidden">
                <CallPanel />
            </main>
        </div>
        <footer className="text-center p-4 text-xs text-gray-500">
            Powered by Gemini | Talkbase AI Call Center v1.0
        </footer>
    </div>
  );
};

export default App;
