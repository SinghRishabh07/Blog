import { NextApiRequest } from 'next';

export interface User {
    username: string;
    password: string;
}

export interface Blog {
    title: string;
    content: string;
    timestamp: string;
    username: string;
}

export interface BlogApiRequest extends NextApiRequest {
    body: {
        title: string;
        content: string;
        username: string;
    };
}
export interface UserApiRequest extends NextApiRequest {
    body: {
        username: string;
        password: string;
    };
}

