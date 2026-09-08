document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const codigo = params.get("id");
    const container = document.getElementById("detalle-container");

    if (!codigo) {
        container.innerHTML = `
            <div class="text-center py-5">
                <h2 class="section-title">Servicio no encontrado</h2>
                <p class="section-subtitle">No se especificó un servicio.</p>
                <a href="servicios.html" class="btn btn-success mt-3">Volver a servicios</a>
            </div>`;
        return;
    }

    const servicio = servicios.find(s => s.codigo === codigo);

    if (!servicio) {
        container.innerHTML = `
            <div class="text-center py-5">
                <h2 class="section-title">Servicio no encontrado</h2>
                <p class="section-subtitle">El servicio "${codigo}" no existe en nuestro catálogo.</p>
                <a href="servicios.html" class="btn btn-success mt-3">Volver a servicios</a>
            </div>`;
        return;
    }

    document.title = servicio.nombre + " - Clínica NutriVida";

    const cupos = obtenerCupoDisponible(servicio.codigo);

    container.innerHTML = `
        <a href="servicios.html" class="btn btn-outline-success mb-4">
            <i class="bi bi-arrow-left me-1"></i>Volver a servicios
        </a>

        <div class="row g-5 align-items-start">
            <div class="col-lg-7">
                <div class="d-flex align-items-center gap-2 mb-3">
                    <span class="badge ${getBadgeClass(servicio.tipo)}">${servicio.tipo}</span>
                    <span class="badge ${cupos > 0 ? 'bg-light text-success' : 'bg-danger'}">
                        ${cupos > 0 ? cupos + ' cupos disponibles' : 'Sin cupos'}
                    </span>
                </div>
                <h2 class="section-title text-start mb-3">${servicio.nombre}</h2>
                <p class="lead mb-4">${servicio.descripcion}</p>

                <div class="card card-servicio mt-4">
                    <div class="card-body p-4">
                        <h5 class="mb-3">¿Qué incluye?</h5>
                        <p class="text-muted mb-0">Este servicio es parte de nuestro catálogo profesional de nutrición. Contáctanos para más detalles sobre el alcance y los beneficios específicos.</p>
                    </div>
                </div>
            </div>

            <div class="col-lg-5">
                <div class="card card-servicio">
                    <div class="card-body p-4">
                        <h4 class="mb-4">Información del servicio</h4>

                        <div class="d-flex align-items-center mb-3">
                            <div class="me-3">
                                <i class="bi bi-tag text-success" style="font-size: 1.5rem;"></i>
                            </div>
                            <div>
                                <strong>Código</strong>
                                <p class="mb-0 text-muted">${servicio.codigo}</p>
                            </div>
                        </div>

                        <div class="d-flex align-items-center mb-3">
                            <div class="me-3">
                                <i class="bi bi-clock text-success" style="font-size: 1.5rem;"></i>
                            </div>
                            <div>
                                <strong>Duración</strong>
                                <p class="mb-0 text-muted">${servicio.duracion}</p>
                            </div>
                        </div>

                        <div class="d-flex align-items-center mb-3">
                            <div class="me-3">
                                <i class="bi bi-geo-alt text-success" style="font-size: 1.5rem;"></i>
                            </div>
                            <div>
                                <strong>Modalidad</strong>
                                <p class="mb-0 text-muted">${servicio.modalidad}</p>
                            </div>
                        </div>

                        <div class="d-flex align-items-center mb-3">
                            <div class="me-3">
                                <i class="bi bi-people text-success" style="font-size: 1.5rem;"></i>
                            </div>
                            <div>
                                <strong>Cupos</strong>
                                <p class="mb-0 text-muted">${cupos > 0 ? cupos + ' disponibles' : 'Sin cupos disponibles'}</p>
                            </div>
                        </div>

                        <hr>

                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <strong style="font-size: 1.1rem;">Precio</strong>
                            <span class="card-price" style="font-size: 1.5rem;">${formatPrecio(servicio.precio)}</span>
                        </div>

                        ${cupos > 0
                            ? `<button class="btn btn-success w-100" data-codigo="${servicio.codigo}" onclick="agregarPorCodigo(this)">
                                    <i class="bi bi-cart2 me-2"></i>Reservar
                               </button>`
                            : `<button class="btn btn-secondary w-100" disabled>
                                    <i class="bi bi-cart-x me-2"></i>Sin cupos disponibles
                               </button>`
                        }
                    </div>
                </div>
            </div>
        </div>
    `;
    actualizarBadgeCarrito();
});

function agregarPorCodigo(boton) {
    const codigo = boton.dataset.codigo;
    const servicio = servicios.find(s => s.codigo === codigo);

    const disponibles = obtenerCupoDisponible(codigo);
    if (disponibles <= 0) {
        showToast("No hay cupos disponibles", "danger");
        return;
    }

    agregarAlCarrito(servicio);
    actualizarBadgeCarrito();
    window.location.href = "carrito.html";
}
