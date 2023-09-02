import {pool} from '../database/database.ts'
import {Request, Response} from "express";

export const handleQuestions = (req : Request, res : Response) =>{
    console.log(req.query)
    res.send(200);
}