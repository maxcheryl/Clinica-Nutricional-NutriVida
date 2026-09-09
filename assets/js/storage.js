// ==================== USUARIOS ====================
const CLAVE_USUARIOS = "nutrivida_usuarios"
function obtenerUsuarios(){
    const datos = localStorage.getItem(CLAVE_USUARIOS);
    if (datos === null) return [];
    return JSON.parse(datos);
}

function guardarUsuarios(usuarios){
    const usuariosJSON = JSON.stringify(usuarios);
    localStorage.setItem(CLAVE_USUARIOS, usuariosJSON);
}

function agregarUsuario(usuario){
    const usuarios = obtenerUsuarios();
    usuarios.push(usuario);
    guardarUsuarios(usuarios);
}

function buscarUsuarioPorCorreo(correo) {
    const usuarios = obtenerUsuarios();
    return usuarios.find(function(usuario) {
        return usuario.correo === correo;
    });
}

// ==================== SESIÓN ====================
function obtenerUsuarioLogueado() {
    const datos = localStorage.getItem("usuarioLogueado");
    if (datos === null) return null;
    return JSON.parse(datos);
}

function cerrarSesion() {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "../index.html";
}

// ==================== INTENTOS FALLIDOS ====================
const CLAVE_INTENTOS = "nutrivida_intentos";
const MAX_INTENTOS = 3;

function obtenerIntentos() {
    const datos = localStorage.getItem(CLAVE_INTENTOS);
    if (datos === null) return {};
    return JSON.parse(datos);
}

function guardarIntentos(intentos) {
    localStorage.setItem(CLAVE_INTENTOS, JSON.stringify(intentos));
}

function incrementarIntentos(correo) {
    const intentos = obtenerIntentos();
    if (!intentos[correo]) {
        intentos[correo] = { intentos: 0, bloqueado: false };
    }
    intentos[correo].intentos++;
    if (intentos[correo].intentos >= MAX_INTENTOS) {
        intentos[correo].bloqueado = true;
    }
    guardarIntentos(intentos);
}

function resetearIntentos(correo) {
    const intentos = obtenerIntentos();
    if (intentos[correo]) {
        intentos[correo].intentos = 0;
        intentos[correo].bloqueado = false;
        guardarIntentos(intentos);
    }
}

function estaBloqueado(correo) {
    const intentos = obtenerIntentos();
    return intentos[correo] && intentos[correo].bloqueado;
}

function obtenerIntentosRestantes(correo) {
    const intentos = obtenerIntentos();
    if (!intentos[correo]) return MAX_INTENTOS;
    return MAX_INTENTOS - intentos[correo].intentos;
}

// ==================== CARRITO ====================
const CLAVE_CARRITO = "nutrivida_carrito";

function obtenerCarrito() {
    const datos = localStorage.getItem(CLAVE_CARRITO);
    if (datos === null) return [];
    return JSON.parse(datos);
}

function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function agregarAlCarrito(servicio) {
    const carrito = obtenerCarrito();
    const existe = carrito.find(item => item.codigo === servicio.codigo);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...servicio, cantidad: 1 });
    }
    guardarCarrito(carrito);
    return true;
}

function reducirCantidad(codigo) {
    const carrito = obtenerCarrito();
    const item = carrito.find(i => i.codigo === codigo);
    if (item) {
        item.cantidad--;
        if (item.cantidad <= 0) {
            guardarCarrito(carrito.filter(i => i.codigo !== codigo));
        } else {
            guardarCarrito(carrito);
        }
    }
}

function eliminarDelCarrito(codigo) {
    const carrito = obtenerCarrito().filter(i => i.codigo !== codigo);
    guardarCarrito(carrito);
}

function vaciarCarrito() {
    localStorage.removeItem(CLAVE_CARRITO);
}

function contarCarrito() {
    return obtenerCarrito().reduce((sum, item) => sum + item.cantidad, 0);
}

function serviciosEnCarrito() {
    return obtenerCarrito().length;
}

// ==================== CUPOS ====================
const CLAVE_RESERVADOS = "nutrivida_reservados";

function obtenerReservados() {
    const datos = localStorage.getItem(CLAVE_RESERVADOS);
    if (datos === null) return {};
    return JSON.parse(datos);
}

function guardarReservados(reservados) {
    localStorage.setItem(CLAVE_RESERVADOS, JSON.stringify(reservados));
}

function cantidadEnCarrito(codigo) {
    const item = obtenerCarrito().find(i => i.codigo === codigo);
    return item ? item.cantidad : 0;
}

// Calcula cupos disponibles restando del total: los que están en carrito y los ya reservados
function obtenerCupoDisponible(codigo) {
    const servicio = servicios.find(s => s.codigo === codigo);
    if (!servicio) return 0;
    const enCarrito = cantidadEnCarrito(codigo);
    const reservados = obtenerReservados()[codigo] || 0;
    return servicio.cuposIniciales - enCarrito - reservados;
}

function actualizarBadgeCarrito() {
    const badges = document.querySelectorAll(".badge-carrito");
    const cantidad = contarCarrito();
    badges.forEach(badge => {
        badge.textContent = cantidad;
        badge.style.display = cantidad > 0 ? "inline" : "none";
    });
}

// ==================== UTILIDADES ====================
function formatPrecio(precio) {
    return "$" + precio.toLocaleString("es-CL");
}

// ==================== UI ====================
function actualizarNavbar() {
    const usuarioLogueado = obtenerUsuarioLogueado();
    const botonIniciarSesion = document.getElementById("botonIniciarSesion");
    const infoUsuario = document.getElementById("infoUsuario");
    const botonCerrarSesion = document.getElementById("botonCerrarSesion");
    const nombreUsuario = document.getElementById("nombreUsuario");
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");

    if (usuarioLogueado) {
        if (botonIniciarSesion) botonIniciarSesion.classList.add("d-none");
        if (infoUsuario) infoUsuario.classList.remove("d-none");
        if (botonCerrarSesion) botonCerrarSesion.classList.remove("d-none");
        if (nombreUsuario) nombreUsuario.textContent = `Hola, ${usuarioLogueado.nombre}`;
    } else {
        if (botonIniciarSesion) botonIniciarSesion.classList.remove("d-none");
        if (infoUsuario) infoUsuario.classList.add("d-none");
        if (botonCerrarSesion) botonCerrarSesion.classList.add("d-none");
    }

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", function (e) {
            e.preventDefault();
            cerrarSesion();
        });
    }
}