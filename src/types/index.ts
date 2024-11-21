declare global {
    interface Window {
        twttr: unknown;
    }
}

export interface Project {
    date: string;
    dateFormatted: string;
    excerpt?: string;
    image: string;
    slug: string;
    tags?: string[];
    title: string;
    url: string;
}

export interface Post {
    date: string;
    dateFormatted: string;
    excerpt?: string;
    image: string;
    slug: string;
    tags?: string[];
    title: string;
    url: string;
}
