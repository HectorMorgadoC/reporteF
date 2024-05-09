import { buttonGet } from "./listData.js";
import { updateReport } from "./listUpdate.js";
import { reportDelete } from "./listDelete.js";

const select = document.getElementById('machine');
const list = document.getElementById('list');


document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:5000/machine', {
            method: 'GET'
        });

        if (response.ok) {
            const data = await response.json(); // Parsea la respuesta como JSON
            const totalData = JSON.parse(data);
            if(totalData.error){
                const main = document.querySelector('main');
                const body = document.querySelector('body');
                const messageError = document.createElement('h3');
                if(main){
                    main.remove()
                    messageError.innerHTML = 'Error de conexion';
                    body.appendChild(messageError);
                }
            }
            
            for( let machine of totalData ){
                const optionReports = document.createElement('option');
                optionReports.innerHTML = machine.descripcion;
                select.appendChild(optionReports);
            }

        } else {
            console.error('Error en la solicitud:', response.status);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
});



document.addEventListener('submit', async (e) => {
    e.preventDefault()
    const tableExist = document.querySelector('table');
    const formReports = document.querySelector('form');
    const reportPrint = document.querySelector('#reportPrint');

    if(formReports){
        formReports.remove()
    }
    
    if(tableExist){
        tableExist.remove()
    }

    if(reportPrint){
        reportPrint.remove()
    }
    const table = document.createElement('table');
    const titleTable = document.createElement('tr');
    titleTable.classList = 'title-table';
    const titleCode = document.createElement('td');

    titleCode.innerText = ' N_ Orden';
    const titleReport = document.createElement('td');
    titleReport.innerText = ' Reportero';
    const titleAsigned = document.createElement('td');
    titleAsigned.innerText = 'Asignado';
    const titleDateWarning = document.createElement('td');
    titleDateWarning.innerText = 'Fecha de aviso';
    const titleDateExecute = document.createElement('td');
    titleDateExecute.innerText = 'Fecha de ejecucion';
    const titleReportFault = document.createElement('td');
    titleReportFault.innerText = 'Reporte de falla';

    titleTable.appendChild(titleCode);
    titleTable.appendChild(titleReport);
    titleTable.appendChild(titleAsigned);
    titleTable.appendChild(titleDateWarning);
    titleTable.appendChild(titleDateExecute);
    titleTable.appendChild(titleReportFault);
    table.appendChild(titleTable);

    const nameReports = await select.value;

    try {
        const response = await fetch(`http://localhost:5000/machine/${nameReports}`,
        { method:'GET'});

        const data = JSON.parse(await response.json());
        
        for(let result of data){
            const listResult = document.createElement('tr');
            const numeroOrden = document.createElement('td');
            const reportero = document.createElement('td');
            const asignado = document.createElement('td');
            const fechaAviso = document.createElement('td');
            const fechaEjecucion = document.createElement('td');
            const reporteFalla = document.createElement('td');
            const buttonTable = document.createElement('td');
            const buttonReport = document.createElement('button');
            const buttonUpdate = document.createElement('button');
            const buttonDelete = document.createElement('button');
            buttonTable.classList.add('table-button');
            buttonReport.innerText = 'Imprimir';
            buttonUpdate.innerText = 'Modificar';
            buttonDelete.innerText = 'eliminar';
            buttonTable.appendChild(buttonReport);
            buttonTable.appendChild(buttonUpdate);
            buttonTable.appendChild(buttonDelete);

            numeroOrden.innerText = result.numeroOrden;
            reportero.innerText = result.reportero;
            asignado.innerText =   result.asignado;
            fechaAviso.innerText = result.fechaAviso;
            fechaEjecucion.innerText = result.fechaEjecucion;
            reporteFalla.innerText = result.reporteFalla;

            listResult.appendChild(numeroOrden);
            listResult.appendChild(reportero);
            listResult.appendChild(asignado);
            listResult.appendChild(fechaAviso);
            listResult.appendChild(fechaEjecucion);
            listResult.appendChild(reporteFalla);
            listResult.appendChild(buttonTable);
            table.appendChild(listResult)
            list.appendChild(table);
            //console.log(result);

            buttonGet(buttonReport,result);
            updateReport(buttonUpdate,result);
            reportDelete(buttonDelete,result.numeroOrden);
            
        }


    
    } catch (error) {
        console.error( 'Error al realizar peticion: '+ error)
    }


})