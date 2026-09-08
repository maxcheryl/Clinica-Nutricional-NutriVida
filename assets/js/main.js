document.addEventListener('DOMContentLoaded', function () {

    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

    const botonIniciarSesion = document.getElementById("botonIniciarSesion");
    const infoUsuario = document.getElementById("infoUsuario");
    const botonCerrarSesion = document.getElementById("botonCerrarSesion");
    const nombreUsuario = document.getElementById("nombreUsuario");
    const btnCerrarSesion = document.getElementById("btnCerrarSesion")

    if (usuarioLogueado) {
        // Usuario logueado → mostrar nombre y cerrar sesión
        if (botonIniciarSesion) botonIniciarSesion.classList.add("d-none");
        if (infoUsuario) infoUsuario.classList.remove("d-none");
        if (botonCerrarSesion) botonCerrarSesion.classList.remove("d-none");
        if (nombreUsuario) nombreUsuario.textContent = `Hola, ${usuarioLogueado.nombre}`;
    } else {
        // No hay sesión → mostrar "Iniciar Sesión"
        if (botonIniciarSesion) botonIniciarSesion.classList.remove("d-none");
        if (infoUsuario) infoUsuario.classList.add("d-none");
        if (botonCerrarSesion) botonCerrarSesion.classList.add("d-none");
    }

    if (botonCerrarSesion){
        btnCerrarSesion.addEventListener("click", function(e){
            e.preventDefault();
            cerrarSesion()
        })
    }

    // BADGE CARRITO
    if (typeof actualizarBadgeCarrito === "function") {
        actualizarBadgeCarrito();
    }

    // NAVBAR
    if (typeof actualizarNavbar === "function") {
        actualizarNavbar();
    }

    // FORMULARIO DE CONTACTO
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            if (!nombre || !email || !mensaje) {
                alert('Por favor completa todos los campos obligatorios.');
                return;
            }

            alert('Mensaje enviado correctamente. ¡Gracias ' + nombre + '!'); //reemplazar por un alert decente de bootstrap
            contactForm.reset();
        });
    }
});
