const { leerAutores, escribirAutores, eliminarAutor, actualizarAutor, buscarAutorPorNombreoNacionalidad } = require('../models/authorsModel');
const responseView = require('../views/responseFormatter');

// Lista los autores registrados
const listarAutores = () => {
    const author = leerAutores();
    return responseView.formatResponse(author);
};

// Permite agregar un nuevo autor
const agregarAutor = (autor) => {
    const autores = leerAutores();
    autores.authors.push(autor);
    escribirAutores(autores);
};


//Permite eliminar un autor por su id
const eliminarAutorPorId = (id) => {
    eliminarAutor(id);
};

//Permite actualizar un autor por su id
const actualizarAutorPorId = (nuevosDatos) => {
    actualizarAutor(nuevosDatos);
};

// Permite buscar un autor ya sea por Nombre o Nacionalidad
const buscarAutor = (criterios) =>{
    const autor = buscarAutorPorNombreoNacionalidad(criterios);
    return autor ? JSON.stringify(autor) : 'Autor no encontrado.';
}

module.exports = {
    listarAutores,
    agregarAutor,
    eliminarAutorPorId,
    actualizarAutorPorId,
    buscarAutor
};