import express, { Request, Response } from "express";
import {
  handleQuestionget,
  handleQuestionpost,
} from "./Routes/handleQuestions.ts";
import { handleAnswerGet, handleAnswerPost } from "./Routes/handleAnswers.ts";
import {
  handleReportPut,
  handleAnswerReportPut,
} from "./Routes/handleReports.ts";
import { handleHelpfulPut } from "./Routes/handleHelpful.ts";
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Server running on 3000");
});

app.get("/qa/questions", (req: Request, res: Response) => {
  handleQuestionget(req, res);
});

app.post("/qa/questions", (req: Request, res: Response) => {
  handleQuestionpost(req, res);
});

app.get("/qa/questions/:question_id/answers", (req: Request, res: Response) => {
  handleAnswerGet(req, res);
});

app.post(
  "/qa/questions/:question_id/answers",
  (req: Request, res: Response) => {
    handleAnswerPost(req, res);
  }
);

app.put("/qa/questions/:question_id/helpful", (req: Request, res: Response) => {
  handleHelpfulPut(req, res);
});

app.put("/qa/questions/:question_id/report", (req: Request, res: Response) => {
  handleReportPut(req, res);
});

app.put("/qa/answers/:answer_id/helpful", (req: Request, res: Response) => {
  handleHelpfulPut(req, res);
});

app.put("/qa/answers/:answer_id/report", (req: Request, res: Response) => {
  handleAnswerReportPut(req, res);
});
