import { buttonGet } from "./listData.js";
import { updateReport } from "./listUpdate.js";

const select = document.getElementById('reports');
const list = document.getElementById('list');
const button = document.getElementById('buttonInp');



document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:5000/reports', {
            method: 'GET'
        });

        if (response.ok) {
            const data = await response.json(); // Parsea la respuesta como JSON
            const totalData = JSON.parse(data);
            
            for( let reports of totalData ){
                const optionReports = document.createElement('option');
                optionReports.innerHTML = reports.nombre;
                select.appendChild(optionReports);
            }

        } else {
            console.error('Error en la solicitud:', response.status);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
});

button.addEventListener('click', async (e) => {
    e.preventDefault()
    const tableExist = document.querySelector('table');
    const reportPrint = document.querySelector('#reportPrint');

    if(reportPrint){
        reportPrint.remove()
    }


    if(tableExist){
        tableExist.remove()
    }

    const table = document.createElement('table');
    const titleTable = document.createElement('tr');
    const titleCode = document.createElement('td');

    titleCode.innerText = ' N_ Orden';
    const titleDescription = document.createElement('td');
    titleDescription.innerText = ' Descripcion';
    const titleAsigned = document.createElement('td');
    titleAsigned.innerText = 'Asignado';
    const titleWorkRoutine = document.createElement('td');
    titleWorkRoutine.innerText = 'Rutina de trabajo';
    const titleDateWarning = document.createElement('td');
    titleDateWarning.innerText = 'Fecha de aviso';
    const titleDateExecute = document.createElement('td');
    titleDateExecute.innerText = 'Fecha de ejecucion';
    const titleReportFault = document.createElement('td');
    titleReportFault.innerText = 'Reporte de falla';

    titleTable.appendChild(titleCode);
    titleTable.appendChild(titleDescription);
    titleTable.appendChild(titleAsigned);
    titleTable.appendChild(titleWorkRoutine);
    titleTable.appendChild(titleDateWarning);
    titleTable.appendChild(titleDateExecute);
    titleTable.appendChild(titleReportFault);
    table.appendChild(titleTable);

    const nameReports = await select.value;

    try {
        const response = await fetch(`http://localhost:5000/reports/${nameReports}`,
        { method:'GET'});

        const data = JSON.parse(await response.json());
        console.log(data);
        
        for(let result of data){
            const listResult = document.createElement('tr');
            const numeroOrden = document.createElement('td');
            const descripcion = document.createElement('td');
            const asignado = document.createElement('td');
            const rutinaTrabajo = document.createElement('td');
            const fechaAviso = document.createElement('td');
            const fechaEjecucion = document.createElement('td');
            const reporteFalla = document.createElement('td');
            const buttonReport = document.createElement('button');
            const buttonUpdate = document.createElement('button');
            buttonReport.innerText = 'Imprimir';
            buttonUpdate.innerText = 'Modificar';
            
            

            numeroOrden.innerText = result.numeroOrden;
            descripcion.innerText = result.descripcion;
            asignado.innerText =   result.asignado;
            rutinaTrabajo.innerText = result.rutinaTrabajo;
            fechaAviso.innerText = result.fechaAviso;
            fechaEjecucion.innerText = result.fechaEjecucion;
            reporteFalla.innerText = result.reporteFalla;

            listResult.appendChild(numeroOrden);
            listResult.appendChild(descripcion);
            listResult.appendChild(asignado);
            listResult.appendChild(rutinaTrabajo);
            listResult.appendChild(fechaAviso);
            listResult.appendChild(fechaEjecucion);
            listResult.appendChild(reporteFalla);
            listResult.appendChild(buttonReport);
            listResult.appendChild(buttonUpdate);
            table.appendChild(listResult)
            list.appendChild(table);
            
            buttonGet(buttonReport,result);
            updateReport(buttonUpdate,result);
        }
        

    } catch (error) {
        console.error( 'Error al realizar peticion: '+ error)
    }

})

