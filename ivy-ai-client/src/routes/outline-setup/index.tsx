import { useMutation } from '@apollo/client';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { AlertCircle, Book, Check, Loader2, Sparkles, Upload, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Course } from '../../__generated__/graphql';
import { PROCESS_OUTLINES } from '../../graphql/outline';
import { supabase } from '../../lib/supabase';
import { validateFile } from '../../utils/fileUtils';
import { getFileIcon } from '../../utils/iconUtils';

const MAX_FILES = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB;

interface UploadedFile {
    file: File;
    preview?: string;
    status: 'uploading' | 'processing' | 'error' | 'ready';
    error?: string;
    fileId?: string;
    courseCode?: string;
}

interface CourseUploadState {
    courseCode: string;
    files: UploadedFile[];
}

export const Route = createFileRoute('/outline-setup/')({
    component: OutlineSetup,
});

export function OutlineSetup() {
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);
    const [courseUploads, setCourseUploads] = useState<CourseUploadState[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);

    const [processOutlines, { loading: processingOutlines }] = useMutation(PROCESS_OUTLINES, {
        onCompleted: (data) => {
            if (data.processOutlines?.success) {
                router.navigate({
                    to: '/outline-setup/review',
                    search: {
                        courses: data.processOutlines.courses as Course[],
                    },
                });
            } else {
                setError(data.processOutlines?.message || 'Processing failed');
            }
        },
        onError: (error) => {
            setError(error.message);
            console.error('Processing error:', error);
        },
    });

    useEffect(() => {
        // Get courses from router state
        const state = window.history.state;
        if (state?.courses) {
            setCourses(state.courses);
            // Initialize courseUploads with empty arrays for each course
            setCourseUploads(
                state.courses.map((course: Course) => ({
                    courseCode: course.code,
                    files: [],
                }))
            );
        } else {
            // If no courses in state, redirect back to timetable setup
            router.navigate({ to: '/timetable-setup/review' });
        }
    }, [router]);

    useEffect(() => {
        const getCurrentUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) {
                return;
            }
            setUserId(user.id);
        };

        getCurrentUser();
    }, []);

    const handleFiles = useCallback(
        (files: File[], courseCode: string) => {
            setError(null);

            const courseUpload = courseUploads.find((cu) => cu.courseCode === courseCode);
            if (!courseUpload) return;

            if (courseUpload.files.length + files.length > MAX_FILES) {
                setError(`You can only upload up to ${MAX_FILES} files per course`);
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
                    courseCode,
                };

                if (file.type.startsWith('image/')) {
                    fileObj.preview = URL.createObjectURL(file);
                }

                newFiles.push(fileObj);
            }

            setCourseUploads((prev) =>
                prev.map((cu) =>
                    cu.courseCode === courseCode
                        ? {
                              ...cu,
                              files: [...cu.files, ...newFiles],
                          }
                        : cu
                )
            );
        },
        [courseUploads]
    );

    const removeFile = useCallback(
        (courseCode: string, index: number) => {
            setCourseUploads((prev) =>
                prev.map((cu) => {
                    if (cu.courseCode !== courseCode) return cu;

                    const newFiles = [...cu.files];
                    const file = newFiles[index];

                    if (file.preview) {
                        URL.revokeObjectURL(file.preview);
                    }

                    newFiles.splice(index, 1);
                    return { ...cu, files: newFiles };
                })
            );
            setError(null);
        },
        []
    );

    const uploadToSupabase = async (file: File): Promise<string> => {
        const filePath = `${userId}/outlines/${file.name}`;
        const { error: uploadError } = await supabase.storage.from('outlines').upload(filePath, file);

        if (uploadError) {
            throw new Error('Failed to upload file to storage');
        }

        return filePath;
    };

    const handleSubmit = async () => {
        try {
            // Update all files to uploading status
            setCourseUploads((prev) =>
                prev.map((cu) => ({
                    ...cu,
                    files: cu.files.map((file) => ({
                        ...file,
                        status: 'uploading',
                    })),
                }))
            );

            // Upload files for each course
            const uploadPromises = courseUploads.map(async (courseUpload) => {
                const filePromises = courseUpload.files.map(async (uploadedFile) => {
                    try {
                        const fileId = await uploadToSupabase(uploadedFile.file);
                        return {
                            ...uploadedFile,
                            status: 'ready' as const,
                            fileId,
                        };
                    } catch {
                        return {
                            ...uploadedFile,
                            status: 'error' as const,
                            error: 'Failed to upload file',
                        };
                    }
                });

                const updatedFiles = await Promise.all(filePromises);
                return {
                    ...courseUpload,
                    files: updatedFiles,
                };
            });

            const updatedCourseUploads = await Promise.all(uploadPromises);
            setCourseUploads(updatedCourseUploads);

            // Check if any uploads failed
            const hasFailedUploads = updatedCourseUploads.some((cu) => cu.files.some((f) => f.status === 'error'));
            if (hasFailedUploads) {
                setError('Some files failed to upload');
                return;
            }

            // Process the outlines with uploaded file IDs
            const courseOutlines = updatedCourseUploads.map((cu) => ({
                courseCode: cu.courseCode,
                fileIds: cu.files.map((f) => f.fileId!),
            }));

            await processOutlines({
                variables: {
                    courseOutlines,
                },
            });
        } catch {
            setError('Failed to process files');
            setCourseUploads((prev) =>
                prev.map((cu) => ({
                    ...cu,
                    files: cu.files.map((file) => ({
                        ...file,
                        status: 'ready',
                    })),
                }))
            );
        }
    };

    const CourseUploadCard = ({ course, courseUpload }: { course: Course; courseUpload: CourseUploadState }) => {
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop: (files) => handleFiles(files, course.code),
            accept: {
                'application/pdf': ['.pdf'],
                'application/msword': ['.doc'],
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                'image/jpeg': ['.jpg', '.jpeg'],
                'image/png': ['.png'],
            },
            maxSize: MAX_FILE_SIZE,
            maxFiles: MAX_FILES - courseUpload.files.length,
            disabled: courseUpload.files.length >= MAX_FILES || processingOutlines,
        });

        return (
            <div className='card bg-base-100 shadow-xl backdrop-blur-lg bg-opacity-90'>
                <div className='card-body p-6'>
                    {/* Course Header */}
                    <div className='flex items-center gap-3 mb-4'>
                        <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center'>
                            <Book className='w-6 h-6 text-primary' />
                        </div>
                        <div>
                            <h3 className='text-lg font-bold'>{course.code}</h3>
                            <p className='text-sm text-base-content/70 truncate max-w-[250px]'>{course.name}</p>
                        </div>
                    </div>

                    {/* Upload Zone */}
                    <div className='relative group mb-4'>
                        <div
                            {...getRootProps()}
                            className={`relative border-2 border-dashed rounded-lg p-6 text-center backdrop-blur-sm transition-all cursor-pointer
                                ${isDragActive ? 'border-primary bg-primary/5' : 'border-primary/30 hover:border-primary hover:bg-primary/5'}
                                ${courseUpload.files.length >= MAX_FILES || processingOutlines ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <input {...getInputProps()} />
                            <div className='flex flex-col items-center gap-2'>
                                <div className='w-10 h-10 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center'>
                                    <Upload className='w-5 h-5 text-primary group-hover:text-secondary transition-colors' />
                                </div>
                                <div>
                                    <p className='text-sm font-medium'>
                                        {courseUpload.files.length >= MAX_FILES ? 'Maximum files reached' : 'Drop files here'}
                                    </p>
                                    <p className='text-xs text-base-content/50 mt-1'>
                                        {courseUpload.files.length}/{MAX_FILES} files • Max 5MB each
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* File List */}
                    <div className='space-y-2'>
                        {courseUpload.files.map((uploadedFile, index) => (
                            <div
                                key={index}
                                className='flex items-center justify-between p-3 bg-base-200/50 backdrop-blur-sm rounded-lg border border-base-300'>
                                <div className='flex items-center gap-3 flex-1 min-w-0'>
                                    <div className='w-8 h-8 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden flex-shrink-0'>
                                        {uploadedFile.preview ? (
                                            <img src={uploadedFile.preview} alt='Preview' className='w-full h-full object-cover' />
                                        ) : (
                                            getFileIcon(uploadedFile.file)
                                        )}
                                    </div>
                                    <div className='min-w-0'>
                                        <p className='font-medium text-sm truncate'>{uploadedFile.file.name}</p>
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
                                                {uploadedFile.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className='btn btn-ghost btn-sm btn-circle flex-shrink-0'
                                    onClick={() => removeFile(course.code, index)}
                                    disabled={processingOutlines}>
                                    <X className='w-4 h-4 hover:text-error transition-colors' />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    if (!userId || !courses.length) {
        return (
            <div className='min-h-screen bg-base-200 pt-20 pb-8 px-4 flex justify-center items-center'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-base-200 to-base-300 pt-24 pb-8 px-4'>
            <div className='max-w-6xl w-full mx-auto flex flex-col gap-10'>
                {/* Header */}
                <div className='flex flex-col items-center gap-3'>
                    <div className='flex items-center gap-3'>
                        <Book className='w-8 h-8 text-primary' />
                        <h1 className='text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
                            Course Outlines
                        </h1>
                        <Sparkles className='w-8 h-8 text-secondary' />
                    </div>
                    <p className='text-base-content/70 text-center max-w-2xl'>
                        Upload course outlines for each of your courses. You can upload up to {MAX_FILES} files per course.
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className='alert alert-error py-2 px-3 min-h-0'>
                        <AlertCircle className='w-4 h-4' />
                        <span className='text-sm'>{error}</span>
                    </div>
                )}

                {/* Action Buttons */}
                <div className='flex justify-center gap-4'>
                    <button
                        className='btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-200 
                            hover:scale-[1.02] backdrop-blur-lg bg-primary/90 px-8'
                        disabled={
                            courseUploads.every((cu) => cu.files.length === 0) ||
                            courseUploads.some((cu) => cu.files.some((f) => f.status === 'error' || f.status === 'uploading')) ||
                            processingOutlines
                        }
                        onClick={handleSubmit}>
                        {processingOutlines ? (
                            <>
                                <Loader2 className='w-5 h-5 mr-2 animate-spin' />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Check className='w-5 h-5 mr-2' />
                                Process Outlines
                            </>
                        )}
                    </button>
                </div>

                {/* Course Upload Cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
                    {courses.map((course) => {
                        const courseUpload = courseUploads.find((cu) => cu.courseCode === course.code);
                        if (!courseUpload) return null;
                        return <CourseUploadCard key={course.code} course={course} courseUpload={courseUpload} />;
                    })}
                </div>

                {/* Review Page Button */}
                <div className='flex justify-center pb-8'>
                    <button
                        className='btn btn-outline btn-wide'
                        onClick={() => {
                            if (!courses.length) return;
                            const coursesWithOutlines = courses.map(course => ({
                                ...course,
                                outline: `Sample outline for ${course.code}\n\nThis is a temporary outline for testing the review page layout and functionality.`
                            }));
                            sessionStorage.setItem('outlineReviewCourses', JSON.stringify(coursesWithOutlines));
                            router.navigate({ to: '/outline-setup/review' });
                        }}>
                        Preview Course Outlines
                    </button>
                </div>
            </div>
        </div>
    );
} 