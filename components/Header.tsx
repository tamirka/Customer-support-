
import React from 'react';

const LogoIcon: React.FC = () => (
    <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
    </svg>
);


export const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm rounded-t-2xl flex-shrink-0">
            <div className="flex items-center space-x-3">
                <LogoIcon />
                <h1 className="text-xl font-bold text-gray-200">Talkbase AI</h1>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" title="System Online"></div>
        </header>
    );
};
