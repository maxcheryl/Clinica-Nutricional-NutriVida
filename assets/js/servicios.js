const servicios = [
    // CONSULTAS
    {
        codigo: "CN001",
        tipo: "Consulta",
        nombre: "Primera consulta nutricional",
        duracion: "50 min",
        modalidad: "Presencial",
        precio: 35000,
        cuposIniciales: 5,
        descripcion: "Evaluación inicial: anamnesis, antropometría completa y diseño del primer plan alimenticio."
    },
    {
        codigo: "CN002",
        tipo: "Consulta",
        nombre: "Control nutricional (seguimiento)",
        duracion: "30 min",
        modalidad: "Presencial",
        precio: 25000,
        cuposIniciales: 5,
        descripcion: "Seguimiento mensual: medición de indicadores y ajuste del plan vigente."
    },
    {
        codigo: "CN003",
        tipo: "Consulta",
        nombre: "Control nutricional quincenal",
        duracion: "30 min",
        modalidad: "Presencial",
        precio: 22000,
        cuposIniciales: 5,
        descripcion: "Seguimiento intensivo cada 15 días. Recomendado en los primeros 2 meses."
    },
    {
        codigo: "CN004",
        tipo: "Consulta",
        nombre: "Teleconsulta nutricional",
        duracion: "30 min",
        modalidad: "Online (video)",
        precio: 20000,
        cuposIniciales: 5,
        descripcion: "Consulta de seguimiento vía videollamada. Requiere contar con consulta presencial previa."
    },
    {
        codigo: "CN005",
        tipo: "Consulta",
        nombre: "Consulta de urgencia / reagendada",
        duracion: "30 min",
        modalidad: "Presencial",
        precio: 28000,
        cuposIniciales: 5,
        descripcion: "Para pacientes que requieren atención fuera de su control habitual."
    },
    // PLANES ESPECIALIZADOS
    {
        codigo: "PL001",
        tipo: "Plan especializado",
        nombre: "Plan pérdida de peso (1 mes)",
        duracion: "—",
        modalidad: "Presencial",
        precio: 65000,
        cuposIniciales: 3,
        descripcion: "Incluye primera consulta + 1 control quincenal + plan alimenticio personalizado + seguimiento por WhatsApp."
    },
    {
        codigo: "PL002",
        tipo: "Plan especializado",
        nombre: "Plan pérdida de peso (3 meses)",
        duracion: "—",
        modalidad: "Presencial",
        precio: 170000,
        cuposIniciales: 3,
        descripcion: "Incluye primera consulta + 5 controles + 3 planes mensuales + seguimiento continuo."
    },
    {
        codigo: "PL003",
        tipo: "Plan especializado",
        nombre: "Plan nutrición deportiva (1 mes)",
        duracion: "—",
        modalidad: "Presencial",
        precio: 70000,
        cuposIniciales: 3,
        descripcion: "Para deportistas y personas con actividad física frecuente. Cálculo de requerimientos energéticos y proteicos."
    },
    {
        codigo: "PL004",
        tipo: "Plan especializado",
        nombre: "Plan control diabetes / hipertensión",
        duracion: "—",
        modalidad: "Presencial",
        precio: 75000,
        cuposIniciales: 3,
        descripcion: "Plan adaptado para patologías metabólicas. Coordinación con médico tratante si aplica."
    },
    {
        codigo: "PL005",
        tipo: "Plan especializado",
        nombre: "Plan alimentación vegetariana/vegana",
        duracion: "—",
        modalidad: "Presencial",
        precio: 68000,
        cuposIniciales: 3,
        descripcion: "Diseñado para garantizar aporte adecuado de proteínas, hierro, vitamina B12 y calcio sin productos animales."
    },
    {
        codigo: "PL006",
        tipo: "Plan especializado",
        nombre: "Plan alimentación infantil (2-12 años)",
        duracion: "—",
        modalidad: "Presencial",
        precio: 65000,
        cuposIniciales: 3,
        descripcion: "Evaluación nutricional pediátrica y diseño de plan adaptado a la etapa de desarrollo del niño."
    },
    // EVALUACIONES
    {
        codigo: "EV001",
        tipo: "Evaluación",
        nombre: "Antropometría completa",
        duracion: "20 min",
        modalidad: "Presencial",
        precio: 18000,
        cuposIniciales: 8,
        descripcion: "Peso, talla, IMC, circunferencia de cintura, cadera, brazo y % de grasa corporal con bioimpedanciometría."
    },
    {
        codigo: "EV002",
        tipo: "Evaluación",
        nombre: "Bioimpedanciometría",
        duracion: "15 min",
        modalidad: "Presencial",
        precio: 12000,
        cuposIniciales: 8,
        descripcion: "Medición de composición corporal: masa grasa, masa muscular, agua corporal y edad metabólica."
    },
    {
        codigo: "EV003",
        tipo: "Evaluación",
        nombre: "Encuesta de hábitos alimentarios",
        duracion: "20 min",
        modalidad: "Presencial",
        precio: 10000,
        cuposIniciales: 8,
        descripcion: "Análisis del patrón alimentario actual. Identificación de déficit y excesos nutricionales."
    },
    {
        codigo: "EV004",
        tipo: "Evaluación",
        nombre: "Análisis de exámenes de laboratorio",
        duracion: "20 min",
        modalidad: "Presencial",
        precio: 15000,
        cuposIniciales: 8,
        descripcion: "Interpretación de hemograma, perfil bioquímico y lipídico en contexto nutricional."
    },
    // TALLERES GRUPALES
    {
        codigo: "TG001",
        tipo: "Taller grupal",
        nombre: "Taller de alimentación saludable",
        duracion: "90 min",
        modalidad: "Presencial (grupo)",
        precio: 15000,
        cuposIniciales: 10,
        descripcion: "Máx. 10 personas. Conceptos básicos de alimentación equilibrada y lectura de etiquetas."
    },
    {
        codigo: "TG002",
        tipo: "Taller grupal",
        nombre: "Taller de cocina nutritiva",
        duracion: "120 min",
        modalidad: "Presencial (grupo)",
        precio: 20000,
        cuposIniciales: 8,
        descripcion: "Preparación de recetas saludables. Incluye degustación. Máx. 8 personas."
    },
    {
        codigo: "TG003",
        tipo: "Taller grupal",
        nombre: "Taller nutrición para deportistas",
        duracion: "90 min",
        modalidad: "Presencial (grupo)",
        precio: 18000,
        cuposIniciales: 12,
        descripcion: "Hidratación, nutrición pre y post entrenamiento, suplementación básica. Máx. 12 personas."
    }
];

