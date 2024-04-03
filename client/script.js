
const selectReports = document.getElementById('reports');
const selectDescription = document.getElementById('description');
const selectWorkRoutine = document.getElementById('workroutine');
const selectAssigned = document.getElementById('assigned');
const formData = document.getElementById('formdata');
const l = document.getElementById('datetimeWarning')

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
    const path = e.target.action

    const url = new URLSearchParams(path)

    const keys = [
        'datetimeWarning',
        'datetimeExecute',
        'reports',
        'description',
        'workroutine',
        'assigned',
        'titleText',
        'report',
        'comment'
    ]

    object = {};
/*
    for(let i = 0;i < keys.length;i++){
        let atribute = keys[0]
        const iterador = document.getElementById(keys[i])
        Object.assign(object,{ keys: iterador.value})

    }
*/
       
    const objectReport = {
        fecha_aviso : undefined,
        fecha_ejecucion : undefined,
        reportero : undefined,
        descripcion: undefined,
        rutina_trabajo : undefined,
        asignado: undefined,
        reporte_falla: undefined,
        trabajo_realizado: undefined,
        comentario: undefined
    }

for( let key in objectReport){
    console.log(key)
    Object.assign(object,{ key : 'saludo'})
}

    console.log(object)
   

})