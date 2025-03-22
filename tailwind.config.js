/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    safelist: [],
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
            },
            animation: {
                'nav-animation': 'nav-animation 500ms ease-in-out',
            },
        },
    },
    plugins: [],
};
