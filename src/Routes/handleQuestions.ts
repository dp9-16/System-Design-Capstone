import { pool } from "../database/database.ts";
import { Request, Response } from "express";

export const handleQuestions = (req: Request, res: Response) => {
  console.log(req.query);
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
