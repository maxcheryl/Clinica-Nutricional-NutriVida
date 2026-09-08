function renderCarrito() {
    const container = document.getElementById("carrito-container");
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-cart3 text-muted" style="font-size: 4rem;"></i>
                <h3 class="mt-3">Tu carrito está vacío</h3>
                <p class="text-muted">Agrega un servicio desde nuestro catálogo para comenzar.</p>
                <a href="servicios.html" class="btn btn-success mt-2">
                    <i class="bi bi-arrow-left me-1"></i>Ver servicios
                </a>
            </div>`;
        return;
    }

    const total = carrito.reduce((sum, s) => sum + (s.precio * s.cantidad), 0);
    const totalUnidades = carrito.reduce((sum, s) => sum + s.cantidad, 0);

    container.innerHTML = `
        <div class="row g-4">
            <div class="col-lg-8">
                <div class="card card-servicio">
                    <div class="card-body p-4">
                        <div class="table-responsive">
                            <table class="table align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>Servicio</th>
                                        <th>Tipo</th>
                                        <th class="text-center">Cantidad</th>
                                        <th class="text-end">Subtotal</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${carrito.map(servicio => `
                                        <tr>
                                            <td>
                                                <strong>${servicio.nombre}</strong>
                                                <br><small class="text-muted">${servicio.descripcion.substring(0, 60)}...</small>
                                            </td>
                                            <td><span class="badge ${getBadgeClass(servicio.tipo)}">${servicio.tipo}</span></td>
                                            <td class="text-center">
                                                <div class="d-flex align-items-center justify-content-center gap-1">
                                                    <button class="btn btn-sm btn-outline-secondary" onclick="reducirDesdeCarrito('${servicio.codigo}')" title="Reducir">−</button>
                                                    <span class="mx-2 fw-bold">${servicio.cantidad}</span>
                                                    ${obtenerCupoDisponible(servicio.codigo) > 0
                                                        ? `<button class="btn btn-sm btn-outline-secondary" onclick="agregarDesdeCarrito('${servicio.codigo}')" title="Aumentar">+</button>`
                                                        : `<button class="btn btn-sm btn-outline-secondary" disabled title="Sin cupos disponibles">+</button>`
                                                    }
                                                </div>
                                            </td>
                                            <td class="text-end"><strong>${formatPrecio(servicio.precio * servicio.cantidad)}</strong></td>
                                            <td class="text-end">
                                                <button class="btn btn-sm btn-outline-danger" onclick="eliminarDelCarritoCompleto('${servicio.codigo}')" title="Eliminar">
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
            </div>

            <div class="col-lg-4">
                <div class="card card-servicio">
                    <div class="card-body p-4">
                        <h5 class="mb-3">Resumen</h5>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Servicios (${serviciosEnCarrito()})</span>
                            <span>${totalUnidades} unidades</span>
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between mb-3">
                            <strong style="font-size: 1.1rem;">Total</strong>
                            <strong class="card-price" style="font-size: 1.3rem;">${formatPrecio(total)}</strong>
                        </div>

                        <button class="btn btn-success w-100 mb-2" onclick="confirmarReserva()">
                            <i class="bi bi-calendar-check me-1"></i>Confirmar reserva
                        </button>
                        <button class="btn btn-outline-danger w-100" onclick="mostrarModalVaciar()">
                            <i class="bi bi-trash me-1"></i>Vaciar carrito
                        </button>
                    </div>
                </div>

                <a href="servicios.html" class="btn btn-outline-success w-100 mt-3">
                    <i class="bi bi-plus me-1"></i>Agregar más servicios
                </a>
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
    bootstrap.Modal.getInstance(document.getElementById("modalVaciar")).hide();
    renderCarrito();
}

document.addEventListener("DOMContentLoaded", function () {
    renderCarrito();
    actualizarBadgeCarrito();
    actualizarNavbar();
});
