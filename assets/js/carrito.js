function renderCarrito() {
    const container = document.getElementById("carrito-container");
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        container.innerHTML = `
            <div class="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-3">
                <div class="mb-3">
                    <div class="bg-success-subtle text-success rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                        <i class="bi bi-cart3 fs-1"></i>
                    </div>
                </div>
                <h3 class="fw-bold text-dark mb-2">Tu carrito de reserva está vacío</h3>
                <p class="text-muted mx-auto mb-4" style="max-width: 480px;">
                    Aún no has agregado ningún servicio o consulta. Explora nuestras opciones y agenda tu atención nutricional hoy mismo.
                </p>
                <div>
                    <a href="servicios.html" class="btn btn-success rounded-pill px-4 py-2 fw-semibold">
                        <i class="bi bi-grid me-2"></i>Explorar catálogo de servicios
                    </a>
                </div>
            </div>`;
        return;
    }

    const total = carrito.reduce((sum, s) => sum + (s.precio * s.cantidad), 0);
    const totalUnidades = carrito.reduce((sum, s) => sum + s.cantidad, 0);

    container.innerHTML = `
        <div class="row g-4">
            <div class="col-lg-8">
                <div class="card border-0 shadow-sm rounded-4 bg-white overflow-hidden mb-3">
                    <div class="card-header bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-dark">
                            <i class="bi bi-calendar2-check text-success me-2"></i>Servicios seleccionados (${carrito.length})
                        </span>
                        <button class="btn btn-sm text-danger text-decoration-none fw-semibold p-0" onclick="mostrarModalVaciar()" title="Vaciar todo el carrito">
                            <i class="bi bi-trash3 me-1"></i>Vaciar carrito
                        </button>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table align-middle mb-0">
                                <thead class="table-light text-muted small text-uppercase">
                                    <tr>
                                        <th class="ps-4 py-3" style="min-width: 250px;">Servicio</th>
                                        <th class="py-3 text-center" style="min-width: 140px;">Cantidad</th>
                                        <th class="py-3 text-end" style="min-width: 120px;">Subtotal</th>
                                        <th class="pe-4 py-3 text-end" style="width: 50px;"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${carrito.map(servicio => `
                                        <tr class="border-bottom">
                                            <td class="ps-4 py-3">
                                                <div class="d-flex align-items-center gap-3">
                                                    <div class="bg-light rounded-3 text-success d-none d-sm-flex align-items-center justify-content-center" style="width: 44px; height: 44px; flex-shrink: 0;">
                                                        <i class="bi ${getTipoIcon(servicio.tipo)} fs-5"></i>
                                                    </div>
                                                    <div>
                                                        <a href="detalle.html?id=${servicio.codigo}" class="text-decoration-none text-dark fw-bold d-block mb-1">
                                                            ${servicio.nombre}
                                                        </a>
                                                        <div class="d-flex flex-wrap gap-2 align-items-center">
                                                            <span class="badge ${getBadgeClass(servicio.tipo)} rounded-pill">${servicio.tipo}</span>
                                                            <span class="text-muted small"><i class="bi bi-clock me-1"></i>${servicio.duracion}</span>
                                                            <span class="text-muted small">•</span>
                                                            <span class="text-muted small">${formatPrecio(servicio.precio)} c/u</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="py-3 text-center">
                                                <div class="d-inline-flex align-items-center bg-light border rounded-pill px-2 py-1">
                                                    <button class="btn btn-sm btn-link text-dark p-0 px-2 text-decoration-none" onclick="reducirDesdeCarrito('${servicio.codigo}')" title="Disminuir cantidad" style="font-size: 1rem; line-height: 1;">
                                                        <i class="bi bi-dash-lg"></i>
                                                    </button>
                                                    <span class="fw-bold px-2 text-dark" style="min-width: 24px; text-align: center;">${servicio.cantidad}</span>
                                                    ${obtenerCupoDisponible(servicio.codigo) > 0
                                                        ? `<button class="btn btn-sm btn-link text-success p-0 px-2 text-decoration-none" onclick="agregarDesdeCarrito('${servicio.codigo}')" title="Aumentar cantidad" style="font-size: 1rem; line-height: 1;"><i class="bi bi-plus-lg"></i></button>`
                                                        : `<button class="btn btn-sm btn-link text-muted p-0 px-2 text-decoration-none" disabled title="Sin cupos disponibles" style="font-size: 1rem; line-height: 1;"><i class="bi bi-plus-lg"></i></button>`
                                                    }
                                                </div>
                                                ${obtenerCupoDisponible(servicio.codigo) <= 2 && obtenerCupoDisponible(servicio.codigo) > 0
                                                    ? `<div class="text-warning small mt-1" style="font-size: 0.72rem;">¡Últimos ${obtenerCupoDisponible(servicio.codigo)} cupos!</div>`
                                                    : ''}
                                            </td>
                                            <td class="py-3 text-end">
                                                <span class="fw-bold text-dark fs-6">${formatPrecio(servicio.precio * servicio.cantidad)}</span>
                                            </td>
                                            <td class="pe-4 py-3 text-end">
                                                <button class="btn btn-sm btn-outline-danger border-0 rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 32px; height: 32px;" onclick="eliminarDelCarritoCompleto('${servicio.codigo}')" title="Eliminar servicio">
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    `).join("")}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-between align-items-center mt-3">
                    <a href="servicios.html" class="btn btn-outline-secondary rounded-pill px-4">
                        <i class="bi bi-arrow-left me-2"></i>Agregar más servicios
                    </a>
                    <span class="text-muted small">
                        <i class="bi bi-info-circle me-1"></i>Precios en pesos chilenos (CLP)
                    </span>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="card border-0 shadow-sm rounded-4 bg-white p-4 position-sticky" style="top: 95px;">
                    <h5 class="fw-bold text-dark mb-3">Resumen de reserva</h5>
                    
                    <div class="d-flex justify-content-between text-muted mb-2">
                        <span>Servicios distintos</span>
                        <span class="fw-semibold text-dark">${serviciosEnCarrito()}</span>
                    </div>
                    <div class="d-flex justify-content-between text-muted mb-3">
                        <span>Total sesiones / cupos</span>
                        <span class="fw-semibold text-dark">${totalUnidades}</span>
                    </div>

                    <hr class="my-3 text-secondary opacity-25">

                    <div class="d-flex justify-content-between align-items-baseline mb-4">
                        <div>
                            <span class="text-muted small d-block">Total estimado</span>
                            <span class="fw-bold fs-3 text-success">${formatPrecio(total)}</span>
                        </div>
                        <span class="badge bg-light text-muted border">CLP</span>
                    </div>

                    <button class="btn btn-success w-100 rounded-pill fw-medium py-2 mb-2" onclick="confirmarReserva()">
                        <i class="bi bi-calendar-check me-2"></i>Confirmar reserva(s)
                    </button>

                    <a href="servicios.html" class="btn btn-light border w-100 rounded-pill fw-medium py-2 mb-3 text-muted">
                        <i class="bi bi-plus-circle me-1"></i>Ver otros servicios
                    </a>

                    <div class="p-3 bg-light rounded-3 text-muted small mt-2">
                        <div class="d-flex align-items-start gap-2">
                            <i class="bi bi-shield-check text-success fs-5 flex-shrink-0 mt-n1"></i>
                            <div>
                                <strong class="d-block text-dark mb-1">Reserva garantizada</strong>
                                <p class="mb-0 text-muted" style="font-size: 0.8rem; line-height: 1.4;">
                                    Atención personalizada con nutricionistas certificados. Confirmación inmediata tras agendar.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function agregarDesdeCarrito(codigo) {
    const disponibles = obtenerCupoDisponible(codigo);
    if (disponibles <= 0) {
        showToast("No hay más cupos disponibles", "warning");
        return;
    }
    const servicio = servicios.find(s => s.codigo === codigo);
    agregarAlCarrito(servicio);
    renderCarrito();
    actualizarBadgeCarrito();
}

function reducirDesdeCarrito(codigo) {
    reducirCantidad(codigo);
    renderCarrito();
    actualizarBadgeCarrito();
}

function eliminarDelCarritoCompleto(codigo) {
    eliminarDelCarrito(codigo);
    renderCarrito();
    actualizarBadgeCarrito();
}

function confirmarReserva() {
    const usuario = obtenerUsuarioLogueado();
    if (!usuario) {
        const modal = new bootstrap.Modal(document.getElementById("modalLoginRequerido"));
        modal.show();
        return;
    }

    vaciarCarrito();
    actualizarBadgeCarrito();
    renderCarrito();

    const modal = new bootstrap.Modal(document.getElementById("modalExito"));
    modal.show();
}

function mostrarModalVaciar() {
    const modal = new bootstrap.Modal(document.getElementById("modalVaciar"));
    modal.show();
}

function confirmarVaciar() {
    vaciarCarrito();
    actualizarBadgeCarrito();
    bootstrap.Modal.getOrCreateInstance(document.getElementById("modalVaciar")).hide();
    renderCarrito();
}

document.addEventListener("DOMContentLoaded", function () {
    renderCarrito();
    actualizarBadgeCarrito();
    actualizarNavbar();
});
