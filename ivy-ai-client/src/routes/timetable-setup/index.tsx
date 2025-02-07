import { useMutation } from '@apollo/client';
import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router';
import { Calendar, Sparkles, AlertCircle, Upload, Check, X, Loader2, Clock } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Course } from '../../__generated__/graphql';
import { PROCESS_TIMETABLE } from '../../graphql/timetable';
import { useRecentUploads } from '../../hooks/useRecentUploads';
import { supabase } from '../../lib/supabase';
import { RecentUpload } from '../../types/timetable';
import { validateFile, getMimeType, isImageFile } from '../../utils/fileUtils';
import { getFileIcon, getRecentFileIcon } from '../../utils/iconUtils';

const MAX_FILES = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB;

interface UploadedFile {
    file: File;
    preview?: string;
    status: 'uploading' | 'processing' | 'error' | 'ready';
    error?: string;
    fileId?: string;
    isRecent?: boolean; // Flag to indicate if this is a recent file
}

export const Route = createFileRoute('/timetable-setup/')({
    component: TimetableSetup,
});

export function TimetableSetup() {
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);
    const [parsedCourses, setParsedCourses] = useState<Course[]>([]);
    const { recentUploads, loadingUploads } = useRecentUploads(userId);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [addedRecentFileIds, setAddedRecentFileIds] = useState<Set<string>>(new Set());

    const [processTimetable, { loading: processingTimetable }] = useMutation(PROCESS_TIMETABLE, {
        onCompleted: (data) => {
            if (data.processTimetable?.success) {
                console.log('Processed data:', data.processTimetable);

                router.navigate({
                    to: '/timetable-setup/review',
                    state: {
                        courses: data.processTimetable.courses as Course[],
                    },
                } as any);
            } else {
                setError(data.processTimetable?.message || 'Processing failed');
            }
        },
        onError: (error) => {
            setError(error.message);
            console.error('Processing error:', error);
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
    }, [router]);

    const handleFiles = useCallback(
        (files: File[]) => {
            setError(null);

            if (uploadedFiles.length + files.length > MAX_FILES) {
                setError(`You can only upload up to ${MAX_FILES} files`);
                return;
            }

            const newFiles: UploadedFile[] = [];

            for (const file of files) {
                const validationError = validateFile(file, MAX_FILE_SIZE);

                if (validationError) {
                    setError(validationError);
                    continue;
                }

                const fileObj: UploadedFile = {
                    file,
                    status: 'ready',
                };

                // Generate preview for images
                if (file.type.startsWith('image/')) {
                    fileObj.preview = URL.createObjectURL(file);
                }

                newFiles.push(fileObj);
            }

            setUploadedFiles((prev) => [...prev, ...newFiles]);
        },
        [uploadedFiles]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleFiles,
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
        },
        maxSize: MAX_FILE_SIZE,
        maxFiles: MAX_FILES - uploadedFiles.length,
        disabled: uploadedFiles.length >= MAX_FILES || processingTimetable,
    });

    const removeFile = useCallback((index: number) => {
        setUploadedFiles((prev) => {
            const file = prev[index];
            const newFiles = [...prev];
            if (newFiles[index].preview) {
                URL.revokeObjectURL(newFiles[index].preview!);
            }
            // If it's a recent file, remove it from the tracking set
            if (file.isRecent && file.fileId) {
                setAddedRecentFileIds((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(file.fileId!);
                    return newSet;
                });
            }
            newFiles.splice(index, 1);
            return newFiles;
        });
        setError(null);
    }, []);

    const addRecentFileToUploads = useCallback(
        async (recentFile: RecentUpload) => {
            // If already added, don't do anything
            if (addedRecentFileIds.has(recentFile.fileId)) {
                return;
            }

            if (uploadedFiles.length >= MAX_FILES) {
                setError(`You can only upload up to ${MAX_FILES} files`);
                return;
            }

            try {
                if (!recentFile.url) {
                    setError('File URL not available');
                    return;
                }

                // Download the file from the URL
                const response = await fetch(recentFile.url);
                const blob = await response.blob();

                // Create a File object with proper MIME type
                const mimeType = getMimeType(recentFile.fileName);
                const file = new File([blob], recentFile.fileName, { type: mimeType });

                const validationError = validateFile(file, MAX_FILE_SIZE);
                if (validationError) {
                    setError(validationError);
                    return;
                }

                const fileObj: UploadedFile = {
                    file,
                    status: 'ready',
                    isRecent: true,
                    fileId: recentFile.fileId,
                };

                // Generate preview for images
                if (isImageFile(recentFile.fileName)) {
                    fileObj.preview = recentFile.url;
                }

                setUploadedFiles((prev) => [...prev, fileObj]);
                setAddedRecentFileIds((prev) => new Set([...prev, recentFile.fileId]));
            } catch (error) {
                setError('Failed to add recent file');
            }
        },
        [uploadedFiles, addedRecentFileIds]
    );

    const uploadToSupabase = async (file: File): Promise<string> => {
        const fileExt = file.name.split('.').pop();
        const filePath = `${userId}/${file.name}`;

        const { error: uploadError, data } = await supabase.storage.from('schedules').upload(filePath, file);

        if (uploadError) {
            throw new Error('Failed to upload file to storage');
        }

        return filePath;
    };

    const handleSubmit = async () => {
        if (uploadedFiles.length === 0) return;

        try {
            // Update all files to uploading status
            setUploadedFiles((prev) =>
                prev.map((file) => ({
                    ...file,
                    status: file.isRecent ? 'ready' : 'uploading',
                }))
            );

            // Upload only non-recent files to Supabase
            const uploadPromises = uploadedFiles.map(async (uploadedFile) => {
                // If it's a recent file, just return it as is
                if (uploadedFile.isRecent) {
                    return uploadedFile;
                }

                try {
                    const fileId = await uploadToSupabase(uploadedFile.file);
                    return {
                        ...uploadedFile,
                        status: 'ready' as const,
                        fileId,
                    };
                } catch (error) {
                    return {
                        ...uploadedFile,
                        status: 'error' as const,
                        error: 'Failed to upload file',
                    };
                }
            });

            const updatedFiles = await Promise.all(uploadPromises);
            setUploadedFiles(updatedFiles);

            // Check if any uploads failed
            const failedUploads = updatedFiles.filter((file) => file.status === 'error');
            if (failedUploads.length > 0) {
                setError('Some files failed to upload');
                return;
            }

            // Process the timetable with uploaded file IDs
            const fileIds = updatedFiles.map((file) => file.fileId!);

            await processTimetable({
                variables: {
                    fileIds,
                },
            });
        } catch (error) {
            setError('Failed to process files');
            // Reset files to ready state
            setUploadedFiles((prev) =>
                prev.map((file) => ({
                    ...file,
                    status: 'ready',
                }))
            );
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
        <div className='min-h-screen bg-gradient-to-b from-base-200 to-base-300 flex items-center justify-center p-3'>
            <div className='max-w-4xl w-full mx-auto relative flex flex-col items-center justify-center gap-10'>
                {/* Decorative Elements */}
                <div className='flex items-center gap-3'>
                    <Calendar className='w-8 h-8 text-primary' />
                    <h1 className='text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>Schedule Setup</h1>
                    <Sparkles className='w-8 h-8 text-secondary' />
                </div>

                <div className='flex flex-col lg:flex-row gap-4 w-full'>
                    {/* Main Upload Area */}
                    <div className={`flex-1 ${!recentUploads || recentUploads.length === 0 ? 'lg:max-w-2xl lg:mx-auto' : 'lg:max-w-none'}`}>
                        <div className='card bg-base-100 shadow-xl backdrop-blur-lg bg-opacity-90'>
                            <div className='card-body p-4'>
                                <div className='text-center space-y-3'>
                                    <div className='space-y-1.5'>
                                        <h2 className='text-xl font-bold'>Upload Your Schedule</h2>
                                        <p className='text-base-content/70 text-base max-w-2xl mx-auto'>
                                            Get started by uploading your classes schedule or timetable.
                                        </p>
                                    </div>
                                    <div className='flex flex-col items-center gap-1.5'>
                                        <p className='text-xs font-medium text-base-content/60'>Supported File Types:</p>
                                        <div className='flex justify-center gap-1.5 text-xs'>
                                            <span className='px-2 py-1 rounded-full bg-primary/10 text-primary font-medium'>PDF</span>
                                            <span className='px-2 py-1 rounded-full bg-secondary/10 text-secondary font-medium'>Word</span>
                                            <span className='px-2 py-1 rounded-full bg-accent/10 text-accent font-medium'>Images</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className='alert alert-error py-2 px-3 mb-3 min-h-0'>
                                        <AlertCircle className='w-4 h-4' />
                                        <span className='text-sm'>{error}</span>
                                    </div>
                                )}

                                {/* Drag and Drop Zone */}
                                <div className='relative group mt-3'>
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-lg transition-all ${isDragActive ? 'blur-2xl' : 'blur-lg'}`}></div>
                                    <div
                                        {...getRootProps()}
                                        className={`relative border-2 border-dashed rounded-lg p-6 text-center backdrop-blur-sm transition-all cursor-pointer
                                            ${isDragActive ? 'border-primary bg-primary/5' : 'border-primary/30 hover:border-primary hover:bg-primary/5'}
                                            ${uploadedFiles.length >= MAX_FILES || processingTimetable ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        <input {...getInputProps()} />
                                        <div className='flex flex-col items-center gap-4'>
                                            <div
                                                className={`w-12 h-12 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center transition-transform ${isDragActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                                                <Upload className='w-6 h-6 text-primary group-hover:text-secondary transition-colors' />
                                            </div>
                                            <div className='space-y-1'>
                                                {uploadedFiles.length >= MAX_FILES ? (
                                                    <p className='font-semibold text-base text-base-content/70'>Maximum files reached</p>
                                                ) : (
                                                    <>
                                                        <p className='font-semibold text-base'>
                                                            {isDragActive ? 'Drop your files here' : 'Drop your schedule here'}
                                                        </p>
                                                        <p className='text-sm text-base-content/70'>
                                                            or <span className='text-primary font-medium'>click to browse</span>
                                                        </p>
                                                    </>
                                                )}
                                                <p className='text-xs text-base-content/50'>
                                                    {uploadedFiles.length}/{MAX_FILES} files • Max 5MB each
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Uploaded Files List */}
                                <div className='space-y-2 mt-3'>
                                    {uploadedFiles.map((uploadedFile, index) => (
                                        <div
                                            key={index}
                                            className='flex items-center justify-between p-3 bg-base-200/50 backdrop-blur-sm rounded-lg border border-base-300'>
                                            <div className='flex items-center gap-3'>
                                                <div className='w-10 h-10 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden'>
                                                    {uploadedFile.preview ? (
                                                        <img src={uploadedFile.preview} alt='Preview' className='w-full h-full object-cover' />
                                                    ) : (
                                                        getFileIcon(uploadedFile.file)
                                                    )}
                                                </div>
                                                <div>
                                                    <p className='font-medium text-base'>{uploadedFile.file.name}</p>
                                                    <div className='flex items-center gap-2 text-xs text-base-content/70'>
                                                        <span>{(uploadedFile.file.size / (1024 * 1024)).toFixed(1)} MB</span>
                                                        <span className='w-1 h-1 rounded-full bg-base-content/30'></span>
                                                        <span
                                                            className={`flex items-center gap-1 ${
                                                                uploadedFile.status === 'error'
                                                                    ? 'text-error'
                                                                    : uploadedFile.status === 'processing'
                                                                      ? 'text-warning'
                                                                      : uploadedFile.status === 'ready'
                                                                        ? 'text-success'
                                                                        : ''
                                                            }`}>
                                                            <Check className='w-3 h-3' />
                                                            {uploadedFile.status === 'uploading'
                                                                ? 'Uploading...'
                                                                : uploadedFile.status === 'processing'
                                                                  ? 'Processing...'
                                                                  : uploadedFile.status === 'error'
                                                                    ? uploadedFile.error
                                                                    : 'Ready'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                className='btn btn-ghost btn-sm btn-circle'
                                                onClick={() => removeFile(index)}
                                                disabled={processingTimetable}>
                                                <X className='w-4 h-4 hover:text-error transition-colors' />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Submit Button */}
                                <div className='mt-4'>
                                    <button
                                        className='btn btn-primary w-full btn-sm h-12 text-base hover:scale-[1.02] transition-transform'
                                        disabled={
                                            uploadedFiles.length === 0 ||
                                            uploadedFiles.some((f) => f.status === 'error' || f.status === 'uploading') ||
                                            processingTimetable
                                        }
                                        onClick={handleSubmit}>
                                        {processingTimetable ? (
                                            <>
                                                <Loader2 className='w-5 h-5 mr-2 animate-spin' />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Check className='w-5 h-5 mr-2' />
                                                Generate Timetable
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Uploads Sidebar */}
                    {recentUploads && recentUploads.length > 0 && (
                        <div className='lg:w-80'>
                            <div className='card bg-base-100 shadow-xl backdrop-blur-lg bg-opacity-90'>
                                <div className='card-body p-4'>
                                    <div className='flex items-center gap-2 mb-3'>
                                        <div className='w-8 h-8 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center'>
                                            <Clock className='w-4 h-4 text-primary' />
                                        </div>
                                        <h3 className='text-lg font-semibold'>Recent Uploads</h3>
                                    </div>

                                    {loadingUploads ? (
                                        <div className='flex justify-center py-6'>
                                            <span className='loading loading-spinner loading-md text-primary'></span>
                                        </div>
                                    ) : (
                                        <div className='space-y-2'>
                                            {recentUploads.map((upload, index: number) => {
                                                const isAdded = addedRecentFileIds.has(upload.fileId);
                                                return (
                                                    <div
                                                        key={index}
                                                        onClick={() => !isAdded && !processingTimetable && addRecentFileToUploads(upload)}
                                                        className={`group flex items-center gap-2 p-2.5 bg-base-200/50 backdrop-blur-sm rounded-lg border border-base-300 transition-all 
                                                            ${
                                                                isAdded || processingTimetable
                                                                    ? 'opacity-50 cursor-not-allowed'
                                                                    : 'hover:bg-base-200 cursor-pointer hover:scale-[1.02]'
                                                            }`}>
                                                        <div className='relative'>
                                                            <div className='w-8 h-8 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 transition-all overflow-hidden'>
                                                                {isImageFile(upload.fileName) && upload.url ? (
                                                                    <img src={upload.url} alt='Preview' className='w-full h-full object-cover' />
                                                                ) : (
                                                                    getRecentFileIcon(upload.fileName)
                                                                )}
                                                            </div>
                                                            {/* Add indicator */}
                                                            {!isAdded && !processingTimetable && (
                                                                <div className='absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-content flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg'>
                                                                    +
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className='flex-1 min-w-0'>
                                                            <p className='font-medium text-sm truncate'>{upload.fileName}</p>
                                                            <p className='text-xs text-base-content/70'>{new Date(upload.uploadedAt).toLocaleTimeString()}</p>
                                                        </div>
                                                        {/* Add tooltip */}
                                                        {!isAdded && !processingTimetable && (
                                                            <div className='opacity-0 group-hover:opacity-70 transition-opacity text-xs text-base-content/70'>
                                                                Click to add
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
