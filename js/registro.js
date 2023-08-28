//Variables de la página
let pagina = document;

//Formulario
let form = document.getElementById("registro-form");

let inputApellido = document.getElementById("registro-input-apellido");
let inputNombres = document.getElementById("registro-input-nombres");
let inputDocumento = document.getElementById("registro-input-documento");
let inputEdad = document.getElementById("registro-input-edad");
let selectSexo = document.getElementById("registro-select-sexo");
let inputEmail = document.getElementById("registro-input-email");
let alertEmail = document.getElementById("alert-email");
let inputEmailConfirm = document.getElementById("registro-input-emailConfirm");
let alertEmailConfirm = document.getElementById("alert-emailConfirm");
let inputPassword = document.getElementById("registro-input-password");
let alertPassword = document.getElementById("alert-password");
let inputPasswordConfirm = document.getElementById("registro-input-passwordConfirm");
let alertPasswordConfirm = document.getElementById("alert-passwordConfirm");

let passwordEyeIcon1 = document.getElementById("password-eye-icon1");
let passwordEyeLink1 = document.getElementById("password-eye-link1");
let passwordEyeIcon2 = document.getElementById("password-eye-icon2");
let passwordEyeLink2 = document.getElementById("password-eye-link2");

let btnRegistrar = document.getElementById("btn-registrar");
let btnBorrar = document.getElementById("btn-borrar");
let btnCancelar = document.getElementById("btn-cancelar");

let msgHTMLCampos = "";

//Información persistida en storage
pacientes = JSON.parse(localStorage.getItem("pacientes"))

//Funciones
function togglePasswordVisibility(e){
    let element = e.target;
    let id = element.getAttribute("id");
    let regEx = new RegExp("closed-eye");
    
    if(regEx.test(element.src)) {
        element.setAttribute("src", "../assets/img/open-eye.svg");
        id === "password-eye-icon1" ? inputPassword.setAttribute("type", "text"): 
        inputPasswordConfirm.setAttribute("type", "text"); 
    }
    else {
        element.setAttribute("src", "../assets/img/closed-eye.svg");
        id === "password-eye-icon1" ? inputPassword.setAttribute("type", "password"): 
        inputPasswordConfirm.setAttribute("type", "password");
    }    
}

function checkMailFormat(){
    let email = inputEmail.value;
    if(email !== ""){
        if(!regExMail.test(email)){
            alertEmail.classList.contains("invisible") && alertEmail.classList.replace("invisible", "visible");
            return true;
        }
        else{
            alertEmail.classList.replace("visible", "invisible");
        }
    }
    else{
        alertEmail.classList.replace("visible", "invisible");
    }
}

function compararEmails(){
    let email = inputEmail.value;
    let emailConfirm = inputEmailConfirm.value;

    if(email === emailConfirm){
        alertEmailConfirm.classList.contains("visible") && alertEmailConfirm.classList.replace("visible", "invisible");
        return true;
    }
    else{
        alertEmailConfirm.classList.replace("invisible", "visible");
    }    
}

function compararPassword(){
    let pass = inputPassword.value;
    let passConfirm = inputPasswordConfirm.value;
    
    if(pass === passConfirm){
        alertPasswordConfirm.classList.contains("visible") && alertPasswordConfirm.classList.replace("visible", "invisible");
        return true;
    }
    else{
        alertPasswordConfirm.classList.replace("invisible", "visible");
    }
}

function testPasswordStrenght(pw){
    let puntaje = 0;

    regExMay.test(pw) && puntaje++;
    regExMin.test(pw) && puntaje++;
    regExNum.test(pw) && puntaje++;
    regExEsp.test(pw) && puntaje++;

    return puntaje;    
}

function showPasswordStrenght(){
    let pass = inputPassword.value;
    let pwStrenght = testPasswordStrenght(pass);

    if(pass.length !== 0){
        switch(pwStrenght){
            case 0:
                alertPassword.classList.remove("pass-none", "pass-medium", "pass-strong");
                alertPassword.classList.add("pass-weak");
                break;

            case 1:
                alertPassword.classList.remove("pass-none", "pass-medium", "pass-strong");
                alertPassword.classList.add("pass-weak");
                break;

            case 2:
                alertPassword.classList.remove("pass-none", "pass-weak", "pass-strong");
                alertPassword.classList.add("pass-medium");
                break;

            case 3:
                alertPassword.classList.remove("pass-none", "pass-weak", "pass-strong");
                alertPassword.classList.add("pass-medium");
                break;

            case 4:
                alertPassword.classList.remove("pass-none", "pass-weak", "pass-medium");
                alertPassword.classList.add("pass-strong");
                break;
        }
    }
    else{
        alertPassword.classList.remove("pass-none", "pass-weak", "pass-medium", "pass-strong");
        alertPassword.classList.add("pass-none");
        return false;
    }
}

