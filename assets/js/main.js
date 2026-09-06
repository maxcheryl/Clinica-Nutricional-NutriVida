document.addEventListener('DOMContentLoaded', function () {

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

const CLAVE_STORAGE = ""
