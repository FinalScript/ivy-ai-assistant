import { useEffect, useState, useRef } from 'react';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState('light');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Get the initial theme from localStorage or default to 'light'
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);

        // Add click outside listener
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        setIsOpen(false);
    };

    return (
        <div className='dropdown' ref={dropdownRef}>
            <div tabIndex={0} role='button' className='btn btn-sm' onClick={() => setIsOpen(!isOpen)}>
                Theme
                <svg
                    width='12px'
                    height='12px'
                    className='inline-block h-2 w-2 fill-current opacity-60'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 2048 2048'>
                    <path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z'></path>
                </svg>
            </div>
            {isOpen && (
                <ul tabIndex={0} className='dropdown-content right-0 bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl'>
                    <li>
                        <input
                            type='radio'
                            name='theme-dropdown'
                            className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
                            aria-label='Light'
                            value='light'
                            checked={theme === 'light'}
                            onChange={(e) => handleThemeChange(e.target.value)}
                        />
                    </li>
                    <li>
                        <input
                            type='radio'
                            name='theme-dropdown'
                            className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
                            aria-label='Dark'
                            value='dark'
                            checked={theme === 'dark'}
                            onChange={(e) => handleThemeChange(e.target.value)}
                        />
                    </li>
                    <li>
                        <input
                            type='radio'
                            name='theme-dropdown'
                            className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
                            aria-label='Cupcake'
                            value='cupcake'
                            checked={theme === 'cupcake'}
                            onChange={(e) => handleThemeChange(e.target.value)}
                        />
                    </li>
                </ul>
            )}
        </div>
    );
};

export default ThemeSwitcher;
