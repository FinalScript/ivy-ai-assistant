import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { Calendar, BookOpen, Bot, Brain, Clock, Target, Trophy, CheckCircle2, Sparkles, Layout, GraduationCap, ArrowRight, Zap, Shield, Bell } from 'lucide-react';

export const Route = createFileRoute('/')({
    component: Index,
});

function Index() {
    return (
        <div className='min-h-screen'>
            {/* Hero Section */}
            <div className='hero min-h-screen bg-base-200 relative overflow-hidden'>
                {/* Enhanced animated background pattern */}
                <div className='absolute inset-0 opacity-10'>
                    {/* Larger animated blobs */}
                    <div className='absolute w-96 sm:w-[600px] h-96 sm:h-[600px] top-1/4 -left-48 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-blob'></div>
                    <div className='absolute w-96 sm:w-[600px] h-96 sm:h-[600px] top-1/4 -right-48 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000'></div>
                    <div className='absolute w-96 sm:w-[600px] h-96 sm:h-[600px] bottom-1/4 -left-48 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000'></div>
                    <div className='absolute w-96 sm:w-[600px] h-96 sm:h-[600px] bottom-1/4 -right-48 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-blob'></div>
                </div>

                {/* Multiple layered grid patterns */}
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.base.content)_1px,transparent_0)] [background-size:40px_40px] opacity-[0.02]'></div>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.primary)_1px,transparent_0)] [background-size:80px_80px] opacity-[0.01] animate-subtle-spin'></div>
                <div className='absolute inset-0 bg-[linear-gradient(45deg,theme(colors.primary)_1px,transparent_0)] [background-size:60px_60px] opacity-[0.01] animate-subtle-spin-reverse'></div>

                {/* Floating particles effect */}
                <div className='absolute inset-0'>
                    <div className='absolute h-32 w-32 rounded-full bg-primary/5 -top-16 left-1/4 animate-float'></div>
                    <div className='absolute h-24 w-24 rounded-full bg-secondary/5 top-1/3 right-1/4 animate-float animation-delay-2000'></div>
                    <div className='absolute h-16 w-16 rounded-full bg-accent/5 bottom-1/4 left-1/3 animate-float animation-delay-4000'></div>
                </div>

                {/* Gradient overlays */}
                <div className='absolute inset-0 bg-gradient-to-b from-base-200 via-transparent to-base-200 opacity-40'></div>
                <div className='absolute inset-0 bg-gradient-to-r from-base-200 via-transparent to-base-200 opacity-40'></div>

                {/* Animated lines */}
                <div className='absolute inset-0 overflow-hidden'>
                    <div className='absolute w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent top-1/4 animate-slide-left'></div>
                    <div className='absolute w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent top-2/4 animate-slide-right animation-delay-2000'></div>
                    <div className='absolute w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent top-3/4 animate-slide-left animation-delay-4000'></div>
                </div>

                <div className='hero-content text-center z-10 w-full max-w-4xl px-4 mt-16 sm:mt-0'>
                    <div className='w-full'>
                        <div className='flex justify-center mb-6 animate-bounce-slow'>
                            <div className='relative'>
                                <Bot className='w-12 h-12 sm:w-16 sm:h-16 text-primary relative z-10' />
                                <div className='absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150'></div>
                            </div>
                        </div>

                        <h1 className='mb-6'>
                            <span className='block text-5xl sm:text-7xl font-bold mb-6 animate-slide-up bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-[1.2] sm:leading-[1.2] py-1'>
                                Your AI-Powered Academic Assistant
                            </span>
                            <span className='block text-2xl sm:text-4xl text-base-content/80 animate-slide-up-delayed leading-relaxed'>
                                Organize your courses, track assignments, and manage your academic schedule - all in one place
                            </span>
                        </h1>

                        <p className='py-8 text-base sm:text-xl animate-slide-up-delayed max-w-2xl mx-auto text-base-content/70 leading-relaxed'>
                            Experience a smarter way to manage your academic life with our intuitive course organization system.
                        </p>

                        {/* Quick Feature Pills */}
                        <div className='flex flex-wrap justify-center gap-3 mb-10 animate-slide-up-delayed'>
                            <div className='badge badge-primary badge-outline gap-2 p-4 hover:bg-primary/10 transition-colors cursor-default group'>
                                <CheckCircle2 className='w-4 h-4 group-hover:scale-110 transition-transform' /> Free for Students
                            </div>
                            <div className='badge badge-secondary badge-outline gap-2 p-4 hover:bg-secondary/10 transition-colors cursor-default group'>
                                <Sparkles className='w-4 h-4 group-hover:scale-110 transition-transform' /> Smart Organization
                            </div>
                            <div className='badge badge-accent badge-outline gap-2 p-4 hover:bg-accent/10 transition-colors cursor-default group'>
                                <Layout className='w-4 h-4 group-hover:scale-110 transition-transform' /> Beautiful Interface
                            </div>
                        </div>

                        <div className='flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delayed'>
                            <Link 
                                to='/auth' 
                                className='btn btn-primary btn-lg gap-3 group relative overflow-hidden'
                            >
                                <div className='absolute inset-0 bg-gradient-to-r from-primary/0 via-base-100/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
                                Get Started - It's Free
                                <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Enhanced scroll indicator */}
                <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
                    <div className='w-8 h-8 rounded-full border-2 border-base-content/20 flex items-center justify-center group hover:border-primary/50 transition-colors cursor-pointer'>
                        <div className='w-1 h-3 bg-base-content/20 rounded-full group-hover:bg-primary/50 transition-colors'></div>
                    </div>
                </div>
            </div>

            {/* How It Works Section - Enhanced */}
            <div className='py-16 sm:py-24 px-4 bg-base-200 relative overflow-hidden'>
                {/* Enhanced background patterns */}
                <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5'></div>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.base.content)_1px,transparent_0)] [background-size:40px_40px] opacity-[0.02]'></div>
                <div className='absolute inset-0 bg-[linear-gradient(45deg,theme(colors.primary)_1px,transparent_0)] [background-size:60px_60px] opacity-[0.01]'></div>
                <div className='absolute inset-0 overflow-hidden'>
                    <div className='absolute w-full h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent top-1/4 animate-slide-left'></div>
                    <div className='absolute w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/10 to-transparent top-3/4 animate-slide-right'></div>
                </div>
                <div className='max-w-6xl mx-auto relative'>
                    <div className='text-center mb-16'>
                        <span className='text-primary font-semibold tracking-wider block mb-2'>GET STARTED</span>
                        <h2 className='text-4xl sm:text-5xl font-bold mt-3 mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight sm:leading-tight px-2'>How It Works</h2>
                        <p className='text-base sm:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed px-4'>
                            Get started in three simple steps and transform your academic journey
                        </p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        <div className='card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group'>
                            <div className='card-body items-center text-center relative'>
                                <div className='absolute top-4 right-4 text-4xl font-bold text-primary/20 group-hover:scale-125 transition-transform'>1</div>
                                <div className='w-16 h-16 mask mask-hexagon bg-primary/10 flex items-center justify-center mb-4'>
                                    <Bot className='w-8 h-8 text-primary' />
                                </div>
                                <h3 className='card-title group-hover:text-primary transition-colors'>Sign Up</h3>
                                <p className='text-base-content/70'>Create your free account to get started</p>
                            </div>
                        </div>

                        <div className='card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group'>
                            <div className='card-body items-center text-center relative'>
                                <div className='absolute top-4 right-4 text-4xl font-bold text-secondary/20 group-hover:scale-125 transition-transform'>2</div>
                                <div className='w-16 h-16 mask mask-hexagon bg-secondary/10 flex items-center justify-center mb-4'>
                                    <BookOpen className='w-8 h-8 text-secondary' />
                                </div>
                                <h3 className='card-title group-hover:text-secondary transition-colors'>Add Your Courses</h3>
                                <p className='text-base-content/70'>Input your course details and schedules</p>
                            </div>
                        </div>

                        <div className='card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group'>
                            <div className='card-body items-center text-center relative'>
                                <div className='absolute top-4 right-4 text-4xl font-bold text-accent/20 group-hover:scale-125 transition-transform'>3</div>
                                <div className='w-16 h-16 mask mask-hexagon bg-accent/10 flex items-center justify-center mb-4'>
                                    <Layout className='w-8 h-8 text-accent' />
                                </div>
                                <h3 className='card-title group-hover:text-accent transition-colors'>Stay Organized</h3>
                                <p className='text-base-content/70'>Access your organized dashboard anytime</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual Demo Section */}
            <div className='py-16 sm:py-24 px-4 bg-base-100 relative overflow-hidden'>
                {/* Enhanced background patterns */}
                <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5'></div>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.base.content)_1px,transparent_0)] [background-size:40px_40px] opacity-[0.02]'></div>
                <div className='absolute inset-0 bg-[linear-gradient(-45deg,theme(colors.secondary)_1px,transparent_0)] [background-size:60px_60px] opacity-[0.01]'></div>
                <div className='absolute inset-0 overflow-hidden'>
                    <div className='absolute w-[1px] h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent left-1/4 animate-slide-down'></div>
                    <div className='absolute w-[1px] h-full bg-gradient-to-b from-transparent via-secondary/10 to-transparent right-1/4 animate-slide-up'></div>
                </div>
                <div className='max-w-6xl mx-auto relative'>
                    <div className='text-center mb-16'>
                        <h2 className='text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent leading-tight sm:leading-tight px-2'>Beautiful & Intuitive Interface</h2>
                        <p className='text-base sm:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed px-4'>
                            A clean, modern design that makes academic organization a pleasure
                        </p>
                    </div>
                    <div className='mockup-browser border bg-base-300'>
                        <div className='mockup-browser-toolbar'>
                            <div className='input'>https://ivy-ai-assistant.com</div>
                        </div>
                        <div className='flex justify-center px-4 py-16 bg-base-200'>
                            <div className='flex flex-col items-center gap-4'>
                                <GraduationCap className='w-16 h-16 text-primary' />
                                <p className='text-xl'>Interface Preview Coming Soon</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Features Section - Enhanced */}
            <div className='py-16 sm:py-24 px-4 bg-base-100 relative overflow-hidden'>
                {/* Enhanced background patterns */}
                <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5'></div>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.base.content)_1px,transparent_0)] [background-size:40px_40px] opacity-[0.02]'></div>
                <div className='absolute inset-0 bg-[linear-gradient(45deg,theme(colors.primary)_1px,transparent_0)] [background-size:60px_60px] opacity-[0.01]'></div>
                
                {/* Animated elements */}
                <div className='absolute inset-0'>
                    <div className='absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl -top-32 -left-32 animate-pulse'></div>
                    <div className='absolute w-64 h-64 rounded-full bg-secondary/5 blur-3xl -bottom-32 -right-32 animate-pulse animation-delay-2000'></div>
                </div>

                <div className='max-w-6xl mx-auto relative'>
                    <div className='text-center mb-16'>
                        <span className='text-primary font-semibold tracking-wider block mb-3'>FEATURES</span>
                        <h2 className='text-4xl sm:text-5xl font-bold mt-3 mb-8 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent leading-[1.2] sm:leading-[1.2] py-1 px-4'>
                            Everything You Need
                        </h2>
                        <p className='text-base sm:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed px-4'>
                            Designed to enhance your academic experience with practical, time-saving features
                        </p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8'>
                        {/* Course Organization */}
                        <div className='card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group'>
                            <div className='card-body items-center text-center p-8'>
                                <div className='w-16 h-16 mask mask-hexagon bg-primary/10 flex items-center justify-center mb-6'>
                                    <BookOpen className='w-8 h-8 text-primary' />
                                </div>
                                <h3 className='card-title text-xl mb-4 group-hover:text-primary transition-colors leading-relaxed'>Course Organization</h3>
                                <p className='text-base-content/70 leading-relaxed mb-6'>Keep all your course information, schedules, and materials in one organized place</p>
                                <ul className='mt-4 space-y-3 text-left w-full'>
                                    <li className='flex items-center gap-3'>
                                        <CheckCircle2 className='w-4 h-4 text-primary shrink-0' />
                                        <span className='leading-relaxed'>Centralized course details</span>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <CheckCircle2 className='w-4 h-4 text-primary shrink-0' />
                                        <span className='leading-relaxed'>Easy schedule viewing</span>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <CheckCircle2 className='w-4 h-4 text-primary shrink-0' />
                                        <span className='leading-relaxed'>Quick information access</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Assignment Tracking */}
                        <div className='card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group'>
                            <div className='card-body items-center text-center'>
                                <div className='w-16 h-16 mask mask-hexagon bg-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                                    <Target className='w-8 h-8 text-secondary' />
                                </div>
                                <h3 className='card-title group-hover:text-secondary transition-colors'>Assignment Tracking</h3>
                                <p className='text-base-content/70'>Track all your assignments, exams, and projects with clear due dates and priorities</p>
                                <ul className='mt-4 space-y-2 text-left'>
                                    <li className='flex items-center gap-2'>
                                        <CheckCircle2 className='w-4 h-4 text-secondary' />
                                        <span>Clear due dates</span>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <CheckCircle2 className='w-4 h-4 text-secondary' />
                                        <span>Assignment details</span>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <CheckCircle2 className='w-4 h-4 text-secondary' />
                                        <span>Progress tracking</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Schedule Management */}
                        <div className='card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group'>
                            <div className='card-body items-center text-center'>
                                <div className='w-16 h-16 mask mask-hexagon bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                                    <Calendar className='w-8 h-8 text-accent' />
                                </div>
                                <h3 className='card-title group-hover:text-accent transition-colors'>Schedule Management</h3>
                                <p className='text-base-content/70'>View your weekly schedule at a glance with an intuitive calendar interface</p>
                                <ul className='mt-4 space-y-2 text-left'>
                                    <li className='flex items-center gap-2'>
                                        <CheckCircle2 className='w-4 h-4 text-accent' />
                                        <span>Weekly overview</span>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <CheckCircle2 className='w-4 h-4 text-accent' />
                                        <span>Class schedules</span>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <CheckCircle2 className='w-4 h-4 text-accent' />
                                        <span>Important dates</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Features Section */}
            <div className='py-16 sm:py-24 px-4 bg-base-100 relative overflow-hidden'>
                {/* Enhanced background patterns */}
                <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5'></div>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.base.content)_1px,transparent_0)] [background-size:40px_40px] opacity-[0.02]'></div>
                <div className='absolute inset-0 bg-[linear-gradient(-45deg,theme(colors.secondary)_1px,transparent_0)] [background-size:60px_60px] opacity-[0.01]'></div>
                
                {/* Animated elements */}
                <div className='absolute inset-0'>
                    <div className='absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl -top-32 -right-32 animate-pulse'></div>
                    <div className='absolute w-64 h-64 rounded-full bg-secondary/5 blur-3xl -bottom-32 -left-32 animate-pulse animation-delay-2000'></div>
                </div>

                <div className='max-w-6xl mx-auto relative'>
                    <div className='text-center mb-16'>
                        <span className='text-primary font-semibold tracking-wider'>MORE FEATURES</span>
                        <h2 className='text-4xl sm:text-5xl font-bold mt-3 mb-6 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent'>Packed with Powerful Features</h2>
                        <p className='text-base sm:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed'>
                            Discover all the tools you need for academic success
                        </p>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                        <div className='card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group'>
                            <div className='card-body items-center text-center'>
                                <Target className='w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform' />
                                <h3 className='font-bold mb-2 group-hover:text-primary transition-colors'>Assignment Progress</h3>
                                <p className='text-sm text-base-content/70'>Track completion status and upcoming deadlines for all your assignments</p>
                            </div>
                        </div>
                        <div className='card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group'>
                            <div className='card-body items-center text-center'>
                                <Shield className='w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform' />
                                <h3 className='font-bold mb-2 group-hover:text-accent transition-colors'>Privacy First</h3>
                                <p className='text-sm text-base-content/70'>Your data is always secure and private</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section - Enhanced */}
            <div className='py-16 sm:py-24 px-4 bg-base-100 relative overflow-hidden'>
                {/* Enhanced background patterns */}
                <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5'></div>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.base.content)_1px,transparent_0)] [background-size:40px_40px] opacity-[0.02]'></div>
                <div className='absolute inset-0 bg-[linear-gradient(45deg,theme(colors.accent)_1px,transparent_0)] [background-size:60px_60px] opacity-[0.01]'></div>
                
                {/* Animated elements */}
                <div className='absolute inset-0'>
                    <div className='absolute w-64 h-64 rounded-full bg-accent/5 blur-3xl -top-32 -left-32 animate-pulse'></div>
                    <div className='absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl -bottom-32 -right-32 animate-pulse animation-delay-2000'></div>
                </div>

                <div className='max-w-6xl mx-auto relative'>
                    <div className='text-center mb-16'>
                        <span className='text-primary font-semibold tracking-wider'>BENEFITS</span>
                        <h2 className='text-4xl sm:text-5xl font-bold mt-3 mb-6 bg-gradient-to-r from-error via-primary to-secondary bg-clip-text text-transparent'>Why Choose Ivy</h2>
                        <p className='text-base sm:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed'>
                            Experience the advantages of a well-organized academic life
                        </p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        <div className='card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group'>
                            <div className='card-body items-center text-center'>
                                <Brain className='w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform' />
                                <h3 className='text-xl font-bold mb-2 group-hover:text-primary transition-colors'>Stay Organized</h3>
                                <p className='text-base-content/70'>Keep all your course information in one centralized location</p>
                            </div>
                        </div>

                        <div className='card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group'>
                            <div className='card-body items-center text-center'>
                                <Clock className='w-12 h-12 text-secondary mb-4 group-hover:scale-110 transition-transform' />
                                <h3 className='text-xl font-bold mb-2 group-hover:text-secondary transition-colors'>Save Time</h3>
                                <p className='text-base-content/70'>Quick access to schedules and upcoming deadlines</p>
                            </div>
                        </div>

                        <div className='card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group'>
                            <div className='card-body items-center text-center'>
                                <Trophy className='w-12 h-12 text-accent mb-4 group-hover:scale-110 transition-transform' />
                                <h3 className='text-xl font-bold mb-2 group-hover:text-accent transition-colors'>Achieve More</h3>
                                <p className='text-base-content/70'>Stay on top of your academic responsibilities</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter Section - Enhanced */}
            <div className='py-16 sm:py-24 px-4 bg-base-200 relative overflow-hidden'>
                {/* Enhanced background effects */}
                <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5'></div>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.base.content)_1px,transparent_0)] [background-size:40px_40px] opacity-[0.02]'></div>
                <div className='absolute inset-0 bg-[linear-gradient(45deg,theme(colors.primary)_1px,transparent_0)] [background-size:60px_60px] opacity-[0.01]'></div>
                
                {/* Animated elements */}
                <div className='absolute inset-0'>
                    <div className='absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl -top-32 -left-32 animate-pulse'></div>
                    <div className='absolute w-64 h-64 rounded-full bg-secondary/5 blur-3xl -bottom-32 -right-32 animate-pulse animation-delay-2000'></div>
                </div>

                <div className='max-w-4xl mx-auto relative'>
                    <div className='card bg-base-100 shadow-2xl group'>
                        <div className='card-body p-8 sm:p-12'>
                            {/* Card background effects */}
                            <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                            <div className='absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.primary)_1px,transparent_0)] [background-size:20px_20px] opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500'></div>

                            <div className='relative'>
                                <div className='flex justify-center mb-8'>
                                    <div className='relative'>
                                        <Bell className='w-16 h-16 text-primary relative z-10 group-hover:scale-110 transition-transform duration-500' />
                                        <div className='absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150'></div>
                                    </div>
                                </div>

                                <div className='text-center mb-10'>
                                    <h2 className='text-4xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-secondary via-accent to-error bg-clip-text text-transparent leading-[1.2] sm:leading-[1.2] py-1 px-4'>
                                        Stay Updated
                                    </h2>
                                    <p className='text-lg sm:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed px-4 mb-8'>
                                        Get notified about new features, updates, and academic success tips
                                    </p>
                                </div>

                                <div className='flex flex-col sm:flex-row gap-4 max-w-lg mx-auto'>
                                    <input 
                                        className='input input-bordered flex-1 bg-base-200/50 border-2 focus:border-primary transition-colors text-lg' 
                                        placeholder='Enter your email'
                                    />
                                    <button className='btn btn-primary gap-2 group/btn min-w-[140px] relative overflow-hidden'>
                                        <div className='absolute inset-0 bg-gradient-to-r from-primary/0 via-base-100/10 to-primary/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000'></div>
                                        Subscribe
                                        <ArrowRight className='w-4 h-4 group-hover/btn:translate-x-1 transition-transform' />
                                    </button>
                                </div>

                                <div className='flex items-center justify-center gap-6 mt-8 pt-8 border-t border-base-200'>
                                    <div className='flex items-center gap-2 text-sm text-base-content/60'>
                                        <Shield className='w-4 h-4' />
                                        <span>Privacy Protected</span>
                                    </div>
                                    <div className='flex items-center gap-2 text-sm text-base-content/60'>
                                        <Zap className='w-4 h-4' />
                                        <span>Instant Updates</span>
                                    </div>
                                    <div className='flex items-center gap-2 text-sm text-base-content/60'>
                                        <CheckCircle2 className='w-4 h-4' />
                                        <span>Unsubscribe Anytime</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer - Enhanced */}
            <footer className='bg-base-100 text-base-content relative pt-16 pb-8'>
                {/* Ambient background effects */}
                <div className='absolute inset-0 bg-gradient-to-t from-base-200/50 to-transparent'></div>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.base.content)_1px,transparent_0)] [background-size:40px_40px] opacity-[0.02]'></div>
                
                <div className='max-w-6xl mx-auto px-4 relative'>
                    {/* Main Footer Content */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-16'>
                        {/* Brand Section */}
                        <div className='flex flex-col items-center md:items-start gap-6'>
                            <div className='relative group'>
                                <Bot className='w-12 h-12 text-primary transition-transform duration-300 group-hover:scale-110' />
                                <div className='absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 animate-pulse'></div>
                            </div>
                            <div className='text-center md:text-left'>
                                <h3 className='font-bold text-2xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-relaxed py-1'>Ivy AI Assistant</h3>
                                <p className='text-base-content/70 max-w-xs leading-relaxed'>Your intelligent academic companion, empowering your educational journey</p>
                            </div>
                        </div>

                        {/* Platform Links */}
                        <div className='text-center md:text-left'>
                            <h4 className='font-semibold mb-6 text-lg relative inline-block'>
                                Platform
                                <div className='absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/50 to-transparent'></div>
                            </h4>
                            <ul className='space-y-3'>
                                <li>
                                    <Link 
                                        to='/courses' 
                                        className='link link-hover text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-2 group w-fit mx-auto md:mx-0'
                                    >
                                        <div className='w-1 h-1 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                                        Courses
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to='/dashboard' 
                                        className='link link-hover text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-2 group w-fit mx-auto md:mx-0'
                                    >
                                        <div className='w-1 h-1 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to='/auth' 
                                        className='link link-hover text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-2 group w-fit mx-auto md:mx-0'
                                    >
                                        <div className='w-1 h-1 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                                        Get Started
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Support Links */}
                        <div className='text-center md:text-left'>
                            <h4 className='font-semibold mb-6 text-lg relative inline-block'>
                                Support
                                <div className='absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/50 to-transparent'></div>
                            </h4>
                            <ul className='space-y-3'>
                                <li>
                                    <Link 
                                        to='/' 
                                        className='link link-hover text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-2 group w-fit mx-auto md:mx-0'
                                    >
                                        <div className='w-1 h-1 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                                        Help Center
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to='/' 
                                        className='link link-hover text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-2 group w-fit mx-auto md:mx-0'
                                    >
                                        <div className='w-1 h-1 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to='/' 
                                        className='link link-hover text-base-content/70 hover:text-primary transition-all duration-300 flex items-center gap-2 group w-fit mx-auto md:mx-0'
                                    >
                                        <div className='w-1 h-1 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                                        Terms of Service
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className='flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-base-content/10'>
                        <p className='text-base-content/50 text-sm order-2 sm:order-1 mt-4 sm:mt-0'>
                            © {new Date().getFullYear()} Ivy AI Assistant. All rights reserved.
                        </p>
                        <div className='flex items-center gap-6 order-1 sm:order-2'>
                            <Link to='/' className='text-base-content/40 hover:text-primary transition-all duration-300 hover:scale-110'>
                                <Shield className='w-5 h-5' />
                            </Link>
                            <Link to='/' className='text-base-content/40 hover:text-primary transition-all duration-300 hover:scale-110'>
                                <Brain className='w-5 h-5' />
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
