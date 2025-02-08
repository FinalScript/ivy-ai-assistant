import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Plus, BookOpen, FileText, Settings, ChevronLeft, ChevronRight, X, Users } from 'lucide-react';

// Mock data (example courses)
const mockClasses = [
    {
        courseName: 'Data Structures and Algorithms',
        courseCode: 'CS 2100',
        instructor: 'Dr. Sarah Chen',
        startDate: '2024-01-15',
        endDate: '2024-05-10',
        classes: [
            {
                section: 'A1',
                classType: 'Lecture',
                location: 'Science Hall 205',
                day: 'Monday',
                startTime: '09:30',
                endTime: '10:50',
                additionalInfo: '',
            },
            {
                section: 'A1',
                classType: 'Lecture',
                location: 'Science Hall 205',
                day: 'Wednesday',
                startTime: '09:30',
                endTime: '10:50',
                additionalInfo: '',
            },
            {
                section: 'L1',
                classType: 'Lab',
                location: 'Computer Lab 401',
                day: 'Friday',
                startTime: '14:30',
                endTime: '15:50',
                additionalInfo: '',
            },
        ],
    },
    {
        courseName: 'Linear Algebra',
        courseCode: 'MATH 2410',
        instructor: 'Prof. Michael Torres',
        startDate: '2024-01-15',
        endDate: '2024-05-10',
        classes: [
            {
                section: 'B2',
                classType: 'Lecture',
                location: 'Mathematics Building 110',
                day: 'Tuesday',
                startTime: '11:00',
                endTime: '12:20',
                additionalInfo: '',
            },
            {
                section: 'B2',
                classType: 'Lecture',
                location: 'Mathematics Building 110',
                day: 'Thursday',
                startTime: '11:00',
                endTime: '12:20',
                additionalInfo: '',
            },
            {
                section: 'T1',
                classType: 'Tutorial',
                location: 'Study Center',
                day: 'Friday',
                startTime: '10:00',
                endTime: '10:50',
                additionalInfo: '',
            },
        ],
    },
    {
        courseName: 'Introduction to Psychology',
        courseCode: 'PSYC 1101',
        instructor: 'Dr. Emily Rodriguez',
        startDate: '2024-01-15',
        endDate: '2024-05-10',
        classes: [
            {
                section: 'C3',
                classType: 'Lecture',
                location: 'Social Sciences 301',
                day: 'Monday',
                startTime: '13:00',
                endTime: '14:20',
                additionalInfo: '',
            },
            {
                section: 'C3',
                classType: 'Lecture',
                location: 'Social Sciences 301',
                day: 'Wednesday',
                startTime: '13:00',
                endTime: '14:20',
                additionalInfo: '',
            },
            {
                section: 'D1',
                classType: 'Discussion',
                location: '',
                day: '',
                startTime: '',
                endTime: '',
                additionalInfo: 'Asynchronous online discussion',
            },
        ],
    },
    {
        courseName: 'World History: Modern Era',
        courseCode: 'HIST 2200',
        instructor: 'Prof. James Wilson',
        startDate: '2024-01-15',
        endDate: '2024-05-10',
        classes: [
            {
                section: 'A4',
                classType: 'Seminar',
                location: 'Humanities 405',
                day: 'Tuesday',
                startTime: '15:30',
                endTime: '16:50',
                additionalInfo: '',
            },
            {
                section: 'A4',
                classType: 'Seminar',
                location: 'Humanities 405',
                day: 'Thursday',
                startTime: '15:30',
                endTime: '16:50',
                additionalInfo: '',
            },
        ],
    },
    {
        courseName: 'Environmental Science',
        courseCode: 'ENVS 1500',
        instructor: 'Dr. Lisa Park',
        startDate: '2024-01-15',
        endDate: '2024-05-10',
        classes: [
            {
                section: 'B1',
                classType: 'Hybrid',
                location: 'Online/Field Work',
                day: '',
                startTime: '',
                endTime: '',
                additionalInfo: 'Flexible schedule with monthly field trips',
            },
        ],
    },
];

// Replace the courseColors object with an array
const courseColors = [
    'border-primary bg-primary/5 hover:bg-primary/10',
    'border-secondary bg-secondary/5 hover:bg-secondary/10',
    'border-accent bg-accent/5 hover:bg-accent/10',
    'border-info bg-info/5 hover:bg-info/10',
    'border-success bg-success/5 hover:bg-success/10',
    'border-warning bg-warning/5 hover:bg-warning/10',
    'border-error bg-error/5 hover:bg-error/10'
];

export const Route = createFileRoute('/dashboard')({
    component: Dashboard,
});

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timeSlots = Array.from({ length: 13 }, (_, i) => `${i + 8}:00`); // 8:00 AM to 8:00 PM

interface ClassDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    classInfo?: {
        id: string;
        name: string;
        location: string;
        startTime: string;
        endTime: string;
        instructor: string;
        courseCode: string;
        section: string;
        classType: string;
    };
}

