
import React from 'react';
import { CallStatus, SystemStatus } from '../types';
import { StatusIndicator } from './StatusIndicator';

interface ControlBarProps {
    callStatus: CallStatus;
    systemStatus: SystemStatus;
    onEndCall: () => void;
}

export const ControlBar: React.FC<ControlBarProps> = ({ callStatus, systemStatus, onEndCall }) => {
    return (
        <div className="flex-shrink-0 p-4 mt-4 bg-gray-800/60 border-t border-gray-700 rounded-b-xl flex items-center justify-between">
            <StatusIndicator status={systemStatus} />
            {callStatus === CallStatus.ACTIVE && (
                <button
                    onClick={onEndCall}
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-500 rounded-lg font-semibold transition-colors duration-200"
                >
                    End Call
                </button>
            )}
            {callStatus === CallStatus.ENDED && (
                 <button
                    onClick={onEndCall}
                    className="px-5 py-2.5 bg-gray-600 hover:bg-gray-500 rounded-lg font-semibold transition-colors duration-200"
                >
                    New Call
                </button>
            )}
        </div>
    );
};