function getBadgeClass(tipo) {
    const classes = {
        "Consulta": "bg-success text-white",
        "Plan especializado": "bg-primary text-white",
        "Evaluación": "bg-warning text-dark",
        "Taller grupal": "bg-info text-dark"
    };
    return classes[tipo] || "bg-secondary text-white";
}

function getTipoIcon(tipo) {
    const icons = {
        "Consulta": "bi-person-heart",
        "Plan especializado": "bi-journal-medical",
        "Evaluación": "bi-clipboard2-pulse",
        "Taller grupal": "bi-people"
    };
    return icons[tipo] || "bi-tag";
}

let filtroTipoActivo = "todos";
let filtroPrecioMin = 10000;
let filtroPrecioMax = 170000;
let filtroBusqueda = "";

function showToast(mensaje, tipo) {
    const toast = document.getElementById("toast-carrito");
    const body = document.getElementById("toast-carrito-body");
    if (!toast || !body) return;
    toast.className = `toast align-items-center text-bg-${tipo} border-0 shadow-lg`;
    body.textContent = mensaje;
    const bsToast = new bootstrap.Toast(toast, { delay: 2500 });
    bsToast.show();
}

function agregarDesdeCatalogo(codigo) {
    const servicio = servicios.find(s => s.codigo === codigo);
    if (!servicio) return;

    const disponibles = obtenerCupoDisponible(codigo);
    if (disponibles <= 0) {
        showToast(`"${servicio.nombre}" no tiene cupos disponibles`, "danger");
        return;
    }

    agregarAlCarrito(servicio);
    actualizarBadgeCarrito();
    renderCatalogo();
    showToast(`"${servicio.nombre}" agregado a tu reserva`, "success");
}

