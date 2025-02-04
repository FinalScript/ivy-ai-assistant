import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, FileText, Plus, Edit2, Trash2, Calendar, Clock, MapPin } from 'lucide-react';
import { EditClassModal } from '../components/EditClassModal';

interface ClassInfo {
    section: string;
    classType: string;
    location: string;
    day: string;
    startTime: string;
    endTime: string;
    additionalInfo: string;
}

interface Course {
    id?: string; // For UI purposes
    courseName: string;
    courseCode: string;
    instructor: string;
    startDate: string;
    endDate: string;
    classes: ClassInfo[];
}

// Mock data for demonstration
const mockClasses = [
    {
        courseName: "Data Structures and Algorithms",
        courseCode: "CS 2100",
        instructor: "Dr. Sarah Chen",
        startDate: "2024-01-15",
        endDate: "2024-05-10",
        classes: [
            {
                section: "A1",
                classType: "Lecture",
                location: "Science Hall 205",
                day: "Monday",
                startTime: "09:30",
                endTime: "10:50",
                additionalInfo: ""
            },
            {
                section: "A1",
                classType: "Lecture",
                location: "Science Hall 205",
                day: "Wednesday",
                startTime: "09:30",
                endTime: "10:50",
                additionalInfo: ""
            },
            {
                section: "L1",
                classType: "Lab",
                location: "Computer Lab 401",
                day: "Friday",
                startTime: "14:30",
                endTime: "15:50",
                additionalInfo: ""
            }
        ]
    },
    {
        courseName: "Linear Algebra",
        courseCode: "MATH 2410",
        instructor: "Prof. Michael Torres",
        startDate: "2024-01-15",
        endDate: "2024-05-10",
        classes: [
            {
                section: "B2",
                classType: "Lecture",
                location: "Mathematics Building 110",
                day: "Tuesday",
                startTime: "11:00",
                endTime: "12:20",
                additionalInfo: ""
            },
            {
                section: "B2",
                classType: "Lecture",
                location: "Mathematics Building 110",
                day: "Thursday",
                startTime: "11:00",
                endTime: "12:20",
                additionalInfo: ""
            },
            {
                section: "T1",
                classType: "Tutorial",
                location: "Study Center",
                day: "Friday",
                startTime: "10:00",
                endTime: "10:50",
                additionalInfo: ""
            }
        ]
    },
    {
        courseName: "Introduction to Psychology",
        courseCode: "PSYC 1101",
        instructor: "Dr. Emily Rodriguez",
        startDate: "2024-01-15",
        endDate: "2024-05-10",
        classes: [
            {
                section: "C3",
                classType: "Lecture",
                location: "Social Sciences 301",
                day: "Monday",
                startTime: "13:00",
                endTime: "14:20",
                additionalInfo: ""
            },
            {
                section: "C3",
                classType: "Lecture",
                location: "Social Sciences 301",
                day: "Wednesday",
                startTime: "13:00",
                endTime: "14:20",
                additionalInfo: ""
            },
            {
                section: "D1",
                classType: "Discussion",
                location: "",
                day: "",
                startTime: "",
                endTime: "",
                additionalInfo: "Asynchronous online discussion"
            }
        ]
    },
    {
        courseName: "World History: Modern Era",
        courseCode: "HIST 2200",
        instructor: "Prof. James Wilson",
        startDate: "2024-01-15",
        endDate: "2024-05-10",
        classes: [
            {
                section: "A4",
                classType: "Seminar",
                location: "Humanities 405",
                day: "Tuesday",
                startTime: "15:30",
                endTime: "16:50",
                additionalInfo: ""
            },
            {
                section: "A4",
                classType: "Seminar",
                location: "Humanities 405",
                day: "Thursday",
                startTime: "15:30",
                endTime: "16:50",
                additionalInfo: ""
            }
        ]
    },
    {
        courseName: "Environmental Science",
        courseCode: "ENVS 1500",
        instructor: "Dr. Lisa Park",
        startDate: "2024-01-15",
        endDate: "2024-05-10",
        classes: [
            {
                section: "B1",
                classType: "Hybrid",
                location: "Online/Field Work",
                day: "",
                startTime: "",
                endTime: "",
                additionalInfo: "Flexible schedule with monthly field trips"
            }
        ]
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
            setCurrentStep('review');
        }
    };

    const handleAddClass = () => {
        const newClass: Course = {
            id: String(classes.length + 1),
            courseName: '',
            courseCode: '',
            instructor: '',
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
            classes: [
                {
                    section: 'A',
                    classType: 'Lecture',
                    location: '',
                    day: 'Monday',
                    startTime: '09:00',
                    endTime: '10:30',
                    additionalInfo: ''
                }
            ]
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
        setClasses(classes.filter((c) => c.id !== classId));
    };

    const handleSaveClass = (formData: {
        courseName: string;
        courseCode: string;
        hasScheduledClasses: boolean;
        instructor?: string;
        schedule?: {
            days?: string[];
            startTime?: string;
            endTime?: string;
            location?: string;
            section?: string;
            classType?: string;
        }[];
    }) => {
        if (!selectedClass) return;

        const updatedClass: Course = {
            ...selectedClass,
            courseName: formData.courseName,
            courseCode: formData.courseCode,
            instructor: formData.instructor || '',
            classes: formData.hasScheduledClasses && formData.schedule
                ? formData.schedule.map(s => ({
                    section: s.section || 'A',
                    classType: s.classType || 'Lecture',
                    location: s.location || '',
                    day: s.days?.[0] || '',
                    startTime: s.startTime || '',
                    endTime: s.endTime || '',
                    additionalInfo: ''
                }))
                : []
        };

        setClasses(classes.map((c) => (c.id === updatedClass.id ? updatedClass : c)));
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
                        <li className={`step ${currentStep === 'review' || currentStep === 'complete' ? 'step-primary' : ''}`}>Review Classes</li>
                        <li className={`step ${currentStep === 'complete' ? 'step-primary' : ''}`}>Complete</li>
                    </ul>
                </div>

                <div className='card bg-base-100 shadow-xl'>
                    <div className='card-body'>
                        {currentStep === 'upload' && (
                            <div className='text-center'>
                                <h2 className='text-2xl font-bold mb-4'>Upload Your Schedule</h2>
                                <p className='text-base-content/70 mb-8'>
                                    Upload your class schedule or syllabus and we'll automatically extract your classes. We support PDF, DOC, and image files.
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

                                    <button className='btn btn-primary btn-wide' onClick={() => setCurrentStep('review')}>
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
                                                        <h3 className='font-bold text-lg'>{classItem.courseName}</h3>
                                                        <p className='text-sm text-base-content/70'>
                                                            {classItem.courseCode} • {classItem.instructor}
                                                        </p>
                                                    </div>
                                                    <div className='flex gap-2'>
                                                        <button className='btn btn-ghost btn-sm' onClick={() => handleEditClass(classItem)}>
                                                            <Edit2 className='w-4 h-4' />
                                                        </button>
                                                        <button className='btn btn-ghost btn-sm text-error' onClick={() => handleDeleteClass(classItem.id!)}>
                                                            <Trash2 className='w-4 h-4' />
                                                        </button>
                                                    </div>
                                                </div>
                                                {classItem.classes[0] && (
                                                    <>
                                                        <div className='divider my-2'></div>
                                                        <div className='flex flex-wrap gap-4 text-sm text-base-content/70'>
                                                            <div className='flex items-center gap-2'>
                                                                <Calendar className='w-4 h-4' />
                                                                <span>{classItem.classes[0].day}</span>
                                                            </div>
                                                            <div className='flex items-center gap-2'>
                                                                <Clock className='w-4 h-4' />
                                                                <span>
                                                                    {classItem.classes[0].startTime} - {classItem.classes[0].endTime}
                                                                </span>
                                                            </div>
                                                            <div className='flex items-center gap-2'>
                                                                <MapPin className='w-4 h-4' />
                                                                <span>{classItem.classes[0].location}</span>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className='flex justify-between mt-8'>
                                    <button className='btn btn-outline gap-2' onClick={() => setCurrentStep('upload')}>
                                        <ArrowLeft className='w-4 h-4' />
                                        Back
                                    </button>
                                    <button className='btn btn-primary gap-2' onClick={() => setCurrentStep('complete')} disabled={classes.length === 0}>
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
