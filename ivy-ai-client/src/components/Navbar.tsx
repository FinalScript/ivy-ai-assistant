import { Link } from '@tanstack/react-router';
import ThemeSwitcher from './ThemeSwitcher';
import { Bot, Calendar, BookOpen, HelpCircle } from 'lucide-react';
import { useAuth } from '../providers/AuthProvider';

export default function Navbar() {
    const { user, isAuthenticated, signOut } = useAuth();

    return (
        <div className='navbar bg-base-100 shadow-lg px-4 sm:px-8'>
            <div className='navbar-start'>
                <Link to='/' className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
                    <Bot className='w-6 h-6' />
                    <span className='font-bold text-lg hidden sm:inline'>Ivy AI</span>
                </Link>

                {/* Navigation Links */}
                {isAuthenticated && (
                    <div className='hidden md:flex ml-8 gap-6'>
                        <Link to='/' className='flex items-center gap-2 link link-hover'>
                            <Calendar className='w-4 h-4' />
                            <span>Calendar</span>
                        </Link>
                        <Link to='/' className='flex items-center gap-2 link link-hover'>
                            <BookOpen className='w-4 h-4' />
                            <span>Courses</span>
                        </Link>
                    </div>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className='navbar-center md:hidden'>
                {isAuthenticated && (
                    <div className='dropdown'>
                        <div tabIndex={0} role='button' className='btn btn-ghost'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />
                            </svg>
                        </div>
                        <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52'>
                            <li>
                                <Link to='/' className='flex items-center gap-2'>
                                    <Calendar className='w-4 h-4' />
                                    <span>Calendar</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/' className='flex items-center gap-2'>
                                    <BookOpen className='w-4 h-4' />
                                    <span>Courses</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <div className='navbar-end gap-x-2'>
                {/* Help Button */}
                <button className='btn btn-ghost btn-circle hidden sm:flex'>
                    <HelpCircle className='w-5 h-5' />
                </button>

                <ThemeSwitcher />

                {/* Auth Buttons */}
                {isAuthenticated ? (
                    <div className='dropdown dropdown-end'>
                        <label tabIndex={0} className='btn btn-ghost'>
                            <div className='avatar placeholder'>
                                <div className='bg-neutral text-neutral-content rounded-full w-8'>
                                    <span className='text-xs'>{user?.email?.[0].toUpperCase()}</span>
                                </div>
                            </div>
                        </label>
                        <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>
                            <li>
                                <Link to='/' className='btn btn-ghost btn-sm'>My Account</Link>
                            </li>
                            <li>
                                <Link to='/' className='btn btn-ghost btn-sm'>Settings</Link>
                            </li>
                            <li>
                                <button onClick={signOut} className='btn btn-ghost btn-sm text-error'>Sign out</button>
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
    );
}
