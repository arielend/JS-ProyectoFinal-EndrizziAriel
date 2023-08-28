//Declaración de variables
//Variables Formulario
let pagina = document;
let form = document.getElementById("main__solicitudTurno__form");
let selectEspecialidades = document.getElementById("solicitudTurno-select-especialidad");
let selectPrestadores = document.getElementById("solicitudTurno-select-prestador");
let inputFechaTurno = document.getElementById("solicitudTurno-input-fechaTurno");
let inputHoraTurno = document.getElementById("solicitudTurno-input-horaTurno");
let btnAltaTurno = document.getElementById("btn-altaTurno");
let btnBorrar = document.getElementById("btn-borrar");
let btnCancelar = document.getElementById("btn-cancelar");

//EmailJS
const userID = 'fJQhE-Hk6DRw1ifLm';
const serviceID = 'service_j98pfjz';
const templateID = 'template_0669k7l';


//Variables datos de la sesion
let btnCerrarSesion = document.getElementById("btn-logout");
let userInfoName = document.getElementById("user-info-name");
let userInfoDoc = document.getElementById("user-info-doc");


//Datos en Storage
let usuarioActivo = JSON.parse(sessionStorage.getItem("PacienteActivo"));
especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
medicos = JSON.parse(localStorage.getItem("medicos")) || [];
turnos = JSON.parse(localStorage.getItem("turnos")) || [];

//Variables fecha y hora
let today = new Date();
let year = "";
let month = "";
let date = "";
let hours = "";
let minutes = "";
let seconds = "00";

let fechaOk = false;
let horaOk = false;

let seEligioEspecialidad = false;
let seEligioPrestador = false;


