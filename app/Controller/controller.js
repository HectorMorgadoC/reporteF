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

    static async getMachine(request,response){
        const result = JSON.stringify(await MysqlModel.getMachine());
        response.json(result);
    }
    
    static async getOrder(request,response){
        const result = JSON.stringify(await MysqlModel.getOrder());
        response.json(result);
    }


    static async getReportsList(request,response){
        const nombre = request.params.name;
        const reportList = await MysqlModel.getReportsList(nombre);
        response.json(JSON.stringify(reportList))
    }

    static async getMachineList(request,response){
        const nombre = request.params.description;
        const machineList = await MysqlModel.getMachineList(nombre);
        response.json(JSON.stringify(machineList))
    }

    static async getOrderList(request,response){
        const numberOrder = Number(request.params.number);
        const orderList = await MysqlModel.getOrderList(numberOrder);
        response.json(JSON.stringify(orderList));
    }


    static async createReport(request,response) {

        const body = request.body;
        const createReport = await MysqlModel.createReport(body);
    }

    

}