import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Plus, BookOpen, FileText, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data (same as in timetable-setup)
const mockClasses = [
    {
        id: '1',
        name: 'Introduction to Computer Science',
        code: 'CS101',
        instructor: 'Dr. Smith',
        schedule: {
            day: 'Monday',
            startTime: '09:00',
            endTime: '10:30'
        },
        location: 'Science Building 101',
        type: 'Lecture'
    },
    {
        id: '2',
        name: 'Calculus I',
        code: 'MATH201',
        instructor: 'Prof. Johnson',
        schedule: {
            day: 'Tuesday',
            startTime: '11:00',
            endTime: '12:30'
        },
        location: 'Math Building 305',
        type: 'Lecture'
    }
];

export const Route = createFileRoute('/dashboard')({
    component: Dashboard,
});

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timeSlots = Array.from({ length: 13 }, (_, i) => `${i + 8}:00`); // 8:00 AM to 8:00 PM

function Dashboard() {
    const [currentWeek, setCurrentWeek] = useState(new Date());

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
        return mockClasses.filter(c => {
            const classStartHour = parseInt(c.schedule.startTime.split(':')[0]);
            const slotHour = parseInt(time.split(':')[0]);
            return c.schedule.day === day && classStartHour === slotHour;
        });
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
                                    <div className='grid grid-cols-8 gap-1'>
                                        <div className='w-12 sm:w-16'></div> {/* Time column */}
                                        {days.map(day => (
                                            <div key={day} className='text-center font-medium py-2 text-xs sm:text-sm'>
                                                <span className='hidden sm:block'>{day}</span>
                                                <span className='sm:hidden'>{day.slice(0, 3)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Time Slots */}
                                    {timeSlots.map(time => (
                                        <div key={time} className='grid grid-cols-8 gap-1'>
                                            <div className='w-12 sm:w-16 text-xs sm:text-sm text-base-content/70 py-2'>{time}</div>
                                            {days.map(day => {
                                                const classes = getClassesForTimeSlot(day, time);
                                                return (
                                                    <div key={day} className={`relative min-h-[60px] border-t border-base-200 ${day === 'Sunday' || day === 'Saturday' ? 'bg-base-200/30' : ''}`}>
                                                        {classes.map(classItem => (
                                                            <div
                                                                key={classItem.id}
                                                                className='absolute inset-x-0 top-0 m-0.5 p-1 sm:m-1 sm:p-2 bg-primary/10 rounded-lg text-xs sm:text-sm'
                                                                style={{
                                                                    height: `${(parseInt(classItem.schedule.endTime) - parseInt(classItem.schedule.startTime)) * 60}px`
                                                                }}>
                                                                <div className='font-medium truncate'>{classItem.name}</div>
                                                                <div className='text-[10px] sm:text-xs text-base-content/70 truncate'>{classItem.location}</div>
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
                                        .filter(c => c.schedule.day === days[new Date().getDay() - 1])
                                        .map(classItem => (
                                            <div key={classItem.id} className='flex items-start gap-3 p-2 rounded-lg hover:bg-base-200 transition-colors'>
                                                <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0'>
                                                    <BookOpen className='w-5 h-5 text-primary' />
                                                </div>
                                                <div className='min-w-0'>
                                                    <h4 className='font-medium truncate'>{classItem.name}</h4>
                                                    <div className='text-sm text-base-content/70 space-y-1'>
                                                        <div className='flex items-center gap-1'>
                                                            <Clock className='w-3 h-3' />
                                                            <span>{classItem.schedule.startTime} - {classItem.schedule.endTime}</span>
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
                                    <Link
                                        to='/timetable-setup'
                                        className='btn btn-ghost justify-start gap-2 w-full'>
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
        </div>
    );
} 