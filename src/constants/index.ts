import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src\\db');

export const BLOG_FILE_PATH = DB_PATH + '\\blogs.db.json';
export const USER_FILE_PATH = DB_PATH + '\\users.db.json';

