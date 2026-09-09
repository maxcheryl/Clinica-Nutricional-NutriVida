// ==================== PÁGINA DE DETALLE ====================
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const codigo = params.get("id");
    const container = document.getElementById("detalle-container");

    if (!codigo) {
        container.innerHTML = `
            <div class="text-center py-5">
                <div class="p-5 bg-white rounded-4 shadow-sm border d-inline-block" style="max-width: 500px;">
                    <i class="bi bi-exclamation-circle text-muted" style="font-size: 3rem;"></i>
                    <h3 class="fw-bold mt-3 text-dark">Servicio no especificado</h3>
                    <p class="text-muted mb-4">No se ha seleccionado ningún servicio para ver su detalle.</p>
                    <a href="servicios.html" class="btn btn-success rounded-pill px-4">
                        <i class="bi bi-arrow-left me-1"></i>Volver a servicios
                    </a>
                </div>
            </div>`;
        return;
    }

    const servicio = servicios.find(s => s.codigo === codigo);

    if (!servicio) {
        container.innerHTML = `
            <div class="text-center py-5">
                <div class="p-5 bg-white rounded-4 shadow-sm border d-inline-block" style="max-width: 500px;">
                    <i class="bi bi-search text-muted" style="font-size: 3rem;"></i>
                    <h3 class="fw-bold mt-3 text-dark">Servicio no encontrado</h3>
                    <p class="text-muted mb-4">El servicio con código "<strong>${codigo}</strong>" no existe en nuestro catálogo.</p>
                    <a href="servicios.html" class="btn btn-success rounded-pill px-4">
                        <i class="bi bi-arrow-left me-1"></i>Volver a servicios
                    </a>
                </div>
            </div>`;
        return;
    }

    document.title = servicio.nombre + " - Clínica NutriVida";

    const cupos = obtenerCupoDisponible(servicio.codigo);

    const imagenesTipo = {
        "Consulta": "../assets/img/consulta.png",
        "Plan especializado": "../assets/img/plan.png",
        "Evaluación": "../assets/img/evaluacion.png",
        "Taller grupal": "../assets/img/taller.png"
    };
    const imagenTipo = imagenesTipo[servicio.tipo] || null;

    const queIncluyePorTipo = {
        "Consulta": [
            "Evaluación antropométrica y anamnesis clínica completa.",
            "Diagnóstico del estado nutricional y análisis de requerimientos.",
            "Diseño de pauta alimentaria personalizada con metas progresivas.",
            "Recomendaciones prácticas para compras, porciones y hábitos diarios."
        ],
        "Plan especializado": [
            "Primera consulta diagnóstica + diseño de plan a tu medida.",
            "Sesiones de control periódico y medición continua de indicadores.",
            "Ajustes mensuales según tus avances, rutina y evolución metabólica.",
            "Acompañamiento continuo y resolución de dudas durante todo el plan."
        ],
        "Evaluación": [
            "Medición de parámetros corporales con instrumental especializado.",
            "Análisis de composición: masa grasa, masa muscular, agua y metabolismo basal.",
            "Entrega de informe claro y comprensible con tus resultados.",
            "Orientación inicial sobre los siguientes pasos recomendados para tu salud."
        ],
        "Taller grupal": [
            "Sesión interactiva guiada por nutricionista especialista.",
            "Material educativo y recetarios o pautas descargables.",
            "Espacio abierto para preguntas, dinámicas y resolución de dudas.",
            "Degustación o preparaciones según la temática del taller."
        ]
    };

    const listaIncluye = queIncluyePorTipo[servicio.tipo] || [
        "Atención profesional personalizada por nutricionista certificado.",
        "Guía alimentaria y material de apoyo adaptado a tus necesidades.",
        "Seguimiento y orientación para alcanzar tus objetivos de salud."
    ];

    container.innerHTML = `
        <!-- NAVEGACIÓN SUPERIOR Y RETORNO -->
        <div class="mb-4 d-flex flex-wrap align-items-center justify-content-between gap-2">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><a href="../index.html" class="text-decoration-none text-muted"><i class="bi bi-house-door me-1"></i>Inicio</a></li>
                    <li class="breadcrumb-item"><a href="servicios.html" class="text-decoration-none text-muted">Servicios</a></li>
                    <li class="breadcrumb-item active text-success fw-semibold" aria-current="page">${servicio.nombre}</li>
                </ol>
            </nav>
            <a href="servicios.html" class="btn btn-outline-secondary btn-sm rounded-pill px-3">
                <i class="bi bi-arrow-left me-1"></i>Volver a servicios
            </a>
        </div>

        <div class="row g-4 align-items-start">
            <!-- COLUMNA PRINCIPAL (IZQUIERDA) -->
            <div class="col-lg-7 col-xl-8">
                <!-- INSIGNIAS DE ESTADO -->
                <div class="d-flex flex-wrap align-items-center gap-2 mb-3">
                    <span class="badge ${getBadgeClass(servicio.tipo)} rounded-pill px-3 py-1">
                        <i class="bi ${getTipoIcon(servicio.tipo)} me-1"></i>${servicio.tipo}
                    </span>
                    <span class="badge ${cupos > 0 ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-danger-subtle text-danger border border-danger-subtle'} rounded-pill px-3 py-1">
                        <i class="bi ${cupos > 0 ? 'bi-check-circle' : 'bi-x-circle'} me-1"></i>${cupos > 0 ? cupos + ' cupos disponibles' : 'Sin cupos disponibles'}
                    </span>
                </div>

                <!-- TÍTULO Y DESCRIPCIÓN -->
                <h1 class="fw-bold text-dark mb-3" style="font-family: 'Playfair Display', serif; font-size: 2.2rem;">
                    ${servicio.nombre}
                </h1>
                <p class="lead text-muted mb-4 fs-6">
                    ${servicio.descripcion}
                </p>

                <!-- IMAGEN ILUSTRATIVA DEL SERVICIO -->
                ${imagenTipo ? `
                    <div class="detalle-img-frame mb-4 text-center p-3 shadow-sm">
                        <img src="${imagenTipo}" alt="${servicio.tipo}" class="img-fluid rounded-3" style="max-height: 280px; width: auto; object-fit: contain;">
                    </div>
                ` : ''}

                <!-- ¿QUÉ INCLUYE EL SERVICIO? -->
                <div class="card card-detalle border-0 shadow-sm rounded-4 p-4 mb-4">
                    <div class="d-flex align-items-center gap-2 mb-3">
                        <span class="d-inline-flex align-items-center justify-content-center bg-success-subtle text-success rounded-circle" style="width: 36px; height: 36px;">
                            <i class="bi bi-check2-all fs-5"></i>
                        </span>
                        <h5 class="fw-bold mb-0 text-dark">¿Qué incluye este servicio?</h5>
                    </div>
                    <ul class="list-unstyled mb-0 d-flex flex-column gap-2">
                        ${listaIncluye.map(item => `
                            <li class="d-flex align-items-start gap-2 small text-secondary">
                                <i class="bi bi-check-circle-fill text-success mt-1 flex-shrink-0"></i>
                                <span>${item}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <!-- GARANTÍA / PERFIL PROFESIONAL -->
                <div class="card border-0 bg-white shadow-sm rounded-4 p-3 mb-4">
                    <div class="d-flex align-items-center gap-3">
                        <div class="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center" style="width: 44px; height: 44px; flex-shrink: 0;">
                            <i class="bi bi-person-badge fs-4"></i>
                        </div>
                        <div class="small">
                            <strong class="text-dark d-block">Atención profesional certificada</strong>
                            <span class="text-muted">Todos nuestros servicios son realizados por nutricionistas titulados y colegiados, con sólida experiencia clínica.</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SIDEBAR DE RESERVA (DERECHA - STICKY) -->
            <div class="col-lg-5 col-xl-4">
                <div class="card card-detalle border-0 shadow-sm rounded-4 p-4 position-sticky" style="top: 90px;">
                    <span class="text-uppercase text-muted small fw-bold mb-1 d-block">Valor del servicio</span>
                    <div class="d-flex align-items-baseline mb-3">
                        <span class="fs-2 fw-bold text-dark">${formatPrecio(servicio.precio)}</span>
                        <span class="text-muted small ms-2">CLP</span>
                    </div>

                    <hr class="my-3 text-secondary opacity-25">

                    <h6 class="fw-bold text-dark mb-3">Detalles de la sesión</h6>
                    <div class="d-flex flex-column gap-3 mb-4">
                        <div class="d-flex align-items-center justify-content-between">
                            <span class="text-muted small"><i class="bi bi-tag text-success me-2"></i>Código</span>
                            <strong class="text-dark small">${servicio.codigo}</strong>
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                            <span class="text-muted small"><i class="bi bi-clock text-success me-2"></i>Duración</span>
                            <strong class="text-dark small">${servicio.duracion && servicio.duracion !== '—' ? servicio.duracion : 'Personalizada'}</strong>
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                            <span class="text-muted small"><i class="bi bi-geo-alt text-success me-2"></i>Modalidad</span>
                            <strong class="text-dark small">${servicio.modalidad}</strong>
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                            <span class="text-muted small"><i class="bi bi-people text-success me-2"></i>Disponibilidad</span>
                            <span class="badge ${cupos > 0 ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} rounded-pill small">
                                ${cupos > 0 ? cupos + ' cupos' : 'Agotado'}
                            </span>
                        </div>
                    </div>

                    <!-- BOTÓN DE RESERVA -->
                    ${cupos > 0 ? `
                        <button class="btn btn-success btn-lg w-100 rounded-pill shadow-sm mb-3 d-flex align-items-center justify-content-center gap-2" data-codigo="${servicio.codigo}" onclick="agregarPorCodigo(this)">
                            <i class="bi bi-cart2 fs-5"></i>
                            <span>Reservar servicio</span>
                        </button>
                    ` : `
                        <button class="btn btn-secondary btn-lg w-100 rounded-pill mb-3 disabled" disabled>
                            <i class="bi bi-x-circle me-2"></i>Sin cupos disponibles
                        </button>
                    `}

                    <!-- NOTAS DE RESERVA Y CONFIANZA -->
                    <div class="bg-light rounded-3 p-3 mt-1">
                        <div class="d-flex flex-column gap-2" style="font-size: 0.82rem;">
                            <div class="d-flex align-items-start gap-2 text-muted">
                                <i class="bi bi-shield-check text-success mt-1 flex-shrink-0"></i>
                                <span>Atención profesional garantizada y confidencial.</span>
                            </div>
                            <div class="d-flex align-items-start gap-2 text-muted">
                                <i class="bi bi-check2-circle text-success mt-1 flex-shrink-0"></i>
                                <span>Confirmación y reserva inmediata de tu cupo.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    actualizarBadgeCarrito();
    actualizarNavbar();
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

