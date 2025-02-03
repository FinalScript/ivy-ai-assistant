import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Plus, Trash2 } from 'lucide-react';

const courseSchema = z.object({
    name: z.string().min(1, 'Course name is required'),
    code: z.string().min(1, 'Course code is required'),
    instructor: z.string().optional(),
    hasScheduledClasses: z.boolean().default(false),
    schedule: z.array(z.object({
        days: z.array(z.string()).min(1, 'At least one day must be selected').optional(),
        startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format').optional(),
        endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format').optional(),
        location: z.string().optional(),
    })).optional(),
    type: z.string().optional(),
}).refine((data) => {
    // If hasScheduledClasses is true, ensure schedule has at least one valid entry
    if (data.hasScheduledClasses) {
        return data.schedule && data.schedule.length > 0 && 
               data.schedule.every(s => s.days && s.startTime && s.endTime);
    }
    return true;
}, {
    message: "Schedule details are required when course has scheduled classes",
    path: ["schedule"],
}).refine((data) => {
    // Validate that end time is after start time for each schedule
    if (data.hasScheduledClasses && data.schedule) {
        return data.schedule.every(s => {
            if (!s.startTime || !s.endTime) return true;
            const start = new Date(`1970-01-01T${s.startTime}`);
            const end = new Date(`1970-01-01T${s.endTime}`);
            return end > start;
        });
    }
    return true;
}, {
    message: "End time must be after start time",
    path: ["schedule"],
});

type CourseFormData = z.infer<typeof courseSchema>;

interface EditCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: CourseFormData) => void;
    courseData?: {
        id: string;
        name: string;
        code: string;
        instructor?: string;
        schedule?: {
            day: string;
            startTime: string;
            endTime: string;
            location?: string;
        }[];
        type?: string;
    };
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const courseTypes = ['Lecture', 'Lab', 'Tutorial', 'Seminar', 'Workshop'];

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
                  name: courseData.name,
                  code: courseData.code,
                  instructor: courseData.instructor,
                  hasScheduledClasses: courseData.schedule ? courseData.schedule.length > 0 : false,
                  schedule: courseData.schedule ? [{
                      days: [courseData.schedule[0].day],
                      startTime: courseData.schedule[0].startTime,
                      endTime: courseData.schedule[0].endTime,
                      location: courseData.schedule[0].location,
                  }] : [],
                  type: courseData.type,
              }
            : {
                hasScheduledClasses: false,
                schedule: [],
            },
    });

    const hasScheduledClasses = watch('hasScheduledClasses');
    const schedule = watch('schedule') || [];

    const addScheduleSlot = () => {
        setValue('schedule', [...schedule, { days: [], startTime: '', endTime: '', location: '' }]);
    };

    const removeScheduleSlot = (index: number) => {
        setValue('schedule', schedule.filter((_, i) => i !== index));
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div className='fixed inset-0 bg-black/50' onClick={onClose} />
            
            <div className='relative min-h-screen flex items-center justify-center p-4'>
                <div className='relative bg-base-100 rounded-lg w-full max-w-2xl'>
                    <div className='flex items-center justify-between p-4 border-b border-base-200'>
                        <h3 className='text-lg font-bold'>
                            {courseData ? 'Edit Course' : 'Add New Course'}
                        </h3>
                        <button className='btn btn-ghost btn-sm btn-circle' onClick={onClose}>
                            <X className='w-4 h-4' />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSave)} className='p-4'>
                        <div className='space-y-4'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>Course Name*</span>
                                    </label>
                                    <input
                                        type='text'
                                        className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
                                        {...register('name')}
                                    />
                                    {errors.name && (
                                        <label className='label'>
                                            <span className='label-text-alt text-error'>{errors.name.message}</span>
                                        </label>
                                    )}
                                </div>

                                <div className='form-control'>
                                    <label className='label'>
                                        <span className='label-text'>Course Code*</span>
                                    </label>
                                    <input
                                        type='text'
                                        className={`input input-bordered ${errors.code ? 'input-error' : ''}`}
                                        {...register('code')}
                                    />
                                    {errors.code && (
                                        <label className='label'>
                                            <span className='label-text-alt text-error'>{errors.code.message}</span>
                                        </label>
                                    )}
                                </div>
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
                                            <div className='card-body p-4'>
                                                <div className='flex justify-between items-start'>
                                                    <h4 className='font-medium'>Class Schedule {index + 1}</h4>
                                                    {index > 0 && (
                                                        <button
                                                            type='button'
                                                            className='btn btn-ghost btn-sm btn-circle'
                                                            onClick={() => removeScheduleSlot(index)}>
                                                            <Trash2 className='w-4 h-4' />
                                                        </button>
                                                    )}
                                                </div>

                                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                                    <div className='form-control'>
                                                        <label className='label'>
                                                            <span className='label-text'>Days*</span>
                                                        </label>
                                                        <div className='flex flex-wrap gap-2'>
                                                            {days.map((day) => (
                                                                <label key={day} className='flex items-center gap-2 cursor-pointer'>
                                                                    <input
                                                                        type='checkbox'
                                                                        className='checkbox checkbox-sm'
                                                                        value={day}
                                                                        {...register(`schedule.${index}.days`)}
                                                                    />
                                                                    <span className='text-sm'>{day.slice(0, 3)}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                        {errors.schedule?.[index]?.days && (
                                                            <label className='label'>
                                                                <span className='label-text-alt text-error'>Select at least one day</span>
                                                            </label>
                                                        )}
                                                    </div>

                                                    <div className='space-y-4'>
                                                        <div className='form-control'>
                                                            <label className='label'>
                                                                <span className='label-text'>Start Time*</span>
                                                            </label>
                                                            <select
                                                                className={`select select-bordered ${errors.schedule?.[index]?.startTime ? 'select-error' : ''}`}
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
                                                                    <span className='label-text-alt text-error'>{errors.schedule[index]?.startTime?.message}</span>
                                                                </label>
                                                            )}
                                                        </div>

                                                        <div className='form-control'>
                                                            <label className='label'>
                                                                <span className='label-text'>End Time*</span>
                                                            </label>
                                                            <select
                                                                className={`select select-bordered ${errors.schedule?.[index]?.endTime ? 'select-error' : ''}`}
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
                                                                    <span className='label-text-alt text-error'>{errors.schedule[index]?.endTime?.message}</span>
                                                                </label>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className='form-control md:col-span-2'>
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
                                        className='btn btn-outline btn-block gap-2'
                                        onClick={addScheduleSlot}>
                                        <Plus className='w-4 h-4' />
                                        Add Another Schedule
                                    </button>

                                    {errors.schedule && typeof errors.schedule === 'object' && 'message' in errors.schedule && (
                                        <div className='alert alert-error'>
                                            <span>{errors.schedule.message as string}</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Course Type</span>
                                </label>
                                <select
                                    className='select select-bordered'
                                    {...register('type')}>
                                    <option value=''>Select type</option>
                                    {courseTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className='flex justify-end gap-2 mt-6'>
                            <button type='button' className='btn btn-ghost' onClick={onClose}>
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