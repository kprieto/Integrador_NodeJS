const { leerLibros, escribirLibros, eliminarLibro, actualizarLibro, buscarLibroPorTitulo } = require('../models/booksModel');
const responseView = require('../views/responseFormatter');

// Listar los libros registrados
const listarLibros = () => {
    const book = leerLibros();
    return responseView.formatResponse(book);
};

// Permite agregar un libro
const agregarLibro = (libro) => {
    const libros = leerLibros();
    libros.books.push(libro);
    escribirLibros(libros);
};

// Permite eliminar un libro por su id
const eliminarLibroPorId = (id) => {
    eliminarLibro(id);
};

// Permite actualizar un libro por su id
const actualizarLibroPorId = (nuevosDatos) => {
    actualizarLibro(nuevosDatos);
};

// Permite buscar un libro por su titulo
const buscarLibro = (title) =>{
    const libro = buscarLibroPorTitulo(title);
    return libro ? JSON.stringify(libro) : 'Libro no encontrado.';
}

module.exports = {
    listarLibros,
    agregarLibro,
    eliminarLibroPorId,
    actualizarLibroPorId,
    buscarLibro
};