import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@apollo/client';
import { Bot, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../providers/AuthProvider';
import { COMPLETE_ONBOARDING_MUTATION, OnboardingInput } from '../graphql/onboarding';

// Validation schemas
const personalInfoSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    school: z.string().min(1, 'School name is required'),
    major: z.string().min(1, 'Major is required'),
    graduationYear: z.string().min(1, 'Graduation year is required'),
});

type PersonalInfoData = z.infer<typeof personalInfoSchema>;

const steps = [
    { id: 'welcome', title: 'Welcome' },
    { id: 'personal', title: 'Personal Info' },
    { id: 'preferences', title: 'Preferences' },
    { id: 'complete', title: 'Complete' },
] as const;

export const Route = createFileRoute('/onboarding')({
    component: Onboarding,
});

function Onboarding() {
    const [currentStep, setCurrentStep] = useState<(typeof steps)[number]['id']>('welcome');
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const [completeOnboardingMutation] = useMutation(COMPLETE_ONBOARDING_MUTATION, {
        onCompleted: (data) => {
            setUser(data.completeOnboarding);
        },
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

    const onSubmit = async (data: PersonalInfoData) => {
        try {
            setError(null);
            const response = await completeOnboardingMutation({
                variables: {
                    input: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        school: data.school,
                        major: data.major,
                        graduationYear: data.graduationYear,
                    },
                },
            });

            if (response.data?.completeOnboarding) {
                nextStep();
            }
        } catch (error) {
            console.error('Failed to complete onboarding:', error);
            setError('Failed to save your information. Please try again.');
        }
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
                            <h2 className='text-2xl font-bold mb-4'>Welcome to Ivy AI, {user?.email}!</h2>
                            <p className='mb-8 text-base-content/70'>Let's get your account set up so we can help you stay organized and excel in your studies.</p>
                            <button onClick={nextStep} className='btn btn-primary btn-lg gap-2'>
                                Get Started
                                <ArrowRight className='w-4 h-4' />
                            </button>
                        </div>
                    )}

                    {currentStep === 'personal' && (
                        <form onSubmit={personalInfoForm.handleSubmit(onSubmit)} className='space-y-4'>
                            <h2 className='text-2xl font-bold mb-4'>Tell us about yourself</h2>
                            
                            {error && (
                                <div className='alert alert-error'>
                                    <span>{error}</span>
                                </div>
                            )}
                            
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div className='form-control'>
                                    <label className='label pt-0'>
                                        <span className='label-text'>First Name</span>
                                    </label>
                                    <input
                                        type='text'
                                        className={`input input-bordered ${personalInfoForm.formState.errors.firstName ? 'input-error' : ''}`}
                                        {...personalInfoForm.register('firstName')}
                                    />
                                    {personalInfoForm.formState.errors.firstName && (
                                        <label className='label py-1'>
                                            <span className='label-text-alt text-error'>{personalInfoForm.formState.errors.firstName.message}</span>
                                        </label>
                                    )}
                                </div>

                                <div className='form-control'>
                                    <label className='label pt-0'>
                                        <span className='label-text'>Last Name</span>
                                    </label>
                                    <input
                                        type='text'
                                        className={`input input-bordered ${personalInfoForm.formState.errors.lastName ? 'input-error' : ''}`}
                                        {...personalInfoForm.register('lastName')}
                                    />
                                    {personalInfoForm.formState.errors.lastName && (
                                        <label className='label py-1'>
                                            <span className='label-text-alt text-error'>{personalInfoForm.formState.errors.lastName.message}</span>
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className='form-control'>
                                <label className='label pt-0'>
                                    <span className='label-text'>School</span>
                                </label>
                                <input
                                    type='text'
                                    className={`input input-bordered ${personalInfoForm.formState.errors.school ? 'input-error' : ''}`}
                                    {...personalInfoForm.register('school')}
                                />
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

                    {currentStep === 'preferences' && (
                        <div className='text-center'>
                            <h2 className='text-2xl font-bold mb-4'>Study Preferences</h2>
                            <p className='mb-8 text-base-content/70'>Help us understand how you prefer to study and manage your time.</p>
                            {/* Add study preferences form here */}
                            <div className='flex justify-between mt-6'>
                                <button onClick={previousStep} className='btn btn-outline gap-2'>
                                    <ArrowLeft className='w-4 h-4' />
                                    Back
                                </button>
                                <button onClick={nextStep} className='btn btn-primary gap-2'>
                                    Next
                                    <ArrowRight className='w-4 h-4' />
                                </button>
                            </div>
                        </div>
                    )}

                    {currentStep === 'complete' && (
                        <div className='text-center'>
                            <div className='flex justify-center mb-6'>
                                <div className='w-16 h-16 bg-success/20 rounded-full flex items-center justify-center'>
                                    <Check className='w-8 h-8 text-success' />
                                </div>
                            </div>
                            <h2 className='text-2xl font-bold mb-4'>You're All Set!</h2>
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