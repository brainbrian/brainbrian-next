module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    safelist: ['header-bar', 'header-bar__text', 'content'],
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
                xxs: '30rem',
                xs: '48rem',
                sm: '68rem',
                md: '75rem',
                lg: '80rem',
                xl: '100rem',
                xxl: '140rem',
            },
        },
    },
    plugins: [],
};
