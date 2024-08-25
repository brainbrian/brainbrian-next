import React from 'react';
import { Analytics } from '@vercel/analytics/react';

import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';

import '../styles/Styles.scss';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
    <html>
        <body>
            <div className="layout">
                <Header />
                <main>{children}</main>
                <Footer />
                <Analytics />
            </div>
        </body>
    </html>
);

export default Layout;
