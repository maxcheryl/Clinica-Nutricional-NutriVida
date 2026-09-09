// ==================== PÁGINA PRINCIPAL ====================
document.addEventListener("DOMContentLoaded", function () {

    actualizarNavbar();
    actualizarBadgeCarrito();

    // ==================== FORMULARIO DE CONTACTO ====================
    const contactForm = document.getElementById("contactForm");
    const mensajeContacto = document.getElementById("mensajeContacto");

    function mostrarErrorContacto(mensaje) {
        mensajeContacto.textContent = mensaje;
        mensajeContacto.classList.remove("d-none");
        mensajeContacto.classList.remove("alert-success");
        mensajeContacto.classList.add("alert-danger");
    }

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            mensajeContacto.classList.add("d-none");

            const nombre = document.getElementById("nombre").value.trim();
            const email = document.getElementById("email").value.trim();
            const telefono = document.getElementById("telefono").value.trim();
            const mensaje = document.getElementById("mensaje").value.trim();

            if (!nombre || !email || !mensaje) {
                mostrarErrorContacto("Nombre, correo y mensaje son obligatorios");
                return;
            }

            if (nombre.length < 2) {
                mostrarErrorContacto("El nombre debe tener al menos 2 caracteres");
                return;
            }

            if (!email.endsWith("@duocuc.cl")) {
                mostrarErrorContacto("El dominio del correo debe ser @duocuc.cl");
                return;
            }

            const modal = new bootstrap.Modal(document.getElementById("modalContactoExito"));
            modal.show();
            contactForm.reset();
        });
    }
});
