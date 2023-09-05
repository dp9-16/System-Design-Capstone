import { pool } from "../database/database.ts";
import { Request, Response } from "express";

export const handleAnswerGet = (req: Request, res: Response) => {
  const response = pool
    .query("SELECT * FROM answer WHERE question_id = $1", [
      req.body.question_id,
    ])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Handle Answer", err);
    });
};
export const handleAnswerPost = (req: Request, res: Response) => {
  pool
    .query("select setval('answer_id_seq', (select max(id) from answer))")
    .then((result) => {
      const response = pool.query(
        "INSERT INTO answer (question_id, body, date, response_username, response_email, helpful_rating, reported) VALUES ($1, $2, $3, $4, $5, $6,$7)",
        [
          req.body.question_id,
          req.body.body,
          Math.floor(Date.now() / 1000),
          req.body.account_name,
          req.body.answer_email,
          req.body.reported === "true" ? 1 : 0,
          req.body.helpful_rating,
        ]
      );
    })
    .then((result) => {
      res.send(result, 201);
      console.log("result", result);
    })
    .catch((err) => {
      res.send(err, 400);
    });
};

export const handleAnswerPut = (req: Request, res: Response) => {
  pool
    .query(
      "UPDATE answer SET helpful_rating = helpful_rating + 1 WHERE id = $1",
      [req.params.answer_id]
    )
    .then((result) => {
      res.send(result, 204);
      console.log("result", result);
    })
    .catch((err) => {
      console.error(err);
    });
};
