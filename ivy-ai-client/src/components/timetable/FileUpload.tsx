import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
    onFileSelect: (files: FileList | null) => void;
    selectedFiles: File[];
    onRemoveFile: (index: number) => void;
    onSubmit: () => void;
    error: string | null;
    isProcessing: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
    onFileSelect,
    selectedFiles,
    onRemoveFile,
    onSubmit,
    error,
    isProcessing,
}) => {
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onFileSelect(e.dataTransfer.files);
    };

    return (
        <div className='flex flex-col items-center gap-6'>
            {error && (
                <div className='alert alert-error w-full'>
                    <span>{error}</span>
                </div>
            )}
            <label
                className='flex flex-col items-center justify-center w-full h-64 border-2 border-base-content/20 border-dashed rounded-lg cursor-pointer hover:bg-base-200 transition-colors'
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <Upload className='w-12 h-12 text-base-content/50 mb-4' />
                    <p className='mb-2 text-sm text-base-content/70'>
                        <span className='font-semibold'>Click to upload</span> or drag and drop
                    </p>
                    <p className='text-xs text-base-content/50'>PDF, DOC, PNG, JPG (MAX. 5MB each, up to 3 files)</p>
                </div>
                <input
                    type='file'
                    className='hidden'
                    onChange={(e) => onFileSelect(e.target.files)}
                    accept='.pdf,.doc,.docx,.png,.jpg,.jpeg'
                    multiple
                />
            </label>

            {selectedFiles.length > 0 && (
                <div className='w-full'>
                    <div className='space-y-2'>
                        {selectedFiles.map((file, index) => (
                            <div key={index} className='flex items-center justify-between p-2 bg-base-200 rounded'>
                                <span className='text-sm'>{file.name}</span>
                                <button className='btn btn-ghost btn-xs' onClick={() => onRemoveFile(index)}>
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        className='btn btn-primary w-full mt-4'
                        onClick={onSubmit}
                        disabled={selectedFiles.length === 0 || isProcessing}
                    >
                        Process {selectedFiles.length > 1 ? 'Files' : 'File'}
                    </button>
                </div>
            )}
        </div>
    );
}; 