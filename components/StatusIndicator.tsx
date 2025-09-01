
import React from 'react';
import { SystemStatus } from '../types';

interface StatusIndicatorProps {
    status: SystemStatus;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
    const getStatusColor = () => {
        switch (status) {
            case SystemStatus.READY:
                return 'bg-green-500';
            case SystemStatus.THINKING:
                return 'bg-yellow-500 animate-pulse';
            case SystemStatus.SPEAKING:
                return 'bg-blue-500';
            case SystemStatus.ERROR:
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full transition-colors duration-300 ${getStatusColor()}`}></div>
            <span className="text-lg font-medium text-gray-300">
                Status: <span className="font-semibold text-white">{status}</span>
            </span>
        </div>
    );
};
