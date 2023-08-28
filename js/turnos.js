//Variables
let pagina = document;

//Variables de turnos.html
let tableBodyTurnos = document.getElementById("tbody-turnos");

let usuarioActivo = undefined;
pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
medicos = JSON.parse(localStorage.getItem("medicos")) || [];
turnos = JSON.parse(localStorage.getItem("turnos")) || [];

//Variables datos de la sesion
let btnCerrarSesion = document.getElementById("btn-logout");
let userInfoName = document.getElementById("user-info-name");
let userInfoDoc = document.getElementById("user-info-doc");

//Funciones
function validarAcceso(){
    if(sessionStorage.getItem("PacienteActivo")){
        usuarioActivo = JSON.parse(sessionStorage.getItem("PacienteActivo"));
        mostrarDatosUsuario();
        mostrarTurnosUsuario();
    }
    else
    {
        let title = "ATENCIÓN";
        let message = "Acceso restringido. Ingrese sus credenciales de acceso para ver sus turnos.";
        mostrarModal(title, message, true, true, true, true, true);
        setTimeout(()=>{location.href = "../index.html"}, 2500);
    };
}

function mostrarDatosUsuario(){
    userInfoName.innerText += ` ${usuarioActivo.apellido} ${usuarioActivo.nombres}`;
    userInfoDoc.innerText += ` ${usuarioActivo.documento}`;
}

function cerrarSesion(){
    sessionStorage.removeItem("PacienteActivo");
    location.href = "../index.html";
}

function mostrarTurnosUsuario(){
    let idPaciente = usuarioActivo.id;
    const turnosPaciente = turnos.filter(el=>el.idPaciente === idPaciente);
    
    tableBodyTurnos.innerHTML = "";

    if(turnosPaciente.length === 0){
        tableBodyTurnos.innerHTML += `
        <tr class="main__turnos__content__table__row">
            <td class="text-center" colspan="7"> No tiene turnos pendientes </td>                              
        </tr>
        `;
    }
    else{
        console.log(turnosPaciente);                
        turnosPaciente.forEach((turno) => {
            turno.cancelado ? 
            tableBodyTurnos.innerHTML += `
            <tr class="main__turnos__content__table__row">
            <td>${turno.id}</td>
            <td>${especialidades[turno.idEspecialidad-1].nombreEspecialidad}</td>
            <td>${medicos[turno.idMedico-1].apellido} ${medicos[turno.idMedico-1].nombres}</td>
            <td>${turno.fechaTurno}</td>
            <td>${turno.horaTurno} horas</td>
            <td class="cancelado">${turno.estado}</td>
            <td>
            <button class="button-2" value="${turno.id}" disabled>Cancelar</button>
            </td>
            </tr>            
            `:
            tableBodyTurnos.innerHTML += `
            <tr class="main__turnos__content__table__row">
            <td>${turno.id}</td>
            <td>${especialidades[turno.idEspecialidad-1].nombreEspecialidad}</td>
            <td>${medicos[turno.idMedico-1].apellido} ${medicos[turno.idMedico-1].nombres}</td>
            <td>${turno.fechaTurno}</td>
            <td>${turno.horaTurno} horas</td>
            <td>${turno.estado}</td>
            <td>
            <button class="button-2" value="${turno.id}">Cancelar</button>
            </td>
            </tr>            
            `;            
        });

        let btnCancelarTurno = document.querySelectorAll(".button-2");

        for(var i = 0; i < btnCancelarTurno.length; i++){
            btnCancelarTurno[i].addEventListener("click", cancelarTurno);
        }
    }
}

function cancelarTurno(e){
    e.preventDefault();
    let idTurno = (e.target).getAttribute("value");    

    //Usando Sweet Alert y Toastify porque la rubrica de evaluación exige usar una librería
    Swal.fire({
        title: 'Atención!',
        text: `¿Desea cancelar el turno ${idTurno}?`,
        icon: 'question',
        confirmButtonText: 'Si',
        confirmButtonColor: '#0D7986',
        showCancelButton: true,
        cancelButtonText: "No"
    }).then((result)=>{
        if(result.isConfirmed){
            turnos.forEach((turno)=>{
                if(turno.id == idTurno){
                    turno.estado ="Cancelado";
                    turno.cancelado = true;
                }
            })
        
            let turnosJSON = JSON.stringify(turnos);
            localStorage.setItem("turnos", turnosJSON);
            Toastify({
                text: `Turno ${idTurno} cancelado.`,
                style: {
                    background: "linear-gradient(to right, #78D2DB, #51B1BB)",
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                    color: "#000"
                  },                
                duration: 2000                
                }).showToast();

            setTimeout(()=>{location.href = "turnos.html"}, 3000);
        }
    });
}

//Handlers
pagina.addEventListener("DOMContentLoaded", validarAcceso);
btnCerrarSesion.addEventListener("click", cerrarSesion);