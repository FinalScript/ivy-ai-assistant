import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { AlertCircle, Book, Check, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Course as BaseCourse } from '../../__generated__/graphql';

// Extend the base Course type to include outline
interface Course extends BaseCourse {
    outline?: string;
}

interface CourseCardProps {
    course: Course;
}

export const Route = createFileRoute('/outline-setup/review')({
    component: ReviewOutlines,
});

const CourseCard = ({ course }: CourseCardProps) => {
    return (
        <div
            className={`card bg-base-100 shadow-lg transition-all duration-500 border border-base-300/50 
                relative group overflow-hidden
                hover:shadow-[0_0_30px_-5px_rgba(var(--primary-rgb),0.3)] hover:border-primary/30
                animate-background-shine bg-[length:400%_100%]
                bg-[linear-gradient(110deg,transparent,45%,var(--base-content-rgb)/2%,55%,transparent)]`}>
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

            {/* Course Content */}
            <div className='card-body p-4'>
                {/* Course Header */}
                <div className='mb-1 relative flex flex-col'>
                    <div className='font-mono text-sm bg-gradient-to-r from-primary/90 to-secondary/90 bg-clip-text text-transparent animate-gradient-shift [animation-duration:6s]'>
                        {course.code}
                    </div>
                    <h3 className='font-semibold text-base break-words group-hover:text-primary transition-colors'>{course.name}</h3>
                </div>

                {/* Course Details */}
                <div className='flex flex-wrap items-center gap-2 text-xs my-3'>
                    <span className='flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gradient-to-r from-base-200/50 to-base-300/50 backdrop-blur-sm'>
                        <Book className='w-3 h-3' />
                        {course.term}
                    </span>
                    <span className='flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gradient-to-r from-base-200/50 to-base-300/50 backdrop-blur-sm'>
                        <FileText className='w-3 h-3' />
                        {course.outline ? 'Outline Processed' : 'No Outline'}
                    </span>
                </div>

                {/* Outline Information */}
                {course.outline && (
                    <div className='mt-3 text-sm text-base-content/70 backdrop-blur-sm'>
                        <p className='whitespace-pre-wrap'>{course.outline}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

function ReviewOutlines() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Course[]>([]);
    const [hasErrors, setHasErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Mock data for when no courses are available
    const mockCourses: Course[] = [
        {
            id: '1',
            code: 'CS101',
            name: 'Introduction to Computer Science',
            term: 'Fall 2024',
            outline: 'Sample outline for CS101\n\nThis is a mock outline for testing the review page layout and functionality.',
        },
        {
            id: '2',
            code: 'MATH201',
            name: 'Linear Algebra',
            term: 'Fall 2024',
            outline: 'Sample outline for MATH201\n\nThis is a mock outline for testing the review page layout and functionality.',
        },
        {
            id: '3',
            code: 'PHYS101',
            name: 'Physics I',
            term: 'Fall 2024',
            outline: 'Sample outline for PHYS101\n\nThis is a mock outline for testing the review page layout and functionality.',
        },
    ];

    useEffect(() => {
        // Get courses from sessionStorage
        const coursesJson = sessionStorage.getItem('outlineReviewCourses');
        if (coursesJson) {
            try {
                const parsedCourses = JSON.parse(coursesJson);
                setCourses(parsedCourses);
            } catch (error) {
                console.error('Error parsing courses:', error);
                // Use mock data instead of redirecting
                setCourses(mockCourses);
            }
        } else {
            // Use mock data instead of redirecting
            setCourses(mockCourses);
        }
        // Always set loading to false after setting courses
        setIsLoading(false);
    }, [navigate]);

    useEffect(() => {
        // Check for any potential issues in the parsed data
        const errors = courses.some((course) => !course.outline);
        setHasErrors(errors);
    }, [courses]);

    const handleConfirm = () => {
        // Navigate to the dashboard
        navigate({ to: '/dashboard' });
    };

    if (isLoading) {
        return (
            <div className='min-h-screen bg-gradient-to-b from-base-200 to-base-300 flex items-center justify-center'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-base-200 py-8 px-4 mt-14 relative overflow-hidden'>
            {/* Animated Background Elements */}
            <div className='fixed inset-0 pointer-events-none overflow-hidden'>
                {/* Base gradient */}
                <div className='absolute inset-0 bg-gradient-to-br from-base-100 via-base-200 to-base-300' />

                {/* Animated background pattern */}
                <div className='absolute inset-0 opacity-10'>
                    {/* Huge top left orb */}
                    <div
                        className='absolute w-96 sm:w-[32rem] h-96 sm:h-[32rem] -top-48 -left-48 bg-primary rounded-full mix-blend-multiply filter blur-xl 
                        animate-[blob_15s_infinite]'></div>

                    {/* Small top right orb */}
                    <div
                        className='absolute w-32 sm:w-48 h-32 sm:h-48 top-20 -right-12 bg-secondary rounded-full mix-blend-multiply filter blur-xl 
                        animate-[blob_12s_infinite] [animation-delay:1s]'></div>

                    {/* Tiny center-left orb */}
                    <div
                        className='absolute w-24 sm:w-32 h-24 sm:h-32 top-1/2 -left-16 bg-accent rounded-full mix-blend-multiply filter blur-xl 
                        animate-[blob_10s_infinite] [animation-delay:2s]'></div>

                    {/* Medium bottom-center orb */}
                    <div
                        className='absolute w-64 sm:w-80 h-64 sm:h-80 -bottom-20 left-1/3 bg-primary rounded-full mix-blend-multiply filter blur-xl 
                        animate-[blob_18s_infinite] [animation-delay:3s]'></div>

                    {/* Large bottom right orb */}
                    <div
                        className='absolute w-80 sm:w-[28rem] h-80 sm:h-[28rem] -bottom-40 -right-32 bg-secondary rounded-full mix-blend-multiply filter blur-xl 
                        animate-[blob_14s_infinite] [animation-delay:4s]'></div>
                </div>
            </div>

            <div className='max-w-7xl mx-auto relative'>
                <div className='flex justify-between items-center mb-8'>
                    <h2 className='text-2xl font-bold'>Review Course Outlines</h2>
                    <button className='btn btn-primary' onClick={handleConfirm} disabled={hasErrors}>
                        <Check className='w-5 h-5 mr-2' />
                        Complete Setup
                    </button>
                </div>

                {hasErrors && (
                    <div className='flex justify-center mb-6'>
                        <div className='tooltip tooltip-bottom' data-tip='Some courses are missing outline information'>
                            <div className='flex items-center gap-3 px-4 py-2 rounded-lg bg-warning/10 backdrop-blur-sm border border-warning/20'>
                                <AlertCircle className='w-5 h-5 text-warning' />
                                <span className='text-sm font-medium text-warning'>Some courses are missing outline information</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {courses.map((course) => (
                        <CourseCard key={course.code} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
} 