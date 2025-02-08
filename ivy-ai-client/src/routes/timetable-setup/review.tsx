import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { AlertCircle, Check, Clock, Edit3, MapPin, Upload, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Course } from '../../__generated__/graphql';
import { CourseEditModal } from '../../components/CourseEditModal';

interface CourseCardProps {
    course: Course;
    onEdit: (courseId: string) => void;
    onUploadOutline: (courseId: string) => void;
    hasOutline?: boolean;
}

const CourseCard = ({ course, onEdit, onUploadOutline, hasOutline = false }: CourseCardProps) => {
    return (
        <div
            className='card bg-base-100 shadow-lg transition-all duration-500 border border-base-300/50 relative group overflow-hidden
            hover:shadow-[0_0_30px_-5px_rgba(var(--primary-rgb),0.3)] hover:border-primary/30
            animate-background-shine bg-[length:400%_100%]
            bg-[linear-gradient(110deg,transparent,45%,var(--base-content-rgb)/2%,55%,transparent)]'>
            {/* Ambient Corner Glow */}
            <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent opacity-40 blur-2xl' />
            <div className='absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-secondary/10 to-transparent opacity-40 blur-2xl' />

            {/* Animated Background Pattern */}
            <div
                className='absolute inset-0 opacity-[0.02] pointer-events-none 
                bg-[radial-gradient(circle_at_1px_1px,theme(colors.base.content)_1px,transparent_0)] [background-size:16px_16px] 
                animate-subtle-bounce
                group-hover:scale-[1.02] group-hover:rotate-[0.5deg] transition-transform duration-700 -z-[1]'
            />

            {/* Ambient Gradient Animation */}
            <div
                className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-30
                animate-gradient-shift [animation-duration:8s]'
            />

            {/* Multi-layered Gradient Glow Effects */}
            <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none'>
                {/* Primary glow layer */}
                <div className='absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 blur-xl' />
                {/* Secondary animated glow */}
                <div
                    className='absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 
                    animate-pulse [animation-duration:3s]'
                />
                {/* Shimmer effect */}
                <div
                    className='absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent 
                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out'
                />
            </div>

            {/* Edit Button with enhanced glow */}
            <button
                className='absolute top-3 right-3 btn btn-sm normal-case gap-2 
                    bg-base-200/80 hover:bg-primary/20 border-none
                    shadow-[0_0_10px_-3px_rgba(var(--base-content-rgb),0.1)]
                    backdrop-blur-sm transition-all duration-300
                    hover:shadow-[0_0_15px_-3px_rgba(var(--primary-rgb),0.5)]
                    hover:scale-105 group/edit z-10'
                onClick={(e) => {
                    e.stopPropagation();
                    onEdit(course.code);
                }}>
                <Edit3 className='w-4 h-4 group-hover/edit:text-primary transition-colors animate-pulse [animation-duration:4s]' />
                <span className='text-xs group-hover/edit:text-primary transition-colors'>Edit Course</span>
            </button>

            <div className='card-body p-4'>
                {/* Course Header with gradient text */}
                <div className='mb-1 relative'>
                    <div
                        className='font-mono text-sm bg-gradient-to-r from-primary/90 to-secondary/90 bg-clip-text text-transparent
                        animate-gradient-shift [animation-duration:6s]'>
                        {course.code}
                    </div>
                    <h3 className='font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors'>{course.name}</h3>
                </div>

                {/* Course Details with glowing badges */}
                <div className='flex items-center gap-2 text-xs my-3'>
                    <span
                        className='flex items-center gap-1.5 px-2 py-1 rounded-lg 
                        bg-gradient-to-r from-base-200/50 to-base-300/50 backdrop-blur-sm
                        shadow-[0_0_10px_-5px_rgba(var(--base-content-rgb),0.1)]
                        hover:shadow-[0_0_10px_-2px_rgba(var(--primary-rgb),0.3)] 
                        hover:bg-primary/10 transition-all duration-300
                        animate-subtle-bounce [animation-delay:100ms]'>
                        <Clock className='w-3 h-3 animate-pulse [animation-duration:4s]' />
                        {course.term}
                    </span>
                    <span
                        className='flex items-center gap-1.5 px-2 py-1 rounded-lg 
                        bg-gradient-to-r from-base-200/50 to-base-300/50 backdrop-blur-sm
                        shadow-[0_0_10px_-5px_rgba(var(--base-content-rgb),0.1)]
                        hover:shadow-[0_0_10px_-2px_rgba(var(--secondary-rgb),0.3)]
                        hover:bg-secondary/10 transition-all duration-300
                        animate-subtle-bounce [animation-delay:200ms]'>
                        <Globe className='w-3 h-3 animate-pulse [animation-duration:4s] [animation-delay:1s]' />
                        {course.sections?.length || 0} section{(course.sections?.length || 0) !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* Outline Section with enhanced effects */}
                <div className='rounded-xl p-3 relative group/outline overflow-hidden'>
                    {/* Ambient glow */}
                    <div className='absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3 animate-gradient-shift [animation-duration:10s]' />

                    {/* Animated gradient background */}
                    <div className='absolute inset-0 bg-gradient-to-br from-base-200/90 via-base-200/80 to-base-300/70 backdrop-blur-sm' />
                    <div
                        className='absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 opacity-0 
                        group-hover/outline:opacity-100 transition-opacity duration-500'
                    />
                    {/* Animated border glow */}
                    <div
                        className='absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 
                        group-hover/outline:opacity-100 transition-opacity duration-500 blur-xl'
                    />

                    <div className='relative flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <div
                                className='w-8 h-8 rounded-lg flex items-center justify-center 
                                bg-gradient-to-br from-base-300/90 to-base-300/70 backdrop-blur-sm
                                shadow-[0_0_15px_-5px_rgba(var(--base-content-rgb),0.15)]
                                group-hover/outline:shadow-[0_0_15px_-3px_rgba(var(--primary-rgb),0.5)]
                                group-hover/outline:bg-primary/10 transition-all duration-500
                                animate-subtle-bounce'>
                                <Upload
                                    className='w-4 h-4 group-hover/outline:text-primary transition-colors
                                    animate-pulse [animation-duration:4s] [animation-delay:500ms]
                                    group-hover/outline:animate-bounce [animation-duration:2s]'
                                />
                            </div>
                            <div>
                                <div className='font-medium text-sm group-hover/outline:text-primary transition-colors'>Course Outline</div>
                                <div className='text-xs text-base-content/60 animate-fade-in'>Enables AI schedule optimization</div>
                            </div>
                        </div>
                        <button
                            className='btn btn-sm bg-accent/90 hover:bg-accent-focus text-accent-content border-none
                                shadow-[0_0_15px_-5px_rgba(var(--accent-rgb),0.2)]
                                transition-all duration-300 hover:scale-105
                                hover:shadow-[0_0_15px_-3px_rgba(var(--accent-rgb),0.5)]
                                hover:animate-pulse [animation-duration:2s]
                                animate-subtle-bounce [animation-delay:300ms]'
                            onClick={(e) => {
                                e.stopPropagation();
                                onUploadOutline(course.code);
                            }}>
                            Upload
                        </button>
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
    const [courses, setCourses] = useState<Course[]>([]);
    const [hasErrors, setHasErrors] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

    // Get initial courses data from URL state
    useEffect(() => {
        const state = window.history.state;
        if (state?.courses) {
            setCourses(state.courses);
        }
    }, []);

    useEffect(() => {
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
    }, [courses]);

    const handleEditCourse = (courseId: string) => {
        const course = courses.find((c) => c.code === courseId);
        if (course) {
            setSelectedCourse(course);
            setEditModalOpen(true);
        }
    };

    const handleSaveCourse = (updatedCourse: Course) => {
        setCourses((prevCourses) => prevCourses.map((course) => (course.code === updatedCourse.code ? updatedCourse : course)));
        setEditModalOpen(false);
        setSelectedCourse(null);
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
            <div className='max-w-7xl mx-auto'>
                <div className='flex justify-between items-center mb-8'>
                    <h2 className='text-2xl font-bold'>Review Your Courses</h2>
                    <button className='btn btn-primary' onClick={handleConfirm} disabled={courses.length === 0 || hasErrors}>
                        <Check className='w-5 h-5 mr-2' />
                        Confirm and Continue
                    </button>
                </div>

                {hasErrors && (
                    <div className='alert alert-warning mb-6'>
                        <AlertCircle className='w-5 h-5' />
                        <span>Some courses have missing or incomplete information. Please review and edit as needed.</span>
                    </div>
                )}

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {courses.map((course) => (
                        <CourseCard key={course.code} course={course} onEdit={handleEditCourse} onUploadOutline={handleUploadOutline} />
                    ))}
                </div>

                {selectedCourse && (
                    <CourseEditModal
                        course={selectedCourse}
                        isOpen={editModalOpen}
                        onClose={() => {
                            setEditModalOpen(false);
                            setSelectedCourse(null);
                        }}
                        onSave={handleSaveCourse}
                    />
                )}
            </div>
        </div>
    );
}
