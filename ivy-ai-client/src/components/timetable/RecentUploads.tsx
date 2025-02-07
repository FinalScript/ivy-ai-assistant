import React from 'react';
import { RefreshCw } from 'lucide-react';
import { RecentUpload } from '../../types/timetable';
import { FilePreview } from './FilePreview';
import { formatFileSize } from '../../utils/formatters';

interface RecentUploadsProps {
    uploads: RecentUpload[];
    isLoading: boolean;
    onRetryProcessing: (fileId: string) => void;
    isProcessing: boolean;
}

export const RecentUploads: React.FC<RecentUploadsProps> = ({ uploads, isLoading, onRetryProcessing, isProcessing }) => {
    if (isLoading) {
        return (
            <div className='mt-8 border-t pt-8'>
                <h3 className='text-lg font-semibold mb-4'>Recent Uploads</h3>
                <div className='flex justify-center'>
                    <span className='loading loading-spinner loading-md'></span>
                </div>
            </div>
        );
    }

    if (!uploads.length) return null;

    return (
        <div className='mt-8 border-t pt-8'>
            <h3 className='text-lg font-semibold mb-4'>Recent Uploads</h3>
            <div className='grid gap-4'>
                {uploads.map((upload) => (
                    <div key={upload.fileId} className='flex items-center gap-4 p-4 bg-base-200 rounded-lg'>
                        <FilePreview upload={upload} />
                        <div className='flex-1'>
                            <p className='font-medium'>{upload.fileName}</p>
                            <p className='text-sm text-base-content/70'>
                                {new Date(upload.uploadedAt).toLocaleDateString()} - {formatFileSize(upload.size)}
                            </p>
                        </div>
                        <button 
                            className='btn btn-ghost btn-sm' 
                            onClick={() => onRetryProcessing(upload.fileId)} 
                            disabled={isProcessing}
                        >
                            <RefreshCw className='w-4 h-4' />
                            <span className='ml-2'>Retry Processing</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}; 