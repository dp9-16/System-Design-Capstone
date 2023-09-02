import axios from "axios";
//https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/?product_id=
// @ts-ignore

axios.get("http://localhost:3000/questions/?product_id=1&count=50", {
    // headers: {
    //     'authorization': req.headers.authorization
    // }
}).then((result) => {
    console.log(result)
}).catch((err) => console.error(err))