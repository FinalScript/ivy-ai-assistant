import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Calendar, Clock, Globe, GraduationCap, MapPin, Users, ChevronLeft, Target, Trophy, Brain } from 'lucide-react';
import { useState } from 'react';
import { Course as BaseCoursetype } from '../__generated__/graphql';

// Extend the base Course type to include hasOutline and outline
interface Course extends BaseCoursetype {
    hasOutline?: boolean;
    outline?: {
        assessments?: {
            title: string;
            type: string;
            due_date: string;
            description: string;
            weight: number | null;
            status: 'upcoming';
            location: string | null;
        }[];
    };
}

// Mock data for a single course
const mockCourse: Course = {
    code: 'COMP2401',
    name: 'Introduction to Systems Programming',
    description:
        'Introduction to system-level programming with fundamental OS concepts, procedures, primitive data types, user-defined types. Topics include memory management, process management, process coordination and synchronization, inter-process communication, file systems, networking, pointers, heap and stack memory management, and system/library calls.',
    term: 'Fall 2024',
    hasOutline: true,
    outline: {
        assessments: [
            {
                title: 'Weekly Progress Check Mini-Quizzes',
                type: 'quiz',
                due_date: '2024-09-13T23:59:00-05:00',
                description: 'Ungraded, multiple attempts allowed. Completion contributes to "Side Quest" mark.',
                weight: null,
                status: 'upcoming',
                location: null,
            },
            {
                title: 'In-Class Polls',
                type: 'quiz',
                due_date: '2024-12-08T23:59:00-05:00',
                description: 'Ungraded. Consistent completion contributes to "Side Quest" mark.',
                weight: null,
                status: 'upcoming',
                location: null,
            },
            {
                title: 'Unit Test 1',
                type: 'exam',
                due_date: '2024-10-16T18:00:00-05:00',
                description: 'Binary, base conversions, data types, C user I/O, compound data types, pointers (subject to change)',
                weight: 20,
                status: 'upcoming',
                location: 'TBD',
            },
            {
                title: 'Unit Test 2',
                type: 'exam',
                due_date: '2024-11-20T18:00:00-05:00',
                description: 'Dynamic memory, concurrency, processes, multithreading, building, sockets, signals, buffers (subject to change)',
                weight: 20,
                status: 'upcoming',
                location: 'TBD',
            },
            {
                title: 'Final Exam',
                type: 'exam',
                due_date: '2024-12-15T23:59:00-05:00',
                description: 'Closed book, in-person. Covers material from unit tests and mini-quizzes after the unit tests.',
                weight: 30,
                status: 'upcoming',
                location: 'TBD',
            },
            {
                title: 'Assignment 1',
                type: 'assignment',
                due_date: '2024-09-22T23:59:00-05:00',
                description: 'Binary and I/O (subject to change)',
                weight: 5,
                status: 'upcoming',
                location: null,
            },
            {
                title: 'Assignment 2',
                type: 'assignment',
                due_date: '2024-09-29T23:59:00-05:00',
                description: 'Arrays and Pass-By-Reference (subject to change)',
                weight: 5,
                status: 'upcoming',
                location: null,
            },
            {
                title: 'Assignment 3',
                type: 'assignment',
                due_date: '2024-10-06T23:59:00-05:00',
                description: 'Strings and Structures (subject to change)',
                weight: 5,
                status: 'upcoming',
                location: null,
            },
            {
                title: 'Assignment 4',
                type: 'assignment',
                due_date: '2024-10-13T23:59:00-05:00',
                description: 'Dynamic Memory (subject to change)',
                weight: 5,
                status: 'upcoming',
                location: null,
            },
            {
                title: 'Assignment 5',
                type: 'assignment',
                due_date: '2024-11-03T23:59:00-05:00',
                description: 'Makefiles and Complex Ownership (subject to change)',
                weight: 5,
                status: 'upcoming',
                location: null,
            },
            {
                title: 'Assignment 6',
                type: 'assignment',
                due_date: '2024-11-10T23:59:00-05:00',
                description: 'Multithreading (subject to change)',
                weight: 5,
                status: 'upcoming',
                location: null,
            },
            {
                title: 'Project 1',
                type: 'project',
                due_date: '2024-10-30T23:59:00-05:00',
                description: 'Binary, user I/O, arrays, structures, strings, pointers, code design (subject to change)',
                weight: null,
                status: 'upcoming',
                location: null,
            },
            {
                title: 'Project 2',
                type: 'project',
                due_date: '2024-11-27T23:59:00-05:00',
                description: 'Dynamic memory, multithreading, building, makefiles, code design (subject to change)',
                weight: null,
                status: 'upcoming',
                location: null,
            },
        ],
    },
    sections: [
        {
            section_id: 'L01',
            instructor: {
                name: 'Dr. John Smith',
                email: 'john.smith@university.edu',
                office: {
                    location: 'Science Building, Room 405',
                    hours: [
                        {
                            day: 'Monday',
                            start_time: '13:00',
                            end_time: '15:00',
                            location: 'Science Building, Room 405',
                        },
                        {
                            day: 'Wednesday',
                            start_time: '13:00',
                            end_time: '15:00',
                            location: 'Science Building, Room 405',
                        },
                    ],
                },
            },
            schedule: [
                {
                    day: 'Monday',
                    start_time: '09:00',
                    end_time: '10:20',
                    location: 'Room 101',
                    type: 'Lecture',
                },
                {
                    day: 'Wednesday',
                    start_time: '09:00',
                    end_time: '10:20',
                    location: 'Room 101',
                    type: 'Lecture',
                },
                {
                    day: 'Friday',
                    start_time: '14:00',
                    end_time: '15:20',
                    location: 'Computer Lab 2',
                    type: 'Lab',
                },
            ],
        },
        {
            section_id: 'L02',
            instructor: {
                name: 'Dr. Sarah Johnson',
                email: 'sarah.johnson@university.edu',
                office: {
                    location: 'Science Building, Room 410',
                    hours: [
                        {
                            day: 'Tuesday',
                            start_time: '14:00',
                            end_time: '16:00',
                            location: 'Science Building, Room 410',
                        },
                        {
                            day: 'Thursday',
                            start_time: '14:00',
                            end_time: '16:00',
                            location: 'Science Building, Room 410',
                        },
                    ],
                },
            },
            schedule: [
                {
                    day: 'Tuesday',
                    start_time: '11:00',
                    end_time: '12:20',
                    location: 'Room 102',
                    type: 'Lecture',
                },
                {
                    day: 'Thursday',
                    start_time: '11:00',
                    end_time: '12:20',
                    location: 'Room 102',
                    type: 'Lecture',
                },
                {
                    day: 'Friday',
                    start_time: '15:30',
                    end_time: '16:50',
                    location: 'Computer Lab 2',
                    type: 'Lab',
                },
            ],
        },
    ],
};

