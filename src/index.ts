import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env;

app.get('/api/users', (req: Request, res:Response) => {
    try {
        res.send("All users");
    } catch(err) {
        console.log('====================================');
        console.log(`Error While getting all users: ${err}`);
        console.log('====================================');
    }
})

app.get('/api/users/:id', (req: Request, res:Response) => {
    try {
        res.send("The user");
    } catch(err) {
        console.log('====================================');
        console.log(`Error While getting user: ${err}`);
        console.log('====================================');
    }
})

app.post('/api/users', (req: Request, res:Response) => {
    try {
        res.send("User added");
    } catch(err) {
        console.log('====================================');
        console.log(`Error While adding user: ${err}`);
        console.log('====================================');
    }
})

app.put('/api/users/:id', (req: Request, res:Response) => {
    try {
        res.send("User updated");
    } catch(err) {
        console.log('====================================');
        console.log(`Error While updating user: ${err}`);
        console.log('====================================');
    }
})

app.delete('/api/users/:id', (req: Request, res:Response) => {
    try {
        res.send("User Deleted");
    } catch(err) {
        console.log('====================================');
        console.log(`Error While deleting: ${err}`);
        console.log('====================================');
    }
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});