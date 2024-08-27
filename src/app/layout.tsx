import React from 'react';
import { Analytics } from '@vercel/analytics/react';

import { Header, Footer } from '@/components';

import '../styles/Styles.scss';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
    <html>
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

export default Layout;
