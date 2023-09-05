import { pool } from "../database/database.ts";
import { Request, Response } from "express";

export const handleHelpfulPut = (req: Request, res: Response) => {
  pool
    .query(
      "UPDATE question SET helpful_rating = helpful_rating + 1 WHERE id = $1",
      [req.params.question_id]
    )
    .then((result) => {
      res.send(result, 204);
      console.log("result", result);
    })
    .catch((err) => {
      console.error(err);
    });
};
