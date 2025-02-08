import { Link } from '@tanstack/react-router';
import ThemeSwitcher from './ThemeSwitcher';
import { Bot, Calendar, BookOpen, HelpCircle, Menu, Settings, Plus } from 'lucide-react';
import { useAuth } from '../providers/AuthProvider';
import { useState } from 'react';

export default function Navbar() {
    const { user, isAuthenticated, signOut } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className='fixed top-0 left-0 right-0 z-50'>
            <div className='navbar bg-base-100/70 backdrop-blur-lg border-b border-base-200/50 px-4 sm:px-8'>
                <div className='navbar-start'>
                    <Link to='/' className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
                        <Bot className='w-6 h-6' />
                        <span className='font-bold text-lg'>Ivy AI</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                {isAuthenticated && (
                    <div className='hidden md:flex navbar-center gap-6'>
                        <Link to='/dashboard' className='flex items-center gap-2 link link-hover'>
                            <Calendar className='w-4 h-4' />
                            <span>Dashboard</span>
                        </Link>
                        <Link to='/courses' className='flex items-center gap-2 link link-hover'>
                            <BookOpen className='w-4 h-4' />
                            <span>Courses</span>
                        </Link>
                    </div>
                )}

                <div className='navbar-end gap-x-2'>
                    {/* Help Button - Hidden on Mobile */}
                    <button className='btn btn-ghost btn-circle hidden sm:flex'>
                        <HelpCircle className='w-5 h-5' />
                    </button>

                    {/* Theme Switcher */}
                    <div className='hidden sm:block'>
                        <ThemeSwitcher />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className='sm:hidden'>
                        <button className='btn btn-ghost btn-circle' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <Menu className='w-5 h-5' />
                        </button>
                    </div>

                    {/* Auth Buttons - Desktop */}
                    <div className='hidden sm:block'>
                        {isAuthenticated ? (
                            <div className='dropdown dropdown-end'>
                                <label tabIndex={0} className='btn btn-ghost'>
                                    <div className='avatar placeholder'>
                                        <div className='bg-neutral text-neutral-content rounded-full w-8'>
                                            <span className='text-xs'>{user?.email?.[0].toUpperCase()}</span>
                                        </div>
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
                                >
                                    <li>
                                        <Link to='/dashboard' className='flex items-center gap-2'>
                                            <Calendar className='w-4 h-4' />
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/courses' className='flex items-center gap-2'>
                                            <BookOpen className='w-4 h-4' />
                                            Courses
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={signOut} className='text-error'>
                                            Sign out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className='flex gap-2'>
                                <Link to='/auth' className='btn btn-ghost btn-sm'>
                                    Sign In
                                </Link>
                                <Link to='/auth' className='btn btn-primary btn-sm'>
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {isMenuOpen && (
                <div className='fixed inset-0 z-50 sm:hidden'>
                    {/* Backdrop */}
                    <div
                        className='absolute inset-0 bg-base-200/80 backdrop-blur-sm'
                        onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Menu Content */}
                    <div className='absolute right-0 top-0 h-full w-64 bg-base-100/95 backdrop-blur-sm shadow-xl animate-slide-left'>
                        <div className='p-4'>
                            <div className='flex justify-between items-center mb-6'>
                                <h3 className='font-bold text-lg'>Menu</h3>
                                <button
                                    className='btn btn-ghost btn-sm btn-circle'
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    ✕
                                </button>
                            </div>

                            <div className='mb-6'>
                                <ThemeSwitcher />
                            </div>

                            {isAuthenticated ? (
                                <div className='space-y-2'>
                                    <div className='flex items-center gap-3 p-2'>
                                        <div className='avatar placeholder'>
                                            <div className='bg-neutral text-neutral-content rounded-full w-8'>
                                                <span className='text-xs'>{user?.email?.[0].toUpperCase()}</span>
                                            </div>
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <p className='font-medium truncate'>{user?.email}</p>
                                        </div>
                                    </div>
                                    <div className='divider my-2'></div>
                                    <Link
                                        to='/dashboard'
                                        className='flex items-center gap-2 p-2 hover:bg-base-200 rounded-lg'
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <Calendar className='w-4 h-4' />
                                        <span>Dashboard</span>
                                    </Link>
                                    <Link
                                        to='/courses'
                                        className='flex items-center gap-2 p-2 hover:bg-base-200 rounded-lg'
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <BookOpen className='w-4 h-4' />
                                        <span>Courses</span>
                                    </Link>
                                    <div className='divider my-2'></div>
                                    <button
                                        onClick={() => {
                                            signOut();
                                            setIsMenuOpen(false);
                                        }}
                                        className='flex items-center gap-2 p-2 hover:bg-base-200 rounded-lg text-error w-full'
                                    >
                                        Sign out
                                    </button>
                                </div>
                            ) : (
                                <div className='space-y-2'>
                                    <Link
                                        to='/auth'
                                        className='btn btn-ghost w-full'
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to='/auth'
                                        className='btn btn-primary w-full'
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
