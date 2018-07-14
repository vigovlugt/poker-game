import * as fs from "fs";
import * as path from "path";

let filePath = '../../users.json';

export function hasUser(name:string): boolean {
    let data = fs.readFileSync(__dirname + filePath);
    let json = JSON.parse(data.toString());

    let value = false

    json.users.forEach((user:IUser) => {
        if(user.name === name){
            value = true;
        }
    });

    return value;
}

export function login(name:string,password:string):boolean{
    let data = fs.readFileSync(path.join(__dirname, filePath));
    let json = JSON.parse(data.toString());

    let valid = false;
    
    json.users.forEach((user:IUser) => {
        if(user.name === name && user.password === password){
            valid = true;
        }
    });

    return valid;
}

export function register(name:string,password:string):boolean{
    if(!hasUser(name)){
        let data = fs.readFileSync(path.join(__dirname, filePath));
        let json = JSON.parse(data.toString());

        json.users.push({name,password});

        fs.writeFileSync(__dirname + filePath,JSON.stringify(json));

        return true;
    }
    else{
        return false;
    }
}

interface IUser {
    name:string,
    password:string
}