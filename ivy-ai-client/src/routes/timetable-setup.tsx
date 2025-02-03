import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, FileText, Plus, Edit2, Trash2, Calendar, Clock, MapPin } from 'lucide-react';
import { EditClassModal } from '../components/EditClassModal';

interface Schedule {
    day: string;
    startTime: string;
    endTime: string;
    location: string;
}

interface Course {
    id: string;
    name: string;
    code: string;
    instructor?: string;
    schedule: Schedule[];
    type: string;
}

// Mock data for demonstration
const mockClasses: Course[] = [
    {
        id: '1',
        name: 'Introduction to Computer Science',
        code: 'CS101',
        instructor: 'Dr. Smith',
        schedule: [{
            day: 'Monday',
            startTime: '09:00',
            endTime: '10:30',
            location: 'Science Building 101'
        }],
        type: 'Lecture'
    },
    {
        id: '2',
        name: 'Calculus I',
        code: 'MATH201',
        instructor: 'Prof. Johnson',
        schedule: [{
            day: 'Tuesday',
            startTime: '11:00',
            endTime: '12:30',
            location: 'Math Building 305'
        }],
        type: 'Lecture'
    }
];

export const Route = createFileRoute('/timetable-setup')({
    component: TimetableSetup,
});

function TimetableSetup() {
    const [currentStep, setCurrentStep] = useState<'upload' | 'review' | 'complete'>('upload');
    const [classes, setClasses] = useState<Course[]>(mockClasses);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState<Course | null>(null);
    const navigate = useNavigate();

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            // In a real implementation, we would process the file here
            // For now, we'll just move to the next step
            setCurrentStep('review');
        }
    };

    const handleAddClass = () => {
        const newClass: Course = {
            id: String(classes.length + 1),
            name: '',
            code: '',
            instructor: '',
            schedule: [{
                day: 'Monday',
                startTime: '09:00',
                endTime: '10:30',
                location: ''
            }],
            type: 'Lecture'
        };
        setClasses([...classes, newClass]);
        setSelectedClass(newClass);
        setIsEditModalOpen(true);
    };

    const handleEditClass = (classItem: Course) => {
        setSelectedClass(classItem);
        setIsEditModalOpen(true);
    };

    const handleDeleteClass = (classId: string) => {
        setClasses(classes.filter(c => c.id !== classId));
    };

    const handleSaveClass = (formData: { 
        name: string; 
        code: string; 
        hasScheduledClasses: boolean; 
        instructor?: string; 
        type?: string; 
        schedule?: { 
            days?: string[]; 
            startTime?: string; 
            endTime?: string; 
            location?: string; 
        }[] 
    }) => {
        if (!selectedClass) return;

        const updatedClass: Course = {
            ...selectedClass,
            name: formData.name,
            code: formData.code,
            instructor: formData.instructor || '',
            type: formData.type || 'Lecture',
            schedule: formData.hasScheduledClasses && formData.schedule ? 
                formData.schedule.map(s => ({
                    day: s.days?.[0] || 'Monday',
                    startTime: s.startTime || '09:00',
                    endTime: s.endTime || '10:30',
                    location: s.location || ''
                })) : 
                []
        };

        setClasses(classes.map(c => c.id === updatedClass.id ? updatedClass : c));
        setSelectedClass(null);
        setIsEditModalOpen(false);
    };

    return (
        <div className='min-h-screen bg-base-200 pt-20 pb-8 px-4'>
            <div className='max-w-4xl mx-auto'>
                {/* Progress Steps */}
                <div className='w-full mb-8'>
                    <ul className='steps steps-horizontal w-full'>
                        <li className={`step ${currentStep === 'upload' || currentStep === 'review' || currentStep === 'complete' ? 'step-primary' : ''}`}>
                            Upload Schedule
                        </li>
                        <li className={`step ${currentStep === 'review' || currentStep === 'complete' ? 'step-primary' : ''}`}>
                            Review Classes
                        </li>
                        <li className={`step ${currentStep === 'complete' ? 'step-primary' : ''}`}>
                            Complete
                        </li>
                    </ul>
                </div>

                <div className='card bg-base-100 shadow-xl'>
                    <div className='card-body'>
                        {currentStep === 'upload' && (
                            <div className='text-center'>
                                <h2 className='text-2xl font-bold mb-4'>Upload Your Schedule</h2>
                                <p className='text-base-content/70 mb-8'>
                                    Upload your class schedule or syllabus and we'll automatically extract your classes.
                                    We support PDF, DOC, and image files.
                                </p>

                                <div className='flex flex-col items-center gap-6'>
                                    <label className='flex flex-col items-center justify-center w-full h-64 border-2 border-base-content/20 border-dashed rounded-lg cursor-pointer hover:bg-base-200 transition-colors'>
                                        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                            <Upload className='w-12 h-12 text-base-content/50 mb-4' />
                                            <p className='mb-2 text-sm text-base-content/70'>
                                                <span className='font-semibold'>Click to upload</span> or drag and drop
                                            </p>
                                            <p className='text-xs text-base-content/50'>PDF, DOC, PNG, JPG (MAX. 10MB)</p>
                                        </div>
                                        <input type='file' className='hidden' onChange={handleFileSelect} accept='.pdf,.doc,.docx,.png,.jpg,.jpeg' />
                                    </label>

                                    <div className='divider'>OR</div>

                                    <button
                                        className='btn btn-primary btn-wide'
                                        onClick={() => setCurrentStep('review')}>
                                        Add Classes Manually
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentStep === 'review' && (
                            <div>
                                <div className='flex justify-between items-center mb-6'>
                                    <h2 className='text-2xl font-bold'>Your Classes</h2>
                                    <button className='btn btn-primary gap-2' onClick={handleAddClass}>
                                        <Plus className='w-4 h-4' />
                                        Add Class
                                    </button>
                                </div>

                                <div className='space-y-4'>
                                    {classes.map((classItem) => (
                                        <div key={classItem.id} className='card bg-base-200'>
                                            <div className='card-body'>
                                                <div className='flex justify-between items-start'>
                                                    <div>
                                                        <h3 className='font-bold text-lg'>{classItem.name}</h3>
                                                        <p className='text-sm text-base-content/70'>{classItem.code} • {classItem.instructor}</p>
                                                    </div>
                                                    <div className='flex gap-2'>
                                                        <button className='btn btn-ghost btn-sm' onClick={() => handleEditClass(classItem)}>
                                                            <Edit2 className='w-4 h-4' />
                                                        </button>
                                                        <button className='btn btn-ghost btn-sm text-error' onClick={() => handleDeleteClass(classItem.id)}>
                                                            <Trash2 className='w-4 h-4' />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='divider my-2'></div>
                                                <div className='flex flex-wrap gap-4 text-sm text-base-content/70'>
                                                    <div className='flex items-center gap-2'>
                                                        <Calendar className='w-4 h-4' />
                                                        <span>{classItem.schedule[0].day}</span>
                                                    </div>
                                                    <div className='flex items-center gap-2'>
                                                        <Clock className='w-4 h-4' />
                                                        <span>{classItem.schedule[0].startTime} - {classItem.schedule[0].endTime}</span>
                                                    </div>
                                                    <div className='flex items-center gap-2'>
                                                        <MapPin className='w-4 h-4' />
                                                        <span>{classItem.schedule[0].location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className='flex justify-between mt-8'>
                                    <button className='btn btn-outline gap-2' onClick={() => setCurrentStep('upload')}>
                                        <ArrowLeft className='w-4 h-4' />
                                        Back
                                    </button>
                                    <button 
                                        className='btn btn-primary gap-2' 
                                        onClick={() => setCurrentStep('complete')}
                                        disabled={classes.length === 0}>
                                        Continue
                                        <ArrowRight className='w-4 h-4' />
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentStep === 'complete' && (
                            <div className='text-center'>
                                <div className='flex justify-center mb-6'>
                                    <div className='w-16 h-16 bg-success/20 rounded-full flex items-center justify-center'>
                                        <FileText className='w-8 h-8 text-success' />
                                    </div>
                                </div>
                                <h2 className='text-2xl font-bold mb-4'>Schedule Setup Complete!</h2>
                                <p className='mb-8 text-base-content/70'>
                                    Your class schedule has been successfully set up. You can now view and manage your classes in the calendar.
                                </p>
                                <button onClick={() => navigate({ to: '/dashboard' })} className='btn btn-primary btn-lg'>
                                    Go to Dashboard
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <EditClassModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSaveClass}
                courseData={selectedClass || undefined}
            />
        </div>
    );
} 