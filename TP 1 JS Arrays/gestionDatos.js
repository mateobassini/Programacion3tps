let productos = [
    {id: 1, nombre: "El viejo y el mar", precio: 22000, stock:3},
    {id: 2, nombre: "Cien años de soledad", precio: 25000, stock:5},
    {id: 3, nombre: "El túnel", precio: 18000, stock:2},
    {id: 4, nombre: "Rayuela", precio: 30000, stock:0},
    {id: 5, nombre: "El amor en los tiempos del cólera", precio: 27000, stock:4},
]

console.log("cantidad total de productos:", productos.length);
console.log(
  "Nombre del segundo producto:", productos[1].nombre,
  "| Nombre del cuarto producto:", productos[3].nombre
);

for (const producto of productos) {
    console.log(`Nombre: ${producto.nombre}, Precio: $${producto.precio}`);
}

productos.forEach(producto => {
    console.log(`Producto: ${producto.nombre}, Precio: $${producto.precio}`);
});

//1
console.log("\n--- Manipulación de Arrays ---\n");
productos.push({id: 7, nombre: "Crónica de una muerte anunciada", precio: 23000, stock: 3});
productos.push({id: 8, nombre: "La casa de los espíritus", precio: 29000, stock: 2});
console.log("Lista actualizada:", productos.map(p => p.nombre));

//2
const productoEliminado = productos.pop();
console.log("Producto eliminado:", productoEliminado.nombre);

//3
productos.unshift({id:9, nombre: "El túnel del tiempo", precio: 20000, stock: 1});
console.log("Lista actualizada con un nuevo producto al inicio:", productos.map(p => p.nombre));

//4
const eliminado = productos.shift();
console.log("Producto eliminado del inicio:", eliminado.nombre);

//5
const ProductosConStock = productos.filter(p=> p.stock > 0);
console.log("\n--- Productos con stock disponible: ---\n"); 
console.table(ProductosConStock);

//6
const nombresProductos = productos.map(p => p.nombre);
console.log("\nNombres de productos:");
console.log(nombresProductos);

// 7
const idBuscado = 3;
const productoEncontrado = productos.find(p => p.id === idBuscado);
if (productoEncontrado) {
    console.log(`\nProducto con ID ${idBuscado} encontrado:`, productoEncontrado);
} else {
    console.log(`\nProducto con ID ${idBuscado} no encontrado.`);
}

// 8
const productosOrdenados = [...productos].sort((a, b) => b.precio - a.precio);
console.log("\nProductos ordenados por precio (descendente):");
console.table(productosOrdenados);


//CRUD
function agregarProducto(nuevoProducto) {
    productos.push(nuevoProducto);
    console.log("\nProducto agregado:", nuevoProducto);
}


function listarProductos() {
    console.log("\n--- Listado de productos ---");
    productos.forEach(p => {
        console.log(`ID: ${p.id}, Nombre: ${p.nombre}, Precio: $${p.precio}, Stock: ${p.stock}`);
    });
}

function actualizarProducto(id, nuevosDatos) {
    const index = productos.findIndex(p => p.id === id);
    if (index !== -1) {
        productos[index] = { ...productos[index], ...nuevosDatos };
        console.log(`\nProducto con ID ${id} actualizado.`);
    } else {
        console.log(`\nProducto con ID ${id} no encontrado.`);
    }
}

function eliminarProducto(id) {
    const longitudInicial = productos.length;
    productos = productos.filter(p => p.id !== id);
    if (productos.length < longitudInicial) {
        console.log(`\nProducto con ID ${id} eliminado.`);
    } else {
        console.log(`\nProducto con ID ${id} no encontrado.`);
    }
}


listarProductos();

agregarProducto({ id:10, nombre: "La sombra del viento", precio: 32000, stock: 2 });

actualizarProducto(3, { stock: 60 });

eliminarProducto(2);

listarProductos();