//Funciones
function validarAcceso(){
    if(sessionStorage.getItem("PacienteActivo")){
        usuarioActivo = JSON.parse(sessionStorage.getItem("PacienteActivo"));
        mostrarDatosUsuario();
        cargarSelectEspecialidades();
    }
    else
    {
        let title = "ATENCIÓN";
        let message = "Acceso restringido. Ingrese sus credenciales para solicitar un nuevo turno.";
        mostrarModal(title, message, true, true, true, true, true);
        setTimeout(()=>{location.href = "../index.html"}, 3500);
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

function verificarSeleccionEspecialidad(){
    if(selectEspecialidades.options[selectEspecialidades.selectedIndex].value == 0){
        seEligioEspecialidad = false;
        Swal.fire({
            title: 'Atención!',
            text: `Debe elegir una especialidad.`,
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0D7986'
        });
    }else{
        seEligioEspecialidad = true;
        seEligioPrestador = false;
        cargarSelectPrestadores();
    }
}

function verificarSeleccionPrestador(){
    if(selectPrestadores.options[selectPrestadores.selectedIndex].value == 0){
        seEligioPrestador = false;
        Swal.fire({
            title: 'Atención!',
            text: `Debe elegir un prestador.`,
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0D7986'
        });
    }else{
        seEligioPrestador = true;
    }
}

function cargarSelectEspecialidades(){
    selectEspecialidades.innerHTML += `
    <option value="0"> Elija una opción </option>
    `;
    especialidades.forEach((especialidad)=>{
        selectEspecialidades.innerHTML += `
        <option value="${especialidad.id}"> ${especialidad.nombreEspecialidad} </option>
        `;        
    });
}

function cargarSelectPrestadores(){
    selectPrestadores.innerHTML = "";
    let idEspecialidad = parseInt(selectEspecialidades.options[selectEspecialidades.selectedIndex].value);
    let medicosEspecialidad = medicos.filter((medico)=>medico.idEspecialidad === idEspecialidad);
    selectPrestadores.innerHTML +=`
    <option value="0"> Elija una opción </option>
    `;
    medicosEspecialidad.forEach((medico)=>{
        selectPrestadores.innerHTML +=`
        <option value="${medico.id}"> ${medico.apellido} ${medico.nombres}</option>
        `;
    });
}

function formatearFecha(){
    let fecha = inputFechaTurno.value;
    verificarFechaPosterior(fecha);    

    !fecha && Swal.fire({
        title: 'Atención!',
        text: `Debe elegir una fecha`,
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0D7986'
    });

    if(fechaOk){
        year = fecha.slice(0,4);
        month = fecha.slice(5,7);
        date = fecha.slice(8);
        fechaOk = true;
        fechaTurno = date +"/"+ month +"/"+ year;
    }
}

function verificarFechaPosterior(ft){
    let fhNum = today.valueOf();
    let fTurno = new Date(ft);
    let ftNum = fTurno.valueOf();
    if(ftNum < fhNum) {
        Swal.fire({
        title: 'Atención!',
        text: `Debe elegir una fecha posterior al día de hoy.`,
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0D7986'
        });
    }else{
        fechaOk = true;
    }    
}

function formatearHora(){
    let hora = inputHoraTurno.value;
    let valido = inputHoraTurno.validity.valid;
    !hora && Swal.fire({
        title: 'Atención!',
        text: `Debe elegir una horario`,
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0D7986'
    });
    !valido && Swal.fire({
        title: 'Atención!',
        text: `Elija un horario valido. Los turnos se otorgan cada 30 minutos, en el horario de 08:00 a 18:30 horas.`,
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0D7986'
    });
    valido && (horaOk = true);

    if(hora && valido){
        hours = hora.slice(0,2);
        minutes = hora.slice(3,5);
        horaTurno = hours + ":" + minutes;
    }
}

function confirmarTurno(e){
    e.preventDefault();
    
    if(seEligioEspecialidad && seEligioPrestador && fechaOk && horaOk){
        const nuevoTurno = new Turno(turnos.length+1, parseInt(usuarioActivo.id), parseInt(selectEspecialidades.options[selectEspecialidades.selectedIndex].value), parseInt(selectPrestadores.options[selectPrestadores.selectedIndex].value), fechaTurno, horaTurno);
        
        Swal.fire({
            title: 'Atención!',
            text: `¿Confirma la carga del turno del día ${fechaTurno} con el/la doctor/a ${selectPrestadores.options[selectPrestadores.selectedIndex].text}?`,
            icon: 'question',
            confirmButtonText: 'Si',
            confirmButtonColor: '#0D7986',
            showCancelButton: true,
            cancelButtonText: "No"
        }).then((result)=>{
            if(result.isConfirmed){
                turnos.push(nuevoTurno);
                console.log(turnos);
                let turnosJSON = JSON.stringify(turnos);
                localStorage.setItem("turnos", turnosJSON);

                enviarEmailTurno();

                Toastify({
                    text: `Turno confirmado. Revise su casilla de mail.`,
                    style: {
                        background: "linear-gradient(to right, #78D2DB, #51B1BB)",
                        fontSize: "1.8rem",
                        fontWeight: "bold",
                        color: "#000"
                      },                
                    duration: 2000                
                    }).showToast();
    
                setTimeout(()=>{location.href = "turnos.html"}, 3000);
            }else{
                return false;
            }
        })
    }
    else{
        Swal.fire({
            title: 'Atención!',
            text: `Debe ingresar datos validos para continuar con la carga del turno.`,
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0D7986'
        });
    }
}

//EmailJS
function enviarEmailTurno(){
    emailjs.init(userID);
    emailjs.send(serviceID, templateID, {
        tpNombrePaciente: `${usuarioActivo.apellido} ${usuarioActivo.nombres}`,
        tpEspecialidad: selectEspecialidades.options[selectEspecialidades.selectedIndex].text,
        tpDatosPrestador: selectPrestadores.options[selectPrestadores.selectedIndex].text,
        tpFechaTurno: fechaTurno,
        tpHoraTurno: horaTurno,
        tpEmailPaciente: usuarioActivo.email,
    })
    .then(() => {
        console.log("Email enviado");
    }, (err) => {
        console.log("Error al enviar email");
        alert(JSON.stringify(err));
    });
}


//Handlers
pagina.addEventListener("DOMContentLoaded", validarAcceso);
selectEspecialidades.addEventListener("change", verificarSeleccionEspecialidad);
selectPrestadores.addEventListener("change", verificarSeleccionPrestador);
inputFechaTurno.addEventListener("input", formatearFecha);
inputHoraTurno.addEventListener("change", formatearHora);
btnAltaTurno.addEventListener("click", confirmarTurno);
btnCerrarSesion.addEventListener("click", cerrarSesion);