// constante para llamar al array
const CLAVE_USUARIOS = "nutrivida_usuarios"

// para manejar el array
function obtenerUsuarios(){
    const datos = localStorage.getItem(CLAVE_USUARIOS);
    if (datos === null) return [];
    return JSON.parse(datos);
}

function guardarUsuarios(usuarios){
    const usuariosJSON = JSON.stringify(usuarios);
    localStorage.setItem(CLAVE_USUARIOS, usuariosJSON);
}

// para manejar objetos individuales
function agregarUsuario(usuario){
    const usuarios = obtenerUsuarios();
    usuarios.push(usuario);
    guardarUsuarios(usuarios);
}

function buscarUsuarioPorId(id) {
    const usuarios = obtenerUsuarios();
    return usuarios.find(function (usuario) {
        return usuario.id === id;
    });
}

function buscarUsuarioPorCorreo(correo) {
    const usuarios = obtenerUsuarios();
    return usuarios.find(function(usuario) {
        return usuario.correo === correo;
    });
}

function obtenerUsuarioLogueado() {
    const datos = localStorage.getItem("usuarioLogueado");
    if (datos === null) return null;
    return JSON.parse(datos);
}

function cerrarSesion() {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "index.html";
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
    if (!existe) {
        carrito.push(servicio);
        guardarCarrito(carrito);
        return true;
    }
    return false;
}

function eliminarDelCarrito(codigo) {
    const carrito = obtenerCarrito();
    const filtrado = carrito.filter(item => item.codigo !== codigo);
    guardarCarrito(filtrado);
}

function vaciarCarrito() {
    localStorage.removeItem(CLAVE_CARRITO);
}

function contarCarrito() {
    return obtenerCarrito().length;
}