'use client';

import React from 'react';

interface ErrorProps {
    message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => (
    <div className="error">
        <p>Error: {message}</p>
    </div>
);

export default Error;
