import client from '../database'
import User from '../types/user.type'

export default class UserModel {
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = "select * from users;";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            console.log('====================================');
            console.log(`Error while getting users: ${err}`);
            console.log('====================================');
            return [];
        }
    }
}