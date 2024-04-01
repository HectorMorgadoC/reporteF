import { json } from "express";
import express,{ json as _json } from "express";
import { router } from "./Router/routers.js";

const app = express();
const listen = process.env.PORT ?? 5000;

app.use(router);

app.listen(listen, () => {
    console.log( `SERVER RUNNING PORT ${listen}` )
})


