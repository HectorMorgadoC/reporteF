import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'mantenimiento',
    port: 3306,
    password: '20989862',
    database: 'mantenimiento'
}

let connection ;
const getConnection = async() => {
    if(!connection){
        connection =  await mysql.createConnection( config )
    }
    return connection;
}

export class MysqlModel{

    static async getAll(){
        const reports = 'SELECT * FROM reportero';
        const description = 'SELECT * FROM descripcion_maquina';
        const workRoutine = 'SELECT * FROM rutina_trabajo';
        const assigned = 'SELECT * FROM asignado';

        try {

            const connection = await getConnection();
            const resultReporters = await connection.query(reports);
            const resultDescription = await connection.query(description);
            const resultWorkRoutine = await connection.query(workRoutine);
            const resultAssigned = await connection.query(assigned);

            return [resultReporters[0],resultDescription[0],resultWorkRoutine[0],resultAssigned[0]]
        } catch (error) {
            return {
                error: error.message
            }
        }
        
    }

    static async getReports(){
        const reports = 'SELECT * FROM reportero';
        
        try {
            const connection = await getConnection();
            const resultReporters = await connection.query(reports);

            return resultReporters[0];
        } catch (error) {
            return {
                error: error.message
            }
        }
    }
        

    static async getMachine(){
        const machine = 'SELECT * FROM descripcion_maquina';

        try {
            const connection = await getConnection();
            const resultMachine = await connection.query(machine);

            return resultMachine[0];
        } catch (error) {
            return {
                error: error.message
            }
        }
        
        
    }

    static async getOrder(){
        const order = 'SELECT numero_orden FROM reporte';

        try{
        const connection = await getConnection();
        const resultOrder = await connection.query(order);

        return resultOrder[0];
        } catch (error) {
            return {
                error: error.message
            }
        }
    }

    static async getReportsList(name){
        try {
            const connection = await getConnection();
            const query = `SELECT id FROM reportero WHERE nombre = '${name}';`;

        const consult = await connection.query(query);
        
        /* numero_orden,id_descripcion_maquina,id_asignado,fecha_aviso,fecha_ejecucion,reporte_falla */ 
        const queryList = `SELECT * FROM reporte WHERE id_reportero = '${consult[0][0].id}';`;
        const consultList = await connection.query(queryList);

        
            const result = [];
            for(let reports of consultList[0]){
            let queryDescription = `SELECT descripcion FROM descripcion_maquina WHERE id = '${reports.id_descripcion_maquina}';`;
            let queryAsigned = `SELECT nombre FROM asignado WHERE id = '${reports.id_asignado}';`;
            let queryWorkRoutine = `SELECT descripcion FROM rutina_trabajo WHERE id = '${reports.id_rutina_trabajo}';`;
            let consultDescription = await connection.query(queryDescription);
            let consultAsigned = await connection.query(queryAsigned);
            let consultWorkRoutine = await connection.query(queryWorkRoutine);

            result.push({
                numeroOrden : reports.numero_orden,
                descripcion :consultDescription[0][0].descripcion,
                reportero: name,
                asignado: consultAsigned[0][0].nombre,
                rutinaTrabajo: consultWorkRoutine[0][0].descripcion,
                fechaAviso: reports.fecha_aviso,
                fechaEjecucion: reports.fecha_ejecucion,
                reporteFalla: reports.reporte_falla,
                trabajoEfectuar: reports.trabajo_efectuar,
                comentarios: reports.comentarios
                })
            }
            return result
        } catch (error) {
            return {
                error: error.message
            }
        }
        
    }

    static async getMachineList(name){

        try {
            const connection = await getConnection();
            const query = `SELECT id FROM descripcion_maquina WHERE descripcion = '${name}';`;
            const consult = await connection.query(query);
            
            const queryList = `SELECT * FROM reporte WHERE id_descripcion_maquina = '${consult[0][0].id}';`;
            const consultList = await connection.query(queryList);

            const result = [];
            for(let machine of consultList[0]){
            let queryDescription = `SELECT nombre FROM reportero WHERE id = '${machine.id_reportero}';`;
            let queryAsigned = `SELECT nombre FROM asignado WHERE id = '${machine.id_asignado}';`;
            let queryWorkRoutine = `SELECT descripcion FROM rutina_trabajo WHERE id = '${machine.id_rutina_trabajo}';`;
            let consultReports = await connection.query(queryDescription);
            let consultAsigned = await connection.query(queryAsigned);
            let consultWorkRoutine = await connection.query(queryWorkRoutine);
            result.push({
                numeroOrden : machine.numero_orden,
                descripcion: name,
                reportero :consultReports[0][0].nombre,
                asignado: consultAsigned[0][0].nombre,
                rutinaTrabajo: consultWorkRoutine[0][0].descripcion,
                fechaAviso: machine.fecha_aviso,
                fechaEjecucion: machine.fecha_ejecucion,
                reporteFalla: machine.reporte_falla,
                trabajoEfectuar: machine.trabajo_efectuar,
                comentarios: machine.comentarios
                })
            }
            return result

        } catch (error) {
            return {
                error: error.message
            }
        }

    }

