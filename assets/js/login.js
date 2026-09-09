// ==================== FORMULARIO DE LOGIN ====================
document.addEventListener("DOMContentLoaded", function () {
    const formLogin = document.getElementById("formIniciarSesion");
    const mensajeLogin = document.getElementById("mensajeLogin");

    function mostrarErrorLogin(mensaje) {
        mensajeLogin.textContent = mensaje;
        mensajeLogin.classList.remove("d-none", "alert-success");
        mensajeLogin.classList.add("alert-danger");
    }

    formLogin.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const correo = document.getElementById("correo").value.trim();
        const contrasena = document.getElementById("inputPass").value;

        if (!correo || !contrasena) {
            mostrarErrorLogin("Debes completar todos los campos");
            return;
        }

        if (!correo.endsWith("@duocuc.cl")) {
            mostrarErrorLogin("El correo debe ser del dominio @duocuc.cl");
            return;
        }

        if (estaBloqueado(correo)) {
            mostrarErrorLogin("Cuenta bloqueada por múltiples intentos fallidos. Contacte al administrador.");
            return;
        }

        const usuario = buscarUsuarioPorCorreo(correo);

        if (!usuario) {
            incrementarIntentos(correo);
            const restantes = obtenerIntentosRestantes(correo);
            mostrarErrorLogin(`Correo o contraseña incorrectos. Intentos restantes: ${restantes}`);
            return;
        }

        if (usuario.contrasena !== contrasena) {
            incrementarIntentos(correo);
            const restantes = obtenerIntentosRestantes(correo);
            mostrarErrorLogin(`Correo o contraseña incorrectos. Intentos restantes: ${restantes}`);
            return;
        }

        resetearIntentos(correo);

        const usuarioSesion = {
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo,
            genero: usuario.genero,
            region: usuario.region
        };

        localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioSesion));
        window.location.href = "../index.html";
    });

    actualizarBadgeCarrito();
    actualizarNavbar();
});