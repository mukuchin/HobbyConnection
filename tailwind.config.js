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
            fontWeight: {
                'thin': '100',
                'light': '300',
                'regular': '400',
                'medium': '500',
                'bold': '700',
                'black': '900',
            },
            backgroundImage: {
                'various-hobby': "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/images/VariousHobby.jpg')",
            },
            animation: {
                "text-focus-in0": "text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) 0s  both",
                "text-focus-in1": "text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) 2.5s  both",
                "text-focus-in2": "text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) 3.5s  both",
                "text-focus-in3": "text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) 4.5s  both",
                "text-focus-in4": "text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) 5.5s  both",
                "scaleAnimation": 'scaleAnimation 1.2s ease-in-out',
                "text-focus-in5": "text-focus-in 0.2s cubic-bezier(0.550, 0.085, 0.680, 0.530) 0.1s both",

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
                },
                "scaleAnimation": {
                    '0%': { transform: 'scale(1) translateX(0) rotate(0deg)' },
                    '20%': { transform: 'scale(1.3) translateX(0) rotate(0deg)' },
                    '35%': { transform: 'scale(1.3) translateX(-5px) rotate(-15deg)' },
                    '50%': { transform: 'scale(1.3) translateX(5px) rotate(15deg)' },
                    '65%': { transform: 'scale(1.3) translateX(-5px) rotate(-15deg)' },
                    '80%': { transform: 'scale(1.3) translateX(0) rotate(0deg)' },
                    '100%': { transform: 'scale(1) translateX(0) rotate(0deg)' },
                },
            },
            boxShadow: {
                'soft-gloss-inset': '0 2px 2px 0 rgba(255,255,255,.1) inset,0 2px 10px 0 rgba(255,255,255,.2) inset,0 -2px 2px 0 rgba(0,0,0,.1) inset',
                'soft-gloss': '0 2px 2px 0 rgba(255,255,255,.1),0 2px 10px 0 rgba(255,255,255,.2),0 -2px 2px 0 rgba(0,0,0,.1)',
            }, borderWidth: {
                'soft-gloss': '1px',
            },
            gradientColorStops: {
                'soft-gloss-light': 'rgba(255,255,255,.1)',
                'soft-gloss-dark': 'rgba(0,0,0,.1)',
            },
            screens: {
                'introduction-width': '1130px',
                'width-425': '425px',
            },
            minHeight: {
                '540': '540px',
            },
        },

        plugins: [forms],
    },
};