export const Route = createFileRoute('/course')({
    component: CoursePage,
    validateSearch: (search: Record<string, unknown>) => {
        return {
            courseId: search.courseId as string,
        };
    },
});

function UpcomingBadge() {
    return <div className='badge badge-warning badge-outline gap-2 p-3 group-hover/item:animate-pulse flex items-center justify-center'>upcoming</div>;
}

function formatDateTime(date: string) {
    const d = new Date(date);
    const month = d.toLocaleString('en-US', { month: 'short' });
    const day = d.getDate();
    const time = d.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
    return `${month} ${day} ${time}`;
}

function CoursePage() {
    const navigate = useNavigate();
    const [course] = useState<Course>(mockCourse);

    return (
        <div className='min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200 py-8 px-4 mt-14 relative overflow-hidden'>
            {/* Ambient background animations */}
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.primary)_1px,transparent_0)] opacity-[0.03] [background-size:24px_24px] animate-[grain_8s_steps(10)_infinite]' />
            <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 animate-gradient-shift [animation-duration:10s]' />

            <div className='max-w-7xl mx-auto space-y-8 relative'>
                {/* Course Header */}
                <div>
                    <button
                        onClick={() => navigate({ to: '/courses' })}
                        className='btn btn-ghost btn-sm gap-2 mb-6 hover:bg-base-200/50 group transition-all duration-300'>
                        <ChevronLeft className='w-4 h-4 transition-transform group-hover:-translate-x-1' />
                        Back to Courses
                    </button>
                    <div className='card bg-base-100 shadow-xl group relative overflow-hidden'>
                        {/* Card glow effects */}
                        <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700' />
                        <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(var(--primary-rgb),0.1)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700' />

                        <div className='card-body p-8 relative z-10'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-center gap-3'>
                                    <div className='font-mono text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient-shift [animation-duration:3s]'>
                                        {course.code}
                                    </div>
                                </div>
                                <h1 className='text-4xl font-bold mb-4 bg-gradient-to-br from-base-content to-base-content/70 bg-clip-text'>{course.name}</h1>
                                <p className='text-base-content/70 max-w-3xl text-lg leading-relaxed'>{course.description}</p>
                            </div>
                            <div className='flex flex-wrap gap-6 pt-4'>
                                <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-base-200/50 hover:bg-base-300/50 transition-colors'>
                                    <Calendar className='w-5 h-5 text-primary' />
                                    <span className='font-medium'>{course.term}</span>
                                </div>
                                <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-base-200/50 hover:bg-base-300/50 transition-colors'>
                                    <Users className='w-5 h-5 text-primary' />
                                    <span className='font-medium'>{course.sections?.length} sections</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Main Content */}
                    <div className='lg:col-span-2 space-y-8'>
                        {/* Course Outline Section */}
                        {course.hasOutline && course.outline && (
                            <div className='grid gap-8'>
                                {/* Exams */}
                                {course.outline.assessments?.some((a) => a.type === 'exam') && (
                                    <div className='card bg-base-100 shadow-xl hover:shadow-[0_0_30px_-5px_rgba(var(--primary-rgb),0.2)] transition-all duration-300'>
                                        <div className='card-body relative overflow-hidden group'>
                                            {/* Section background effects */}
                                            <div className='absolute inset-0 bg-gradient-to-br from-error/5 via-transparent to-error/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                                            <div className='card-title text-xl mb-6 pb-2 border-b border-base-300 flex items-center gap-3 w-full'>
                                                <Target className='w-6 h-6 text-error animate-pulse' />
                                                <span>Exams</span>
                                            </div>
                                            <div className='grid gap-4'>
                                                {course.outline.assessments
                                                    .filter((a) => a.type === 'exam')
                                                    .map((assessment, index) => (
                                                        <div
                                                            key={index}
                                                            className='group/item flex items-start justify-between p-4 bg-base-200 rounded-lg
                            hover:bg-base-300/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden'>
                                                            {/* Item hover effects */}
                                                            <div className='absolute inset-0 bg-gradient-to-r from-error/10 via-transparent to-error/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300' />

                                                            <div className='space-y-2 relative z-10'>
                                                                <div className='font-medium text-lg group-hover/item:text-error transition-colors'>
                                                                    {assessment.title}
                                                                </div>
                                                                <div className='text-base-content/70'>{assessment.description}</div>
                                                                <div className='flex flex-wrap items-center gap-4 mt-2'>
                                                                    {assessment.weight && (
                                                                        <div className='badge badge-error badge-outline gap-2 p-3 group-hover/item:animate-pulse'>
                                                                            Weight: {assessment.weight}%
                                                                        </div>
                                                                    )}
                                                                    {assessment.location && (
                                                                        <div className='badge badge-ghost gap-2 p-3'>
                                                                            <MapPin className='w-4 h-4' />
                                                                            {assessment.location}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className='text-right relative z-10 flex flex-col items-end gap-2'>
                                                                <div className='text-sm text-base-content/70'>{formatDateTime(assessment.due_date)}</div>
                                                                <UpcomingBadge />
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Assignments */}
                                {course.outline.assessments?.some((a) => a.type === 'assignment') && (
                                    <div className='card bg-base-100 shadow-xl hover:shadow-[0_0_30px_-5px_rgba(var(--primary-rgb),0.2)] transition-all duration-300'>
                                        <div className='card-body relative overflow-hidden group'>
                                            <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                                            <div className='card-title text-xl mb-6 pb-2 border-b border-base-300 flex items-center gap-3 w-full'>
                                                <Brain className='w-6 h-6 text-primary animate-pulse' />
                                                <span>Assignments</span>
                                            </div>
                                            <div className='grid gap-4'>
                                                {course.outline.assessments
                                                    .filter((a) => a.type === 'assignment')
                                                    .map((assessment, index) => (
                                                        <div
                                                            key={index}
                                                            className='group/item flex items-start justify-between p-4 bg-base-200 rounded-lg
                            hover:bg-base-300/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden'>
                                                            <div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300' />

                                                            <div className='space-y-2 relative z-10'>
                                                                <div className='font-medium text-lg group-hover/item:text-primary transition-colors'>
                                                                    {assessment.title}
                                                                </div>
                                                                <div className='text-base-content/70'>{assessment.description}</div>
                                                                <div className='flex flex-wrap items-center gap-4 mt-2'>
                                                                    {assessment.weight && (
                                                                        <div className='badge badge-primary badge-outline gap-2 p-3 group-hover/item:animate-pulse'>
                                                                            Weight: {assessment.weight}%
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className='text-right relative z-10 flex flex-col items-end gap-2'>
                                                                <div className='text-sm text-base-content/70'>{formatDateTime(assessment.due_date)}</div>
                                                                <UpcomingBadge />
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Projects */}
                                {course.outline.assessments?.some((a) => a.type === 'project') && (
                                    <div className='card bg-base-100 shadow-xl hover:shadow-[0_0_30px_-5px_rgba(var(--secondary-rgb),0.2)] transition-all duration-300'>
                                        <div className='card-body relative overflow-hidden group'>
                                            <div className='absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                                            <div className='card-title text-xl mb-6 pb-2 border-b border-base-300 flex items-center gap-3 w-full'>
                                                <Trophy className='w-6 h-6 text-secondary animate-pulse' />
                                                <span>Projects</span>
                                            </div>
                                            <div className='grid gap-4'>
                                                {course.outline.assessments
                                                    .filter((a) => a.type === 'project')
                                                    .map((assessment, index) => (
                                                        <div
                                                            key={index}
                                                            className='group/item flex items-start justify-between p-4 bg-base-200 rounded-lg
                            hover:bg-base-300/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden'>
                                                            <div className='absolute inset-0 bg-gradient-to-r from-secondary/10 via-transparent to-secondary/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300' />

                                                            <div className='space-y-2 relative z-10'>
                                                                <div className='font-medium text-lg group-hover/item:text-secondary transition-colors'>
                                                                    {assessment.title}
                                                                </div>
                                                                <div className='text-base-content/70'>{assessment.description}</div>
                                                                <div className='flex flex-wrap items-center gap-4 mt-2'>
                                                                    {assessment.weight && (
                                                                        <div className='badge badge-secondary badge-outline gap-2 p-3 group-hover/item:animate-pulse'>
                                                                            Weight: {assessment.weight}%
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className='text-right relative z-10 flex flex-col items-end gap-2'>
                                                                <div className='text-sm text-base-content/70'>{formatDateTime(assessment.due_date)}</div>
                                                                <UpcomingBadge />
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Quizzes */}
                                {course.outline.assessments?.some((a) => a.type === 'quiz') && (
                                    <div className='card bg-base-100 shadow-xl hover:shadow-[0_0_30px_-5px_rgba(var(--primary-rgb),0.2)] transition-all duration-300'>
                                        <div className='card-body relative overflow-hidden group'>
                                            <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                                            <div className='card-title text-xl mb-6 pb-2 border-b border-base-300 flex items-center gap-3 w-full'>
                                                <Brain className='w-6 h-6 text-primary animate-pulse' />
                                                <span>Quizzes</span>
                                            </div>
                                            <div className='grid gap-4'>
                                                {course.outline.assessments
                                                    .filter((a) => a.type === 'quiz')
                                                    .map((assessment, index) => (
                                                        <div
                                                            key={index}
                                                            className='group/item flex items-start justify-between p-4 bg-base-200 rounded-lg
                                                            hover:bg-base-300/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden'>
                                                            <div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300' />

                                                            <div className='space-y-2 relative z-10'>
                                                                <div className='font-medium text-lg group-hover/item:text-primary transition-colors'>
                                                                    {assessment.title}
                                                                </div>
                                                                <div className='text-base-content/70'>{assessment.description}</div>
                                                                <div className='flex flex-wrap items-center gap-4 mt-2'>
                                                                </div>
                                                            </div>
                                                            <div className='text-right relative z-10 flex flex-col items-end gap-2'>
                                                                <div className='text-sm text-base-content/70'>{formatDateTime(assessment.due_date)}</div>
                                                                <UpcomingBadge />
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Schedule */}
                        <div className='card bg-base-100 shadow-lg'>
                            <div className='card-body'>
                                <h2 className='card-title text-xl mb-6 pb-2 border-b border-base-300'>Schedule</h2>
                                <div className='space-y-8'>
                                    {course.sections?.map((section) => (
                                        <div key={section?.section_id} className='space-y-4'>
                                            <div className='flex items-center gap-2 text-lg font-semibold'>
                                                <GraduationCap className='w-5 h-5 text-primary' />
                                                Section {section?.section_id}
                                            </div>
                                            <div className='grid gap-3'>
                                                {section?.schedule?.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className='flex items-center justify-between p-4 bg-base-200 rounded-lg hover:bg-base-300/50 transition-colors'>
                                                        <div className='flex items-center gap-6'>
                                                            <div className='flex items-center gap-2'>
                                                                <Clock className='w-4 h-4 text-primary' />
                                                                <span className='font-medium'>{item?.day}</span>
                                                            </div>
                                                            <div className='text-base-content/70'>
                                                                {item?.start_time} - {item?.end_time}
                                                            </div>
                                                            <div className='badge badge-outline'>{item?.type}</div>
                                                        </div>
                                                        <div className='flex items-center gap-2 text-base-content/70'>
                                                            <MapPin className='w-4 h-4' />
                                                            {item?.location}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Instructors Sidebar */}
                    <div className='space-y-8'>
                        <div className='card bg-base-100 shadow-lg'>
                            <div className='card-body'>
                                <h2 className='card-title text-xl mb-6 pb-2 border-b border-base-300'>Instructors</h2>
                                <div className='space-y-8'>
                                    {course.sections?.map((section) => (
                                        <div key={section?.section_id} className='space-y-4'>
                                            <div className='flex items-center gap-2 font-semibold'>
                                                <Globe className='w-4 h-4 text-primary' />
                                                Section {section?.section_id}
                                            </div>
                                            {section?.instructor && (
                                                <div className='space-y-4'>
                                                    <div>
                                                        <div className='font-medium text-lg'>{section.instructor.name}</div>
                                                        <div className='text-base-content/70'>{section.instructor.email}</div>
                                                    </div>
                                                    {section.instructor.office && (
                                                        <div className='space-y-4'>
                                                            <div>
                                                                <div className='font-medium mb-1'>Office</div>
                                                                <div className='text-base-content/70'>{section.instructor.office.location}</div>
                                                            </div>
                                                            <div>
                                                                <div className='font-medium mb-2'>Office Hours</div>
                                                                <div className='grid gap-2'>
                                                                    {section.instructor.office.hours?.map((hour, index) => (
                                                                        <div
                                                                            key={index}
                                                                            className='flex items-center justify-between p-3 bg-base-200 rounded-lg hover:bg-base-300/50 transition-colors'>
                                                                            <span className='font-medium'>{hour?.day}</span>
                                                                            <span className='text-base-content/70'>
                                                                                {hour?.start_time} - {hour?.end_time}
                                                                            </span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
