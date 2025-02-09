import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { AlertCircle, Clock, Edit3, Globe, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Course as BaseCoursetype } from '../__generated__/graphql';
import { CourseEditModal } from '../components/CourseEditModal';

// Extend the base Course type to include hasOutline
interface Course extends BaseCoursetype {
    hasOutline?: boolean;
}

// Mock data for courses
const mockCourses: Course[] = [
    {
        code: 'CS101',
        name: 'Introduction to Computer Science',
        description: 'Fundamental concepts of programming and computer science',
        term: 'Fall 2024',
        hasOutline: true,
        sections: [
            {
                section_id: 'L01',
                instructor: {
                    name: 'Dr. John Smith',
                    email: 'john.smith@university.edu',
                },
                schedule: [
                    {
                        day: 'Monday',
                        start_time: '09:00',
                        end_time: '10:20',
                        location: 'Room 101',
                        type: 'Lecture'
                    },
                    {
                        day: 'Wednesday',
                        start_time: '09:00',
                        end_time: '10:20',
                        location: 'Room 101',
                        type: 'Lecture'
                    }
                ]
            }
        ]
    },
    {
        code: 'MATH201',
        name: 'Linear Algebra',
        description: 'Study of linear equations, matrices, and vector spaces',
        term: 'Fall 2024',
        hasOutline: false,
        sections: [
            {
                section_id: 'L02',
                instructor: {
                    name: 'Dr. Sarah Johnson',
                    email: 'sarah.johnson@university.edu',
                },
                schedule: [
                    {
                        day: 'Tuesday',
                        start_time: '13:00',
                        end_time: '14:20',
                        location: 'Room 205',
                        type: 'Lecture'
                    },
                    {
                        day: 'Thursday',
                        start_time: '13:00',
                        end_time: '14:20',
                        location: 'Room 205',
                        type: 'Lecture'
                    }
                ]
            }
        ]
    },
    {
        code: 'PHYS202',
        name: 'Modern Physics',
        description: 'Introduction to quantum mechanics and special relativity',
        term: 'Fall 2024',
        hasOutline: true,
        sections: [
            {
                section_id: 'L01',
                instructor: {
                    name: 'Dr. Michael Chen',
                    email: 'michael.chen@university.edu',
                },
                schedule: [
                    {
                        day: 'Monday',
                        start_time: '14:30',
                        end_time: '15:50',
                        location: 'Physics Lab 1',
                        type: 'Lecture'
                    },
                    {
                        day: 'Wednesday',
                        start_time: '14:30',
                        end_time: '15:50',
                        location: 'Physics Lab 1',
                        type: 'Lab'
                    }
                ]
            }
        ]
    },
    {
        code: 'CHEM301',
        name: 'Organic Chemistry',
        description: 'Study of organic compounds and their reactions',
        term: 'Fall 2024',
        hasOutline: false,
        sections: [
            {
                section_id: 'L03',
                instructor: {
                    name: 'Dr. Emily Brown',
                    email: 'emily.brown@university.edu',
                },
                schedule: [
                    {
                        day: 'Tuesday',
                        start_time: '10:30',
                        end_time: '11:50',
                        location: 'Chemistry Lab A',
                        type: 'Lecture'
                    },
                    {
                        day: 'Friday',
                        start_time: '13:30',
                        end_time: '16:20',
                        location: 'Chemistry Lab A',
                        type: 'Lab'
                    }
                ]
            }
        ]
    },
    {
        code: 'PSYC101',
        name: 'Introduction to Psychology',
        description: 'Basic principles of human behavior and mental processes',
        term: 'Fall 2024',
        hasOutline: true,
        sections: [
            {
                section_id: 'L01',
                instructor: {
                    name: 'Dr. Robert Wilson',
                    email: 'robert.wilson@university.edu',
                },
                schedule: [
                    {
                        day: 'Monday',
                        start_time: '11:00',
                        end_time: '12:20',
                        location: 'Room 302',
                        type: 'Lecture'
                    },
                    {
                        day: 'Wednesday',
                        start_time: '11:00',
                        end_time: '12:20',
                        location: 'Room 302',
                        type: 'Lecture'
                    }
                ]
            }
        ]
    },
    {
        code: 'HIST205',
        name: 'World History',
        description: 'Survey of major historical events and developments',
        term: 'Fall 2024',
        hasOutline: false,
        sections: [
            {
                section_id: 'L02',
                instructor: {
                    name: 'Dr. Maria Garcia',
                    email: 'maria.garcia@university.edu',
                },
                schedule: [
                    {
                        day: 'Tuesday',
                        start_time: '15:30',
                        end_time: '16:50',
                        location: 'Room 405',
                        type: 'Lecture'
                    },
                    {
                        day: 'Thursday',
                        start_time: '15:30',
                        end_time: '16:50',
                        location: 'Room 405',
                        type: 'Lecture'
                    }
                ]
            }
        ]
    }
];

