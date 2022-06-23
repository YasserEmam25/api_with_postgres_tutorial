import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env;

app.get('/', (req: Request, res:Response) => {
    res.send("Home Page");
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});