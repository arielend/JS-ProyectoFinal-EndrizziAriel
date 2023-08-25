//Variables del modal
let modal = document.getElementById("modal");

let btnModalClose = document.getElementById("modal-btn-close");
let btnModalAccept = document.getElementById("modal-btn-accept");
let btnModalCancel = document.getElementById("modal-btn-cancel");
let btnModalConfirm = document.getElementById("modal-btn-confirm");
let btnModalReset = document.getElementById("modal-btn-reset");

let modalTitle = document.getElementById("modal-body-tittle");
let modalMessage = document.getElementById("modal-body-message");


//Datos PACIENTE
let apellidoP = "";
let nombresP = "";
let documento = "";
let edad = "";
let sexo = "";
let email = "";
let password = "";


//Datos MEDICO
let apellidoM = "";
let nombreM = "";
let matricula = "";


//Datos ESPECIALIDAD
let codigoEsp = "";
let nombreEso = "";


//Datos TURNO
let idEspecialidadTurno = "";
let idMedicoTurno = "";
let fechaTurno = "";
let horaTurno = "";
let turnoDateObject = new Date();


//Arreglos
let pacientes = [];
let medicos = [];
let especialidades = [];
let turnos = [];


//Expresiones regulares
const regExMay = /[A-Z]/;
const regExMin = /[a-z]/;
const regExNum = /[0-9]/;
const regExEsp = /[^0-9a-zA-Z]/;
const regExMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;