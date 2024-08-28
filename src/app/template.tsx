import React from 'react';

interface TemplateProps {
    children: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({ children }) => (
    <div className="template">{children}</div>
);

export default Template;
