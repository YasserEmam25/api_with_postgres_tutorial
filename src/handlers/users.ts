import express, { Request, Response } from 'express';
import UserModel from '../models/users';
import jwt from 'jsonwebtoken';

const User = new UserModel();

const index = async (req: Request, res: Response) => {
    const users = await User.index();
    res.send(users);
}

const create = async (req: Request, res: Response) => {
    const user = await User.create(req.body);
    
    try {
        if (user) {
            const token = jwt.sign({user: user}, process.env.TOKEN_SECRET as string);
            res.json(token);
        } else {
            throw new Error("Couldn't create new user, choose different Email");
        }
        
    } catch (error) {
        res.status(401);
        res.send('Error while trying to sign in: ' + error as string); 
    }

    res.json(user);
}

const auth = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization as string;
        // const token = authorizationHeader.split(' ')[1];
        jwt.verify(authorizationHeader, process.env.TOKEN_SECRET as string);

        res.send('You are authorized');
    } catch (error) {
        console.log(error);
        
        res.status(401);
        res.send("you are unauthorized to access this page")
    }
}

const update = async (req: Request, res: Response) => {
    const user = {
        id: parseInt(req.params.id),
        username: req.body.username,
        password: req.body.password,
    }

    try {
        const authorizationHeader = req.headers.authorization as string;
        // const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(authorizationHeader, process.env.TOKEN_SECRET as string);

        if (decoded.id === user.id) {
            res.send('You are authorized');
        }
    } catch (error) {
        console.log(error);
        
        res.status(401);
        res.send("you are unauthorized to access this page")
    }
}


const users_routes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/auth', auth);
    app.post('/create', create);
    app.put('/update', update);
}

export default users_routes;