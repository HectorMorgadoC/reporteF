import { MysqlModel } from "../Model/modelMysql.js";
import { json } from "express";

export class MyController {

    static async getAll(request,response){

        const result = JSON.stringify(await MysqlModel.getAll());
        response.json(result);
        
    }

    static async getReports(request,response){

        const result = JSON.stringify(await MysqlModel.getReports());
        response.json(result);
    }

    static async getReportsList(request,response){
        const nombre = request.params.name;
        const reportList = await MysqlModel.getReportsList(nombre);
        response.json(JSON.stringify(reportList))
    }

    static async createReport(request,response) {

        const body = request.body;
        const createReport = await MysqlModel.createReport(body);
    }

    

}