import React from 'react';

interface TailwindExampleProps {
    title: string;
    children: React.ReactNode;
}

export const TailwindExample: React.FC<TailwindExampleProps> = ({
    title,
    children,
}) => {
    return (
        <div className="bg-darker rounded p-6 mb-6 shadow-lg">
            <h2 className="text-main font-headline text-2xl font-bold mb-4">
                {title}
            </h2>
            <div className="text-light font-body">{children}</div>
            <button className="mt-4 bg-main text-light font-headline font-bold py-2 px-4 rounded hover:bg-opacity-80 transition-opacity">
                Learn More
            </button>
        </div>
    );
};
