//Mostrar Modal
function mostrarModal(titulo, msjHTML, deshabilitarBtnClose, ocultarBtnConfirm, ocultarBtnAccept, ocultarBtnReset, ocultarBtnCancel){
    modalTitle.innerText = titulo;
    modalMessage.innerHTML = msjHTML;
    
    deshabilitarBtnClose && btnModalClose.setAttribute("disabled", "true");
    ocultarBtnConfirm && btnModalConfirm.classList.add("hide");
    ocultarBtnAccept && btnModalAccept.classList.add("hide");
    ocultarBtnReset && btnModalReset.classList.add("hide");
    ocultarBtnCancel && btnModalCancel.classList.add("hide");
    modal.classList.replace("hide", "show");
}