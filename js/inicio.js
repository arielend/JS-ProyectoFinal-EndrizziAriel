const pacienteDefault = new Paciente (1, "Sotelo", "Andrés", "22222222", "56", "M", "sotelo@mail.com", "1234");
pacientes.push(pacienteDefault);

// const especialidad1 = new Especialidad(1, "E001", "Clínica médica");
// const especialidad2 = new Especialidad(2, "E002", "Endocrinología");
// const especialidad3 = new Especialidad(3, "E003", "Ginecología");
// const especialidad4 = new Especialidad(4, "E004", "Oftalmología");
// const especialidad5 = new Especialidad(5, "E005", "Ortopedia");
// const especialidad6 = new Especialidad(6, "E006", "Pediatría");

// especialidades.push(especialidad1, especialidad2, especialidad3, especialidad4, especialidad5, especialidad6);

const medico1 = new Medico(1, "López", "Juan Carlos", "MP 23456", 1);
const medico2 = new Medico(2, "Martínez", "César Alfredo", "MP 21659", 2);
const medico3 = new Medico(3, "Sánchez", "José Sebastián", "MP 24351", 3);
const medico4 = new Medico(4, "Osorio", "María Ines", "MP 21074", 4);
const medico5 = new Medico(5, "Ibáñez", "Margarita", "MP 18744", 5);
const medico6 = new Medico(6, "Lagos", "María Eugenia", "MP 26339", 6);

medicos.push(medico1, medico2, medico3, medico4, medico5, medico6);

const turno1 = new Turno(1, 1, 1, 1, "23/08/2023", "08:30");
const turno2 = new Turno(2, 1, 2, 2, "27/08/2023", "13:30");
const turno3 = new Turno(3, 1, 3, 3, "16/09/2023", "11.30");
const turno4 = new Turno(4, 1, 4, 4, "22/09/2023", "14:30");

turnos.push(turno1, turno2, turno3, turno4);

const medicosJSON = JSON.stringify(medicos);
const pacientesJSON = JSON.stringify(pacientes);
const turnosJSON = JSON.stringify(turnos);
const especialidadesJSON = JSON.stringify(especialidades);

localStorage.getItem("medicos") ? medicos = JSON.parse(localStorage.getItem("medicos")) : localStorage.setItem("medicos", medicosJSON);
localStorage.getItem("especialidades") ? especialidades = JSON.parse(localStorage.getItem("especialidades")) : localStorage.setItem("especialidades", especialidadesJSON);
localStorage.getItem("pacientes") ? pacientes = JSON.parse(localStorage.getItem("pacientes")) : localStorage.setItem("pacientes", pacientesJSON);
localStorage.getItem("turnos") ? turnos = JSON.parse(localStorage.getItem("turnos")) : localStorage.setItem("turnos", turnosJSON);