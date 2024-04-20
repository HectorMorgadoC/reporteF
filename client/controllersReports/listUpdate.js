export function updateReport(button,data){
    button.addEventListener('click',() => {
        console.log(data);
        let { 
            numeroOrden,
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

        const list = document.querySelector('#list');
        const table = document.querySelector('table')
        const form = document.createElement('form')
        const labelNumeroOrden = document.createElement('label');
        const inputNumeroOrden = document.createElement('input');
        const labelReportero = document.createElement('label');
        const inputReportero = document.createElement('input');
        const labelAsignado = document.createElement('label');
        const inputAsignado = document.createElement('input');
        const labelRutinaTrabajo = document.createElement('label');
        const inputRutinaTrabajo = document.createElement('input');
        const labelDescripcion = document.createElement('label');
        const inputDescripcion = document.createElement('input');
        const labelFechaAviso = document.createElement('label');
        const inputFechaAviso = document.createElement('input');
        const labelFechaEjecucion = document.createElement('label');
        const inputFechaEjecucion = document.createElement('input');
        const labelReporteFalla = document.createElement('label');
        const inputReporteFalla = document.createElement('input');
        const labelTrabajoEjecutar = document.createElement('label');
        const inputTrabajoEjecutar = document.createElement('input');
        const labelComentarios = document.createElement('label');
        const inputComentarios = document.createElement('input');
        const update = document.createElement('button');

        update.innerText = 'Modificar';
        labelNumeroOrden.innerHTML = 'Numero de orden: ';
        inputNumeroOrden.value = numeroOrden;
        labelReportero.innerHTML = 'Reportero: ';
        inputReportero.value = reportero;
        labelAsignado.innerHTML = 'Asignado: ';
        inputAsignado.value = asignado;
        labelDescripcion.innerHTML = 'Descripcion_maquina: ';
        inputDescripcion.value = descripcion;
        labelRutinaTrabajo.innerHTML = 'Rutina_trabajo';
        inputRutinaTrabajo.value = rutinaTrabajo;
        labelFechaAviso.innerHTML = 'Fecha_aviso: ';
        inputFechaAviso.value = fechaAviso;
        labelFechaEjecucion.innerHTML = 'Fecha_ejecucion: ';
        inputFechaEjecucion.value = fechaEjecucion;
        labelReporteFalla.innerHTML = 'Reporte_falla: ';
        inputReporteFalla.value = reporteFalla;
        labelTrabajoEjecutar.innerHTML = 'Trabajo_efectuar: ';
        inputTrabajoEjecutar.value = trabajoEfectuar;
        labelComentarios.innerHTML = 'Comentarios: ';
        inputComentarios.value = comentarios;



        if(table){
            table.remove();
        }

        form.appendChild(labelNumeroOrden);
        form.appendChild(inputNumeroOrden);
        form.appendChild(labelReportero);
        form.appendChild(inputReportero);
        form.appendChild(labelAsignado);
        form.appendChild(inputAsignado);
        form.appendChild(labelDescripcion);
        form.appendChild(inputDescripcion);
        form.appendChild(labelRutinaTrabajo);
        form.appendChild(inputRutinaTrabajo);
        form.appendChild(labelFechaAviso);
        form.appendChild(inputFechaAviso);
        form.appendChild(labelFechaEjecucion);
        form.appendChild(inputFechaEjecucion);
        form.appendChild(labelReporteFalla);
        form.appendChild(inputReporteFalla);
        form.appendChild(labelTrabajoEjecutar);
        form.appendChild(inputTrabajoEjecutar);
        form.appendChild(labelComentarios);
        form.appendChild(inputComentarios);
        form.appendChild(update);
        list.appendChild(form);

        update.addEventListener('submit',async (e) => {
            e.preventDefault()
        })

        update.addEventListener('click',async() => {

            const dataUpdate = {
                reportero : inputReportero.value,
                asignado: inputAsignado.value,
                descripcion: inputDescripcion.value,
                rutinaTrabajo: inputRutinaTrabajo.value,
                fechaAviso: inputFechaAviso.value,
                fechaEjecucion: inputFechaEjecucion.value,
                reporteFalla: inputReporteFalla.value,
                trabajoEfectuar: inputTrabajoEjecutar.value,
                comentarios: inputComentarios.value
            }
            dataUpdate.fechaAviso = dataUpdate.fechaAviso.split('T')[0];
            dataUpdate.fechaEjecucion = dataUpdate.fechaEjecucion.split('T')[0];
            const response = fetch(`http://localhost:5000/update/${numeroOrden}`,{
                method: 'PATCH',
                headers: {
                    'Content-type':'json/application'
                },
                body: JSON.stringify(dataUpdate)
            })
        })
        


    })
}