function renderCatalogo() {
    const container = document.getElementById("catalogo");
    if (!container) return;

    let filtrados = filtroTipoActivo === "todos"
        ? [...servicios]
        : servicios.filter(s => s.tipo === filtroTipoActivo);

    filtrados = filtrados.filter(s => s.precio >= filtroPrecioMin && s.precio <= filtroPrecioMax);

    if (filtroBusqueda.trim() !== "") {
        const q = filtroBusqueda.toLowerCase().trim();
        filtrados = filtrados.filter(s =>
            s.nombre.toLowerCase().includes(q) ||
            s.descripcion.toLowerCase().includes(q) ||
            s.tipo.toLowerCase().includes(q) ||
            s.modalidad.toLowerCase().includes(q)
        );
    }

    const contador = document.getElementById("contador-servicios");
    if (contador) {
        contador.innerHTML = `<strong class="text-dark">${filtrados.length}</strong> ${filtrados.length === 1 ? 'servicio disponible' : 'servicios disponibles'}`;
    }

    if (filtrados.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="p-5 bg-white rounded-4 shadow-sm border">
                    <i class="bi bi-search text-muted" style="font-size: 3rem;"></i>
                    <h4 class="mt-3 fw-bold text-dark">No se encontraron servicios</h4>
                    <p class="text-muted mb-4">No hay resultados que coincidan con tu búsqueda o los filtros seleccionados.</p>
                    <button class="btn btn-outline-success rounded-pill px-4" onclick="document.getElementById('btn-reset').click()">
                        <i class="bi bi-arrow-counterclockwise me-1"></i>Restablecer filtros
                    </button>
                </div>
            </div>`;
        return;
    }

    container.innerHTML = filtrados.map(servicio => {
        const cupos = obtenerCupoDisponible(servicio.codigo);
        const hayCupos = cupos > 0;
        return `
        <div class="col-md-6 col-lg-4">
            <div class="card card-catalogo h-100">
                <div class="card-body d-flex flex-column p-4">
                    <!-- ENCABEZADO: TIPO Y CUPOS -->
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="badge ${getBadgeClass(servicio.tipo)} rounded-pill px-3 py-1">
                            <i class="bi ${getTipoIcon(servicio.tipo)} me-1"></i>${servicio.tipo}
                        </span>
                        <span class="badge ${hayCupos ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-danger-subtle text-danger border border-danger-subtle'} rounded-pill px-2 py-1">
                            <i class="bi ${hayCupos ? 'bi-check-circle' : 'bi-x-circle'} me-1"></i>${hayCupos ? cupos + ' cupos' : 'Agotado'}
                        </span>
                    </div>

                    <!-- TÍTULO -->
                    <h5 class="card-title fw-bold text-dark mb-2">${servicio.nombre}</h5>

                    <!-- ETIQUETAS: DURACIÓN Y MODALIDAD -->
                    <div class="d-flex flex-wrap gap-2 mb-3">
                        ${servicio.duracion && servicio.duracion !== '—' ? `
                            <span class="badge bg-light text-secondary border fw-normal">
                                <i class="bi bi-clock me-1 text-primary"></i>${servicio.duracion}
                            </span>
                        ` : ''}
                        <span class="badge bg-light text-secondary border fw-normal">
                            <i class="bi bi-geo-alt me-1 text-success"></i>${servicio.modalidad}
                        </span>
                    </div>

                    <!-- DESCRIPCIÓN -->
                    <p class="card-text text-secondary small flex-grow-1 mb-4">${servicio.descripcion}</p>

                    <!-- PRECIO Y BOTONES DE ACCIÓN -->
                    <div class="d-flex justify-content-between align-items-center pt-3 border-top mt-auto">
                        <div>
                            <span class="d-block text-muted small" style="font-size: 0.75rem;">Valor</span>
                            <span class="fs-5 fw-bold text-dark">${formatPrecio(servicio.precio)}</span>
                        </div>
                        <div class="d-flex gap-2">
                            <a href="detalle.html?id=${servicio.codigo}" class="btn btn-sm btn-outline-secondary rounded-pill px-3" title="Ver detalles de ${servicio.nombre}">
                                Detalle
                            </a>
                            ${hayCupos
                                ? `<button class="btn btn-sm btn-success rounded-pill px-3 d-flex align-items-center gap-1" onclick="agregarDesdeCatalogo('${servicio.codigo}')" title="Agregar a reserva">
                                        <i class="bi bi-cart-plus"></i> Reservar
                                   </button>`
                                : `<button class="btn btn-sm btn-secondary rounded-pill px-3 disabled" disabled title="Sin cupos disponibles">
                                        <i class="bi bi-x-circle"></i> Agotado
                                   </button>`
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }).join("");
}

