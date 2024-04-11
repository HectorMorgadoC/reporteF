
const formData = document.getElementById('formdata');
const selectDateWarning = document.getElementById('datetimeWarning');
const selectDateExecute = document.getElementById('datetimeExecute');
const selectReports = document.getElementById('reports');
const selectDescription = document.getElementById('description');
const selectWorkRoutine = document.getElementById('workroutine');
const selectAssigned = document.getElementById('assigned');
const selectTitleText = document.getElementById('titleText');
const selectReport = document.getElementById('report');
const selectComment = document.getElementById('comment');



document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:5000/', {
            method: 'GET'
        });

        if (response.ok) {
            const data = await response.json(); // Parsea la respuesta como JSON
            const totalData = JSON.parse(data);
            const [ reporters,description,workRoutine,assigned ]= totalData;
            
            for( let i = 0;i < reporters.length;i++){
                const optionReports = document.createElement('option');
                optionReports.innerHTML = reporters[i].nombre;
                selectReports.appendChild(optionReports);
            }

            for( let i = 0;i < description.length;i++){
                const optionDescription = document.createElement('option');
                optionDescription.innerHTML = description[i].descripcion;
                selectDescription.appendChild(optionDescription);
            }

            for( let i = 0;i < workRoutine.length;i++){
                const optionWorkRoutine = document.createElement('option');
                optionWorkRoutine.innerHTML = workRoutine[i].descripcion;
                selectWorkRoutine.appendChild(optionWorkRoutine);
            }

            for( let i = 0;i < assigned.length;i++){
                const optionAssigned = document.createElement('option');
                optionAssigned.innerHTML = assigned[i].nombre;
                selectAssigned.appendChild(optionAssigned);
            }
        } else {
            console.error('Error en la solicitud:', response.status);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
});

formData.addEventListener('submit',e => {
    e.preventDefault()

    const dataReport = {
        descripcionMaquina : selectDescription.value,
        rutinaTrabajo : selectWorkRoutine.value,
        reportero : selectReports.value,
        asignado : selectAssigned.value,
        fechaAviso : formatFecha(selectDateWarning.value),
        fechaEjecucion : formatFecha(selectDateExecute.value),
        reporteFalla: selectTitleText.value,
        trabajoEfectuar: selectReport.value,
        comentarios: selectComment.value,
    }

    fetch('http://localhost:5000/', {
        method : 'post',
        header: {
            'Content-Type':'Application/json'
        },
        body : JSON.stringify(dataReport)
});

});

function formatFecha (fecha) {
    let partesFecha = fecha.split("-");
    let dia = partesFecha[0];
    let mes = partesFecha[1];
    let anio = partesFecha[2];
    let nuevaFecha = `${anio}-${mes}-${dia}`
    return nuevaFecha
}