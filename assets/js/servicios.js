const servicios = [
    // CONSULTAS
    {
        codigo: "CN001",
        tipo: "Consulta",
        nombre: "Primera consulta nutricional",
        duracion: "50 min",
        modalidad: "Presencial",
        precio: 35000,
        descripcion: "Evaluación inicial: anamnesis, antropometría completa y diseño del primer plan alimenticio."
    },
    {
        codigo: "CN002",
        tipo: "Consulta",
        nombre: "Control nutricional (seguimiento)",
        duracion: "30 min",
        modalidad: "Presencial",
        precio: 25000,
        descripcion: "Seguimiento mensual: medición de indicadores y ajuste del plan vigente."
    },
    {
        codigo: "CN003",
        tipo: "Consulta",
        nombre: "Control nutricional quincenal",
        duracion: "30 min",
        modalidad: "Presencial",
        precio: 22000,
        descripcion: "Seguimiento intensivo cada 15 días. Recomendado en los primeros 2 meses."
    },
    {
        codigo: "CN004",
        tipo: "Consulta",
        nombre: "Teleconsulta nutricional",
        duracion: "30 min",
        modalidad: "Online (video)",
        precio: 20000,
        descripcion: "Consulta de seguimiento vía videollamada. Requiere contar con consulta presencial previa."
    },
    {
        codigo: "CN005",
        tipo: "Consulta",
        nombre: "Consulta de urgencia / reagendada",
        duracion: "30 min",
        modalidad: "Presencial",
        precio: 28000,
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
        descripcion: "Incluye primera consulta + 1 control quincenal + plan alimenticio personalizado + seguimiento por WhatsApp."
    },
    {
        codigo: "PL002",
        tipo: "Plan especializado",
        nombre: "Plan pérdida de peso (3 meses)",
        duracion: "—",
        modalidad: "Presencial",
        precio: 170000,
        descripcion: "Incluye primera consulta + 5 controles + 3 planes mensuales + seguimiento continuo."
    },
    {
        codigo: "PL003",
        tipo: "Plan especializado",
        nombre: "Plan nutrición deportiva (1 mes)",
        duracion: "—",
        modalidad: "Presencial",
        precio: 70000,
        descripcion: "Para deportistas y personas con actividad física frecuente. Cálculo de requerimientos energéticos y proteicos."
    },
    {
        codigo: "PL004",
        tipo: "Plan especializado",
        nombre: "Plan control diabetes / hipertensión",
        duracion: "—",
        modalidad: "Presencial",
        precio: 75000,
        descripcion: "Plan adaptado para patologías metabólicas. Coordinación con médico tratante si aplica."
    },
    {
        codigo: "PL005",
        tipo: "Plan especializado",
        nombre: "Plan alimentación vegetariana/vegana",
        duracion: "—",
        modalidad: "Presencial",
        precio: 68000,
        descripcion: "Diseñado para garantizar aporte adecuado de proteínas, hierro, vitamina B12 y calcio sin productos animales."
    },
    {
        codigo: "PL006",
        tipo: "Plan especializado",
        nombre: "Plan alimentación infantil (2-12 años)",
        duracion: "—",
        modalidad: "Presencial",
        precio: 65000,
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
        descripcion: "Peso, talla, IMC, circunferencia de cintura, cadera, brazo y % de grasa corporal con bioimpedanciometría."
    },
    {
        codigo: "EV002",
        tipo: "Evaluación",
        nombre: "Bioimpedanciometría",
        duracion: "15 min",
        modalidad: "Presencial",
        precio: 12000,
        descripcion: "Medición de composición corporal: masa grasa, masa muscular, agua corporal y edad metabólica."
    },
    {
        codigo: "EV003",
        tipo: "Evaluación",
        nombre: "Encuesta de hábitos alimentarios",
        duracion: "20 min",
        modalidad: "Presencial",
        precio: 10000,
        descripcion: "Análisis del patrón alimentario actual. Identificación de déficit y excesos nutricionales."
    },
    {
        codigo: "EV004",
        tipo: "Evaluación",
        nombre: "Análisis de exámenes de laboratorio",
        duracion: "20 min",
        modalidad: "Presencial",
        precio: 15000,
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
        descripcion: "Máx. 10 personas. Conceptos básicos de alimentación equilibrada y lectura de etiquetas."
    },
    {
        codigo: "TG002",
        tipo: "Taller grupal",
        nombre: "Taller de cocina nutritiva",
        duracion: "120 min",
        modalidad: "Presencial (grupo)",
        precio: 20000,
        descripcion: "Preparación de recetas saludables. Incluye degustación. Máx. 8 personas."
    },
    {
        codigo: "TG003",
        tipo: "Taller grupal",
        nombre: "Taller nutrición para deportistas",
        duracion: "90 min",
        modalidad: "Presencial (grupo)",
        precio: 18000,
        descripcion: "Hidratación, nutrición pre y post entrenamiento, suplementación básica. Máx. 12 personas."
    }
];

function formatPrecio(precio) {
    return "$" + precio.toLocaleString("es-CL");
}