function limpiarCamposRegistro(){
    alertPassword.classList.remove("pass-weak", "pass-medium", "pass-strong");
    alertPassword.classList.add("pass-none");
    alertPasswordConfirm.classList.replace("visible", "invisible");
    alertEmail.classList.replace("visible", "invisible");
    alertEmailConfirm.classList.replace("visible", "invisible");
}

function clickRegistro(e){
    e.preventDefault();

    apellidoP = inputApellido.value;
    nombresP = inputNombres.value;
    documento = inputDocumento.value;
    edad = inputEdad.value;
    sexo = selectSexo.options[selectSexo.selectedIndex].value;
    email = inputEmail.value;
    let emailConfirm = inputEmailConfirm.value
    password = inputPassword.value;
    let passwordConfirm = inputPasswordConfirm.value;

    const campos = {
        apellido: apellidoP,
        nombres: nombresP, 
        documento: documento, 
        edad: edad,
        sexo: sexo,
        email: email,
        emailConfirm: emailConfirm, 
        password: password,
        passwordConfirm: passwordConfirm
    };

    (verificarCamposCompletos(campos)) ? verificarSiExisteUsuario() : mostrarCamposIncompletos(msgHTMLCampos);
}

function verificarCamposCompletos(campos){
    msgHTMLCampos = "";
    let camposCompletos = false;
    let cantCamposRequeridos = 9;
    let cantCamposCompletos = 0;
    
    for (property in campos){
        if((campos[property]).trim() == ""){
            msgHTMLCampos += `
            <p>Campo: ${property}. </p>
            `;
        }
        else{
            cantCamposCompletos++;
        }
    }    
    cantCamposCompletos === cantCamposRequeridos && (camposCompletos = true);
    return camposCompletos;    
}

function mostrarCamposIncompletos(msgHTMLCampos){
    btnModalAccept.addEventListener("click", ()=>{modal.classList.replace("show", "hide")});
    let titulo = "Los siguientes campos son obligatorios";
    mostrarModal(titulo, msgHTMLCampos, true, true, false, true, true);
}


function verificarSiExisteUsuario(){
    if(pacientes.some((paciente)=>paciente.documento === documento)){
        let titulo = "¡Atención!";
        let message = `<p>El paciente ${documento} ya se encuentra registrado.</p>`;
        btnModalAccept.addEventListener("click", ()=>{modal.classList.replace("show", "hide")});
        mostrarModal(titulo, message, true, true, false, true, true);
        limpiarCamposRegistro();
    }
    else{
        registrarNuevoPaciente();
    }
}

function registrarNuevoPaciente(){
    const nuevoPaciente = new Paciente(pacientes.length+1, apellidoP, nombresP, documento, edad, sexo, email, password);
    pacientes.push(nuevoPaciente);

    let pacientesJSON = JSON.stringify(pacientes);
    localStorage.setItem("pacientes", pacientesJSON);

    let titulo = "¡Registro exitoso!";
    let message = `<p>Se registró el alta del paciente ${documento}.</p>`;
    btnModalAccept.addEventListener("click", ()=>{modal.classList.replace("show", "hide")});
    mostrarModal(titulo, message, true, true, false, true, true);
    setTimeout(()=>{location.href = "../index.html"}, 3000);
}

function clickBorrar(){
    inputApellido.focus();
    limpiarCamposRegistro();
}

//Handlers
pagina.addEventListener("DOMContentLoaded", ()=>{inputApellido.focus()});
passwordEyeIcon1.addEventListener("click", togglePasswordVisibility);
passwordEyeIcon2.addEventListener("click", togglePasswordVisibility);
inputEmail.addEventListener("input", checkMailFormat);
inputEmailConfirm.addEventListener("input", compararEmails);
inputPassword.addEventListener("input", showPasswordStrenght);
inputPasswordConfirm.addEventListener("input", compararPassword);
btnRegistrar.addEventListener("click", clickRegistro);
btnBorrar.addEventListener("click", clickBorrar);
btnCancelar.addEventListener("click", ()=>{location.href ="../index.html"});