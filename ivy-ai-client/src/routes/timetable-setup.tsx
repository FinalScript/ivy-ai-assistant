import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Upload, FileCheck, Bot } from 'lucide-react';
import { useMutation, useSubscription } from '@apollo/client';
import { supabase } from '../lib/supabase';
import { PROCESS_TIMETABLE, PROCESSING_STATUS_SUBSCRIPTION } from '../graphql/timetable';

export const Route = createFileRoute('/timetable-setup')({
    component: TimetableSetup,
});

function TimetableSetup() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [currentFileId, setCurrentFileId] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const navigate = useNavigate();

    const [processTimetable] = useMutation(PROCESS_TIMETABLE);

    const { data: statusData } = useSubscription(PROCESSING_STATUS_SUBSCRIPTION, {
        variables: {
            fileId: currentFileId || '',
        },
        onData: ({ data: { data } }) => {
            console.log('Subscription data:', data);
            if (data?.processingStatusUpdated) {
                const { status, message } = data.processingStatusUpdated;
                if (status === 'COMPLETED') {
                    // Navigate to dashboard or show success message
                   
                } else if (status === 'ERROR') {
                    setUploadError(message);
                    setCurrentFileId(null);
                }
            }
        },
    });

    useEffect(() => {
        const getCurrentUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) {
                // navigate({ to: '/auth' });
                return;
            }
            setUserId(user.id);
        };

        getCurrentUser();
    }, [navigate]);

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !userId) return;

        setSelectedFile(file);
        setUploadError(null);

        // Create file path with user ID
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${file.name.substring(file.name.lastIndexOf('.'))}`;
        const filePath = `${userId}/${fileName}`;

        setCurrentFileId(filePath);

        console.log('Uploading file to supabase');

        supabase.storage
            .from('schedules')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
            })
            .then(({ error: uploadError }) => {
                if (uploadError) {
                    throw uploadError;
                }
                console.log('File uploaded to supabase');
                console.log('Processing file with GraphQL');
                
                return processTimetable({
                    variables: {
                        fileId: filePath,
                    },
                });
            })
            .then(({ data: processData }) => {
                if (!processData.processTimetable.success) {
                    setUploadError(processData.processTimetable.message || 'Failed to process file');
                    setCurrentFileId(null);
                }
            })
            .catch((error) => {
                console.error('Upload/Process error:', error);
                setUploadError('Failed to upload and process file. Please try again.');
                setCurrentFileId(null);
            });
    };

    const renderProcessingStatus = () => {
        const renderUploadUI = () => (
            <div className='flex flex-col items-center gap-6'>
                <label className='flex flex-col items-center justify-center w-full h-64 border-2 border-base-content/20 border-dashed rounded-lg cursor-pointer hover:bg-base-200 transition-colors'>
                    <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                        <Upload className='w-12 h-12 text-base-content/50 mb-4' />
                        <p className='mb-2 text-sm text-base-content/70'>
                            <span className='font-semibold'>Click to upload</span> or drag and drop
                        </p>
                        <p className='text-xs text-base-content/50'>PDF, DOC, PNG, JPG (MAX. 10MB)</p>
                    </div>
                    <input type='file' className='hidden' onChange={handleFileSelect} accept='.pdf,.doc,.docx,.png,.jpg,.jpeg' />
                </label>
            </div>
        );

        if (!statusData?.processingStatusUpdated) {
            return renderUploadUI();
        }

        const { status, message, progress } = statusData.processingStatusUpdated;

        switch (status) {
            case 'UPLOADING':
                return (
                    <div className='flex flex-col items-center justify-center gap-4'>
                        <div className='loading loading-spinner loading-lg'></div>
                        <p className='text-base-content/70'>{message}</p>
                        <div className='w-full max-w-xs'>
                            <progress className='progress progress-primary w-full' value={progress} max='100'></progress>
                        </div>
                    </div>
                );
            case 'PROCESSING':
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
                            <p className='text-lg font-semibold text-primary mb-2'>{message}</p>
                            <p className='text-base-content/70'>This might take a few moments...</p>
                        </div>
                        <div className='w-full max-w-xs'>
                            <progress className='progress progress-primary w-full' value={progress} max='100'></progress>
                        </div>
                    </div>
                );
            case 'COMPLETED':
                return (
                    <div className='flex flex-col gap-y-10'>
                        <div className='flex flex-col items-center justify-center gap-4 animate-fade-in'>
                            <div className='w-16 h-16 bg-success/20 rounded-full flex items-center justify-center'>
                                <FileCheck className='w-8 h-8 text-success' />
                            </div>
                            <p className='text-success'>{message}</p>
                            <div className='w-full max-w-xs'>
                                <progress className='progress progress-success w-full' value={progress} max='100'></progress>
                            </div>
                        </div>
                        {renderUploadUI()}
                    </div>
                );
            case 'ERROR':
            default:
                return renderUploadUI();
        }
    };

    if (!userId) {
        return (
            <div className='min-h-screen bg-base-200 pt-20 pb-8 px-4 flex justify-center items-center'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-base-200 pt-20 pb-8 px-4'>
            <div className='max-w-4xl mx-auto'>
                <div className='card bg-base-100 shadow-xl'>
                    <div className='card-body'>
                        <div className='text-center'>
                            <h2 className='text-2xl font-bold mb-4'>Upload Your Schedule</h2>
                            <p className='text-base-content/70 mb-8'>
                                Upload your class schedule or syllabus and we'll automatically extract your classes. We support PDF, DOC, and image files.
                            </p>

                            {uploadError && (
                                <div className='alert alert-error mb-4'>
                                    <span>{uploadError}</span>
                                </div>
                            )}

                            {renderProcessingStatus()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
