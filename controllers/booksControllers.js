const { leerLibros, escribirLibros, eliminarLibro, actualizarLibro } = require('../models/booksModel');

const listarLibros = () => {
    return leerLibros().books;
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

module.exports = {
    listarLibros,
    agregarLibro,
    eliminarLibroPorId,
    actualizarLibroPorId
};