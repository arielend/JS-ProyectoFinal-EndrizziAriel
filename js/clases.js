class Paciente {
    constructor (id, apellido, nombres, documento, edad, sexo, email, password){
        this.id = id,
        this.apellido = apellido,
        this.nombres = nombres,
        this.documento = documento,
        this.edad = edad,
        this.sexo = sexo,
        this.email = email,
        this.password = password
    }
}

class Especialidad{
    constructor(id, codigo, nombreEspecialidad){
        this.id = id;
        this.codigo = codigo,
        this.nombreEspecialidad = nombreEspecialidad
    }
}

class Medico{
    constructor(id, apellido, nombres, matricula, idEspecialidad){
        this.id = id,
        this.apellido = apellido,
        this.nombres = nombres,
        this.matricula = matricula,
        this.idEspecialidad = idEspecialidad
    }
}

class Turno{
    constructor(id, idPaciente, idEspecialidad, idMedico, fechaTurno, horaTurno){
        this.id = id;
        this.idPaciente = idPaciente,
        this.idEspecialidad = idEspecialidad,
        this.idMedico = idMedico,
        this.fechaTurno = fechaTurno,
        this.horaTurno = horaTurno,
        this.estado = "Pendiente";
        this.cancelado = false
    }

    cancelar() {
        this.cancelado = true;
        this.estado = "Cancelado";
    }
}