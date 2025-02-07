import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit2, Clock, MapPin } from 'lucide-react';
import { Course } from '../../types/timetable';
import { formatTime } from '../../utils/formatters';

interface CourseReviewProps {
    courses: Course[];
    onSave: () => void;
    onCancel: () => void;
}

export const CourseReview: React.FC<CourseReviewProps> = ({ courses, onSave, onCancel }) => {
    const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({});

    const toggleCourseExpanded = (courseCode: string) => {
        setExpandedCourses((prev) => ({
            ...prev,
            [courseCode]: !prev[courseCode],
        }));
    };

    return (
        <div className='space-y-4 mt-8'>
            <h3 className='text-xl font-semibold mb-4'>Review Extracted Courses</h3>
            {courses.map((course) => (
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
                                <button className='btn btn-ghost btn-sm'>
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
                <button className='btn btn-ghost' onClick={onCancel}>
                    Cancel
                </button>
                <button className='btn btn-primary' onClick={onSave}>
                    Save Courses
                </button>
            </div>
        </div>
    );
}; 