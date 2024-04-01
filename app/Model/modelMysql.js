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