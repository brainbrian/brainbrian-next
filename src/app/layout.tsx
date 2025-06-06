import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Poppins, Open_Sans } from 'next/font/google';

import { Header, Footer } from '@/components';

import '../styles/globals.css';

// Define fonts
const poppins = Poppins({
    weight: ['400', '500', '700'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
});

const openSans = Open_Sans({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
});

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
    <html lang="en" className={`${poppins.className} ${openSans.className}`}>
        <body>
            <div className="layout">
                <Header />
                {children}
                <Footer />
                <Analytics />
            </div>
        </body>
    </html>
);

export const metadata: Metadata = {
    metadataBase: new URL('https://brainbrian.com'),
    title: {
        absolute:
            'Brian Behrens | software engineer living in Los Angeles, California.',
        template: '%s | Brian Behrens',
    },
    description:
        'This is the personal portfolio of Brian Behrens. This site serves as a representaton of his professional and personal work since 2002 as an interactive developer and software engineer.',
    authors: [{ name: 'Brian Behrens', url: 'https://brainbrian.com' }],
    openGraph: {
        images: ['/images/share.jpg'],
    },
    verification: {
        google: 'TDkdpgdElFiFg58-ZaeS32jhIdYh2uvnH0DfZMVPKyo',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default Layout;
