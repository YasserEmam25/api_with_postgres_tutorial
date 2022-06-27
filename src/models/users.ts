import client from '../database'
import User from '../types/user.type'
import bcrypt from 'bcrypt';

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

    async create(u: User): Promise<User | null>{
        const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

        try {
            const conn = await client.connect();
            const sql = 'Insert into users(first_name, last_name, email, username, password) values(($1), ($2), ($3), ($4), ($5));'
            const hash = bcrypt.hashSync(
                u.password + BCRYPT_PASSWORD,
                parseInt(SALT_ROUNDS as string, 10)
            )
            const result = await conn.query(sql, [u.first_name, u.last_name, u.email, u.username, hash]);
            
            u.password = hash;

            return u;
        } catch (err) {
            console.log('====================================');
            console.log(`Error while getting users: ${err}`);
            console.log('====================================');
        }

        return null;
    }

    async authenticate(username:string, password: string): Promise<string | null>{
        const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
        const conn = await client.connect();

        const sql = "select * from users where username=($1)";

        const result = await conn.query(sql, [username]);

        if (result.rows.length) {
            const user = result.rows[0];
            // console.log(user);

            if (bcrypt.compareSync(password+ BCRYPT_PASSWORD, user.password)) {
                console.log('====================================');
                console.log("Authenticaated");
                console.log('====================================');
                return user;
            }
        }
        
        return null;
    }
}