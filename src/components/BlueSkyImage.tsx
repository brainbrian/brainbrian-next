import React from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface BlueSkyImageProps {
    image: {
        thumb: string;
        alt?: string;
        aspectRatio?: {
            width: number;
            height: number;
        };
        video?: {
            url: string;
        };
    };
    size?: 'small' | 'large';
}

export const BlueSkyImage: React.FC<BlueSkyImageProps> = ({
    image,
    size = 'large',
}) => {
    const isVideo = image.video && image.video.url;
    const dimensions =
        size === 'small'
            ? { width: 200, height: 200 }
            : {
                  width: image.aspectRatio?.width || 800,
                  height: image.aspectRatio?.height || 800,
              };

    const imageComponent = (
        <Image
            src={image.thumb}
            alt={image.alt || ''}
            width={dimensions.width}
            height={dimensions.height}
            className={`w-full object-cover ${size === 'small' ? 'h-16' : 'h-full'}`}
            sizes={size === 'small' ? '200px' : '50vw'}
        />
    );

    if (!isVideo) return imageComponent;

    return (
        <div className="relative w-full h-full">
            {imageComponent}
            <div
                className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-all duration-200`}
            >
                <div
                    className={`bg-black bg-opacity-75 rounded-full ${size === 'small' ? 'p-1' : 'p-2'}`}
                >
                    <Play
                        className={`text-white fill-white ${size === 'small' ? 'w-3 h-3' : 'w-4 h-4'}`}
                    />
                </div>
            </div>
        </div>
    );
};
