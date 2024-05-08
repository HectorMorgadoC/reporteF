


export function buttonGet(buttonValue,result){
    
    buttonValue.addEventListener ('click', () => {
        const data = result;
        const table = document.querySelector('table');
        const list = document.querySelector('#list');
        const reportContainer = document.createElement('div');
        const containerReportDate = document.createElement('div');
        const containerReportPersons = document.createElement('div');
        const containerReportMachine = document.createElement('div');
        const titleReport = document.createElement('p');
        const numeroOrden = document.createElement('p');
        const reportero = document.createElement('p');
        const asignado = document.createElement('p');
        const rutinaTrabajo = document.createElement('p');
        const descripcion = document.createElement('p');
        const fechaAviso = document.createElement('p');
        const fechaEjecucion = document.createElement('p');
        const reporteFalla = document.createElement('p');
        const trabajoEfectuar = document.createElement('p');
        const comentarios = document.createElement('p');
        const ReportHeader = document.createElement('p');
        const containerButton = document.createElement('div');
        const button = document.createElement('button');

        button.innerText = 'Imprimir';

        reportContainer.classList = 'reportPrint';

        containerReportDate.classList = 'containerReportDate';
        containerReportPersons.classList = 'containerReportPersons';
        containerReportMachine.classList = 'containerReportMachine';
        ReportHeader.classList = 'timbre';

        titleReport.id = 'titleReport';
        titleReport.innerHTML = 'REPORTE DE MANTENIMIENTO';

        numeroOrden.innerText = `Numero de orden: ${data.numeroOrden}`;
        numeroOrden.id = 'numeroOrdenReporte';

        reportero.innerText = `Reportero: ${data.reportero}`;
        reportero.id = 'reporteroReporte';

        asignado.innerText = `Asignado: ${data.asignado}`;
        asignado.id = 'asignadoReporte';

        descripcion.innerText  = `Descripcion_maquina: ${data.descripcion}`;
        descripcion.id = 'descripcionReporte';

        rutinaTrabajo.innerText = `Rutina_trabajo: ${data.rutinaTrabajo}`;
        rutinaTrabajo.id = 'rutinaTrabajoReporte';

        fechaAviso.innerText = `Fecha_aviso: ${data.fechaAviso.split('T')[0]}`;
        fechaAviso.id = 'fechaAvisoReporte';

        fechaEjecucion.innerText = `Fecha_ejecucion: ${data.fechaEjecucion.split('T')[0]}`;
        fechaEjecucion.id = 'fechaEjecucionReporte';

        reporteFalla.innerText = `Reporte_falla: ${data.reporteFalla}`;
        reporteFalla.id = 'reporteFallaReporte';
        reporteFalla.classList = 'printReport';

        trabajoEfectuar.innerText = `Trabajo_efectuar: ${data.trabajoEfectuar}`;
        trabajoEfectuar.id = 'trabajoEfectuarReporte';
        trabajoEfectuar.classList = 'printReport';

        comentarios.innerHTML = `Comentarios: ${data.comentarios}`;
        comentarios.id = 'comentariosReporte';
        comentarios.classList = 'printReport';

        ReportHeader.innerHTML = 'floriambra_Cliente:Matfilm'

        containerButton.appendChild(button);

        containerReportDate.appendChild(numeroOrden);
        containerReportDate.appendChild(fechaAviso);
        containerReportDate.appendChild(fechaEjecucion);

        containerReportPersons.appendChild(reportero);
        containerReportPersons.appendChild(asignado);

        containerReportMachine.appendChild(descripcion);
        containerReportMachine.appendChild(rutinaTrabajo);

        reportContainer.appendChild(ReportHeader);
        reportContainer.appendChild(titleReport);
        reportContainer.appendChild(containerReportDate);
        reportContainer.appendChild(containerReportPersons);
        reportContainer.appendChild(containerReportMachine);
        reportContainer.appendChild(reporteFalla);
        reportContainer.appendChild(trabajoEfectuar);
        reportContainer.appendChild(comentarios);
        list.appendChild(reportContainer);
        list.appendChild(containerButton);
        
        

        button.addEventListener('click',() => {
            html2canvas(reportContainer).then( (canvas)  => {
                let doc = new jsPDF();

                doc.addImage(canvas.toDataURL('image/png'),'PNG',10,10);
                
                doc.save('contenido.pdf');
            })
            
        })


        if(table){
            table.remove();
        }
        

        
    })
    
}

