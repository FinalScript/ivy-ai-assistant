import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@apollo/client';
import { Bot, ArrowLeft, ArrowRight, Check, Search, X } from 'lucide-react';
import { useAuth } from '../providers/AuthProvider';
import { COMPLETE_ONBOARDING_MUTATION, OnboardingInput } from '../graphql/onboarding';
import { useDebounce } from '../hooks/useDebounce';

// College Scorecard API key should be in your environment variables
const COLLEGE_SCORECARD_API_KEY = import.meta.env.VITE_COLLEGE_SCORECARD_API_KEY;

interface School {
    id: string;
    name: string;
    city: string;
    state: string;
}

// Validation schemas
const nameSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
});

const personalInfoSchema = z.object({
    school: z.string().min(1, 'School name is required'),
    major: z.string().min(1, 'Major is required'),
    graduationYear: z.string().min(1, 'Graduation year is required'),
});

type NameData = z.infer<typeof nameSchema>;
type PersonalInfoData = z.infer<typeof personalInfoSchema>;

const steps = [
    { id: 'welcome', title: 'Welcome' },
    { id: 'name', title: 'Name' },
    { id: 'personal', title: 'Details' },
    { id: 'complete', title: 'Complete' },
] as const;

export const Route = createFileRoute('/onboarding')({
    component: Onboarding,
});

