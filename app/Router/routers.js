import { Router } from "express";
import { MyController } from "../Controller/controller.js";

export const router = Router();

    router.get('/',MyController.getAll);

    router.get('/reports',MyController.getReports);

    router.get('/reports/:name',MyController.getReportsList);

    router.post('/',MyController.createReport);

    

    router.put('/',async() => {

    });

    router.delete('/',async() => {

    });

router.get('/reports/:name', MyController.getReportsList)