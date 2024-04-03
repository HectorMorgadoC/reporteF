import { Router } from "express";
import { MyController } from "../Controller/controller.js";

export const router = Router();

    router.get('/',MyController.getAll)

    router.post('/',async() => {

    });

    router.put('/',async() => {

    });

    router.delete('/',async() => {

    });