interface CourseCardProps {
    course: Course;
    onEdit: (courseId: string) => void;
}

const CourseCard = ({ course, onEdit }: CourseCardProps) => {
    const navigate = useNavigate();

    const handleCardClick = (e: React.MouseEvent) => {
        // Prevent navigation when clicking the edit button
        if ((e.target as HTMLElement).closest('button')) {
            return;
        }
        navigate({ 
            to: '/course',
            search: { courseId: course.code }
        });
    };

    return (
        <div
            onClick={handleCardClick}
            className='card bg-base-100 shadow-lg transition-all duration-500 border border-base-300/50 relative group overflow-hidden
            hover:shadow-[0_0_30px_-5px_rgba(var(--primary-rgb),0.3)] hover:border-primary/30
            animate-background-shine bg-[length:400%_100%] cursor-pointer
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
                    <div
                        className={`tooltip tooltip-bottom ${course.hasOutline ? 'tooltip-success' : 'tooltip-warning'}`}
                        data-tip={course.hasOutline ? 'Course outline uploaded' : 'Course outline not uploaded'}>
                        <span
                            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg 
                            ${course.hasOutline 
                                ? 'bg-success/10 hover:bg-success/20' 
                                : 'bg-warning/10 hover:bg-warning/20'} 
                            backdrop-blur-sm transition-all duration-300
                            animate-subtle-bounce [animation-delay:300ms]`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${course.hasOutline ? 'bg-success' : 'bg-warning'} animate-pulse`} />
                            Outline
                        </span>
                    </div>
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
                                <MapPin
                                    className='w-4 h-4 group-hover/outline:text-primary transition-colors
                                    animate-pulse [animation-duration:4s] [animation-delay:500ms]'
                                />
                            </div>
                            <div>
                                <div className='font-medium text-sm group-hover/outline:text-primary transition-colors'>Schedule</div>
                                {course.sections?.[0]?.schedule?.[0] && (
                                    <div className='text-xs text-base-content/60 animate-fade-in'>
                                        {course.sections[0].schedule[0].day} {course.sections[0].schedule[0].start_time} - {course.sections[0].schedule[0].end_time}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='text-xs text-base-content/60'>
                            {course.sections?.[0]?.schedule?.[0]?.location}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Route = createFileRoute('/courses')({
    component: CoursesPage,
});

function CoursesPage() {
    const [loading] = useState(false);
    const [error] = useState<string | null>(null);
    const [courses, setCourses] = useState<Course[]>(mockCourses);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

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

    if (loading) {
        return (
            <div className='min-h-screen bg-gradient-to-b from-base-200 to-base-300 flex items-center justify-center'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className='min-h-screen bg-gradient-to-b from-base-200 to-base-300 flex items-center justify-center p-4'>
                <div className='alert alert-error max-w-lg'>
                    <AlertCircle className='w-5 h-5' />
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-base-200 to-base-300 py-8 px-4 mt-14'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex justify-between items-center mb-8'>
                    <h2 className='text-2xl font-bold'>My Courses</h2>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {courses.map((course) => (
                        <CourseCard key={course.code} course={course} onEdit={handleEditCourse} />
                    ))}
                </div>

                {selectedCourse && (
                    <CourseEditModal
                        isOpen={editModalOpen}
                        onClose={() => {
                            setEditModalOpen(false);
                            setSelectedCourse(null);
                        }}
                        course={selectedCourse}
                        onSave={handleSaveCourse}
                    />
                )}
            </div>
        </div>
    );
} 