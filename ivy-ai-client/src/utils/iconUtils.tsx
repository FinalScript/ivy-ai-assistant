import { FileText, ImageIcon } from 'lucide-react';
import { isImageFile, isPdfFile, isWordFile } from './fileUtils';

export const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
        return null; // We'll show the preview instead
    }
    if (file.type.includes('pdf')) {
        return <FileText className='w-6 h-6 text-primary' />;
    }
    if (file.type.includes('word')) {
        return <FileText className='w-6 h-6 text-secondary' />;
    }
    return <FileText className='w-6 h-6 text-accent' />;
};

export const getRecentFileIcon = (fileName: string) => {
    if (isImageFile(fileName)) {
        return <ImageIcon className='w-4 h-4 text-accent' />;
    }
    if (isPdfFile(fileName)) {
        return <FileText className='w-4 h-4 text-primary' />;
    }
    if (isWordFile(fileName)) {
        return <FileText className='w-4 h-4 text-secondary' />;
    }
    return <FileText className='w-4 h-4 text-accent' />;
}; 