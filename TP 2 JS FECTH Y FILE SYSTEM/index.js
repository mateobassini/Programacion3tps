import fetch from "node-fetch";
import fs from "fs/promises"; 

const API_URL = "https://fakestoreapi.com/products";
const LOCAL_FILE = "productos.json";

async function guardarEnArchivo(data) {
  await fs.writeFile(LOCAL_FILE, JSON.stringify(data, null, 2), "utf-8");
  console.log("✅ Datos guardados en", LOCAL_FILE);
}

async function leerArchivo() {
  try {
	const data = await fs.readFile(LOCAL_FILE, "utf-8");
	return JSON.parse(data);
  } catch (error) {
	console.log("⚠ No se encontró archivo local, devolviendo array vacío.");
	return [];
  }
}

async function obtenerTodosLosProductos() {
  const res = await fetch(API_URL);
  const data = await res.json();
  console.log("📦 Todos los productos:", data.length);
  return data;
}

async function obtenerProductosLimitados(limit = 5) {
  const res = await fetch(`${API_URL}?limit=${limit}`);
  const data = await res.json();
  console.log(`📦 ${limit} productos recuperados`);
  return data;
}

async function obtenerProductoPorId(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const data = await res.json();
  console.log(`🔍 Producto con id ${id}:`, data);
  return data;
}

async function agregarProducto(producto) {
  const res = await fetch(API_URL, {
	method: "POST",
	body: JSON.stringify(producto),
	headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  console.log("➕ Producto agregado:", data);
  return data;
}

async function actualizarProducto(id, producto) {
  const res = await fetch(`${API_URL}/${id}`, {
	method: "PUT",
	body: JSON.stringify(producto),
	headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  console.log("✏ Producto actualizado:", data);
  return data;
}

async function eliminarProducto(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  const data = await res.json();
  console.log(`🗑 Producto con id ${id} eliminado`);
  return data;
}

async function agregarProductoLocal(producto) {
  const data = await leerArchivo();
  data.push(producto);
  await guardarEnArchivo(data);
  console.log("➕ Producto agregado localmente.");
}

async function eliminarProductosCaros(valorMaximo) {
  const data = await leerArchivo();
  const filtrados = data.filter((p) => p.price <= valorMaximo);
  await guardarEnArchivo(filtrados);
  console.log(`🗑 Se eliminaron productos con precio mayor a ${valorMaximo}.`);
}


(async () => {
  // 1. Obtener todos los productos
  const todos = await obtenerTodosLosProductos();

  // 2. Obtener solo 5 productos y guardarlos en archivo
  const limitados = await obtenerProductosLimitados(5);
  await guardarEnArchivo(limitados);

  // 3. Agregar un producto a la API
  const nuevo = await agregarProducto({
	title: "Producto de prueba",
	price: 120.5,
	description: "Descripción de prueba",
	image: "https://i.pravatar.cc",
	category: "test",
  });

  // 4. Buscar producto por id
  await obtenerProductoPorId(1);

  // 5. Modificar producto en la API
  await actualizarProducto(1, {
	title: "Producto actualizado",
	price: 99.99,
	description: "Nueva descripción",
	image: "https://i.pravatar.cc",
	category: "update",
  });

  // 6. Eliminar producto en la API
  await eliminarProducto(2);

  // --- FILESYSTEM --- //
  // 7. Agregar producto local
  await agregarProductoLocal({
	id: 999,
	title: "Producto local",
	price: 500,
	category: "local",
  });

  // 8. Eliminar productos locales con precio mayor a 300
  await eliminarProductosCaros(300);
})();
