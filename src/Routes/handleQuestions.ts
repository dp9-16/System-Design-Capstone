import { pool } from "../database/database.ts";
import { Request, Response } from "express";

export const handleQuestionget = (req: Request, res: Response) => {
  const response = pool
    .query("SELECT * FROM question WHERE product_id = $1", [
      req.query.product_id,
    ])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const handleQuestionpost = (req: Request, res: Response) => {
  console.log(req.body);
  pool
    .query("select setval('question_id_seq', (select max(id) from question))")
    .then((result) => {
      const response = pool.query(
        "INSERT INTO question (product_id, body, date, account_name, asker_email, helpful_rating, reported) VALUES ($1, $2, $3, $4, $5, $6,$7)",
        [
          req.body.product_id,
          req.body.question_body,
          Math.floor(Date.now() / 1000),
          req.body.asker_name,
          req.body.asker_email,
          req.body.reported === "true" ? 1 : 0,
          req.body.question_helpfulness,
        ]
      );
    })
    .then((result) => {
      res.send(result, 201);
      console.log("result", result);
    })
    .catch((err) => {
      console.error(err);
    });
};
