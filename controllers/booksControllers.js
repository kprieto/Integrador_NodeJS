const { leerLibros, escribirLibros, eliminarLibro, actualizarLibro, buscarLibroPorTitulo } = require('../models/booksModel');
const responseView = require('../views/responseFormatter');

const listarLibros = () => {
    const book = leerLibros();
    //return leerLibros().books;
    return responseView.formatResponse(book);
};

const agregarLibro = (libro) => {
    const libros = leerLibros();
    libros.books.push(libro);
    escribirLibros(libros);
};

const eliminarLibroPorId = (id) => {
    eliminarLibro(id);
};

const actualizarLibroPorId = (id, nuevosDatos) => {
    actualizarLibro(id, nuevosDatos);
};

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