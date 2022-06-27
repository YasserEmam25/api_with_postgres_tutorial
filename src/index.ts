import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import users_routes from './handlers/users';

const app = express();
const { PORT } = process.env;

app.use(bodyParser.json());

users_routes(app);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});