import express, { Request, Response } from 'express';
import User from '../types/user.type';
import UserModel from '../models/users';

const user = new UserModel();

const index = async (req: Request, res: Response) => {
    const users = await user.index();
    res.send(users);
}

const users_routes = (app: express.Application) => {
    app.get('/users', index);
}

export default users_routes;