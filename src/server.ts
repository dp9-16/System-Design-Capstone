import express, {Request, Response} from 'express'
import {handleQuestions} from "./Routes/handleQuestions.ts";

const app = express();

app.listen(3000, ()=>{
    console.log('Server running on 3000');
})
app.get('/questions', (req: Request, res: Response) => {

    handleQuestions(req,res);

})

