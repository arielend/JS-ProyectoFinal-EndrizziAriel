//DOM
const pagina = document;

//Variable del formulario 
let loginForm = document.getElementById("login-form");
let inputDocumento = document.getElementById("login-input-documento");
let inputDocumentAlert = document.getElementById("alert-input-documento");
let inputPassword = document.getElementById("login-input-password");
let inputPasswordAlert = document.getElementById("alert-input-password");
let passwordEyeLink = document.getElementById("password-eye-link");
let passwordEyeIcon = document.getElementById("password-eye-icon");
let btnIngresar = document.getElementById("btn-ingresar");

//Funciones
function togglePasswordVisibility(e){
    let element = e.target;
    let regEx = new RegExp("closed-eye");
    
    if(regEx.test(element.src)) {
        passwordEyeIcon.setAttribute("src", "assets/img/open-eye.svg");
        inputPassword.setAttribute("type", "text");
    }
    else {
        passwordEyeIcon.setAttribute("src", "assets/img/closed-eye.svg");
        inputPassword.setAttribute("type", "password");
    }    
}

function limpiarCamposLogin(){
    inputDocumento.value = "";
    inputPassword.value = "";
}

function hideAlerts(){
    inputDocumentAlert.classList.replace("visible", "invisible");
    inputPasswordAlert.classList.replace("visible", "invisible");
}

function clickLogin(e){
    e.preventDefault();
    hideAlerts();

    documento = inputDocumento.value;
    password = inputPassword.value;

    if(documento === "" && password !== ""){
        inputDocumentAlert.classList.replace("invisible", "visible");
    }
    else if(password === "" && documento !== ""){
        inputPasswordAlert.classList.replace("invisible", "visible");
    }
    else if(password === "" && documento === ""){
        inputDocumentAlert.classList.replace("invisible", "visible");
        inputPasswordAlert.classList.replace("invisible", "visible");
    }
    else{
        validarLogin();
        return;
    }
}

function validarLogin(){
    const enSesion = pacientes.find(
        (elemento) =>{return elemento.documento === documento}
    );

    if(enSesion === undefined){
        limpiarCamposLogin();
        modalTittle = "ATENCION";
        modalMessageHTML = `<p class="modal__box__body__message"> El paciente ${documento} no se encuentra registrado</p>`;
        mostrarModal(modalTittle, modalMessageHTML, true, true, false, true, true);
        return false;        
    }

    if(enSesion.password === password){
        const enSesionJSON = JSON.stringify(enSesion);
        sessionStorage.setItem("PacienteActivo", enSesionJSON);
        location.href = "pages/turnos.html";
        //En producción se haría el submit del form
    }
    else{
        limpiarCamposLogin();
        modalTitle = "ATENCION";
        modalMessageHTML = `<p class="modal__box__body__message"> La contraseña ingresada es incorrecta.</p>`;
        mostrarModal(modalTitle, modalMessageHTML, true, true, false, true, true);
        return false;
    }
}

//Handlers
pagina.addEventListener("DOMContentLoaded", ()=>{inputDocumento.focus()});
passwordEyeIcon.addEventListener("click", togglePasswordVisibility);
btnIngresar.addEventListener("click", clickLogin);
btnModalClose.addEventListener("click", ()=>{modal.classList.replace("show", "hide")});
btnModalAccept.addEventListener("click", ()=>{modal.classList.replace("show", "hide")});