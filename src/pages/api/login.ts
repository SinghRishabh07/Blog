import { NextApiResponse } from 'next';
import fs from 'fs';
import { USER_FILE_PATH } from '@/constants';
import { UserApiRequest, User } from '@/types';

export default async function handler(req: UserApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const readFile = fs.readFileSync(USER_FILE_PATH);

            const oldUsers: User[] = JSON.parse(readFile.toString());

            const { username, password } = req.body;

            const duplicateUser = oldUsers.find((user) => user.username === username);

            if (duplicateUser) {
                if (password === duplicateUser.password) {
                    return res.status(200).send({
                        error: false,
                        login: true,
                        message: 'Login Successful!'
                    });
                } else {
                    return res.status(401).send({
                        error: false,
                        login: false,
                        message: 'Wrong Password!'
                    });
                }
            }

            oldUsers.push({ username, password });
            fs.writeFileSync(USER_FILE_PATH, JSON.stringify(oldUsers));

            return res
                .status(201)
                .send({ error: false, login: true, message: 'Login Successful!' });
        }
        return res.status(404).send({ error: true, message: 'Not Found!' });
    } catch (error) {
        return res.status(500).send({ error: true, message: error });
    }
}