function ClassDetailsModal({ isOpen, onClose, classInfo }: ClassDetailsModalProps) {
    if (!isOpen || !classInfo) return null;

    return (
        <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div className='fixed inset-0 bg-black/50' onClick={onClose} />

            <div className='relative min-h-screen flex items-center justify-center p-4'>
                <div className='relative bg-base-100 rounded-lg w-full max-w-2xl'>
                    <div className='flex items-center justify-between p-4 border-b border-base-200'>
                        <h3 className='text-lg font-bold'>Class Details</h3>
                        <button className='btn btn-ghost btn-sm btn-circle' onClick={onClose}>
                            <X className='w-4 h-4' />
                        </button>
                    </div>

                    <div className='p-6 space-y-6'>
                        <div>
                            <h2 className='text-2xl font-bold'>{classInfo.name}</h2>
                            <p className='text-base-content/70'>{classInfo.courseCode}</p>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='space-y-4'>
                                <div className='flex items-center gap-2'>
                                    <Clock className='w-5 h-5 text-primary' />
                                    <div>
                                        <p className='font-medium'>Time</p>
                                        <p className='text-base-content/70'>
                                            {classInfo.startTime} - {classInfo.endTime}
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <MapPin className='w-5 h-5 text-primary' />
                                    <div>
                                        <p className='font-medium'>Location</p>
                                        <p className='text-base-content/70'>{classInfo.location || 'No location specified'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='space-y-4'>
                                <div className='flex items-center gap-2'>
                                    <Users className='w-5 h-5 text-primary' />
                                    <div>
                                        <p className='font-medium'>Instructor</p>
                                        <p className='text-base-content/70'>{classInfo.instructor || 'No instructor specified'}</p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <BookOpen className='w-5 h-5 text-primary' />
                                    <div>
                                        <p className='font-medium'>Section & Type</p>
                                        <p className='text-base-content/70'>
                                            Section {classInfo.section} • {classInfo.classType || 'No type specified'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-end gap-2 p-4 border-t border-base-200'>
                        <button className='btn' onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Dashboard() {
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [selectedClass, setSelectedClass] = useState<ReturnType<typeof getClassesForTimeSlot>[number] | undefined>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatWeekRange = (date: Date) => {
        const start = new Date(date);
        start.setDate(start.getDate() - start.getDay()); // Sunday
        const end = new Date(start);
        end.setDate(end.getDate() + 6); // Saturday
        return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    };

    const navigateWeek = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentWeek);
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        setCurrentWeek(newDate);
    };

    const getClassesForTimeSlot = (day: string, time: string) => {
        return mockClasses.flatMap((course, courseIndex) => {
            const matchingClasses = course.classes.filter((classInfo) => {
                const classStartHour = parseInt(classInfo.startTime.split(':')[0]);
                const classStartMinute = parseInt(classInfo.startTime.split(':')[1]);
                const slotHour = parseInt(time.split(':')[0]);
                return classInfo.day === day && classStartHour === slotHour;
            });
            return matchingClasses.map((classInfo) => ({
                id: `${course.courseCode}-${classInfo.section}`,
                name: course.courseName,
                location: classInfo.location,
                startTime: classInfo.startTime,
                endTime: classInfo.endTime,
                instructor: course.instructor,
                courseCode: course.courseCode,
                section: classInfo.section,
                classType: classInfo.classType,
                colorIndex: courseIndex % courseColors.length
            }));
        });
    };

    const calculateTimeSlotHeight = (startTime: string, endTime: string) => {
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);
        const totalStartMinutes = startHour * 60 + startMinute;
        const totalEndMinutes = endHour * 60 + endMinute;
        const duration = totalEndMinutes - totalStartMinutes;
        return (duration / 60) * 80; // 80px per hour
    };

    const handleClassClick = (classInfo: ReturnType<typeof getClassesForTimeSlot>[number]) => {
        setSelectedClass(classInfo);
        setIsModalOpen(true);
    };

    const getCourseColorClasses = (colorIndex: number) => {
        return courseColors[colorIndex] || 'border-neutral bg-base-200 hover:bg-base-300';
    };

    return (
        <div className='min-h-screen bg-base-200 pt-20 pb-8 px-4'>
            <div className='max-w-7xl mx-auto'>
                {/* Header Section */}
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
                    <div>
                        <h1 className='text-3xl font-bold'>Dashboard</h1>
                        <p className='text-base-content/70'>Manage your academic schedule and classes</p>
                    </div>
                    <div className='flex gap-2'>
                        <Link to='/timetable-setup' className='btn btn-primary gap-2'>
                            <Plus className='w-4 h-4' />
                            Add Classes
                        </Link>
                        <button className='btn btn-ghost gap-2'>
                            <Settings className='w-4 h-4' />
                            Settings
                        </button>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
                    {/* Main Calendar Section */}
                    <div className='lg:col-span-3 card bg-base-100 shadow-xl'>
                        <div className='card-body'>
                            <div className='flex items-center justify-between mb-6'>
                                <h2 className='card-title'>Weekly Schedule</h2>
                                <div className='flex items-center gap-2'>
                                    <button className='btn btn-ghost btn-sm' onClick={() => navigateWeek('prev')}>
                                        <ChevronLeft className='w-4 h-4' />
                                    </button>
                                    <span className='text-sm font-medium'>{formatWeekRange(currentWeek)}</span>
                                    <button className='btn btn-ghost btn-sm' onClick={() => navigateWeek('next')}>
                                        <ChevronRight className='w-4 h-4' />
                                    </button>
                                </div>
                            </div>

                            <div className='overflow-x-auto'>
                                <div className='w-full'>
                                    {/* Calendar Header */}
                                    <div className='grid grid-cols-[1fr_repeat(7,2fr)] gap-1'>
                                        <div className='w-16'></div>
                                        {days.map((day) => (
                                            <div key={day} className='text-center font-medium py-2'>
                                                <span className='hidden sm:block'>{day}</span>
                                                <span className='sm:hidden'>{day.slice(0, 3)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Time Slots */}
                                    {timeSlots.map((time) => (
                                        <div key={time} className='grid grid-cols-[1fr_repeat(7,2fr)] gap-1'>
                                            <div className='w-16 text-sm text-base-content/70 py-2'>{time}</div>
                                            {days.map((day) => {
                                                const classes = getClassesForTimeSlot(day, time);
                                                return (
                                                    <div
                                                        key={day}
                                                        className={`relative min-h-[80px] border-t border-base-200 ${day === 'Sunday' || day === 'Saturday' ? 'bg-base-200/30' : ''}`}>
                                                        {classes.map((classItem) => (
                                                            <div
                                                                key={classItem.id}
                                                                className={`absolute z-10 inset-x-0 top-0 m-0.5 p-2 rounded-lg text-xs sm:text-sm cursor-pointer transition-colors border-t-4 ${getCourseColorClasses(classItem.colorIndex)}`}
                                                                style={{
                                                                    height: `${calculateTimeSlotHeight(classItem.startTime, classItem.endTime)}px`,
                                                                }}
                                                                onClick={() => handleClassClick(classItem)}>
                                                                <div className='font-medium truncate'>{classItem.name}</div>
                                                                <div className='text-[10px] sm:text-xs text-base-content/70 truncate'>
                                                                    {classItem.courseCode}
                                                                </div>
                                                                <div className='text-[10px] sm:text-xs text-base-content/70 truncate'>
                                                                    {classItem.location || 'No location'} • Section {classItem.section}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className='space-y-6'>
                        {/* Today's Classes */}
                        <div className='card bg-base-100 shadow-xl'>
                            <div className='card-body'>
                                <h3 className='card-title text-lg'>Today's Classes</h3>
                                <div className='space-y-4'>
                                    {mockClasses
                                        .flatMap((course) =>
                                            course.classes.map((classInfo) => ({
                                                id: `${course.courseCode}-${classInfo.section}`,
                                                name: course.courseName,
                                                location: classInfo.location,
                                                startTime: classInfo.startTime,
                                                endTime: classInfo.endTime,
                                                day: classInfo.day,
                                                instructor: course.instructor,
                                                courseCode: course.courseCode,
                                            }))
                                        )
                                        .filter((classItem) => classItem.day === days[new Date().getDay() - 1])
                                        .map((classItem) => (
                                            <div key={classItem.id} className='flex items-start gap-3 p-2 rounded-lg hover:bg-base-200 transition-colors'>
                                                <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0'>
                                                    <BookOpen className='w-5 h-5 text-primary' />
                                                </div>
                                                <div className='min-w-0'>
                                                    <h4 className='font-medium truncate'>{classItem.name}</h4>
                                                    <div className='text-sm text-base-content/70 space-y-1'>
                                                        <div className='flex items-center gap-1'>
                                                            <Clock className='w-3 h-3' />
                                                            <span>
                                                                {classItem.startTime} - {classItem.endTime}
                                                            </span>
                                                        </div>
                                                        <div className='flex items-center gap-1'>
                                                            <MapPin className='w-3 h-3' />
                                                            <span className='truncate'>{classItem.location}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className='card bg-base-100 shadow-xl'>
                            <div className='card-body'>
                                <h3 className='card-title text-lg'>Quick Actions</h3>
                                <div className='space-y-2'>
                                    <Link to='/timetable-setup' className='btn btn-ghost justify-start gap-2 w-full'>
                                        <CalendarIcon className='w-4 h-4' />
                                        Manage Classes
                                    </Link>
                                    <button className='btn btn-ghost justify-start gap-2 w-full'>
                                        <FileText className='w-4 h-4' />
                                        Upload Schedule
                                    </button>
                                    <button className='btn btn-ghost justify-start gap-2 w-full'>
                                        <Settings className='w-4 h-4' />
                                        Schedule Settings
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ClassDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} classInfo={selectedClass} />
        </div>
    );
}
