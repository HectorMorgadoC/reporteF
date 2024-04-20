


export function buttonGet(buttonValue,result){
    
    buttonValue.addEventListener ('click', () => {
        const data = result;
        const table = document.querySelector('table');
        const list = document.querySelector('#list');
        const reportContainer = document.createElement('div');
        const numeroOrden = document.createElement('p');
        const reportero = document.createElement('p');
        const asignado = document.createElement('p');
        const rutinaTRabajo = document.createElement('p');
        const descripcion = document.createElement('p');
        const fechaAviso = document.createElement('p');
        const fechaEjecucion = document.createElement('p');
        const reporteFalla = document.createElement('p');
        const trabajoEfectuar = document.createElement('p');
        const comentarios = document.createElement('p');
        const button = document.createElement('button');
        button.innerText = 'Imprimir';
        reportContainer.id = 'reportPrint';
        numeroOrden.innerText = `Numero de orden: ${data.numeroOrden}`;
        reportero.innerText = `Reportero: ${data.reportero}`;
        asignado.innerText = `Asignado: ${data.asignado}`;
        descripcion.innerText  = `Descripcion_maquina: ${data.descripcion}`;
        rutinaTRabajo.innerText = `Rutina_trabajo: ${data.rutinaTrabajo}`;
        fechaAviso.innerText = `Fecha_aviso: ${data.fechaAviso}`;
        fechaEjecucion.innerText = `Fecha_ejecucion: ${data.fechaEjecucion}`;
        reporteFalla.innerText = `Reporte_falla: ${data.reporteFalla}`;
        trabajoEfectuar.innerText = `Trabajo_efectuar: ${data.trabajoEfectuar}`;
        comentarios.innerHTML = `Comentarios: ${data.comentarios}`;
        reportContainer.appendChild(numeroOrden);
        reportContainer.appendChild(fechaAviso);
        reportContainer.appendChild(fechaEjecucion);
        reportContainer.appendChild(reportero);
        reportContainer.appendChild(asignado);
        reportContainer.appendChild(descripcion);
        reportContainer.appendChild(rutinaTRabajo);
        reportContainer.appendChild(reporteFalla);
        reportContainer.appendChild(trabajoEfectuar);
        reportContainer.appendChild(comentarios);
        reportContainer.appendChild(button);
        
        list.appendChild(reportContainer);

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

