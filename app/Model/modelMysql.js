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

    static async getReports(){
        const reports = 'SELECT * FROM reportero';

        const resultReporters = await connection.query(reports);

        return resultReporters[0];
        
    }

    static async getMachine(){
        const machine = 'SELECT * FROM descripcion_maquina';

        const resultMachine = await connection.query(machine);

        return resultMachine[0];
        
    }

    static async getReportsList(name){
        const query = `SELECT id FROM reportero WHERE nombre = '${name}';`;
        const consult = await connection.query(query);
        

        const queryList = `SELECT numero_orden,id_descripcion_maquina,id_asignado,fecha_aviso,fecha_ejecucion,reporte_falla FROM reporte WHERE id_reportero = '${consult[0][0].id}';`;
        const consultList = await connection.query(queryList);

        const reportsListResponse = async () => {
            const result = [];
            for(let reports of consultList[0]){
            let queryDescription = `SELECT descripcion FROM descripcion_maquina WHERE id = '${reports.id_descripcion_maquina}';`;
            let queryAsigned = `SELECT nombre FROM asignado WHERE id = '${reports.id_asignado}';`;
            let consultDescription = await connection.query(queryDescription);
            let consultAsigned = await connection.query(queryAsigned);

            result.push({
                numeroOrden : reports.numero_orden,
                descripcion :consultDescription[0][0].descripcion,
                asignado: consultAsigned[0][0].nombre,
                fechaAviso: reports.fecha_aviso,
                fechaEjecucion: reports.fecha_ejecucion,
                reporteFalla: reports.reporte_falla,
                })
            }
            return result
            
        }
        return reportsListResponse();  
    
    }

    static async getMachineList(name){
        const query = `SELECT id FROM descripcion_maquina WHERE descripcion = '${name}';`;
        const consult = await connection.query(query);
        

        const queryList = `SELECT numero_orden,id_reportero,id_asignado,fecha_aviso,fecha_ejecucion,reporte_falla FROM reporte WHERE id_descripcion_maquina = '${consult[0][0].id}';`;
        const consultList = await connection.query(queryList);

        const machineListResponse = async () => {
            const result = [];
            for(let machine of consultList[0]){
            let queryDescription = `SELECT nombre FROM reportero WHERE id = '${machine.id_reportero}';`;
            let queryAsigned = `SELECT nombre FROM asignado WHERE id = '${machine.id_asignado}';`;
            let consultReports = await connection.query(queryDescription);
            let consultAsigned = await connection.query(queryAsigned);

            result.push({
                numeroOrden : machine.numero_orden,
                reportero :consultReports[0][0].nombre,
                asignado: consultAsigned[0][0].nombre,
                fechaAviso: machine.fecha_aviso,
                fechaEjecucion: machine.fecha_ejecucion,
                reporteFalla: machine.reporte_falla,
                })
            }
            return result
            
        }
        return machineListResponse();  
    
    }

    static async createReport(dataReport){
        const { 
            descripcionMaquina,
            rutinaTrabajo,
            reportero,
            asignado,
            fechaAviso,
            fechaEjecucion,
            reporteFalla,
            trabajoEfectuar,
            comentarios,
        } = dataReport;

        const descripcion = `SELECT id FROM descripcion_maquina WHERE descripcion = '${descripcionMaquina}';`;
        const rutina = `SELECT id FROM rutina_trabajo WHERE descripcion = '${rutinaTrabajo}';`;
        const selectReportero = `SELECT id FROM reportero WHERE nombre = '${reportero}';`;
        const selectAsignado = `SELECT id FROM asignado WHERE nombre = '${asignado}';`;


        try {
            let idDescription = await connection.query(descripcion);
            let idRutina = await connection.query(rutina);
            let idReportero = await connection.query(selectReportero);
            let idAsignado = await connection.query(selectAsignado);

            idDescription = idDescription[0][0].id;
            idRutina = idRutina[0][0].id;
            idReportero = idReportero[0][0].id;
            idAsignado = idAsignado[0][0].id;

            const ingresoReporte = `INSERT INTO reporte(id_descripcion_maquina,id_rutina_trabajo,id_reportero,id_asignado,fecha_aviso,fecha_ejecucion,reporte_falla,trabajo_efectuar,comentarios) VALUES('${idDescription}','${idRutina}','${idReportero}','${idAsignado}','${fechaAviso}','${fechaEjecucion}','${reporteFalla}','${trabajoEfectuar}','${comentarios}');` 

            const newReport = await connection.query(ingresoReporte)

        } catch (error) {
            console.log('Error de consulta: '+ error)
        }

    }

    static async updateReport(){

    }

    static async deleteReport(){

    }
}