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

    // Validaciones básicas
    if (!correo || !contrasena) {
        mostrarErrorLogin("Debes completar todos los campos");
        return;
    }

    if (!correo.endsWith("@duocuc.cl")) {
        mostrarErrorLogin("El correo debe ser del dominio @duocuc.cl");
        return;
    }

    // Buscar el usuario
    const usuario = buscarUsuarioPorCorreo(correo);

    if (!usuario) {
        mostrarErrorLogin("Correo o contraseña incorrectos");
        return;
    }

    // Verificar contraseña
    if (usuario.contrasena !== contrasena) {
        mostrarErrorLogin("Correo o contraseña incorrectos");
        return;
    }

    // ===== INICIAR SESIÓN =====
    // Guardamos solo los datos necesarios
    const usuarioSesion = {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        genero: usuario.genero,
        region: usuario.region
    };

    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioSesion));

    // Redirigir a la página principal
    window.location.href = "/index.html"; 
});

actualizarBadgeCarrito();
actualizarNavbar();