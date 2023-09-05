import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  host: "localhost",
  user: "newuser",
  port: 5432,
  password: "password",
  database: "questionsandanswers_db",
});

pool
  .connect()
  .then(() => console.log("connected to db"))
  .catch((err) => console.error(err));
