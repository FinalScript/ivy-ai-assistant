import React from 'react';
import { Bot } from 'lucide-react';
import { ProcessingStatus as ProcessingStatusType } from '../../types/timetable';

interface ProcessingStatusProps {
    status: ProcessingStatusType;
    selectedFilesCount: number;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ status, selectedFilesCount }) => {
    if (status.status === 'UPLOADING') {
        return (
            <div className='flex flex-col items-center justify-center gap-4'>
                <div className='loading loading-spinner loading-lg'></div>
                <p className='text-base-content/70'>
                    Uploading {selectedFilesCount} {selectedFilesCount === 1 ? 'file' : 'files'}...
                </p>
                <div className='w-full max-w-xs'>
                    <progress className='progress progress-primary w-full' value={status.progress} max='100'></progress>
                </div>
            </div>
        );
    }

    if (status.status === 'PROCESSING') {
        return (
            <div className='flex flex-col items-center justify-center gap-6 animate-fade-in'>
                <div className='relative'>
                    <div className='w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center'>
                        <Bot className='w-10 h-10 text-primary animate-bounce' />
                    </div>
                    <div className='absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary/20 animate-pulse delay-75'></div>
                    <div className='absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-primary/20 animate-pulse delay-150'></div>
                    <div className='absolute top-1/2 -right-3 w-3 h-3 rounded-full bg-primary/20 animate-pulse delay-300'></div>
                </div>
                <div className='text-center'>
                    <p className='text-lg font-semibold text-primary mb-2'>
                        Processing your {selectedFilesCount === 1 ? 'file' : 'files'}...
                    </p>
                    <p className='text-base-content/70'>This might take a few moments...</p>
                </div>
                <div className='w-full max-w-xs'>
                    <progress className='progress progress-primary w-full' value={status.progress} max='100'></progress>
                </div>
            </div>
        );
    }

    return null;
}; 