function getBadgeClass(tipo) {
    const classes = {
        "Consulta": "bg-success",
        "Plan especializado": "bg-primary",
        "Evaluación": "bg-warning text-dark",
        "Taller grupal": "bg-info text-dark"
    };
    return classes[tipo] || "bg-secondary";
}

let filtroTipoActivo = "todos";
let filtroPrecioMin = 10000;
let filtroPrecioMax = 170000;

function showToast(mensaje, tipo) {
    const toast = document.getElementById("toast-carrito");
    const body = document.getElementById("toast-carrito-body");
    if (!toast || !body) return;
    toast.className = `toast align-items-center text-bg-${tipo} border-0`;
    body.textContent = mensaje;
    const bsToast = new bootstrap.Toast(toast, { delay: 2500 });
    bsToast.show();
}

function agregarDesdeCatalogo(codigo) {
    const servicio = servicios.find(s => s.codigo === codigo);
    if (!servicio) return;

    const agregado = agregarAlCarrito(servicio);
    actualizarBadgeCarrito();
    if (agregado) {
        showToast(`"${servicio.nombre}" agregado al carrito`, "success");
    } else {
        showToast(`"${servicio.nombre}" ya está en el carrito`, "warning");
    }
}

function renderCatalogo() {
    const container = document.getElementById("catalogo");
    if (!container) return;

    let filtrados = filtroTipoActivo === "todos"
        ? [...servicios]
        : servicios.filter(s => s.tipo === filtroTipoActivo);

    filtrados = filtrados.filter(s => s.precio >= filtroPrecioMin && s.precio <= filtroPrecioMax);

    if (filtrados.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5 w-100">
                <i class="bi bi-search text-muted" style="font-size: 3rem;"></i>
                <h4 class="mt-3">No se encontraron servicios</h4>
                <p class="text-muted">Intenta ajustar los filtros de búsqueda.</p>
            </div>`;
        return;
    }

    container.innerHTML = filtrados.map(servicio => `
        <div class="col-md-6 col-lg-4">
            <div class="card card-servicio h-100">
                <div class="card-body d-flex flex-column">
                    <span class="badge ${getBadgeClass(servicio.tipo)} mb-2 align-self-start">${servicio.tipo}</span>
                    <h5 class="card-title">${servicio.nombre}</h5>
                    <p class="card-text flex-grow-1">${servicio.descripcion}</p>
                    <div class="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                        <span class="card-price">${formatPrecio(servicio.precio)}</span>
                        <div class="d-flex gap-1">
                            <button class="btn btn-sm btn-success" onclick="agregarDesdeCatalogo('${servicio.codigo}')" title="Agregar al carrito">
                                <i class="bi bi-cart-plus"></i>
                            </button>
                            <a href="detalle.html?id=${servicio.codigo}" class="btn btn-sm btn-outline-success">Ver más</a>
                        </div>
                    </div>
                    <div class="mt-2">
                        <small class="text-muted"><i class="bi bi-geo-alt me-1"></i>${servicio.modalidad}</small>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
}

document.addEventListener("DOMContentLoaded", function () {
    const filtrosContainer = document.getElementById("filtros");
    if (filtrosContainer) {
        filtrosContainer.addEventListener("click", function (e) {
            if (e.target.dataset.tipo) {
                document.querySelectorAll("#filtros .btn").forEach(b => {
                    b.classList.remove("active");
                    b.classList.add("btn-outline-success");
                });
                e.target.classList.add("active");
                e.target.classList.remove("btn-outline-success");
                filtroTipoActivo = e.target.dataset.tipo;
                renderCatalogo();
            }
        });
    }

    const minSlider = document.getElementById("precio-min");
    const maxSlider = document.getElementById("precio-max");
    const precioValor = document.getElementById("precio-valor");
    const trackActivo = document.getElementById("dual-range-active");

    function actualizarTrack() {
        const min = Number(minSlider.value);
        const max = Number(maxSlider.value);
        const total = 170000 - 10000;
        const left = ((min - 10000) / total) * 100;
        const right = ((max - 10000) / total) * 100;
        trackActivo.style.left = left + "%";
        trackActivo.style.width = (right - left) + "%";
    }

    function actualizarRango() {
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

    minSlider.addEventListener("input", actualizarRango);
    maxSlider.addEventListener("input", actualizarRango);
    actualizarTrack();

    document.getElementById("btn-reset")?.addEventListener("click", function () {
        filtroTipoActivo = "todos";
        filtroPrecioMin = 10000;
        filtroPrecioMax = 170000;
        minSlider.value = 10000;
        maxSlider.value = 170000;
        precioValor.textContent = formatPrecio(10000) + " — " + formatPrecio(170000);
        actualizarTrack();

        document.querySelectorAll("#filtros .btn").forEach(b => {
            b.classList.remove("active");
            b.classList.add("btn-outline-success");
        });
        const btnTodos = document.querySelector('#filtros .btn[data-tipo="todos"]');
        btnTodos.classList.add("active");
        btnTodos.classList.remove("btn-outline-success");

        renderCatalogo();
    });

    renderCatalogo();
    actualizarBadgeCarrito();
});
