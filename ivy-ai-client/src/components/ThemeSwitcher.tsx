import { useEffect, useState, useRef } from 'react';
import { Sun, Moon, Sparkles, Candy, Box, Skull, Snowflake, Leaf, Check } from 'lucide-react';

const THEMES = [
    {
        name: 'light',
        label: 'Light',
        icon: Sun,
        color: '#570df8', // primary color for light theme
    },
    {
        name: 'dark',
        label: 'Dark',
        icon: Moon,
        color: '#661AE6', // primary color for dark theme
    },
    {
        name: 'retro',
        label: 'Retro',
        icon: Sparkles,
        color: '#ef4444', // primary color for retro theme
    },
    {
        name: 'cupcake',
        label: 'Cupcake',
        icon: Candy,
        color: '#65c3c8', // primary color for cupcake theme
    },
    {
        name: 'wireframe',
        label: 'Wireframe',
        icon: Box,
        color: '#b8b8b8', // primary color for wireframe theme
    },
    {
        name: 'dracula',
        label: 'Dracula',
        icon: Skull,
        color: '#ff79c6', // primary color for dracula theme
    },
    {
        name: 'winter',
        label: 'Winter',
        icon: Snowflake,
        color: '#5bc0de', // primary color for winter theme
    },
    {
        name: 'emerald',
        label: 'Emerald',
        icon: Leaf,
        color: '#66cc8a', // primary color for emerald theme
    },
] as const;

type Theme = (typeof THEMES)[number]['name'];

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<Theme>('light');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Get theme from localStorage or system preference
        const savedTheme = localStorage.getItem('theme') as Theme || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        setTheme(savedTheme);

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
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
        setIsOpen(false);
    };

    const currentTheme = THEMES.find(t => t.name === theme) || THEMES[0];
    const Icon = currentTheme.icon;

    return (
        <div className="dropdown dropdown-bottom flex justify-center" ref={dropdownRef}>
            <div 
                tabIndex={0} 
                role="button" 
                className="btn btn-sm"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5" style={{ color: currentTheme.color }} />
                    <span className="text-sm">Theme</span>
                </div>
            </div>
            {isOpen && (
                <ul tabIndex={0} className="dropdown-content menu menu-sm bg-base-100 text-base-content rounded-box w-56 p-2 shadow-lg mt-4">
                    {THEMES.map((t) => {
                        const ThemeIcon = t.icon;
                        return (
                            <li key={t.name}>
                                <button
                                    className={'flex items-center gap-3'}
                                    onClick={() => handleThemeChange(t.name)}
                                >
                                    <ThemeIcon className="w-4 h-4" style={{ color: t.color }} />
                                    {t.label}

                                    {theme === t.name && <Check className="w-4 h-4 mt-auto" />}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
