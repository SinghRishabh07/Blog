import { NextApiRequest } from 'next';

export interface User {
    username: string;
    password: string;
}

export interface Blog {
    title: string;
    content: string;
    timestamp: number;
    username: string;
}

export interface BlogApiRequest extends NextApiRequest {
    body: {
        title: string;
        content: string;
        username: string;
    };
}


