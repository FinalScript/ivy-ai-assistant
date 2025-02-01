import { useEffect, useState } from 'react';
import { Sun, Moon, Sparkles, Candy, Box, Skull, Snowflake, Leaf } from 'lucide-react';

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

    // Initialize theme on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        
        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
    }, []);

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const currentTheme = THEMES.find(t => t.name === theme) || THEMES[0];
    const Icon = currentTheme.icon;

    return (
        <div className="dropdown dropdown-bottom flex justify-center">
            <label tabIndex={0} className="btn btn-sm">
                <Icon className="w-5 h-5" style={{ color: currentTheme.color }} />
                <span className="ml-2">Theme</span>
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                {THEMES.map((t) => {
                    const ThemeIcon = t.icon;
                    return (
                        <li key={t.name}>
                            <a
                                onClick={() => handleThemeChange(t.name)}
                                className={theme === t.name ? 'active' : ''}
                            >
                                <ThemeIcon className="w-4 h-4" style={{ color: t.color }} />
                                {t.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
