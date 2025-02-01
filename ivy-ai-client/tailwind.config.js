/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            animation: {
                'bounce-slow': 'bounce 2s infinite',
                'blob': 'blob 7s infinite',
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'spin-once': 'spin 1.2s linear',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-up-delayed': 'slideUp 0.5s ease-out 0.2s both',
            },
            keyframes: {
                blob: {
                    '0%': {
                        transform: 'translate(0px, 0px) scale(1)',
                    },
                    '33%': {
                        transform: 'translate(30px, -50px) scale(1.1)',
                    },
                    '66%': {
                        transform: 'translate(-20px, 20px) scale(0.9)',
                    },
                    '100%': {
                        transform: 'translate(0px, 0px) scale(1)',
                    },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                spin: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                slideUp: {
                    '0%': { 
                        transform: 'translateY(20px)',
                        opacity: '0'
                    },
                    '100%': {
                        transform: 'translateY(0)',
                        opacity: '1'
                    },
                },
            },
        },
    },
    plugins: [daisyui, require('@tailwindcss/typography')],
    daisyui: {
        themes: ['light', 'dark', 'retro', 'emerald', 'sunset', 'cupcake', 'dracula', 'winter', 'wireframe'],
    },
};
