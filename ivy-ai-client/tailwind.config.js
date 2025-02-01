/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [daisyui, require('@tailwindcss/typography')],
    daisyui: {
        themes: ['light', 'dark', 'retro', 'emerald', 'sunset', 'cupcake', 'dracula', 'winter', 'bumblebee'],
    },
};
