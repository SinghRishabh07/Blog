import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { USER_FILE_PATH } from '@/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const file = fs.readFileSync(USER_FILE_PATH);
            return res.status(200).send({ error: false, data: JSON.parse(file.toString()) });
        }
        return res.status(404).send({ error: true, message: 'Not Found!' });
    } catch (error) {
        return res.status(500).send({ error: true, message: error });
    }
}

