const pacienteDefault = new Paciente (1, "Sotelo", "Andrés", "22222222", "56", "M", "sotelo@mail.com", "1234");
pacientes.push(pacienteDefault);

//Carga de datos desde archivos locales .json
fetch("../js/listadoMedicos.json")
.then(
    (response) => response.json()    
)
.then(
    (data) => {
        for (medico in data){
            medicos.push(data[medico]);            
        }
        let medicosJSON = JSON.stringify(medicos);
        localStorage.getItem("medicos") ? medicos = JSON.parse(localStorage.getItem("medicos")) : localStorage.setItem("medicos", medicosJSON);  
    }
)

fetch("../js/listadoEspecialidades.json")
.then(
    (response) => response.json()
)
.then(
    (data) =>{
        for (especialidad in data){
            especialidades.push(data[especialidad]);
        }
        let especialidadesJSON = JSON.stringify(especialidades);
        localStorage.getItem("especialidades") ? especialidades = JSON.parse(localStorage.getItem("especialidades")) : localStorage.setItem("especialidades", especialidadesJSON);
    }
)

//Turnos para mostrar en usuario por defecto
const turno1 = new Turno(1, 1, 1, 1, "23/08/2023", "08:30");
const turno2 = new Turno(2, 1, 2, 2, "27/08/2023", "13:30");
const turno3 = new Turno(3, 1, 3, 3, "16/09/2023", "11.30");
const turno4 = new Turno(4, 1, 4, 4, "22/09/2023", "14:30");

turnos.push(turno1, turno2, turno3, turno4);


//Carga de datos desde storage
const pacientesJSON = JSON.stringify(pacientes);
const turnosJSON = JSON.stringify(turnos);

localStorage.getItem("pacientes") ? pacientes = JSON.parse(localStorage.getItem("pacientes")) : localStorage.setItem("pacientes", pacientesJSON);
localStorage.getItem("turnos") ? turnos = JSON.parse(localStorage.getItem("turnos")) : localStorage.setItem("turnos", turnosJSON);