    static async getOrderList(numberOrder){

        try {
        const connection = await getConnection();
        const queryList = `SELECT * FROM reporte WHERE numero_orden = ${numberOrder};`;
        const consultList = await connection.query(queryList);

        const result = [];
        for(let order of consultList[0]){
        let queryDescription = `SELECT descripcion FROM descripcion_maquina WHERE id = '${order.id_descripcion_maquina}';`;
        let queryReportero = `SELECT nombre FROM reportero WHERE id = '${order.id_reportero}';`;
        let queryAsigned = `SELECT nombre FROM asignado WHERE id = '${order.id_asignado}';`;
        let queryWorkRoutine = `SELECT descripcion FROM rutina_trabajo WHERE id = '${order.id_rutina_trabajo}';`
        let consultDescription = await connection.query(queryDescription);
        let consultReports = await connection.query(queryReportero);
        let consultAsigned = await connection.query(queryAsigned);
        let consultWorkRoutine = await connection.query(queryWorkRoutine);
        result.push({
            numeroOrden : numberOrder,
            descripcion : consultDescription[0][0].descripcion,
            reportero :consultReports[0][0].nombre,
            asignado: consultAsigned[0][0].nombre,
            rutinaTrabajo: consultWorkRoutine[0][0].descripcion,
            fechaAviso: order.fecha_aviso,
            fechaEjecucion: order.fecha_ejecucion,
            reporteFalla: order.reporte_falla,
            trabajoEfectuar: order.trabajo_efectuar,
            comentarios: order.comentarios
            })
        }
        return result

        } catch (error) {
            return {
                error: error.message
            }
        }
        
                    
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
            const connection = await getConnection();
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
            return newReport

        } catch (error) {
            return {
                error: error.message
            }
        }
    
    }

    static async updateReport (number, data ){
        const order = number;
    
        const {
            reportero,
            asignado,
            descripcion,
            rutinaTrabajo,
            fechaAviso,
            fechaEjecucion,
            reporteFalla,
            trabajoEfectuar,
            comentarios
        } = data;


        const queryIdReportero = `SELECT id FROM reportero WHERE nombre = '${reportero}';`;
        const queryAsignado = `SELECT id FROM asignado WHERE nombre = '${asignado}';`;
        const queryDescripcion = `SELECT id FROM descripcion_maquina WHERE descripcion = '${descripcion}';`;
        const queryRutinaTrabajo = `SELECT id FROM rutina_trabajo WHERE descripcion = '${rutinaTrabajo}'`

        try {
            const connection = await getConnection();
            const idReportero = await connection.query(queryIdReportero);
            const idAsignado = await connection.query(queryAsignado);
            const idDescripcion = await connection.query(queryDescripcion);
            const idRutinaTrabajo = await connection.query(queryRutinaTrabajo);
            
            const queryUpdate = `UPDATE reporte SET id_descripcion_maquina = '${idDescripcion[0][0].id}', id_reportero = '${idReportero[0][0].id}', id_asignado = '${idAsignado[0][0].id}', id_rutina_trabajo = '${idRutinaTrabajo[0][0].id}', fecha_aviso = '${fechaAviso}', fecha_ejecucion = '${fechaEjecucion}', reporte_falla = '${reporteFalla}', trabajo_efectuar = '${trabajoEfectuar}', comentarios = '${comentarios}' WHERE numero_orden = ${order};`;
            const update = await connection.query(queryUpdate);
            
            return update;
        } catch (error) {
            return {
                error: error.messagge
            }
        }
    }

    static async deleteReport(number){
        const queryId = `SELECT id FROM reporte WHERE numero_orden = ${number}`

        try {
            const connection = await getConnection();
            const idReport = await connection.query(queryId);

            const queryResponse = `DELETE FROM reporte WHERE id = '${idReport[0][0].id}'`

            const deleteReportId = await connection.query(queryResponse);

            return deleteReportId
        } catch (error) {
            return {
                error:error.message
            }
        }

        
    }
}