function Onboarding() {
    const [currentStep, setCurrentStep] = useState<(typeof steps)[number]['id']>('welcome');
    const [userData, setUserData] = useState<NameData & PersonalInfoData | null>(null);
    const [schoolQuery, setSchoolQuery] = useState('');
    const [schools, setSchools] = useState<School[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
    const debouncedQuery = useDebounce(schoolQuery, 200);
    const schoolsRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const [completeOnboardingMutation] = useMutation(COMPLETE_ONBOARDING_MUTATION, {
        onCompleted: (data) => {
            setUser(data.completeOnboarding);
        },
    });

    const nameForm = useForm<NameData>({
        resolver: zodResolver(nameSchema),
    });

    const personalInfoForm = useForm<PersonalInfoData>({
        resolver: zodResolver(personalInfoSchema),
    });

    const nextStep = () => {
        const currentIndex = steps.findIndex((step) => step.id === currentStep);
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1].id);
        }
    };

    const previousStep = () => {
        const currentIndex = steps.findIndex((step) => step.id === currentStep);
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1].id);
        }
    };

    const onNameSubmit = (data: NameData) => {
        setUserData((prev) => ({
            firstName: data.firstName,
            lastName: data.lastName,
            school: prev?.school || '',
            major: prev?.major || '',
            graduationYear: prev?.graduationYear || '',
        }));
        nextStep();
    };

    const onPersonalInfoSubmit = async (data: PersonalInfoData) => {
        try {
            setError(null);
            if (!userData) return;

            const response = await completeOnboardingMutation({
                variables: {
                    input: {
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        school: data.school,
                        major: data.major,
                        graduationYear: data.graduationYear,
                    },
                },
            });

            if (response.data?.completeOnboarding) {
                setUserData((prev) => ({
                    firstName: prev?.firstName || '',
                    lastName: prev?.lastName || '',
                    ...data
                }));
                nextStep();
            }
        } catch (error) {
            console.error('Failed to complete onboarding:', error);
            setError('Failed to save your information. Please try again.');
        }
    };

    useEffect(() => {
        const searchSchools = async () => {
            if (!debouncedQuery || debouncedQuery.length < 3) {
                setSchools([]);
                return;
            }

            setIsSearching(true);
            try {
                const response = await fetch(
                    `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${COLLEGE_SCORECARD_API_KEY}&school.name=${encodeURIComponent(debouncedQuery)}&fields=id,school.name,school.city,school.state&per_page=10`
                );
                
                const data = await response.json();

                const formattedSchools: School[] = data.results.map((result: any) => {
                    console.log(result);
                    return {
                        id: result.id,
                        name: result['school.name'],
                        city: result['school.city'],
                        state: result['school.state'],
                    }
                });

                console.log(formattedSchools);
                
                setSchools(formattedSchools);
            } catch (error) {
                console.error('Failed to fetch schools:', error);
            } finally {
                setIsSearching(false);
            }
        };

        searchSchools();
    }, [debouncedQuery]);

    useEffect(() => {
        if (selectedSchool) {
            personalInfoForm.setValue('school', selectedSchool.name);
        }
    }, [selectedSchool]);

    const handleSchoolSelect = (school: School) => {
        setSelectedSchool(school);
        setSchoolQuery(school.name);
        setSchools([]);
        personalInfoForm.setValue('school', school.name);
    };

    return (
        <div className='min-h-screen bg-base-200 flex flex-col items-center justify-center p-4 relative overflow-hidden'>
            {/* Animated background pattern */}
            <div className='absolute inset-0 opacity-10'>
                <div className='absolute w-72 sm:w-96 h-72 sm:h-96 top-1/4 -left-48 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-blob'></div>
                <div className='absolute w-72 sm:w-96 h-72 sm:h-96 top-1/4 -right-48 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000'></div>
                <div className='absolute w-72 sm:w-96 h-72 sm:h-96 bottom-1/4 -left-48 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000'></div>
                <div className='absolute w-72 sm:w-96 h-72 sm:h-96 bottom-1/4 -right-48 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-blob'></div>
            </div>

            {/* Progress Steps */}
            <div className='w-full max-w-2xl mb-8'>
                <ul className='steps steps-horizontal w-full'>
                    {steps.map((step, index) => (
                        <li key={step.id} className={`step ${steps.findIndex((s) => s.id === currentStep) >= index ? 'step-primary' : ''}`}>
                            {step.title}
                        </li>
                    ))}
                </ul>
            </div>

            <div className='card w-full max-w-lg bg-base-100 shadow-xl relative z-10 animate-fade-in'>
                <div className='card-body p-6 sm:p-8'>
                    {currentStep === 'welcome' && (
                        <div className='text-center'>
                            <div className='flex justify-center mb-6'>
                                <Bot className='w-16 h-16 text-primary animate-bounce-slow' />
                            </div>
                            <h2 className='text-2xl font-bold mb-4'>Welcome to Ivy AI!</h2>
                            <p className='mb-8 text-base-content/70'>Let's get your account set up so we can help you stay organized and excel in your studies.</p>
                            <button onClick={nextStep} className='btn btn-primary btn-lg gap-2'>
                                Get Started
                                <ArrowRight className='w-4 h-4' />
                            </button>
                        </div>
                    )}

                    {currentStep === 'name' && (
                        <form onSubmit={nameForm.handleSubmit(onNameSubmit)} className='space-y-4'>
                            <h2 className='text-2xl font-bold mb-4'>What's your name?</h2>
                            
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div className='form-control'>
                                    <label className='label pt-0'>
                                        <span className='label-text'>First Name</span>
                                    </label>
                                    <input
                                        type='text'
                                        className={`input input-bordered ${nameForm.formState.errors.firstName ? 'input-error' : ''}`}
                                        {...nameForm.register('firstName')}
                                    />
                                    {nameForm.formState.errors.firstName && (
                                        <label className='label py-1'>
                                            <span className='label-text-alt text-error'>{nameForm.formState.errors.firstName.message}</span>
                                        </label>
                                    )}
                                </div>

                                <div className='form-control'>
                                    <label className='label pt-0'>
                                        <span className='label-text'>Last Name</span>
                                    </label>
                                    <input
                                        type='text'
                                        className={`input input-bordered ${nameForm.formState.errors.lastName ? 'input-error' : ''}`}
                                        {...nameForm.register('lastName')}
                                    />
                                    {nameForm.formState.errors.lastName && (
                                        <label className='label py-1'>
                                            <span className='label-text-alt text-error'>{nameForm.formState.errors.lastName.message}</span>
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className='flex justify-between mt-6'>
                                <button type='button' onClick={previousStep} className='btn btn-outline gap-2'>
                                    <ArrowLeft className='w-4 h-4' />
                                    Back
                                </button>
                                <button type='submit' className='btn btn-primary gap-2'>
                                    Next
                                    <ArrowRight className='w-4 h-4' />
                                </button>
                            </div>
                        </form>
                    )}

                    {currentStep === 'personal' && (
                        <form onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)} className='space-y-4'>
                            <h2 className='text-2xl font-bold mb-4'>Hello, {userData?.firstName}! Tell us more about your studies</h2>
                            
                            {error && (
                                <div className='alert alert-error'>
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className='form-control relative' ref={schoolsRef}>
                                <label className='label pt-0'>
                                    <span className='label-text'>School</span>
                                </label>
                                <div className='dropdown w-full'>
                                    <div className='w-full'>
                                        <input
                                            type='text'
                                            className={`input input-bordered w-full pr-10 ${personalInfoForm.formState.errors.school ? 'input-error' : ''}`}
                                            value={schoolQuery}
                                            onChange={(e) => {
                                                setSchoolQuery(e.target.value);
                                                personalInfoForm.setValue('school', e.target.value);
                                            }}
                                            placeholder='Search for your school...'
                                        />
                                        <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                                            {isSearching ? (
                                                <span className='loading loading-spinner loading-sm text-base-content/50'></span>
                                            ) : schoolQuery ? (
                                                <button
                                                    type='button'
                                                    onClick={() => {
                                                        setSchoolQuery('');
                                                        setSelectedSchool(null);
                                                        setSchools([]);
                                                        personalInfoForm.setValue('school', '');
                                                    }}
                                                    className='btn btn-ghost btn-xs btn-circle'>
                                                    <X className='w-4 h-4' />
                                                </button>
                                            ) : (
                                                <Search className='w-4 h-4 text-base-content/50' />
                                            )}
                                        </div>
                                    </div>
                                    {(isSearching || schools.length > 0 || (debouncedQuery.length >= 3 && !isSearching)) && (
                                        <div className='dropdown-content top-full mt-1 w-full bg-base-100 rounded-lg shadow-lg'>
                                            <div className='max-h-[300px] overflow-y-auto'>
                                                {isSearching ? (
                                                    <div className='flex flex-col items-center justify-center py-4 text-base-content/70 rounded-lg'>
                                                        <span className='loading loading-spinner loading-md'></span>
                                                        <span className='mt-2'>Searching schools...</span>
                                                    </div>
                                                ) : schools.length > 0 ? (
                                                    <div className='divide-y divide-base-200'>
                                                        {schools.map((school, index) => (
                                                            <button
                                                                key={school.id}
                                                                type='button'
                                                                onClick={() => handleSchoolSelect(school)}
                                                                className={`w-full px-4 py-3 text-left hover:bg-base-200 transition-colors
                                                                    ${index === 0 ? 'rounded-t-lg' : ''}
                                                                    ${index === schools.length - 1 ? 'rounded-b-lg' : ''}`}>
                                                                <div className='font-medium'>{school.name}</div>
                                                                <div className='text-sm text-base-content/70'>
                                                                    {school.city}, {school.state}
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                ) : debouncedQuery.length >= 3 ? (
                                                    <div className='flex flex-col items-center justify-center py-4 text-base-content/70 rounded-lg'>
                                                        <span>No schools found</span>
                                                        <span className='text-sm'>Try a different search term</span>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {personalInfoForm.formState.errors.school && (
                                    <label className='label py-1'>
                                        <span className='label-text-alt text-error'>{personalInfoForm.formState.errors.school.message}</span>
                                    </label>
                                )}
                            </div>

                            <div className='form-control'>
                                <label className='label pt-0'>
                                    <span className='label-text'>Major</span>
                                </label>
                                <input
                                    type='text'
                                    className={`input input-bordered ${personalInfoForm.formState.errors.major ? 'input-error' : ''}`}
                                    {...personalInfoForm.register('major')}
                                />
                                {personalInfoForm.formState.errors.major && (
                                    <label className='label py-1'>
                                        <span className='label-text-alt text-error'>{personalInfoForm.formState.errors.major.message}</span>
                                    </label>
                                )}
                            </div>

                            <div className='form-control'>
                                <label className='label pt-0'>
                                    <span className='label-text'>Expected Graduation Year</span>
                                </label>
                                <select
                                    className={`select select-bordered ${personalInfoForm.formState.errors.graduationYear ? 'select-error' : ''}`}
                                    {...personalInfoForm.register('graduationYear')}>
                                    <option value=''>Select year</option>
                                    {Array.from({ length: 6 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                                {personalInfoForm.formState.errors.graduationYear && (
                                    <label className='label py-1'>
                                        <span className='label-text-alt text-error'>{personalInfoForm.formState.errors.graduationYear.message}</span>
                                    </label>
                                )}
                            </div>

                            <div className='flex justify-between mt-6'>
                                <button type='button' onClick={previousStep} className='btn btn-outline gap-2'>
                                    <ArrowLeft className='w-4 h-4' />
                                    Back
                                </button>
                                <button type='submit' className='btn btn-primary gap-2'>
                                    Next
                                    <ArrowRight className='w-4 h-4' />
                                </button>
                            </div>
                        </form>
                    )}

                    {currentStep === 'complete' && (
                        <div className='text-center'>
                            <div className='flex justify-center mb-6'>
                                <div className='w-16 h-16 bg-success/20 rounded-full flex items-center justify-center'>
                                    <Check className='w-8 h-8 text-success' />
                                </div>
                            </div>
                            <h2 className='text-2xl font-bold mb-4'>You're All Set, {userData?.firstName}!</h2>
                            <p className='mb-8 text-base-content/70'>Your account is now ready. Let's start organizing your academic life.</p>
                            <button onClick={() => navigate({ to: '/' })} className='btn btn-primary btn-lg'>
                                Go to Dashboard
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 