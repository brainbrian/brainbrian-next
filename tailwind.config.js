/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/styles/**/*.{css,scss}',
    ],
    safelist: [
        /^delay-/, // Match any delay-* class
        'animate-fadeInUp',
        'animation-delay-0',
        'animation-delay-100',
        'animation-delay-200',
        'animation-delay-300',
        'animation-delay-400',
        'animation-delay-500',
        'animation-delay-600',
        'animation-delay-700',
    ],
    theme: {
        extend: {
            colors: {
                main: '#23a1ff',
                light: '#fff',
                dark: '#484848',
                darker: '#262626',
            },
            fontFamily: {
                headline: [
                    'Poppins',
                    'Helvetica Neue',
                    'Helvetica',
                    'Arial',
                    'sans-serif',
                ],
                body: [
                    'Open Sans',
                    'Helvetica Neue',
                    'Helvetica',
                    'Arial',
                    'sans-serif',
                ],
                code: ['Courier New', 'Courier', 'monospace'],
            },
            maxWidth: {
                '90rem': '90rem',
                '64rem': '64rem',
            },
            borderRadius: {
                DEFAULT: '1rem',
            },
            screens: {
                xxs: '375px',
                xs: '480px',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            },
            keyframes: {
                'nav-animation': {
                    from: {
                        opacity: 0,
                        transform: 'translateX(100%)',
                        width: '0%',
                    },
                    to: {
                        opacity: 1,
                        transform: 'translateX(0%)',
                        width: '100%',
                    },
                },
                float: {
                    '0%': {
                        transform: 'translateY(0rem)',
                    },
                    '50%': {
                        transform: 'translateY(1rem)',
                    },
                    '100%': {
                        transform: 'translateY(0rem)',
                    },
                },
                fadeInUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(1rem)',
                    },
                    '50%': {
                        opacity: '1',
                        transform: 'translateY(-0.25rem)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
            },
            animation: {
                'nav-animation': 'nav-animation 500ms ease-in-out',
                float: 'float 1s ease-in-out infinite',
                fadeInUp: 'fadeInUp 500ms ease-in-out forwards',
            },
            animationDelay: {
                0: '0ms',
                100: '100ms',
                200: '200ms',
                300: '300ms',
                400: '400ms',
                500: '500ms',
                600: '600ms',
                700: '700ms',
            },
        },
    },
    plugins: [
        function ({ addUtilities, theme }) {
            const animationDelays = theme('animationDelay', {});
            const utilities = Object.entries(animationDelays).map(
                ([key, value]) => {
                    return {
                        [`.animation-delay-${key}`]: {
                            'animation-delay': value,
                        },
                    };
                },
            );

            addUtilities(utilities);
        },
    ],
};
