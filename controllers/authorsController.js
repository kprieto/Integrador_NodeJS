const { leerAutores, escribirAutores, eliminarAutor, actualizarAutor } = require('../models/authorsModel');

const listarAutores = () => {
    return leerAutores().authors;
};

const agregarAutor = (autor) => {
    const autores = leerAutores();
    autores.authors.push(autor);
    escribirAutores(autores);
};

const eliminarAutorPorId = (id) => {
    eliminarAutor(id);
};

const actualizarAutorPorId = (nuevosDatos) => {
    actualizarAutor(nuevosDatos);
};

module.exports = {
    listarAutores,
    agregarAutor,
    eliminarAutorPorId,
    actualizarAutorPorId
};