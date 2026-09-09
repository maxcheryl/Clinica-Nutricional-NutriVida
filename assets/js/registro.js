// ==================== FORMULARIO DE REGISTRO ====================
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formCrearCuenta");
    const mensajeRegistro = document.getElementById("mensajeRegistro");
    const mensajeContrasena = document.getElementById("mensajeContrasena");

    function mostrarError(mensaje) {
        mensajeRegistro.textContent = mensaje;
        mensajeRegistro.classList.remove("d-none");
        mensajeRegistro.classList.remove("alert-success");
        mensajeRegistro.classList.add("alert-danger");
    }

    function mostrarExito(mensaje) {
        mensajeRegistro.textContent = mensaje;
        mensajeRegistro.classList.remove("d-none");
        mensajeRegistro.classList.remove("alert-danger");
        mensajeRegistro.classList.add("alert-success");
    }

    function contrasenaError(mensaje) {
        mensajeContrasena.textContent = mensaje;
        mensajeContrasena.classList.remove("d-none");
    }

    function contrasenaExito() {
        mensajeContrasena.classList.add("d-none");
    }

    const hoy = new Date().toISOString().split("T")[0];
    document.getElementById("fechaNacimiento").max = hoy;

    function validarContrasena(contrasena) {
        return /.{8,}/.test(contrasena) &&
               /[A-Z]/.test(contrasena) &&
               /[a-z]/.test(contrasena) &&
               /[0-9]/.test(contrasena);
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        mensajeRegistro.classList.add("d-none");
        mensajeContrasena.classList.add("d-none");

        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const correo = document.getElementById("email").value;
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;
        const contrasena = document.getElementById("pass").value;
        const confirmarContrasena = document.getElementById("confirmPass").value;
        const genero = document.getElementById("genero").value;
        const region = document.getElementById("region").value;
        const direccion = document.getElementById("direccion").value;
        const aceptaTerminos = document.getElementById("aceptaTerminos").checked;

        if (!nombre || !apellido || !correo || !fechaNacimiento || !contrasena ||
            !confirmarContrasena || !genero || !region || !direccion) {
            mostrarError("Todos los campos son obligatorios");
            return;
        }

        const fechaActual = new Date();
        const fechaIngresada = new Date(fechaNacimiento);
        const edad = (fechaActual - fechaIngresada) / (1000 * 60 * 60 * 24 * 365.25);

        if (contrasena !== confirmarContrasena) {
            contrasenaError("Contraseñas no coinciden");
            return;
        } else {
            contrasenaExito();
        }

        if (!validarContrasena(contrasena)) {
            mostrarError("La contraseña debe contener 8 carácteres, una mayúscula, una minúscula y un número");
            return;
        }

        if (!correo.endsWith("@duocuc.cl")) {
            mostrarError("El dominio del correo debe ser @duocuc.cl");
            return;
        }

        if (edad < 14) {
            mostrarError("El registro es solo para personas mayores a 14 años");
            return;
        }

        if (!aceptaTerminos) {
            mostrarError("Debes aceptar los términos y condiciones para registrarte");
            return;
        }

        if (buscarUsuarioPorCorreo(correo)) {
            mostrarError("El correo ya se encuentra registrado");
            return;
        }

        const nuevoUsuario = {
            id: crypto.randomUUID(),
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            fechaNacimiento: fechaNacimiento,
            contrasena: contrasena,
            genero: genero,
            region: region,
            direccion: direccion
        };

        mostrarExito("Registro realizado con éxito");
        agregarUsuario(nuevoUsuario);
        formulario.reset();
    });

    actualizarBadgeCarrito();
    actualizarNavbar();
});
