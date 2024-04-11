import { MysqlModel } from "../Model/modelMysql.js";
import { json } from "express";

export class MyController {

    static async getAll(request,response){

        const result = JSON.stringify(await MysqlModel.getAll());
        response.json(result);
        
    }

    static async createReport(request,response) {

        const body = request.body;
        const createReport = await MysqlModel.createReport(body);
    }

}