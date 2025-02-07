import React from 'react';
import { RecentUpload } from '../../types/timetable';

interface FilePreviewProps {
    upload: RecentUpload;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ upload }) => {
    const isImage = upload.type.startsWith('image/');
    const isPDF = upload.type === 'application/pdf';
    const isDoc = upload.type.includes('word') || upload.type.includes('doc');

    if (isImage) {
        return (
            <div className='relative w-20 h-20 rounded-lg overflow-hidden bg-base-300'>
                <img src={upload.url} alt={upload.fileName} className='w-full h-full object-cover' />
            </div>
        );
    }

    if (isPDF) {
        return (
            <div className='relative w-20 h-20 rounded-lg overflow-hidden bg-base-300 flex items-center justify-center'>
                <div className='text-error text-2xl font-bold'>PDF</div>
            </div>
        );
    }

    if (isDoc) {
        return (
            <div className='relative w-20 h-20 rounded-lg overflow-hidden bg-base-300 flex items-center justify-center'>
                <div className='text-primary text-2xl font-bold'>DOC</div>
            </div>
        );
    }

    return (
        <div className='relative w-20 h-20 rounded-lg overflow-hidden bg-base-300 flex items-center justify-center'>
            <div className='text-base-content/50 text-2xl font-bold'>?</div>
        </div>
    );
}; 