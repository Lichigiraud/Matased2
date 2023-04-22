
let carrito = []

fetch("./stock.json")
    .then((response) => response.json())
    .then((data) =>{
        stockProductos = data;
        stockProductos.forEach((prod)=>{
            const {id, nombre, precio, desc, img, cantidad} = prod
            contenedor.innerHTML +=`
            <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${img}" alt="imagen">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">Precio: $${precio}</p>
                <p class="card-text">Descripcion: ${desc}</p>
                <button agregarProducto=${id} class="btn boton">Añadir al carrito</button>
            </div>
        </div>
    `
        })
    })




const contenedor = document.querySelector('#contenedor')
const carritoContenedor = document.querySelector('#carritoContenedor')
const vaciarCarrito = document.querySelector('#vaciarCarrito')
const precioTotal = document.querySelector ('#precioTotal')
const procesarCompra = document.querySelector('#procesarCompra')
let botonesAgregar = document.querySelectorAll('boton')




document.addEventListener('DOMContentLoaded', ()=>{
    carrito = JSON.parse(localStorage.getItem('carrito')) ||  [ ] ;
    mostrarCarrito()

})

stockProductos.forEach((prod)=>{
    const {id, nombre, precio, desc, img, cantidad} = prod
    contenedor.innerHTML +=`
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${img}" alt="imagen">
        <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">Precio: $${precio}</p>
            <p class="card-text">Descripcion: ${desc}</p>
            <button onclick= "agregarProducto(${id})" class="btn boton">Añadir al carrito</button>
        </div>
    </div>
`

})
if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
        if (carrito.length === 0) {
        Swal.fire({
            title: "¡Tu carrito está vacio!",
            text: "Compra algo para continuar con la compra",
            icon: "error",
            confirmButtonText: "Aceptar",
        });
        } else {
        location.href = "compra.html";
        }
    });
}


vaciarCarrito.addEventListener('click', () => {
    carrito.length = []
    mostrarCarrito()
})
const mostrarCarrito = () => {
    const modalBody = document.querySelector(' .modal .modal-body ')

    modalBody.innerHTML = ''
    carrito.forEach((prod) => {
        const {id, nombre, img, cantidad, precio} = prod
        modalBody.innerHTML +=` 
        <div class= "modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
        <p>Precio: $ ${precio}</p>
        <p>Cantidad: ${cantidad}</p>
        
        <button onclick= "eliminarProducto(${id})" class="btn btn-danger">Eliminar producto</button>
        </div>
        
        </div>
        `
    })
    if(carrito.length === 0){
        modalBody.innerHTML= `<p class= "text-center text primary parrafo">Tu carrito esta vacio
        </p>`
    }
    
    carritoContenedor.textContent = carrito.length

    precioTotal.innerText = carrito.reduce((acc, prod)=> acc + prod.cantidad * prod.precio, 0)
    
    guardarStorage()

}
function actualizarBotonesAgregar(){
    botonesAgregar= document.querySelectorAll(".boton")
    botonesAgregar.forEach((boton) =>{
        boton.addEventListener("click", agregarProducto)
    });
}


function agregarProducto(id){
    
    const existe = carrito.some(prod => prod.id === id)
    
    if(existe){
        const prod = carrito.map(prod => {
            if(prod.id === id){
                prod.cantidad++
            }
        })
    } else {
        
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
    }
    console.log(agregarProducto)
    mostrarCarrito()
}


function eliminarProducto(id){
    const bebidaId = id
    carrito = carrito.filter ((bebida) => bebida.id !== bebidaId )
    mostrarCarrito()
}

function guardarStorage(){
    localStorage.setItem("carrito",JSON.stringify(carrito))
}
function procesarPedido(){
    carrito.forEach((prod)=>{
        const listaCompra = document.querySelector('#lista-compra tbody')
    })

}
