import { pool } from "../database/database.ts";
import { Request, Response } from "express";

export const handleReportPut = (req: Request, res: Response) => {
  pool
    .query("UPDATE question SET reported = true WHERE id = $1", [
      req.params.question_id,
    ])
    .then((result) => {
      res.send(result, 204);
      console.log("result", result);
    })
    .catch((err) => {
      console.error(err);
    });
};
export const handleAnswerReportPut = (req: Request, res: Response) => {
  pool
    .query("UPDATE answer SET reported = true WHERE id = $1", [
      req.params.answer_id,
    ])
    .then((result) => {
      res.send(result, 204);
      console.log("result", result);
    })
    .catch((err) => {
      console.error(err);
    });
};
