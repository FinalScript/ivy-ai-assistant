import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Plus, Trash2 } from 'lucide-react';

const courseSchema = z.object({
    courseName: z.string().min(1, 'Course name is required'),
    courseCode: z.string().min(1, 'Course code is required'),
    instructor: z.string().optional(),
    hasScheduledClasses: z.boolean().default(false),
    schedule: z.array(z.object({
        days: z.array(z.string()).min(1, 'At least one day must be selected').optional(),
        startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format').optional(),
        endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format').optional(),
        location: z.string().optional(),
        section: z.string().optional(),
        classType: z.string().optional(),
    })).optional(),
});

type CourseFormData = z.infer<typeof courseSchema>;

interface EditCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: CourseFormData) => void;
    courseData?: {
        id?: string;
        courseName: string;
        courseCode: string;
        instructor: string;
        startDate: string;
        endDate: string;
        classes: {
            section: string;
            classType: string;
            location: string;
            day: string;
            startTime: string;
            endTime: string;
            additionalInfo: string;
        }[];
    };
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const classTypes = ['Lecture', 'Lab', 'Tutorial', 'Seminar', 'Workshop', 'Other'];

export function EditClassModal({ isOpen, onClose, onSave, courseData }: EditCourseModalProps) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<CourseFormData>({
        resolver: zodResolver(courseSchema),
        defaultValues: courseData
            ? {
                  courseName: courseData.courseName,
                  courseCode: courseData.courseCode,
                  instructor: courseData.instructor,
                  hasScheduledClasses: courseData.classes.length > 0,
                  schedule: courseData.classes.map(classInfo => ({
                      days: [classInfo.day],
                      startTime: classInfo.startTime,
                      endTime: classInfo.endTime,
                      location: classInfo.location,
                      section: classInfo.section,
                      classType: classInfo.classType,
                  })),
              }
            : {
                hasScheduledClasses: false,
                schedule: [],
            },
    });

    const hasScheduledClasses = watch('hasScheduledClasses');
    const schedule = watch('schedule') || [];

    const addScheduleSlot = () => {
        setValue('schedule', [...schedule, { 
            days: [], 
            startTime: '', 
            endTime: '', 
            location: '',
            section: '',
            classType: 'Lecture'
        }]);
    };

    const removeScheduleSlot = (index: number) => {
        setValue('schedule', schedule.filter((_, i) => i !== index));
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            <div className='bg-base-100 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
                <div className='sticky top-0 flex justify-between items-center p-4 border-b bg-base-100'>
                    <h2 className='text-xl font-bold'>
                        {courseData ? 'Edit Course' : 'Add New Course'}
                    </h2>
                    <button className='btn btn-ghost btn-sm' onClick={onClose}>
                        <X className='w-4 h-4' />
                    </button>
                </div>

                <div className='p-4'>
                    <form onSubmit={handleSubmit(onSave)}>
                        <div className='space-y-4'>
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Course Name</span>
                                </label>
                                <input
                                    type='text'
                                    className='input input-bordered'
                                    {...register('courseName')}
                                />
                                {errors.courseName && (
                                    <label className='label'>
                                        <span className='label-text-alt text-error'>{errors.courseName.message}</span>
                                    </label>
                                )}
                            </div>

                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Course Code</span>
                                </label>
                                <input
                                    type='text'
                                    className='input input-bordered'
                                    {...register('courseCode')}
                                />
                                {errors.courseCode && (
                                    <label className='label'>
                                        <span className='label-text-alt text-error'>{errors.courseCode.message}</span>
                                    </label>
                                )}
                            </div>

                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Instructor</span>
                                </label>
                                <input
                                    type='text'
                                    className='input input-bordered'
                                    {...register('instructor')}
                                />
                            </div>

                            <div className='form-control'>
                                <label className='label cursor-pointer justify-start gap-2'>
                                    <input
                                        type='checkbox'
                                        className='checkbox'
                                        {...register('hasScheduledClasses')}
                                    />
                                    <span className='label-text'>This course has scheduled classes</span>
                                </label>
                            </div>

                            {hasScheduledClasses && (
                                <div className='space-y-4'>
                                    {schedule.map((_, index) => (
                                        <div key={index} className='card bg-base-200'>
                                            <div className='card-body'>
                                                <div className='flex justify-between items-start'>
                                                    <h3 className='font-bold'>Class Schedule {index + 1}</h3>
                                                    <button
                                                        type='button'
                                                        className='btn btn-ghost btn-sm text-error'
                                                        onClick={() => removeScheduleSlot(index)}>
                                                        <Trash2 className='w-4 h-4' />
                                                    </button>
                                                </div>

                                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                                    <div className='form-control'>
                                                        <label className='label'>
                                                            <span className='label-text'>Section</span>
                                                        </label>
                                                        <input
                                                            type='text'
                                                            className='input input-bordered'
                                                            {...register(`schedule.${index}.section`)}
                                                        />
                                                    </div>

                                                    <div className='form-control'>
                                                        <label className='label'>
                                                            <span className='label-text'>Class Type</span>
                                                        </label>
                                                        <select
                                                            className='select select-bordered'
                                                            {...register(`schedule.${index}.classType`)}>
                                                            {classTypes.map(type => (
                                                                <option key={type} value={type}>
                                                                    {type}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className='form-control'>
                                                        <label className='label'>
                                                            <span className='label-text'>Day</span>
                                                        </label>
                                                        <select
                                                            className='select select-bordered'
                                                            {...register(`schedule.${index}.days.0`)}>
                                                            <option value=''>Select a day</option>
                                                            {days.map(day => (
                                                                <option key={day} value={day}>
                                                                    {day}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors.schedule?.[index]?.days && (
                                                            <label className='label'>
                                                                <span className='label-text-alt text-error'>Day is required</span>
                                                            </label>
                                                        )}
                                                    </div>

                                                    <div className='form-control'>
                                                        <label className='label'>
                                                            <span className='label-text'>Start Time</span>
                                                        </label>
                                                        <select
                                                            className='select select-bordered'
                                                            {...register(`schedule.${index}.startTime`)}>
                                                            <option value=''>Select time</option>
                                                            {Array.from({ length: 24 * 2 }, (_, i) => {
                                                                const hour = Math.floor(i / 2);
                                                                const minute = (i % 2) * 30;
                                                                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                                                                const label = new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
                                                                    hour: 'numeric',
                                                                    minute: '2-digit',
                                                                    hour12: true,
                                                                });
                                                                return (
                                                                    <option key={time} value={time}>
                                                                        {label}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                        {errors.schedule?.[index]?.startTime && (
                                                            <label className='label'>
                                                                <span className='label-text-alt text-error'>Start time is required</span>
                                                            </label>
                                                        )}
                                                    </div>

                                                    <div className='form-control'>
                                                        <label className='label'>
                                                            <span className='label-text'>End Time</span>
                                                        </label>
                                                        <select
                                                            className='select select-bordered'
                                                            {...register(`schedule.${index}.endTime`)}>
                                                            <option value=''>Select time</option>
                                                            {Array.from({ length: 24 * 2 }, (_, i) => {
                                                                const hour = Math.floor(i / 2);
                                                                const minute = (i % 2) * 30;
                                                                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                                                                const label = new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
                                                                    hour: 'numeric',
                                                                    minute: '2-digit',
                                                                    hour12: true,
                                                                });
                                                                return (
                                                                    <option key={time} value={time}>
                                                                        {label}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                        {errors.schedule?.[index]?.endTime && (
                                                            <label className='label'>
                                                                <span className='label-text-alt text-error'>End time is required</span>
                                                            </label>
                                                        )}
                                                    </div>

                                                    <div className='form-control'>
                                                        <label className='label'>
                                                            <span className='label-text'>Location</span>
                                                        </label>
                                                        <input
                                                            type='text'
                                                            className='input input-bordered'
                                                            {...register(`schedule.${index}.location`)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        type='button'
                                        className='btn btn-outline gap-2 w-full'
                                        onClick={addScheduleSlot}>
                                        <Plus className='w-4 h-4' />
                                        Add Another Schedule
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className='flex justify-end gap-2 mt-6'>
                            <button type='button' className='btn' onClick={onClose}>
                                Cancel
                            </button>
                            <button type='submit' className='btn btn-primary'>
                                Save Course
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 