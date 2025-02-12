import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, Bell, BookOpen, Bot, Brain, Calendar, CheckCircle2, GraduationCap, Shield, Target, Upload, Zap, Sparkles } from 'lucide-react';

export const Route = createFileRoute('/')({
    component: Index,
});

function Index() {
    return (
        <div className='min-h-screen relative overflow-x-hidden'>
            {/* Global background effects */}
            <div className='fixed inset-0 bg-gradient-to-br from-base-200 via-base-100 to-base-200'></div>

            {/* Subtle dot pattern */}
            <div className='fixed inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.base.content)_1px,transparent_0)] [background-size:24px_24px] opacity-[0.02]'></div>

            {/* Global animated blobs */}
            <div className='fixed inset-0 overflow-hidden'>
                <div className='absolute w-[2000px] h-[2000px] -top-[20%] -left-[25%] bg-primary/10 rounded-full mix-blend-multiply filter blur-[128px] animate-blob'></div>
                <div className='absolute w-[2000px] h-[2000px] top-[60%] -right-[25%] bg-secondary/10 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-2000'></div>
                <div className='absolute w-[2000px] h-[2000px] top-[20%] left-[15%] bg-accent/10 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-4000'></div>
            </div>

            {/* Shimmering overlay */}
            <div className='fixed inset-0 bg-[linear-gradient(to_right,transparent,rgba(var(--base-content-rgb),0.05),transparent)] bg-[length:200%_100%] animate-shimmer'></div>

            {/* Radial gradient vignette */}
            <div className='fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(var(--base-100-rgb),0.4)_100%)]'></div>

            {/* Animated particle grid */}
            <div className='fixed inset-0'>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,theme(colors.primary)_1px,transparent_0)] opacity-20 [background-size:32px_32px] animate-subtle-drift'></div>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,theme(colors.secondary)_1px,transparent_0)] opacity-10 [background-size:24px_24px] animate-subtle-drift-reverse'></div>
            </div>

            {/* Content container */}
            <div className='relative'>
                {/* Hero Section */}
                <div className='hero min-h-screen relative'>
                    <div className='max-w-7xl px-4 sm:px-6 mt-8 sm:mt-0'>
                        <div className='w-full relative grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 items-center'>
                            {/* Left Content */}
                            <div className='text-left space-y-8 w-full'>
                                <div className='space-y-6'>
                                    <h1>
                                        <span className='block text-4xl sm:text-6xl font-bold animate-slide-up dark:bg-gradient-to-r dark:from-primary dark:via-secondary dark:to-accent dark:text-transparent bg-clip-text  leading-[1.2] sm:leading-[1.2]'>
                                            Set Up Your Academic Planner in Minutes
                                        </span>
                                        <span className='block text-xl sm:text-xl font-medium mt-4 text-base-content/90'>
                                            Upload your timetables, outlines, and study materials—let our tool create a streamlined, synchronized calendar to
                                            keep you on track.
                                        </span>
                                    </h1>

                                    {/* Feature List */}
                                    <div className='space-y-3 animate-slide-up-delayed'>
                                        <div className='flex items-center gap-3 text-base-content/70'>
                                            <div className='w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center'>
                                                <CheckCircle2 className='w-3 h-3 text-primary' />
                                            </div>
                                            <span>Instant syllabus parsing & schedule creation</span>
                                        </div>
                                        <div className='flex items-center gap-3 text-base-content/70'>
                                            <div className='w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center'>
                                                <CheckCircle2 className='w-3 h-3 text-secondary' />
                                            </div>
                                            <span>Smart deadline tracking & reminders</span>
                                        </div>
                                    </div>

                                    {/* CTA Section */}
                                    <div className='flex flex-col sm:flex-row gap-4 pt-2 animate-slide-up-delayed'>
                                        <Link to='/auth' className='btn btn-primary btn-lg gap-3 group relative overflow-hidden'>
                                            <div className='absolute inset-0 bg-gradient-to-r from-primary/0 via-base-100/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
                                            Join Early Access
                                            <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                                        </Link>
                                        <div className='flex items-center gap-2 text-base-content/60 px-2'>
                                            <div className='flex -space-x-2'>
                                                <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                                                    <GraduationCap className='w-4 h-4 text-primary' />
                                                </div>
                                                <div className='w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center'>
                                                    <Calendar className='w-4 h-4 text-secondary' />
                                                </div>
                                            </div>
                                            <span className='text-sm'>Join 2,000+ students</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Content - Feature Cards */}
                            <div className='relative hidden lg:block w-full max-w-xl'>
                                <ul className='steps steps-vertical gap-y-6'>
                                    {/* Step 1 */}
                                    <li data-content='1' className='step step-primary'>
                                        <div className='card backdrop-blur-sm bg-base-100/50 shadow-sm hover:shadow-[0_0_25px_-5px_rgba(var(--primary-rgb),0.3)] transition-all duration-300 hover:-translate-y-2 group border border-base-content/5 relative overflow-hidden w-[calc(100%-1rem)] ml-4'>
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

                                            <div className='card-body p-4'>
                                                <div className='flex items-center gap-4'>
                                                    <div className='w-10 h-10 mask mask-hexagon bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center shrink-0 backdrop-blur-sm border border-primary/20 group-hover:scale-110 transition-transform duration-300'>
                                                        <Upload className='w-5 h-5 text-primary group-hover:rotate-12 transition-transform duration-300' />
                                                    </div>
                                                    <p className='text-left text-md text-base-content/90 leading-relaxed group-hover:text-primary transition-colors'>
                                                        Upload your course materials in seconds
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    {/* Step 2 */}
                                    <li data-content='2' className='step step-secondary'>
                                        <div className='card backdrop-blur-sm bg-base-100/50 shadow-sm hover:shadow-[0_0_25px_-5px_rgba(var(--secondary-rgb),0.3)] transition-all duration-300 hover:-translate-y-2 group border border-base-content/5 relative overflow-hidden w-[calc(100%-1rem)] ml-4'>
                                            {/* Ambient Corner Glow */}
                                            <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/10 to-transparent opacity-40 blur-2xl' />
                                            <div className='absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent/10 to-transparent opacity-40 blur-2xl' />

                                            {/* Animated Background Pattern */}
                                            <div
                                                className='absolute inset-0 opacity-[0.02] pointer-events-none 
                                                bg-[radial-gradient(circle_at_1px_1px,theme(colors.base.content)_1px,transparent_0)] [background-size:16px_16px] 
                                                animate-subtle-bounce
                                                group-hover:scale-[1.02] group-hover:rotate-[0.5deg] transition-transform duration-700 -z-[1]'
                                            />

                                            <div className='card-body p-4'>
                                                <div className='flex items-center gap-4'>
                                                    <div className='w-10 h-10 mask mask-hexagon bg-gradient-to-br from-secondary/10 to-secondary/30 flex items-center justify-center shrink-0 backdrop-blur-sm border border-secondary/20 group-hover:scale-110 transition-transform duration-300'>
                                                        <Brain className='w-5 h-5 text-secondary group-hover:rotate-12 transition-transform duration-300' />
                                                    </div>
                                                    <p className='text-left text-md text-base-content/90 leading-relaxed group-hover:text-secondary transition-colors'>
                                                        AI extracts your course information instantly
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    {/* Step 3 */}
                                    <li data-content='3' className='step step-accent'>
                                        <div className='card mb-2 backdrop-blur-sm bg-base-100/50 shadow-sm hover:shadow-[0_0_25px_-5px_rgba(var(--accent-rgb),0.3)] transition-all duration-300 hover:-translate-y-2 group border border-base-content/5 relative overflow-hidden w-[calc(100%-1rem)] ml-4'>
                                            {/* Ambient Corner Glow */}
                                            <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent opacity-40 blur-2xl' />
                                            <div className='absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/10 to-transparent opacity-40 blur-2xl' />

                                            {/* Animated Background Pattern */}
                                            <div
                                                className='absolute inset-0 opacity-[0.02] pointer-events-none 
                                                bg-[radial-gradient(circle_at_1px_1px,theme(colors.base.content)_1px,transparent_0)] [background-size:16px_16px] 
                                                animate-subtle-bounce
                                                group-hover:scale-[1.02] group-hover:rotate-[0.5deg] transition-transform duration-700 -z-[1]'
                                            />

                                            <div className='card-body p-4'>
                                                <div className='flex items-center gap-4'>
                                                    <div className='w-10 h-10 mask mask-hexagon bg-gradient-to-br from-accent/10 to-accent/30 flex items-center justify-center shrink-0 backdrop-blur-sm border border-accent/20 group-hover:scale-110 transition-transform duration-300'>
                                                        <Calendar className='w-5 h-5 text-accent group-hover:rotate-12 transition-transform duration-300' />
                                                    </div>
                                                    <p className='text-left text-md text-base-content/90 leading-relaxed group-hover:text-accent transition-colors'>
                                                        Get your personalized smart calendar
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How It Works Section */}
                <div className='py-16 sm:py-24 px-4 relative'>
                    <div className='max-w-6xl mx-auto relative'>
                        <div className='text-center mb-20'>
                            <div className='inline-block mb-4 relative group'>
                                <span className='text-primary font-semibold tracking-wider block relative z-10 px-6 py-2'>
                                    3 STEPS TO A SMARTER SEMESTER
                                    <div className='absolute h-[2px] w-full bottom-0 left-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out'></div>
                                </span>
                                <div className='absolute inset-0 bg-primary/5 rounded-lg blur-lg scale-0 group-hover:scale-100 transition-transform duration-500'></div>
                            </div>

                            <h2 className='text-5xl sm:text-6xl font-bold mt-6 mb-8 dark:bg-gradient-to-r dark:from-primary dark:via-secondary dark:to-accent dark:text-transparent bg-clip-text leading-tight sm:leading-tight px-2 relative inline-block group'>
                                How It Works
                                <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500'></div>
                            </h2>

                            <p className='text-xl sm:text-2xl text-base-content/70 max-w-2xl mx-auto leading-relaxed px-4 animate-fade-in'>
                                From chaos to clarity in three simple steps
                            </p>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 relative'>
                            {/* Connecting lines between cards with animation */}
                            <div className='absolute top-1/2 left-0 w-full h-0.5 hidden md:block'>
                                <div className='absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20'></div>
                                <div className='absolute inset-0 bg-gradient-to-r from-primary/40 via-secondary/40 to-accent/40 w-0 animate-progress'></div>
                            </div>

                            {/* Step 1 */}
                            <div className='card backdrop-blur-sm bg-base-100/50 shadow-xl hover:shadow-[0_0_25px_-5px_rgba(var(--primary-rgb),0.3)] transition-all duration-300 hover:-translate-y-2 group border border-base-content/5 relative overflow-hidden'>
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

                                <div className='card-body items-center text-center relative p-8'>
                                    {/* Animated number */}
                                    <div className='absolute top-3 right-3 w-14 h-14 rounded-2xl bg-base-100/50 backdrop-blur-sm shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-500 overflow-hidden border border-base-content/5'>
                                        <div className='text-3xl font-bold dark:bg-gradient-to-br dark:from-primary dark:to-secondary dark:text-transparent bg-clip-text relative z-10'>
                                            1
                                        </div>
                                        <div className='absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 scale-0 group-hover:scale-100 transition-transform duration-500'></div>
                                    </div>

                                    {/* Enhanced icon container */}
                                    <div className='relative mb-8 mt-6 group-hover:scale-110 transition-transform duration-500'>
                                        <div className='absolute inset-0 bg-primary/20 rounded-3xl blur-2xl scale-150 animate-pulse'></div>
                                        <div className='w-20 h-20 mask mask-hexagon bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center relative backdrop-blur-sm border border-primary/20'>
                                            <Upload className='w-10 h-10 text-primary group-hover:rotate-12 transition-transform duration-500' />
                                        </div>
                                    </div>

                                    <h3 className='card-title text-2xl group-hover:text-primary transition-colors mb-4'>Upload & Relax</h3>
                                    <p className='text-base-content/70 text-lg'>
                                        Simply upload your syllabi, schedules, or notes. Any format works - PDFs, images, or documents.
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className='card backdrop-blur-sm bg-base-100/50 shadow-xl hover:shadow-[0_0_25px_-5px_rgba(var(--secondary-rgb),0.3)] transition-all duration-300 hover:-translate-y-2 group border border-base-content/5 relative overflow-hidden'>
                                {/* Ambient Corner Glow */}
                                <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/10 to-transparent opacity-40 blur-2xl' />
                                <div className='absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent/10 to-transparent opacity-40 blur-2xl' />

                                {/* Animated Background Pattern */}
                                <div
                                    className='absolute inset-0 opacity-[0.02] pointer-events-none 
                                    bg-[radial-gradient(circle_at_1px_1px,theme(colors.base.content)_1px,transparent_0)] [background-size:16px_16px] 
                                    animate-subtle-bounce
                                    group-hover:scale-[1.02] group-hover:rotate-[0.5deg] transition-transform duration-700 -z-[1]'
                                />

                                {/* Ambient Gradient Animation */}
                                <div
                                    className='absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 opacity-30
                                    animate-gradient-shift [animation-duration:8s]'
                                />

                                {/* Multi-layered Gradient Glow Effects */}
                                <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none'>
                                    {/* Primary glow layer */}
                                    <div className='absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-accent/20 blur-xl' />
                                    {/* Secondary animated glow */}
                                    <div
                                        className='absolute inset-0 bg-gradient-to-tr from-secondary/10 via-transparent to-accent/10 
                                        animate-pulse [animation-duration:3s]'
                                    />
                                    {/* Shimmer effect */}
                                    <div
                                        className='absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent 
                                        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out'
                                    />
                                </div>

                                <div className='card-body items-center text-center relative p-8'>
                                    {/* Animated number */}
                                    <div className='absolute top-3 right-3 w-14 h-14 rounded-2xl bg-base-100/50 backdrop-blur-sm shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-500 overflow-hidden border border-base-content/5'>
                                        <div className='text-3xl font-bold dark:bg-gradient-to-br dark:from-secondary dark:to-accent dark:text-transparent bg-clip-text relative z-10'>
                                            2
                                        </div>
                                        <div className='absolute inset-0 bg-gradient-to-br from-secondary/10 to-accent/10 scale-0 group-hover:scale-100 transition-transform duration-500'></div>
                                    </div>

                                    {/* Enhanced icon container */}
                                    <div className='relative mb-8 mt-6 group-hover:scale-110 transition-transform duration-500'>
                                        <div className='absolute inset-0 bg-secondary/20 rounded-3xl blur-2xl scale-150 animate-pulse'></div>
                                        <div className='w-20 h-20 mask mask-hexagon bg-gradient-to-br from-secondary/10 to-secondary/30 flex items-center justify-center relative backdrop-blur-sm border border-secondary/20'>
                                            <Brain className='w-10 h-10 text-secondary group-hover:rotate-12 transition-transform duration-500' />
                                        </div>
                                    </div>

                                    <h3 className='card-title text-2xl group-hover:text-secondary transition-colors mb-4'>AI Magic Happens</h3>
                                    <p className='text-base-content/70 text-lg'>
                                        Our AI extracts all important dates, deadlines, and class schedules automatically.
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className='card backdrop-blur-sm bg-base-100/50 shadow-xl hover:shadow-[0_0_25px_-5px_rgba(var(--accent-rgb),0.3)] transition-all duration-300 hover:-translate-y-2 group border border-base-content/5 relative overflow-hidden'>
                                {/* Ambient Corner Glow */}
                                <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent opacity-40 blur-2xl' />
                                <div className='absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/10 to-transparent opacity-40 blur-2xl' />

                                {/* Animated Background Pattern */}
                                <div
                                    className='absolute inset-0 opacity-[0.02] pointer-events-none 
                                    bg-[radial-gradient(circle_at_1px_1px,theme(colors.base.content)_1px,transparent_0)] [background-size:16px_16px] 
                                    animate-subtle-bounce
                                    group-hover:scale-[1.02] group-hover:rotate-[0.5deg] transition-transform duration-700 -z-[1]'
                                />

                                {/* Ambient Gradient Animation */}
                                <div
                                    className='absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-30
                                    animate-gradient-shift [animation-duration:8s]'
                                />

                                {/* Multi-layered Gradient Glow Effects */}
                                <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none'>
                                    {/* Primary glow layer */}
                                    <div className='absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/20 blur-xl' />
                                    {/* Secondary animated glow */}
                                    <div
                                        className='absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-primary/10 
                                        animate-pulse [animation-duration:3s]'
                                    />
                                    {/* Shimmer effect */}
                                    <div
                                        className='absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent 
                                        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out'
                                    />
                                </div>

                                <div className='card-body items-center text-center relative p-8'>
                                    {/* Animated number */}
                                    <div className='absolute top-3 right-3 w-14 h-14 rounded-2xl bg-base-100/50 backdrop-blur-sm shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-500 overflow-hidden border border-base-content/5'>
                                        <div className='text-3xl font-bold dark:bg-gradient-to-br dark:from-accent dark:to-primary dark:text-transparent bg-clip-text relative z-10'>
                                            3
                                        </div>
                                        <div className='absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 scale-0 group-hover:scale-100 transition-transform duration-500'></div>
                                    </div>

                                    {/* Enhanced icon container */}
                                    <div className='relative mb-8 mt-6 group-hover:scale-110 transition-transform duration-500'>
                                        <div className='absolute inset-0 bg-accent/20 rounded-3xl blur-2xl scale-150 animate-pulse'></div>
                                        <div className='w-20 h-20 mask mask-hexagon bg-gradient-to-br from-accent/10 to-accent/30 flex items-center justify-center relative backdrop-blur-sm border border-accent/20'>
                                            <Calendar className='w-10 h-10 text-accent group-hover:rotate-12 transition-transform duration-500' />
                                        </div>
                                    </div>

                                    <h3 className='card-title text-2xl group-hover:text-accent transition-colors mb-4'>Stay on Track</h3>
                                    <p className='text-base-content/70 text-lg'>Get smart reminders and sync everything with your favorite calendar apps.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Demo Section */}
                <div className='py-24 sm:py-32 px-4 relative'>
                    <div className='max-w-6xl mx-auto relative'>
                        <div className='text-center mb-20'>
                            <div className='inline-block mb-4 relative group'>
                                <span className='text-secondary font-semibold tracking-wider block relative z-10 px-6 py-2'>
                                    INTERFACE
                                    <div className='absolute h-[2px] w-full bottom-0 left-0 bg-gradient-to-r from-transparent via-secondary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out'></div>
                                </span>
                                <div className='absolute inset-0 bg-secondary/5 rounded-lg blur-lg scale-0 group-hover:scale-100 transition-transform duration-500'></div>
                            </div>

                            <h2 className='text-5xl sm:text-6xl font-bold mt-6 mb-8 dark:bg-gradient-to-r dark:from-secondary dark:via-accent dark:to-primary dark:text-transparent bg-clip-text leading-tight sm:leading-tight px-2 relative inline-block group'>
                                Beautiful & Intuitive Interface
                                <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-secondary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500'></div>
                            </h2>

                            <p className='text-xl sm:text-2xl text-base-content/70 max-w-2xl mx-auto leading-relaxed px-4 animate-fade-in'>
                                A clean, modern design that makes academic organization a pleasure
                            </p>
                        </div>

                        <div className='mockup-browser border bg-base-300 shadow-2xl group hover:shadow-[0_0_50px_-12px_rgba(var(--secondary-rgb),0.3)] transition-all duration-500'>
                            <div className='mockup-browser-toolbar'>
                                <div className='input bg-base-200/50 text-base-content/70'>https://ivy-ai-assistant.com</div>
                            </div>
                            <div className='flex justify-center px-4 py-16 bg-base-200 relative overflow-hidden group-hover:bg-base-200/80 transition-colors duration-500'>
                                {/* Background effects for the preview area */}
                                <div className='absolute inset-0'>
                                    <div className='absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5'></div>
                                    <div className='absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.secondary)_1px,transparent_0)] [background-size:24px_24px] opacity-[0.02]'></div>
                                </div>

                                <div className='flex flex-col items-center gap-6 relative'>
                                    <div className='relative group/icon'>
                                        <div className='absolute inset-0 bg-secondary/20 rounded-full blur-2xl scale-150 animate-pulse'></div>
                                        <div className='relative z-10 p-6 bg-base-100/50 rounded-2xl backdrop-blur-sm border border-base-content/10 group-hover/icon:scale-110 transition-transform duration-300'>
                                            <GraduationCap className='w-20 h-20 text-secondary group-hover/icon:rotate-12 transition-transform duration-300' />
                                        </div>
                                    </div>

                                    <div className='text-center'>
                                        <h3 className='text-2xl font-bold mb-4 dark:bg-gradient-to-r dark:from-secondary dark:to-accent dark:text-transparent bg-clip-text'>
                                            Interface Preview Coming Soon
                                        </h3>
                                        <p className='text-base-content/70 max-w-md mx-auto leading-relaxed'>
                                            We're crafting a beautiful experience for you. Stay tuned!
                                        </p>
                                    </div>

                                    {/* Preview features list */}
                                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4'>
                                        <div className='flex items-center gap-2 text-base-content/60'>
                                            <CheckCircle2 className='w-4 h-4 text-secondary' />
                                            <span>Modern Design</span>
                                        </div>
                                        <div className='flex items-center gap-2 text-base-content/60'>
                                            <CheckCircle2 className='w-4 h-4 text-secondary' />
                                            <span>Intuitive Layout</span>
                                        </div>
                                        <div className='flex items-center gap-2 text-base-content/60'>
                                            <CheckCircle2 className='w-4 h-4 text-secondary' />
                                            <span>Smart Features</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Features Section */}
                <div className='py-16 sm:py-24 px-4'>
                    <div className='max-w-6xl mx-auto'>
                        <div className='text-center mb-16'>
                            <span className='text-primary font-semibold tracking-wider block mb-3'>FEATURES</span>
                            <h2 className='text-4xl sm:text-5xl font-bold mt-3 mb-8 dark:bg-gradient-to-r dark:from-accent dark:to-primary dark:text-transparent bg-clip-text leading-[1.2] sm:leading-[1.2] py-1 px-4'>
                                Everything You Need to Conquer College
                            </h2>
                            <p className='text-base sm:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed px-4'>
                                Designed by students, for students - with all the tools you need to succeed
                            </p>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8'>
                            {/* Course Organization */}
                            <div className='card backdrop-blur-sm bg-base-100/50 shadow-xl hover:shadow-[0_0_25px_-5px_rgba(var(--primary-rgb),0.3)] transition-all duration-300 hover:-translate-y-2 group border border-base-content/5 relative overflow-hidden'>
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

                                <div className='card-body items-center text-center p-8 relative'>
                                    <div className='relative mb-6 group-hover:scale-110 transition-transform duration-500'>
                                        <div className='absolute inset-0 bg-primary/20 rounded-3xl blur-2xl scale-150 animate-pulse'></div>
                                        <div className='w-16 h-16 mask mask-hexagon bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center relative backdrop-blur-sm border border-primary/20'>
                                            <BookOpen className='w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-500' />
                                        </div>
                                    </div>
                                    <h3 className='card-title text-xl mb-4 group-hover:text-primary transition-colors leading-relaxed'>Smart Organization</h3>
                                    <p className='text-base-content/70 leading-relaxed mb-6'>
                                        No more manual entry - we extract and organize everything automatically
                                    </p>
                                    <ul className='mt-4 space-y-3 text-left w-full'>
                                        <li className='flex items-center gap-3 group/item'>
                                            <div className='w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform'>
                                                <CheckCircle2 className='w-3 h-3 text-primary shrink-0' />
                                            </div>
                                            <span className='leading-relaxed group-hover/item:text-primary transition-colors'>Auto-extract from PDFs</span>
                                        </li>
                                        <li className='flex items-center gap-3 group/item'>
                                            <div className='w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform'>
                                                <CheckCircle2 className='w-3 h-3 text-primary shrink-0' />
                                            </div>
                                            <span className='leading-relaxed group-hover/item:text-primary transition-colors'>Smart deadline tracking</span>
                                        </li>
                                        <li className='flex items-center gap-3 group/item'>
                                            <div className='w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform'>
                                                <CheckCircle2 className='w-3 h-3 text-primary shrink-0' />
                                            </div>
                                            <span className='leading-relaxed group-hover/item:text-primary transition-colors'>Unified dashboard</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Assignment Tracking */}
                            <div className='card backdrop-blur-sm bg-base-100/50 shadow-xl hover:shadow-[0_0_25px_-5px_rgba(var(--secondary-rgb),0.3)] transition-all duration-300 hover:-translate-y-2 group border border-base-content/5 relative overflow-hidden'>
                                {/* Ambient Corner Glow */}
                                <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/10 to-transparent opacity-40 blur-2xl' />
                                <div className='absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent/10 to-transparent opacity-40 blur-2xl' />

                                {/* Animated Background Pattern */}
                                <div
                                    className='absolute inset-0 opacity-[0.02] pointer-events-none 
                                    bg-[radial-gradient(circle_at_1px_1px,theme(colors.base.content)_1px,transparent_0)] [background-size:16px_16px] 
                                    animate-subtle-bounce
                                    group-hover:scale-[1.02] group-hover:rotate-[0.5deg] transition-transform duration-700 -z-[1]'
                                />

                                {/* Ambient Gradient Animation */}
                                <div
                                    className='absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 opacity-30
                                    animate-gradient-shift [animation-duration:8s]'
                                />

                                {/* Multi-layered Gradient Glow Effects */}
                                <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none'>
                                    {/* Primary glow layer */}
                                    <div className='absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-accent/20 blur-xl' />
                                    {/* Secondary animated glow */}
                                    <div
                                        className='absolute inset-0 bg-gradient-to-tr from-secondary/10 via-transparent to-accent/10 
                                        animate-pulse [animation-duration:3s]'
                                    />
                                    {/* Shimmer effect */}
                                    <div
                                        className='absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent 
                                        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out'
                                    />
                                </div>

                                <div className='card-body items-center text-center p-8 relative'>
                                    <div className='relative mb-6 group-hover:scale-110 transition-transform duration-500'>
                                        <div className='absolute inset-0 bg-secondary/20 rounded-3xl blur-2xl scale-150 animate-pulse'></div>
                                        <div className='w-16 h-16 mask mask-hexagon bg-gradient-to-br from-secondary/10 to-secondary/30 flex items-center justify-center relative backdrop-blur-sm border border-secondary/20'>
                                            <Target className='w-8 h-8 text-secondary group-hover:rotate-12 transition-transform duration-500' />
                                        </div>
                                    </div>
                                    <h3 className='card-title text-xl mb-4 group-hover:text-secondary transition-colors'>AI-Powered Reminders</h3>
                                    <p className='text-base-content/70 leading-relaxed mb-6'>
                                        Never miss another deadline with smart, context-aware notifications
                                    </p>
                                    <ul className='mt-4 space-y-3 text-left w-full'>
                                        <li className='flex items-center gap-3 group/item'>
                                            <div className='w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform'>
                                                <CheckCircle2 className='w-3 h-3 text-secondary' />
                                            </div>
                                            <span className='leading-relaxed group-hover/item:text-secondary transition-colors'>Personalized timing</span>
                                        </li>
                                        <li className='flex items-center gap-3 group/item'>
                                            <div className='w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform'>
                                                <CheckCircle2 className='w-3 h-3 text-secondary' />
                                            </div>
                                            <span className='leading-relaxed group-hover/item:text-secondary transition-colors'>Priority-based alerts</span>
                                        </li>
                                        <li className='flex items-center gap-3 group/item'>
                                            <div className='w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center group-hover/item:scale-110 transition-transform'>
                                                <CheckCircle2 className='w-3 h-3 text-secondary' />
                                            </div>
                                            <span className='leading-relaxed group-hover/item:text-secondary transition-colors'>Cross-platform sync</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Schedule Management */}
                            <div className='card backdrop-blur-sm bg-base-100/50 shadow-xl hover:shadow-[0_0_25px_-5px_rgba(var(--accent-rgb),0.3)] transition-all duration-300 hover:-translate-y-2 group border border-base-content/5 relative overflow-hidden'>
                                {/* Ambient Corner Glow */}
                                <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent opacity-40 blur-2xl' />
                                <div className='absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/10 to-transparent opacity-40 blur-2xl' />

                                {/* Animated Background Pattern */}
                                <div
                                    className='absolute inset-0 opacity-[0.02] pointer-events-none 
                                    bg-[radial-gradient(circle_at_1px_1px,theme(colors.base.content)_1px,transparent_0)] [background-size:16px_16px] 
                                    animate-subtle-bounce
                                    group-hover:scale-[1.02] group-hover:rotate-[0.5deg] transition-transform duration-700 -z-[1]'
                                />

                                {/* Ambient Gradient Animation */}
                                <div
                                    className='absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-30
                                    animate-gradient-shift [animation-duration:8s]'
                                />

                                {/* Multi-layered Gradient Glow Effects */}
                                <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none'>
                                    {/* Primary glow layer */}
                                    <div className='absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/20 blur-xl' />
                                    {/* Secondary animated glow */}
                                    <div
                                        className='absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-primary/10 
                                        animate-pulse [animation-duration:3s]'
                                    />
                                    {/* Shimmer effect */}
                                    <div
                                        className='absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent 
                                        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out'
                                    />
                                </div>

                                <div className='card-body items-center text-center p-8 relative'>
                                    <div className='relative mb-6 group-hover:scale-110 transition-transform duration-500'>
                                        <div className='absolute inset-0 bg-accent/20 rounded-3xl blur-2xl scale-150 animate-pulse'></div>
                                        <div className='w-16 h-16 mask mask-hexagon bg-gradient-to-br from-accent/10 to-accent/30 flex items-center justify-center relative backdrop-blur-sm border border-accent/20'>
                                            <Calendar className='w-8 h-8 text-accent group-hover:rotate-12 transition-transform duration-500' />
                                        </div>
                                    </div>
                                    <h3 className='card-title text-xl mb-4 group-hover:text-accent transition-colors'>Calendar Integration</h3>
                                    <p className='text-base-content/70 leading-relaxed mb-6'>Seamlessly sync with your favorite calendar apps</p>
                                    <ul className='mt-4 space-y-3 text-left w-full'>
                                        <li className='flex items-center gap-3 group/item'>
                                            <div className='w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center group-hover/item:scale-110 transition-transform'>
                                                <CheckCircle2 className='w-3 h-3 text-accent' />
                                            </div>
                                            <span className='leading-relaxed group-hover/item:text-accent transition-colors'>Google Calendar</span>
                                        </li>
                                        <li className='flex items-center gap-3 group/item'>
                                            <div className='w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center group-hover/item:scale-110 transition-transform'>
                                                <CheckCircle2 className='w-3 h-3 text-accent' />
                                            </div>
                                            <span className='leading-relaxed group-hover/item:text-accent transition-colors'>Apple Calendar</span>
                                        </li>
                                        <li className='flex items-center gap-3 group/item'>
                                            <div className='w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center group-hover/item:scale-110 transition-transform'>
                                                <CheckCircle2 className='w-3 h-3 text-accent' />
                                            </div>
                                            <span className='leading-relaxed group-hover/item:text-accent transition-colors'>Microsoft Outlook</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section - Repurposed as Waitlist */}
                <div className='py-16 sm:py-24 px-4'>
                    <div className='max-w-4xl mx-auto'>
                        <div className='card backdrop-blur-sm bg-base-100/50 shadow-xl hover:shadow-[0_0_25px_-5px_rgba(var(--primary-rgb),0.3)] transition-all duration-300 hover:-translate-y-2 group border border-base-content/5 relative overflow-hidden'>
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

                            <div className='card-body p-8 sm:p-12 relative'>
                                <div className='relative'>
                                    <div className='flex justify-center mb-8'>
                                        <div className='relative group-hover:scale-110 transition-transform duration-500'>
                                            <div className='absolute inset-0 bg-primary/20 rounded-3xl blur-2xl scale-150 animate-pulse'></div>
                                            <div className='w-20 h-20 mask mask-hexagon bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center relative backdrop-blur-sm border border-primary/20'>
                                                <Bell className='w-10 h-10 text-primary group-hover:rotate-12 transition-transform duration-500' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='text-center mb-10'>
                                        <h2 className='text-4xl sm:text-5xl font-bold mb-8 dark:bg-gradient-to-r dark:from-primary dark:via-secondary dark:to-accent dark:text-transparent bg-clip-text leading-[1.2] sm:leading-[1.2] py-1 px-4'>
                                            Ready to Transform<br />Your Student Life?
                                        </h2>
                                        <p className='text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed px-4'>
                                            Join the waitlist for early access + exclusive perks. Limited spots available!
                                        </p>
                                    </div>

                                    <div className='flex flex-col sm:flex-row gap-4 max-w-lg mx-auto'>
                                        <input
                                            className='flex-1 input bg-base-100/50 backdrop-blur-sm border-base-content/10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-lg'
                                            placeholder='Enter you email'
                                        />
                                        <button className='btn btn-primary gap-2 group/btn relative overflow-hidden'>
                                            <div className='absolute inset-0 bg-gradient-to-r from-primary/0 via-base-100/10 to-primary/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000'></div>
                                            Claim My Spot
                                            <ArrowRight className='w-4 h-4 group-hover/btn:translate-x-1 transition-transform' />
                                        </button>
                                    </div>

                                    <div className='flex flex-wrap items-center justify-center gap-6 mt-8 pt-8 border-t border-base-content/10'>
                                        <div className='flex items-center gap-2 text-sm text-base-content/60 group/item'>
                                            <div className='w-10 h-10 mask mask-hexagon bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center backdrop-blur-sm border border-primary/20 group-hover/item:scale-110 transition-transform'>
                                                <Shield className='w-5 h-5 text-primary group-hover/item:rotate-12 transition-transform duration-300' />
                                            </div>
                                            <span>Privacy Protected</span>
                                        </div>
                                        <div className='flex items-center gap-2 text-sm text-base-content/60 group/item'>
                                            <div className='w-10 h-10 mask mask-hexagon bg-gradient-to-br from-secondary/10 to-secondary/30 flex items-center justify-center backdrop-blur-sm border border-secondary/20 group-hover/item:scale-110 transition-transform'>
                                                <Zap className='w-5 h-5 text-secondary group-hover/item:rotate-12 transition-transform duration-300' />
                                            </div>
                                            <span>Early Access Perks</span>
                                        </div>
                                        <div className='flex items-center gap-2 text-sm text-base-content/60 group/item'>
                                            <div className='w-10 h-10 mask mask-hexagon bg-gradient-to-br from-accent/10 to-accent/30 flex items-center justify-center backdrop-blur-sm border border-accent/20 group-hover/item:scale-110 transition-transform'>
                                                <CheckCircle2 className='w-5 h-5 text-accent group-hover/item:rotate-12 transition-transform duration-300' />
                                            </div>
                                            <span>Cancel Anytime</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className='py-24 px-4 bg-base-200/50 backdrop-blur-sm border-t border-base-content/5'>
                    <div className='max-w-6xl mx-auto'>
                        {/* Main Footer Content */}
                        <div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-16'>
                            {/* Brand Section */}
                            <div className='md:col-span-2 space-y-8'>
                                <div className='flex items-center gap-3 group'>
                                    <div className='relative'>
                                        <Bot className='w-10 h-10 text-primary transition-transform duration-300 group-hover:scale-110' />
                                        <div className='absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 animate-pulse'></div>
                                    </div>
                                    <h3 className='font-bold text-2xl dark:bg-gradient-to-r dark:from-primary dark:to-secondary dark:text-transparent bg-clip-text'>
                                        Ivy AI Assistant
                                    </h3>
                                </div>
                                <p className='text-base-content/70 max-w-md leading-relaxed'>
                                    Where AI meets academic excellence. Your intelligent companion for a stress-free semester. We're building the future of student productivity.
                                </p>
                                <div className='flex items-center gap-4'>
                                    <Link to='/' className='btn btn-ghost btn-sm btn-circle hover:bg-primary/10 hover:text-primary transition-all'>
                                        <Shield className='w-5 h-5' />
                                    </Link>
                                    <Link to='/' className='btn btn-ghost btn-sm btn-circle hover:bg-primary/10 hover:text-primary transition-all'>
                                        <Brain className='w-5 h-5' />
                                    </Link>
                                </div>
                            </div>

                            {/* Platform Links */}
                            <div>
                                <h4 className='font-semibold mb-6 text-lg relative inline-block'>
                                    Platform
                                    <div className='absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/50 to-transparent'></div>
                                </h4>
                                <ul className='space-y-3'>
                                    <li>
                                        <Link
                                            to='/courses'
                                            className='link link-hover text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-2 group'>
                                            <div className='w-1 h-1 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                                            Features
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to='/dashboard'
                                            className='link link-hover text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-2 group'>
                                            <div className='w-1 h-1 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                                            Early Access
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to='/auth'
                                            className='link link-hover text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-2 group'>
                                            <div className='w-1 h-1 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                                            Join Waitlist
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Support Links */}
                            <div>
                                <h4 className='font-semibold mb-6 text-lg relative inline-block'>
                                    Support
                                    <div className='absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/50 to-transparent'></div>
                                </h4>
                                <ul className='space-y-3'>
                                    <li>
                                        <Link
                                            to='/'
                                            className='link link-hover text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-2 group'>
                                            <div className='w-1 h-1 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                                            FAQ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to='/'
                                            className='link link-hover text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-2 group'>
                                            <div className='w-1 h-1 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to='/'
                                            className='link link-hover text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-2 group'>
                                            <div className='w-1 h-1 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                                            Terms of Service
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className='flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-base-content/10'>
                            <p className='text-base-content/50 text-sm'>
                                © {new Date().getFullYear()} Ivy AI Assistant. All rights reserved.
                            </p>
                            <div className='flex items-center gap-2 mt-4 sm:mt-0'>
                                <span className='text-base-content/30 text-sm'>Made with</span>
                                <Sparkles className='w-4 h-4 text-primary animate-pulse' />
                                <span className='text-base-content/30 text-sm'>by students</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
