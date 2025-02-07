import { createFileRoute, useNavigate, useRouterState } from '@tanstack/react-router';
import { FileText, Upload, Check, AlertCircle, ChevronDown, ChevronRight, Edit3, Clock, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Course } from '../../__generated__/graphql';

interface CourseCardProps {
    course: Course;
    onEdit: (courseId: string) => void;
    onUploadOutline: (courseId: string) => void;
}

const CourseCard = ({ course, onEdit, onUploadOutline }: CourseCardProps) => {
    return (
        <div className='card bg-base-100 shadow-lg'>
            <div className='card-body p-4'>
                <div className='flex items-start justify-between'>
                    <div>
                        <h3 className='text-lg font-semibold flex items-center gap-2'>
                            <span className='px-2 py-0.5 rounded bg-primary/10 text-primary text-sm font-mono'>{course.code}</span>
                            <span>{course.name}</span>
                        </h3>
                        <p className='text-sm text-base-content/70 mt-1'>{course.description || 'No description available'}</p>
                        <div className='flex items-center gap-3 mt-2 text-sm text-base-content/70'>
                            <span className='flex items-center gap-1'>
                                <Clock className='w-4 h-4' />
                                {course.term}
                            </span>
                            {course?.sections?.[0]?.schedule?.[0] && (
                                <span className='flex items-center gap-1'>
                                    <MapPin className='w-4 h-4' />
                                    {course.sections[0].schedule[0].location}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <button className='btn btn-ghost btn-sm' onClick={() => onEdit(course.code)}>
                            <Edit3 className='w-4 h-4' />
                            Edit
                        </button>
                        <button className='btn btn-primary btn-sm' onClick={() => onUploadOutline(course.code)}>
                            <Upload className='w-4 h-4' />
                            Upload Outline
                        </button>
                    </div>
                </div>

                {/* Course Details Accordion */}
                <div className='collapse collapse-arrow mt-4 bg-base-200/50'>
                    <input type='checkbox' />
                    <div className='collapse-title text-sm font-medium py-2'>View Details</div>
                    <div className='collapse-content'>
                        <div className='space-y-4 pt-2'>
                            {course?.sections?.map((section, index) => (
                                <div key={index} className='space-y-2'>
                                    <h4 className='font-medium'>Section {section?.section_id}</h4>

                                    {/* Instructor Info */}
                                    <div className='bg-base-100 rounded-lg p-3'>
                                        <p className='font-medium'>{section?.instructor?.name}</p>
                                        <p className='text-sm text-base-content/70'>{section?.instructor?.email}</p>
                                        {section?.instructor?.office && (
                                            <div className='mt-2 text-sm'>
                                                <p className='text-base-content/70'>Office: {section?.instructor?.office?.location}</p>
                                                {section?.instructor?.office?.hours?.map((hour, idx) => (
                                                    <p key={idx} className='text-base-content/70'>
                                                        {hour?.day}: {hour?.start_time} - {hour?.end_time}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Schedule */}
                                    <div className='space-y-1'>
                                        {section?.schedule?.map((item, idx) => (
                                            <div key={idx} className='flex items-center gap-2 text-sm'>
                                                <span className='w-20 font-medium'>{item?.day}</span>
                                                <span>
                                                    {item?.start_time} - {item?.end_time}
                                                </span>
                                                <span className='text-base-content/70'>• {item?.location}</span>
                                                <span className='badge badge-sm'>{item?.type}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Route = createFileRoute('/timetable-setup/review')({
    component: ReviewCourses,
});

function ReviewCourses() {
    const navigate = useNavigate();
    const routerState: any = useRouterState();
    const courses = (routerState.location.state?.courses as Course[]) || [];
    const [hasErrors, setHasErrors] = useState(false);

    useEffect(() => {
        // If no courses data, redirect back to upload page
        // if (!courses || courses.length === 0) {
        //     navigate({ to: '/timetable-setup' });
        //     return;
        // }

        // Check for any potential issues in the parsed data
        const errors = courses.some(
            (course) =>
                !course.code ||
                !course.name ||
                !course.sections ||
                course.sections.length === 0 ||
                course.sections.some((section) => !section?.instructor || !section?.schedule || section?.schedule?.length === 0)
        );
        setHasErrors(errors);
    }, [courses, navigate]);

    const handleEditCourse = (courseId: string) => {
        // Handle editing course
        console.log('Edit course:', courseId);
    };

    const handleUploadOutline = (courseId: string) => {
        // Handle uploading course outline
        console.log('Upload outline for:', courseId);
    };

    const handleConfirm = () => {
        // Handle confirmation and next steps
        console.log('Confirming courses:', courses);
    };

    if (!courses || courses.length === 0) {
        return (
            <div className='min-h-screen bg-gradient-to-b from-base-200 to-base-300 flex items-center justify-center'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-base-200 to-base-300 py-8 px-4 mt-14'>
            <div className='max-w-4xl mx-auto'>
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold mb-2'>Review Your Courses</h1>
                    <p className='text-base-content/70'>
                        We've parsed {courses.length} course
                        {courses.length !== 1 ? 's' : ''} from your schedule. Please review the information and upload course outlines.
                    </p>
                </div>

                {hasErrors && (
                    <div className='alert alert-warning mb-6'>
                        <AlertCircle className='w-5 h-5' />
                        <span>Some courses may have missing or incomplete information. Please review carefully.</span>
                    </div>
                )}

                <div className='space-y-4'>
                    {courses.map((course) => (
                        <CourseCard key={course.code} course={course} onEdit={handleEditCourse} onUploadOutline={handleUploadOutline} />
                    ))}
                </div>

                <div className='mt-8 flex justify-end gap-3'>
                    <button className='btn btn-ghost' onClick={() => navigate({ to: '/timetable-setup' })}>
                        Back to Upload
                    </button>
                    <button className='btn btn-primary' onClick={handleConfirm}>
                        <Check className='w-5 h-5 mr-2' />
                        Confirm and Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
