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
            fontSize: {
                xl: ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '[1.25rem]': ['1.25rem', { lineHeight: '1.75rem' }],
                '[1.75rem]': ['1.75rem', { lineHeight: '2.25rem' }],
                '[2.25rem]': ['2.25rem', { lineHeight: '2.5rem' }],
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '64rem',
                    },
                },
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
        function ({ addComponents, addBase, theme }) {
            addBase({
                html: {
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'optimizeLegibility',
                },
                body: {
                    backgroundColor: theme('colors.dark'),
                    color: theme('colors.light'),
                    fontFamily: 'var(--font-body)',
                    minWidth: '20rem',
                    padding: '0',
                    margin: '0',
                    '@screen lg': {
                        paddingTop: '6rem',
                    },
                },
                'h1, h2': {
                    color: theme('colors.main'),
                    fontFamily: 'var(--font-headline)',
                    fontWeight: theme('fontWeight.bold'),
                },
                'h3, h4, h5, h6': {
                    color: theme('colors.light'),
                    fontFamily: 'var(--font-headline)',
                },
                'h1, h2, h3': {
                    fontWeight: theme('fontWeight.bold'),
                },
                'h4, h5, h6': {
                    fontWeight: theme('fontWeight.medium'),
                },
                h1: {
                    fontSize: '1.5rem', // 2xl
                    '@screen md': {
                        fontSize: '2.25rem',
                    },
                },
                h2: {
                    fontSize: '1.25rem', // xl
                    '@screen md': {
                        fontSize: '1.75rem',
                    },
                },
                h3: {
                    fontSize: '1.125rem', // lg
                    '@screen md': {
                        fontSize: '1.25rem',
                    },
                },
                'h4, h5, h6': {
                    fontSize: '1rem', // base
                    '@screen md': {
                        fontSize: '1.125rem', // lg
                    },
                },
                p: {
                    color: theme('colors.light'),
                    fontSize: '1.125rem', // lg
                    lineHeight: theme('lineHeight.relaxed'),
                    marginBottom: '1rem',
                    '@screen md': {
                        fontSize: '1.25rem', // xl
                        lineHeight: theme('lineHeight.loose'),
                    },
                },
                a: {
                    color: theme('colors.main'),
                    textDecoration: 'none',
                    '&:hover, &:focus-visible': {
                        textDecoration: 'underline',
                    },
                },
            });

            addComponents({
                '.content': {
                    margin: '2rem auto',
                    maxWidth: '90rem',
                    padding: '0 2rem',
                },
                '.limit-text-width': {
                    margin: '0 auto',
                    maxWidth: '64rem',
                },
                '.bg-page': {
                    backgroundColor: theme('colors.dark'),
                },
                '.sr-only': {
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    padding: '0',
                    margin: '-1px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    border: '0',
                    clip: 'rect(0, 0, 0, 0)',
                    clipPath: 'inset(50%)',
                },
                '.post-video-container': {
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '56.25%',
                    '@screen md': {
                        width: '120%',
                        paddingBottom: '67.5%',
                        margin: '0 auto',
                        marginLeft: '-10%',
                    },
                    '& iframe': {
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                    },
                },
                '.responsive-image': {
                    margin: '1rem 0',
                    width: '100%',
                    '@screen md': {
                        margin: '2rem 0',
                        maxWidth: '130%',
                        width: '130%',
                        marginLeft: '-15%',
                    },
                },
                '.post-container': {
                    margin: '0 auto',
                    maxWidth: '64rem',
                    '& video': {
                        marginLeft: '-4.9%',
                        maxWidth: '109.8%',
                        width: '109.8%',
                        '@screen md': {
                            marginLeft: '-10%',
                            maxWidth: '120%',
                            width: '120%',
                        },
                    },
                },
                '.post-content': {
                    '& code': {
                        backgroundColor: theme('colors.darker'),
                        color: theme('colors.light'),
                        fontFamily: 'var(--font-code)',
                        padding: '0.2em 0.4em',
                        fontSize: '0.9em',
                        borderRadius: theme('borderRadius.DEFAULT'),
                        '&.block, &:has(+ br), &.language-json, &[class*="language-"]':
                            {
                                display: 'block',
                                padding: '1rem',
                                margin: '1rem 0',
                                overflowX: 'auto',
                                lineHeight: 'normal',
                                borderRadius: theme('borderRadius.DEFAULT'),
                                boxShadow: theme('boxShadow.md'),
                                borderLeft: '3px solid',
                                borderColor: theme('colors.main'),
                                whiteSpace: 'pre',
                                tabSize: '2',
                            },
                    },
                    '& pre': {
                        margin: '1rem 0',
                        '& code': {
                            display: 'block',
                            padding: '1rem',
                            overflowX: 'auto',
                            lineHeight: 'normal',
                            borderRadius: theme('borderRadius.DEFAULT'),
                            boxShadow: theme('boxShadow.md'),
                            borderLeft: '3px solid',
                            borderColor: theme('colors.main'),
                            whiteSpace: 'pre',
                            tabSize: '2',
                        },
                    },
                },
                '.nostyle-list': {
                    padding: '0',
                    listStyle: 'none',
                    '& li': {
                        marginBottom: '3rem',
                        '& h3': {
                            marginBottom: '0.5rem',
                        },
                        '& h4': {
                            marginTop: '0.5rem',
                        },
                    },
                },
                '.embed-video': {
                    margin: '2rem 0',
                    position: 'relative',
                    '& iframe': {
                        position: 'absolute',
                        top: '0',
                        width: '100%',
                        height: '100%',
                    },
                    '&::before': {
                        content: "''",
                        display: 'block',
                        paddingBottom: '56.25%',
                        width: '100%',
                    },
                },
                '.embed-image': {
                    position: 'relative',
                    '& .responsive-image': {
                        margin: 'auto',
                        maxWidth: 'none',
                        width: '100%',
                    },
                },
                '.intro-content': {
                    maxWidth: '64rem',
                },
                '.intro-section': {
                    '&.personal': {
                        fontStyle: 'italic',
                        color: theme('colors.light'),
                    },
                    '& p': {
                        marginBottom: '1rem',
                        '@screen md': {
                            fontSize: '1.25rem', // xl
                            lineHeight: theme('lineHeight.loose'),
                        },
                    },
                },
            });
        },
    ],
};
