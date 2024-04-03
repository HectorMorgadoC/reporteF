import { MysqlModel } from "../Model/modelMysql.js";
import { json } from "express";

export class MyController {

    static async getAll(request,response){

        const result = JSON.stringify(await MysqlModel.getAll());
        response.json(result);
        
    }


}