import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { AlertCircle, Check, Clock, Edit3, MapPin, Upload, Globe, Trash2, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Course } from '../../__generated__/graphql';
import { CourseEditModal } from '../../components/CourseEditModal';

interface CourseCardProps {
    course: Course;
    onEdit: (courseId: string) => void;
    onUploadOutline: (courseId: string) => void;
    onDelete: () => void;
    hasOutline?: boolean;
    isDeleteDisabled?: boolean;
}

const formatTimeForDisplay = (isoTime: string): string => {
    if (!isoTime) return '';
    try {
        const date = new Date(isoTime);
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    } catch {
        return '';
    }
};

const getMissingFields = (course: Course): string[] => {
    const missing: string[] = [];
    if (!course.code) missing.push('Course Code');
    if (!course.name) missing.push('Course Name');
    if (!course.sections || course.sections.length === 0) missing.push('At least one section');
    return missing;
};

const CourseCard = ({ course, onEdit, onUploadOutline, onDelete, hasOutline = false, isDeleteDisabled = false }: CourseCardProps) => {
    const missingFields = getMissingFields(course);
    const needsEdits = missingFields.length > 0;

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

            {/* Edit and Delete Buttons Container */}
            <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
                {needsEdits && (
                    <div className="text-accent animate-pulse [animation-duration:3s]" data-tip={`Missing: ${missingFields.join(', ')}`}>
                        <AlertCircle className="w-5 h-5" />
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <button
                        className={`btn btn-sm normal-case gap-2 
                            bg-base-200/80 hover:bg-primary/20 border-none
                            shadow-[0_0_10px_-3px_rgba(var(--base-content-rgb),0.1)]
                            backdrop-blur-sm transition-all duration-300
                            hover:shadow-[0_0_15px_-3px_rgba(var(--primary-rgb),0.5)]
                            hover:scale-105 group/edit`}
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(course.code);
                        }}
                    >
                        <Edit3 className={`w-4 h-4 group-hover/edit:text-primary transition-colors`} />
                        <span className='text-xs group-hover/edit:text-primary transition-colors'>Edit Course</span>
                    </button>

                    <button
                        className="btn btn-sm btn-ghost text-error px-3 min-h-8 h-8"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                        data-tip={isDeleteDisabled ? "At least one course is required" : "Delete Course"}
                        disabled={isDeleteDisabled}
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className='card-body p-4'>
                {/* Course Header */}
                <div className='mb-1 relative flex flex-col'>
                    <div className='font-mono text-sm bg-gradient-to-r from-primary/90 to-secondary/90 bg-clip-text text-transparent animate-gradient-shift [animation-duration:6s]'>
                        {course.code}
                    </div>
                    <h3 className='font-semibold text-base break-words pr-24 group-hover:text-primary transition-colors'>{course.name}</h3>
                </div>

                {/* Course Details */}
                <div className='flex flex-wrap items-center gap-2 text-xs my-3'>
                    <span className='flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gradient-to-r from-base-200/50 to-base-300/50 backdrop-blur-sm'>
                        <Clock className='w-3 h-3' />
                        {course.term}
                    </span>
                    <span className='flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gradient-to-r from-base-200/50 to-base-300/50 backdrop-blur-sm'>
                        <Globe className='w-3 h-3' />
                        {course.sections?.length || 0} section{(course.sections?.length || 0) !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* Section Details */}
                <div className='space-y-2 mt-2'>
                    {course.sections?.map((section, index) => {
                        if (!section) return null;
                        return (
                            <div key={index} className='text-sm bg-base-200/50 rounded-lg p-2 backdrop-blur-sm'>
                                <div className='font-medium mb-1'>Section {section.section_id}</div>
                                <div className='space-y-1'>
                                    {section.schedule?.map((time, timeIndex) => {
                                        if (!time) return null;
                                        return (
                                            <div key={timeIndex} className='grid grid-cols-[100px_150px_1fr] gap-3 text-xs text-base-content/70'>
                                                <div className='flex items-center gap-1.5'>
                                                    <Clock className='w-3 h-3 shrink-0' />
                                                    <span>{time.day}</span>
                                                </div>
                                                <div className='flex items-center'>
                                                    <span>{formatTimeForDisplay(time.start_time || '')} - {formatTimeForDisplay(time.end_time || '')}</span>
                                                </div>
                                                <div className='flex items-center gap-1.5'>
                                                    <MapPin className='w-3 h-3 shrink-0' />
                                                    <span>{time.location}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {course.description && (
                    <div className='mt-3 text-xs text-base-content/70 backdrop-blur-sm'>
                        <p className='line-clamp-2'>{course.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const AddCourseCard = ({ onClick }: { onClick: () => void }) => {
    return (
        <div
            onClick={onClick}
            className={`card bg-base-100 shadow-lg transition-all duration-500 border border-base-300/50 
                relative group overflow-hidden cursor-pointer min-h-[200px]
                hover:shadow-[0_0_30px_-5px_rgba(var(--primary-rgb),0.3)] hover:border-primary/30
                flex items-center justify-center`}>
            <div className="flex flex-col items-center gap-3 text-base-content/50 group-hover:text-primary transition-colors">
                <Plus className="w-12 h-12" />
                <span className="text-sm font-medium">Add New Course</span>
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
    const [originalCourseCode, setOriginalCourseCode] = useState<string>('');
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
    const [isNewCourse, setIsNewCourse] = useState(false);
    const [modalError, setModalError] = useState<string | null>(null);
    // Counter for generating unique temporary IDs for new courses
    const [tempIdCounter, setTempIdCounter] = useState(1);

    // Generate a unique temporary ID for new courses
    const generateTempId = () => {
        const tempId = `NEW_COURSE_${tempIdCounter}`;
        setTempIdCounter(prev => prev + 1);
        return tempId;
    };

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
                course.sections.length === 0
        );
        setHasErrors(errors);
    }, [courses]);

    const handleEditCourse = (courseId: string) => {
        const course = courses.find((c) => c.code === courseId);
        if (course) {
            setOriginalCourseCode(course.code);
            setSelectedCourse(course);
            setEditModalOpen(true);
            setIsNewCourse(false);
        }
    };

    const handleSaveCourse = (updatedCourse: Course) => {
        // Reset any previous error
        setModalError(null);

        // Trim and validate course code
        const trimmedCode = updatedCourse.code?.trim() || '';
        if (!trimmedCode) {
            setModalError('Please enter a course code');
            return;
        }

        // Check for duplicate course code (using trimmed codes for comparison)
        const isDuplicate = courses.some(course => 
            course.code?.trim() === trimmedCode && trimmedCode !== originalCourseCode?.trim()
        );

        if (isDuplicate) {
            setModalError('This course code already exists. Please use a unique code.');
            return;
        }

        // If we get here, validation passed - proceed with save
        // Ensure we save the course with trimmed code
        const sanitizedCourse = {
            ...updatedCourse,
            code: trimmedCode
        };

        if (isNewCourse) {
            setCourses((prevCourses) => [...prevCourses, sanitizedCourse]);
        } else {
            setCourses((prevCourses) => prevCourses.map((course) => 
                course.code === originalCourseCode ? sanitizedCourse : course
            ));
        }

        // Clear all states and close modal only after successful save
        setEditModalOpen(false);
        setSelectedCourse(null);
        setOriginalCourseCode('');
        setIsNewCourse(false);
        setModalError(null);
    };

    const handleUploadOutline = (courseId: string) => {
        // Handle uploading course outline
        console.log('Upload outline for:', courseId);
    };

    const handleConfirm = () => {
        // Handle confirmation and next steps
        console.log('Confirming courses:', courses);
    };

    const handleDeleteCourse = (course: Course) => {
        // Prevent deletion if this is the last course
        if (courses.length <= 1) {
            return;
        }
        setCourseToDelete(course);
    };

    const confirmDelete = () => {
        if (courseToDelete) {
            setCourses(prevCourses => prevCourses.filter(c => c.code !== courseToDelete.code));
            setCourseToDelete(null);
        }
    };

    if (!courses || courses.length === 0) {
        return (
            <div className='min-h-screen bg-gradient-to-b from-base-200 to-base-300 flex items-center justify-center'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-base-200 py-8 px-4 mt-14 relative overflow-hidden'>
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-base-100 via-base-200 to-base-300" />
                
                {/* Animated background pattern */}
                <div className='absolute inset-0 opacity-10'>
                    {/* Huge top left orb */}
                    <div className='absolute w-96 sm:w-[32rem] h-96 sm:h-[32rem] -top-48 -left-48 bg-primary rounded-full mix-blend-multiply filter blur-xl 
                        animate-[blob_15s_infinite]'></div>
                    
                    {/* Small top right orb */}
                    <div className='absolute w-32 sm:w-48 h-32 sm:h-48 top-20 -right-12 bg-secondary rounded-full mix-blend-multiply filter blur-xl 
                        animate-[blob_12s_infinite] [animation-delay:1s]'></div>
                    
                    {/* Tiny center-left orb */}
                    <div className='absolute w-24 sm:w-32 h-24 sm:h-32 top-1/2 -left-16 bg-accent rounded-full mix-blend-multiply filter blur-xl 
                        animate-[blob_10s_infinite] [animation-delay:2s]'></div>
                    
                    {/* Medium bottom-center orb */}
                    <div className='absolute w-64 sm:w-80 h-64 sm:h-80 -bottom-20 left-1/3 bg-primary rounded-full mix-blend-multiply filter blur-xl 
                        animate-[blob_18s_infinite] [animation-delay:3s]'></div>
                    
                    {/* Large bottom right orb */}
                    <div className='absolute w-80 sm:w-[28rem] h-80 sm:h-[28rem] -bottom-40 -right-32 bg-secondary rounded-full mix-blend-multiply filter blur-xl 
                        animate-[blob_14s_infinite] [animation-delay:4s]'></div>
                </div>
            </div>

            <div className='max-w-7xl mx-auto relative'>
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
                        <CourseCard 
                            key={course.code} 
                            course={course} 
                            onEdit={handleEditCourse} 
                            onUploadOutline={handleUploadOutline}
                            onDelete={() => handleDeleteCourse(course)}
                            isDeleteDisabled={courses.length <= 1}
                        />
                    ))}
                    <AddCourseCard 
                        onClick={() => {
                            setSelectedCourse({
                                code: '', // Start with empty code
                                name: '',
                                term: '',
                                sections: [],
                            } as Course);
                            setOriginalCourseCode(''); // No original code for new courses
                            setIsNewCourse(true);
                            setEditModalOpen(true);
                        }} 
                    />
                </div>

                {selectedCourse && (
                    <CourseEditModal
                        course={selectedCourse}
                        isOpen={editModalOpen}
                        onClose={() => {
                            setEditModalOpen(false);
                            setSelectedCourse(null);
                            setModalError(null);
                        }}
                        onSave={handleSaveCourse}
                        error={modalError}
                    />
                )}

                {/* Delete Confirmation Modal */}
                {courseToDelete && (
                    <div className="modal modal-open">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Delete Course</h3>
                            <p className="py-4">
                                Are you sure you want to delete {courseToDelete.code}
                                {courseToDelete.name ? ` - ${courseToDelete.name}` : ''}?
                                This action cannot be undone.
                            </p>
                            <div className="modal-action">
                                <button className="btn" onClick={() => setCourseToDelete(null)}>Cancel</button>
                                <button className="btn btn-error" onClick={confirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
