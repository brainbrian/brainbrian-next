import { type Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/styles/**/*.{css,scss}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#23a1ff',
                text: '#fff',
                surface: '#484848',
                background: '#262626',
            },
            fontFamily: {
                headline: ['var(--font-headline)'],
                body: ['var(--font-body)'],
                code: ['var(--font-code)'],
            },
            maxWidth: {
                '90rem': '90rem',
                '64rem': '64rem',
            },
            borderRadius: {
                DEFAULT: '0.5rem',
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
            fontSize: {
                medium: ['1.25rem', { lineHeight: '1.75rem' }],
                large: ['1.75rem', { lineHeight: '2.25rem' }],
                xlarge: ['2.25rem', { lineHeight: '2.5rem' }],
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
        plugin(function ({ addComponents, addBase, theme }) {
            addBase({
                html: {
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'optimizeLegibility',
                },
                body: {
                    backgroundColor: theme('colors.surface'),
                    color: theme('colors.text'),
                    fontFamily: 'var(--font-body)',
                    minWidth: '20rem',
                    padding: '0',
                    margin: '0',
                    '@media (min-width: 1024px)': {
                        paddingTop: '6rem',
                    },
                },
                'h1, h2': {
                    color: theme('colors.primary'),
                    fontFamily: 'var(--font-headline)',
                    fontWeight: theme('fontWeight.bold'),
                },
                'h3, h4, h5, h6': {
                    color: theme('colors.text'),
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
                    '@media (min-width: 768px)': {
                        fontSize: '2.25rem',
                    },
                },
                h2: {
                    fontSize: '1.25rem', // xl
                    '@media (min-width: 768px)': {
                        fontSize: '1.75rem',
                    },
                },
                h3: {
                    fontSize: '1.125rem', // lg
                    '@media (min-width: 768px)': {
                        fontSize: '1.25rem',
                    },
                },
                h4: {
                    fontSize: '1rem', // base
                    '@media (min-width: 768px)': {
                        fontSize: '1.125rem', // lg
                    },
                },
                h5: {
                    fontSize: '1rem', // base
                    '@media (min-width: 768px)': {
                        fontSize: '1.125rem', // lg
                    },
                },
                h6: {
                    fontSize: '1rem', // base
                    '@media (min-width: 768px)': {
                        fontSize: '1.125rem', // lg
                    },
                },
                p: {
                    color: theme('colors.text'),
                    fontSize: '1.125rem', // lg
                    lineHeight: theme('lineHeight.relaxed'),
                    marginBottom: '1rem',
                    '@media (min-width: 768px)': {
                        fontSize: '1.25rem', // xl
                        lineHeight: theme('lineHeight.loose'),
                    },
                },
                a: {
                    color: theme('colors.primary'),
                    textDecoration: 'none',
                    '&:hover, &:focus-visible': {
                        textDecoration: 'underline',
                    },
                },
            });

            addComponents({
                '.content': {
                    margin: '2rem auto',
                    maxWidth: theme('screens.2xl'),
                    padding: '0 2rem',
                },
                '.limit-text-width': {
                    margin: '0 auto',
                    maxWidth: '64rem',
                },
                '.bg-page': {
                    backgroundColor: theme('colors.surface'),
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
                    '@media (min-width: 768px)': {
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
                    '@media (min-width: 1350px)': {
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
                        '@media (min-width: 768px)': {
                            marginLeft: '-10%',
                            maxWidth: '120%',
                            width: '120%',
                        },
                    },
                },
                '.post-content': {
                    '& code': {
                        backgroundColor: theme('colors.background'),
                        color: theme('colors.text'),
                        fontFamily: 'var(--font-code)',
                        padding: '0.2em 0.4em',
                        fontSize: '0.9em',
                        borderRadius: '0.4rem',
                        '&.block, &:has(+ br), &.language-json, &[class*="language-"]':
                            {
                                display: 'block',
                                padding: '1rem',
                                margin: '1rem 0',
                                overflowX: 'auto',
                                lineHeight: 'normal',
                                borderRadius: '0.4rem',
                                borderLeft: '3px solid',
                                borderColor: theme('colors.primary'),
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
                            borderRadius: '0.4rem',
                            borderLeft: '3px solid',
                            borderColor: theme('colors.primary'),
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
                        color: theme('colors.text'),
                    },
                    '& p': {
                        marginBottom: '1rem',
                        '@media (min-width: 768px)': {
                            fontSize: '1.25rem', // xl
                            lineHeight: theme('lineHeight.loose'),
                        },
                    },
                },
            });
        }),
    ],
} satisfies Config;
