import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'mantenimiento',
    port: 3306,
    password: '20989862',
    database: 'mantenimiento'
}

const connection =  await mysql.createConnection( config )

export class MysqlModel{

    static async getAll(){
        const reports = 'SELECT * FROM reportero';
        const description = 'SELECT * FROM descripcion_maquina';
        const workRoutine = 'SELECT * FROM rutina_trabajo';
        const assigned = 'SELECT * FROM asignado';


        const resultReporters = await connection.query(reports);
        const resultDescription = await connection.query(description);
        const resultWorkRoutine = await connection.query(workRoutine);
        const resultAssigned = await connection.query(assigned);
        return [resultReporters[0],resultDescription[0],resultWorkRoutine[0],resultAssigned[0]]
    }

    static async getReport(){

    }

    static async createReport(){

    }

    static async updateReport(){

    }

    static async deleteReport(){

    }
}