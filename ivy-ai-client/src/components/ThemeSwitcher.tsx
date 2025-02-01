import { useEffect, useState, useRef } from 'react';
import { Sun, Moon, Sparkles, Candy, Box, Skull, Snowflake, Leaf } from 'lucide-react';

// Define available themes with their icons and display names
const THEMES = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'retro', label: 'Retro', icon: Sparkles },
    { id: 'cupcake', label: 'Cupcake', icon: Candy },
    { id: 'wireframe', label: 'Wireframe', icon: Box },
    { id: 'dracula', label: 'Dracula', icon: Skull },
    { id: 'winter', label: 'Winter', icon: Snowflake },
    { id: 'emerald', label: 'Emerald', icon: Leaf },
] as const;

type Theme = (typeof THEMES)[number]['id'];

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState<Theme>('light');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Get the initial theme from localStorage or default to 'light'
        const savedTheme = (localStorage.getItem('theme') as Theme) || 'light';
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

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        setIsOpen(false);
    };

    // Get current theme object
    const currentTheme = THEMES.find((t) => t.id === theme) || THEMES[0];
    const ThemeIcon = currentTheme.icon;

    return (
        <div className='dropdown dropdown-bottom flex justify-center' ref={dropdownRef}>
            <div tabIndex={0} role='button' className='btn btn-sm' onClick={() => setIsOpen(!isOpen)}>
                <div className='flex items-center gap-2'>
                    <ThemeIcon className='w-5 h-5' />
                    <span className='text-sm'>Theme</span>
                </div>
            </div>
            {isOpen && (
                <ul tabIndex={0} className='dropdown-content mx-auto mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 menu menu-sm'>
                    {THEMES.map((themeOption) => {
                        const Icon = themeOption.icon;
                        return (
                            <li key={themeOption.id}>
                                <button
                                    className={`flex items-center gap-3 ${theme === themeOption.id ? 'active' : ''}`}
                                    onClick={() => handleThemeChange(themeOption.id)}>
                                    <Icon className='w-4 h-4' />
                                    {themeOption.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default ThemeSwitcher;
