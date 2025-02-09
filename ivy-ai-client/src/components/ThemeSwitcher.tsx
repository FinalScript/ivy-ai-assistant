import { Candy, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const THEMES = [
    {
        name: 'cupcake',
        label: 'Cupcake',
        icon: Candy,
        color: '#65c3c8', // primary color for cupcake theme
    },
    {
        name: 'sunset',
        label: 'Sunset',
        icon: Sun,
        color: '#FF865B', // primary color for sunset theme
    },
    // {
    //     name: 'winter',
    //     label: 'Winter',
    //     icon: Snowflake,
    //     color: '#5bc0de', // primary color for winter theme
    // },
    // {
    //     name: 'forest',
    //     label: 'Forest',
    //     icon: Leaf,
    //     color: '#1eb854', // primary color for forest theme
    // },
] as const;

type Theme = (typeof THEMES)[number]['name'];

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<Theme>('cupcake');

    // Initialize theme on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (systemPrefersDark ? 'dracula' : 'cupcake');

        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
    }, []);

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const currentTheme = THEMES.find((t) => t.name === theme) || THEMES[0];
    const Icon = currentTheme.icon;

    return (
        <div className='dropdown dropdown-bottom flex justify-center'>
            <label tabIndex={0} className='btn btn-sm'>
                <Icon className='w-5 h-5' style={{ color: currentTheme.color }} />
                <span className='ml-2'>Theme</span>
            </label>
            <div tabIndex={0} className='dropdown-content z-[1] p-4 shadow-xl bg-base-200 rounded-btn'>
                <div className='grid gap-3'>
                    {THEMES.map((t) => {
                        const ThemeIcon = t.icon;
                        return (
                            <button
                                key={t.name}
                                onClick={() => handleThemeChange(t.name)}
                                className='btn btn-md bg-base-100 shadow-md whitespace-nowrap'
                                data-theme={t.name}>
                                <div className='w-full flex justify-between gap-x-5 items-center min-w-max'>
                                    <div className='flex gap-2 items-center'>
                                        <ThemeIcon className='w-4 h-4' style={{ color: t.color }} />
                                        <span className='font-medium'>{t.label}</span>
                                    </div>
                                    <div className='flex gap-1.5 justify-end'>
                                        <div className='w-2 h-5 rounded-full bg-primary' />
                                        <div className='w-2 h-5 rounded-full bg-secondary' />
                                        <div className='w-2 h-5 rounded-full bg-accent' />
                                        <div className='w-2 h-5 rounded-full bg-neutral' />
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
