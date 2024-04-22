import { json } from "express";
import express,{ json as _json } from "express";
import { router } from "./Router/routers.js";
import  cors  from "cors";

const app = express();


app.use(express.json({type:'*/*'}))

app.use(cors());
app.use(router);

const listen = process.env.PORT ?? 5000;

app.listen(listen, () => {
    console.log( `SERVER RUNNING PORT ${listen}` )
})