document.addEventListener("DOMContentLoaded", function () {
    // SELECTOR DESPLEGABLE DE CATEGORÍA
    const selectCategoria = document.getElementById("filtro-categoria");
    if (selectCategoria) {
        selectCategoria.addEventListener("change", function () {
            filtroTipoActivo = this.value;
            renderCatalogo();
        });
    }

    // SOPORTE COMPATIBLE PARA BOTONES DE CATEGORÍA SI EXISTEN
    const filtrosContainer = document.getElementById("filtros");
    if (filtrosContainer) {
        filtrosContainer.addEventListener("click", function (e) {
            const btn = e.target.closest("button[data-tipo]");
            if (!btn) return;
            document.querySelectorAll("#filtros .btn").forEach(b => {
                b.classList.remove("active", "btn-success");
                b.classList.add("btn-outline-success");
            });
            btn.classList.add("active", "btn-success");
            btn.classList.remove("btn-outline-success");
            filtroTipoActivo = btn.dataset.tipo;
            if (selectCategoria) selectCategoria.value = filtroTipoActivo;
            renderCatalogo();
        });
    }

    // BUSCADOR EN TIEMPO REAL
    const buscador = document.getElementById("buscador-servicio");
    if (buscador) {
        buscador.addEventListener("input", function (e) {
            filtroBusqueda = e.target.value;
            renderCatalogo();
        });
    }

    // DESLIZADOR DE PRECIO
    const minSlider = document.getElementById("precio-min");
    const maxSlider = document.getElementById("precio-max");
    const precioValor = document.getElementById("precio-valor");
    const trackActivo = document.getElementById("dual-range-active");

    // Deslizador único compacto
    if (maxSlider && !minSlider && precioValor) {
        maxSlider.addEventListener("input", function () {
            filtroPrecioMax = Number(this.value);
            precioValor.textContent = formatPrecio(filtroPrecioMax);
            renderCatalogo();
        });
    }

    // Deslizador dual (compatibilidad)
    function actualizarTrack() {
        if (!minSlider || !maxSlider || !trackActivo) return;
        const min = Number(minSlider.value);
        const max = Number(maxSlider.value);
        const total = 170000 - 10000;
        const left = ((min - 10000) / total) * 100;
        const right = ((max - 10000) / total) * 100;
        trackActivo.style.left = left + "%";
        trackActivo.style.width = (right - left) + "%";
    }

    function actualizarRango() {
        if (!minSlider || !maxSlider || !precioValor) return;
        let min = Math.round(Number(minSlider.value) / 5000) * 5000;
        let max = Math.round(Number(maxSlider.value) / 5000) * 5000;
        if (min > max) {
            [minSlider.value, maxSlider.value] = [max, min];
            [min, max] = [max, min];
        }
        filtroPrecioMin = min;
        filtroPrecioMax = max;
        precioValor.textContent = formatPrecio(min) + " — " + formatPrecio(max);
        actualizarTrack();
        renderCatalogo();
    }

    if (minSlider && maxSlider) {
        minSlider.addEventListener("input", actualizarRango);
        maxSlider.addEventListener("input", actualizarRango);
        actualizarTrack();
    }

    // BOTÓN RESETEAR FILTROS
    document.getElementById("btn-reset")?.addEventListener("click", function () {
        filtroTipoActivo = "todos";
        filtroPrecioMin = 10000;
        filtroPrecioMax = 170000;
        filtroBusqueda = "";

        if (buscador) buscador.value = "";
        if (selectCategoria) selectCategoria.value = "todos";
        if (minSlider) minSlider.value = 10000;
        if (maxSlider) maxSlider.value = 170000;
        if (precioValor) precioValor.textContent = formatPrecio(170000);
        actualizarTrack();

        document.querySelectorAll("#filtros .btn").forEach(b => {
            b.classList.remove("active", "btn-success");
            b.classList.add("btn-outline-success");
        });
        const btnTodos = document.querySelector('#filtros .btn[data-tipo="todos"]');
        if (btnTodos) {
            btnTodos.classList.add("active", "btn-success");
            btnTodos.classList.remove("btn-outline-success");
        }

        renderCatalogo();
    });

    renderCatalogo();
    actualizarBadgeCarrito();
    actualizarNavbar();
});
