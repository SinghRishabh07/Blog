import { NextApiResponse } from 'next';
import fs from 'fs';
import { BLOG_FILE_PATH, USER_FILE_PATH } from '@/constants';
import { Blog, BlogApiRequest, User } from '@/types';

export default async function handler(req: BlogApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const file = fs.readFileSync(BLOG_FILE_PATH);
            return res.status(200).send({ error: false, data: JSON.parse(file.toString()) });
        } else if (req.method === 'POST') {
            const blog = { ...req.body, timestamp: Date.now().toString() };

            const userFile = fs.readFileSync(USER_FILE_PATH);
            const users: User[] = JSON.parse(userFile.toString());
            if (
                !blog.username ||
                !blog.title ||
                !blog.content ||
                !users.map((u) => u.username).includes(blog.username)
            ) {
                return res.status(400).send({ error: true, message: 'Invalid Data!' });
            }

            const readFile = fs.readFileSync(BLOG_FILE_PATH);

            const oldBlogs: Blog[] = JSON.parse(readFile.toString());

            oldBlogs.push(blog);
            fs.writeFileSync(BLOG_FILE_PATH, JSON.stringify(oldBlogs));

            return res.status(201).send({ error: false, message: 'Blog Created!' });
        }
        return res.status(404).send({ error: true, message: 'Not Found!' });
    } catch (error) {
        return res.status(500).send({ error: true, message: error });
    }
}
