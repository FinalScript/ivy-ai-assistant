import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Course } from '../types/timetable';
import { useTimetableUpload } from '../hooks/useTimetableUpload';
import { useRecentUploads } from '../hooks/useRecentUploads';
import { FileUpload } from '../components/timetable/FileUpload';
import { CourseReview } from '../components/timetable/CourseReview';
import { RecentUploads } from '../components/timetable/RecentUploads';
import { ProcessingStatus } from '../components/timetable/ProcessingStatus';

export const Route = createFileRoute('/timetable-setup')({
    component: TimetableSetup,
});

function TimetableSetup() {
    const [userId, setUserId] = useState<string | null>(null);
    const [parsedCourses, setParsedCourses] = useState<Course[]>([]);
    const navigate = useNavigate();

    const {
        selectedFiles,
        uploadError,
        currentFileId,
        statusData,
        handleFileSelect,
        handleSubmit,
        removeFile,
    } = useTimetableUpload({
        userId,
        onSuccess: (courses) => setParsedCourses(courses),
    });

    const { recentUploads, loadingUploads } = useRecentUploads(userId);

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

    const handleRetryProcessing = () => {
        handleSubmit();
    };

    const renderProcessingStatus = () => {
        if (parsedCourses.length > 0) {
            return (
                <CourseReview
                    courses={parsedCourses}
                    onSave={() => navigate({ to: '/dashboard' })}
                    onCancel={() => {
                        setParsedCourses([]);
                    }}
                />
            );
        }

        if (!statusData?.processingStatusUpdated) {
            return (
                <>
                    <FileUpload
                        onFileSelect={handleFileSelect}
                        selectedFiles={selectedFiles}
                        onRemoveFile={removeFile}
                        onSubmit={handleSubmit}
                        error={uploadError}
                        isProcessing={!!currentFileId}
                    />
                    <RecentUploads
                        uploads={recentUploads}
                        isLoading={loadingUploads}
                        onRetryProcessing={handleRetryProcessing}
                        isProcessing={!!currentFileId}
                    />
                </>
            );
        }

        return (
            <ProcessingStatus
                status={statusData.processingStatusUpdated}
                selectedFilesCount={selectedFiles.length}
            />
        );
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

                            {renderProcessingStatus()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
