import * as express from "express";
import './gameManager'

const app = express();

app.use(express.static(__dirname + '/build'));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + '/build/index.html');
})

// tslint:disable-next-line:no-console
app.listen(process.env.PORT || 3001,()=>{console.log("listening")})