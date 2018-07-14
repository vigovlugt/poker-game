import * as express from "express";
import * as gameManager from './gameManager'
import * as db from './userDataBase'
import * as path from 'path';

import * as http from 'http';

const app = express();

const server = http.createServer(app);

gameManager.setup(server);

app.use(express.static(path.join(__dirname,'/../../../client/build')));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, '/../../../client/build/index.html'));
});

app.get("/api/login/:name/:password",(req,res)=>{
    const {name,password} = req.params;
    res.send(db.login(name,password));
});

app.get("/api/register/:name/:password",(req,res)=>{
    const {name,password} = req.params;
    res.send(db.register(name,password));
});

// tslint:disable-next-line:no-console
server.listen(process.env.PORT || 3001,()=>{console.log("listening on port " + (process.env.PORT || 3001))});