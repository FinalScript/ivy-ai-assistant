import ThemeSwitcher from './ThemeSwitcher';
import { Link } from '@tanstack/react-router';
import { Bot } from 'lucide-react';

const Navbar = () => {
    return (
        <div className='navbar bg-base-100 shadow-lg'>
            <div className='navbar-start'>
                <Link to='/' className='cursor-pointer'>
                    <Bot className='w-6 h-6 ml-4' />
                </Link>
            </div>
            <div className='navbar-center'>
                <a className='btn btn-ghost text-xl'>Ivy AI</a>
            </div>
            <div className='navbar-end gap-x-2'>
                <Link to='/auth' className='btn btn-primary btn-sm'>
                    Login
                </Link>

                <ThemeSwitcher />
            </div>
        </div>
    );
};

export default Navbar;
