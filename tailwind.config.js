import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                'noto-sans-jp': ['Noto Sans JP', 'sans-serif'],
            },
            backgroundImage: {
                'various-hobby': "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/images/VariousHobby.jpg')",
                'top': "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/Introduction.gif')",
            },
            animation: {
                "tracking-in-expand": "tracking-in-expand 1.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) 0.5s   both",
                "text-focus-in1": "text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) 2.5s  both",
                "text-focus-in2": "text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) 4s  both",
                "text-focus-in3": "text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) 5.5s  both",
                "text-focus-in4": "text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) 7s  both",
            },
            keyframes: {
                "tracking-in-expand": {
                    "0%": {
                        "letter-spacing": "-.5em",
                        opacity: "0"
                    },
                    "40%": {
                        opacity: ".6"
                    },
                    to: {
                        opacity: "1"
                    }
                },
                "text-focus-in": {
                    "0%": {
                        filter: "blur(12px)",
                        opacity: "0"
                    },
                    to: {
                        filter: "blur(0)",
                        opacity: "1"
                    }
                }
            }
        },
    },

    plugins: [forms],
};
