import { useState } from 'react';
import { useMutation, useSubscription } from '@apollo/client';
import { supabase } from '../lib/supabase';
import { PROCESS_TIMETABLE, PROCESSING_STATUS_SUBSCRIPTION } from '../graphql/timetable';
import { Course } from '../types/timetable';

interface UseTimetableUploadProps {
    userId: string | null;
    onSuccess: (courses: Course[]) => void;
}

export const useTimetableUpload = ({ userId, onSuccess }: UseTimetableUploadProps) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [currentFileId, setCurrentFileId] = useState<string | null>(null);

    const [processTimetable] = useMutation(PROCESS_TIMETABLE);

    const { data: statusData } = useSubscription(PROCESSING_STATUS_SUBSCRIPTION, {
        variables: {
            fileId: currentFileId || '',
        },
        skip: !currentFileId,
        onData: ({ data: { data } }) => {
            if (data?.processingStatusUpdated) {
                const { status, message } = data.processingStatusUpdated;
                if (status === 'ERROR') {
                    setUploadError(message);
                    setCurrentFileId(null);
                }
            }
        },
    });

    const handleFileSelect = (files: FileList | null) => {
        if (!files || !userId) return;

        const newFiles = Array.from(files);
        if (selectedFiles.length + newFiles.length > 3) {
            setUploadError('Maximum 3 files allowed');
            return;
        }

        const validFiles = newFiles.filter(file => {
            if (file.size > 5 * 1024 * 1024) {
                setUploadError(`File ${file.name} exceeds 5MB limit`);
                return false;
            }
            return true;
        });

        setSelectedFiles(prev => [...prev, ...validFiles]);
        setUploadError(null);
    };

    const handleSubmit = async () => {
        if (!userId || selectedFiles.length === 0) return;

        const filePaths: string[] = [];
        
        try {
            for (const file of selectedFiles) {
                const fileName = `${file.name.split('.')[0]}-${Date.now()}`;
                const filePath = `${userId}/${fileName}`;
                
                await supabase.storage
                    .from('schedules')
                    .upload(filePath, file, {
                        cacheControl: '3600',
                        upsert: false,
                    });
                
                filePaths.push(filePath);
            }

            setCurrentFileId(filePaths[0]);

            const { data } = await processTimetable({
                variables: { fileIds: filePaths },
            });

            if (!data?.processTimetable.success) {
                throw new Error(data?.processTimetable.message || 'Failed to process files');
            }

            setSelectedFiles([]);
            onSuccess(data.processTimetable.courses);
        } catch (error) {
            console.error('Upload/Process error:', error);
            
            await Promise.all(
                filePaths.map(path => 
                    supabase.storage
                        .from('schedules')
                        .remove([path])
                        .catch(console.error)
                )
            );
            
            let errorMessage = 'Failed to process files. Please try again.';
            if (error instanceof Error) {
                if (error.message.includes('Internal Server Error')) {
                    errorMessage = 'Our AI service is temporarily unavailable. Please try again in a few minutes.';
                } else {
                    errorMessage = error.message;
                }
            }
            setUploadError(errorMessage);
            setCurrentFileId(null);
            setSelectedFiles([]);
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        if (uploadError) setUploadError(null);
    };

    return {
        selectedFiles,
        uploadError,
        currentFileId,
        statusData,
        handleFileSelect,
        handleSubmit,
        removeFile,
    };
}; 