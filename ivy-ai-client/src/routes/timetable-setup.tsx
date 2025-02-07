import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Upload, FileCheck, Bot, ChevronDown, ChevronUp, Edit2, Clock, MapPin, RefreshCw } from 'lucide-react';
import { useMutation, useSubscription } from '@apollo/client';
import { supabase } from '../lib/supabase';
import { PROCESS_TIMETABLE, PROCESSING_STATUS_SUBSCRIPTION } from '../graphql/timetable';

interface Course {
    code: string;
    name: string;
    description?: string;
    term: string;
    sections: {
        section_id: string;
        instructor: {
            name: string;
            email: string;
            office: {
                location: string;
                hours: {
                    day: string;
                    start_time: string;
                    end_time: string;
                    location: string;
                }[];
            };
        };
        schedule: {
            day: string;
            start_time: string;
            end_time: string;
            location: string;
            type: string;
            is_rescheduled: boolean;
        }[];
    }[];
}

interface RecentUpload {
    fileId: string;
    fileName: string;
    uploadedAt: string;
    size: number;
    url?: string;
    type: string;
}

export const Route = createFileRoute('/timetable-setup')({
    component: TimetableSetup,
});

function TimetableSetup() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [currentFileId, setCurrentFileId] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [parsedCourses, setParsedCourses] = useState<Course[]>([]);
    const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({});
    const [editingCourse, setEditingCourse] = useState<string | null>(null);
    const [recentUploads, setRecentUploads] = useState<RecentUpload[]>([]);
    const [loadingUploads, setLoadingUploads] = useState(false);
    const navigate = useNavigate();

    const [processTimetable] = useMutation(PROCESS_TIMETABLE);

    const { data: statusData } = useSubscription(PROCESSING_STATUS_SUBSCRIPTION, {
        variables: {
            fileId: currentFileId || '',
        },
        skip: !currentFileId,
        onData: ({ data: { data } }) => {
            console.log('Subscription data:', data);
            if (data?.processingStatusUpdated) {
                const { status, message } = data.processingStatusUpdated;
                if (status === 'ERROR') {
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

    useEffect(() => {
        const fetchRecentUploads = async () => {
            if (!userId) return;

            setLoadingUploads(true);
            try {
                const { data: files, error } = await supabase.storage.from('schedules').list(userId, {
                    limit: 5,
                    sortBy: { column: 'created_at', order: 'desc' },
                });

                if (error) throw error;

                if (files) {
                    const uploadsWithUrls = await Promise.all(
                        files.map(async (file) => {
                            const {
                                data: { publicUrl },
                            } = supabase.storage.from('schedules').getPublicUrl(`${userId}/${file.name}`);

                            console.log(`${userId}/${file.name}`);

                            return {
                                fileId: `${userId}/${file.name}`,
                                fileName: file.name.split('-')[0],
                                uploadedAt: file.created_at || new Date().toISOString(),
                                size: file.metadata?.size || 0,
                                url: publicUrl,
                                type: file.metadata?.mimetype || 'application/octet-stream',
                            };
                        })
                    );
                    setRecentUploads(uploadsWithUrls);
                }
            } catch (error) {
                console.error('Error fetching recent uploads:', error);
            } finally {
                setLoadingUploads(false);
            }
        };

        fetchRecentUploads();
    }, [userId]);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !userId) return;

        setSelectedFile(file);
        setUploadError(null);

        const fileName = `${file.name.split('.')[0]}-${Date.now()}`;
        const filePath = `${userId}/${fileName}`;
        setCurrentFileId(filePath);

        supabase.storage
            .from('schedules')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
            })
            .then(() =>
                processTimetable({
                    variables: { fileId: filePath },
                })
            )
            .then(({ data }) => {
                if (!data?.processTimetable.success) {
                    throw new Error(data?.processTimetable.message || 'Failed to process file');
                }
                setParsedCourses(data.processTimetable.courses);
            })
            .catch((error) => {
                console.error('Upload/Process error:', error);
                setUploadError(error instanceof Error ? error.message : 'Failed to upload and process file. Please try again.');
                setCurrentFileId(null);
            });
    };

    const toggleCourseExpanded = (courseCode: string) => {
        setExpandedCourses((prev) => ({
            ...prev,
            [courseCode]: !prev[courseCode],
        }));
    };

    const formatTime = (isoTime: string) => {
        return new Date(isoTime).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    const renderCourseReview = () => {
        if (!parsedCourses.length) return null;

        return (
            <div className='space-y-4 mt-8'>
                <h3 className='text-xl font-semibold mb-4'>Review Extracted Courses</h3>
                {parsedCourses.map((course) => (
                    <div key={course.code} className='card bg-base-200 shadow-sm'>
                        <div className='card-body p-4'>
                            <div className='flex items-center justify-between cursor-pointer' onClick={() => toggleCourseExpanded(course.code)}>
                                <div>
                                    <h4 className='text-lg font-medium'>
                                        {course.code} - {course.name}
                                    </h4>
                                    <p className='text-sm text-base-content/70'>{course.term}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <button
                                        className='btn btn-ghost btn-sm'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditingCourse(course.code);
                                        }}>
                                        <Edit2 className='w-4 h-4' />
                                    </button>
                                    {expandedCourses[course.code] ? <ChevronUp className='w-5 h-5' /> : <ChevronDown className='w-5 h-5' />}
                                </div>
                            </div>

                            {expandedCourses[course.code] && (
                                <div className='mt-4 space-y-4'>
                                    {course.description && <p className='text-sm text-base-content/80'>{course.description}</p>}

                                    {course.sections.map((section) => (
                                        <div key={section.section_id} className='bg-base-100 rounded-lg p-4'>
                                            <h5 className='font-medium mb-2'>Section {section.section_id}</h5>

                                            {section.instructor.name && (
                                                <div className='mb-3'>
                                                    <p className='text-sm font-medium'>Instructor</p>
                                                    <p className='text-sm'>{section.instructor.name}</p>
                                                    {section.instructor.email && <p className='text-sm text-base-content/70'>{section.instructor.email}</p>}
                                                </div>
                                            )}

                                            <div className='space-y-2'>
                                                {section.schedule.map((scheduleItem, idx) => (
                                                    <div key={idx} className='flex items-start gap-3 text-sm'>
                                                        <div className='flex items-center gap-1 min-w-[120px]'>
                                                            <Clock className='w-4 h-4' />
                                                            <span>{scheduleItem.day}</span>
                                                        </div>
                                                        <div className='flex items-center gap-1'>
                                                            <span>
                                                                {formatTime(scheduleItem.start_time)} - {formatTime(scheduleItem.end_time)}
                                                            </span>
                                                        </div>
                                                        <div className='flex items-center gap-1 ml-4'>
                                                            <MapPin className='w-4 h-4' />
                                                            <span>{scheduleItem.location}</span>
                                                        </div>
                                                        <span className='badge badge-sm'>{scheduleItem.type}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                <div className='flex justify-end gap-4 mt-6'>
                    <button
                        className='btn btn-ghost'
                        onClick={() => {
                            setParsedCourses([]);
                            setCurrentFileId(null);
                        }}>
                        Cancel
                    </button>
                    <button
                        className='btn btn-primary'
                        onClick={() => {
                            // TODO: Save courses to database
                            navigate({ to: '/dashboard' });
                        }}>
                        Save Courses
                    </button>
                </div>
            </div>
        );
    };

    const handleRetryProcessing = (fileId: string) => {
        setCurrentFileId(fileId);

        processTimetable({
            variables: { fileId },
        })
            .then(({ data }) => {
                if (!data?.processTimetable.success) {
                    throw new Error(data?.processTimetable.message || 'Failed to process file');
                }
                setParsedCourses(data.processTimetable.courses);
            })
            .catch((error) => {
                console.error('Process error:', error);
                setUploadError(error instanceof Error ? error.message : 'Failed to process file. Please try again.');
                setCurrentFileId(null);
            });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const renderFilePreview = (upload: RecentUpload) => {
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

    const renderRecentUploads = () => {
        if (loadingUploads) {
            return (
                <div className='mt-8 border-t pt-8'>
                    <h3 className='text-lg font-semibold mb-4'>Recent Uploads</h3>
                    <div className='flex justify-center'>
                        <span className='loading loading-spinner loading-md'></span>
                    </div>
                </div>
            );
        }

        if (!recentUploads.length) return null;

        return (
            <div className='mt-8 border-t pt-8'>
                <h3 className='text-lg font-semibold mb-4'>Recent Uploads</h3>
                <div className='grid gap-4'>
                    {recentUploads.map((upload) => (
                        <div key={upload.fileId} className='flex items-center gap-4 p-4 bg-base-200 rounded-lg'>
                            {renderFilePreview(upload)}
                            <div className='flex-1'>
                                <p className='font-medium'>{upload.fileName}</p>
                                <p className='text-sm text-base-content/70'>
                                    {new Date(upload.uploadedAt).toLocaleDateString()} - {formatFileSize(upload.size)}
                                </p>
                            </div>
                            <button className='btn btn-ghost btn-sm' onClick={() => handleRetryProcessing(upload.fileId)} disabled={currentFileId !== null}>
                                <RefreshCw className='w-4 h-4' />
                                <span className='ml-2'>Retry Processing</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderProcessingStatus = () => {
        if (parsedCourses.length > 0) {
            return renderCourseReview();
        }

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
            return (
                <>
                    {renderUploadUI()}
                    {renderRecentUploads()}
                </>
            );
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
            case 'ERROR':
            default:
                return (
                    <>
                        {renderUploadUI()}
                        {renderRecentUploads()}
                    </>
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
