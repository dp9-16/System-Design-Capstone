import pkg from 'pg';
const { Pool } = pkg;


 export const pool = new Pool({
    host: "localhost",
    user:"newuser",
    port: 5432,
    password: "password",
    database: "questionsandanswers_db"
    });

pool.connect()
    .then(()=>{pool.query("copy answers(id,question_id,body,date,answerer_name,answerer_email,reported,helpfulness) FROM '/private/tmp/answers.csv' WITH (FORMAT csv,HEADER)")
        .then((res:string)=> console.log(res))
        .catch((e:string)=>console.log(e))})
    .catch((e:string)=>console.error(e))
