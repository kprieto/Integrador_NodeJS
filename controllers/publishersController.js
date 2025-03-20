const { leerEditoriales, escribirEditoriales, eliminarEditorial, actualizarEditorial, buscarEditorialPorNombre } = require('../models/publishersModel');
const responseView = require('../views/responseFormatter');

// Listar todas las editoriales registradas
const listarEditoriales = () => {
    const publisher = leerEditoriales();
    return responseView.formatResponse(publisher);
};

// Permite agregar una editorial
const agregarEditorial = (editorial) => {
    const editoriales = leerEditoriales();
    editoriales.publishers.push(editorial);
    escribirEditoriales(editoriales);
};

// Permite eliminar una editorial por su id
const eliminarEditorialPorId = (id) => {
    eliminarEditorial(id);
};

// Permite actualizar la editorial por su id
const actualizarEditorialPorId = (nuevosDatos) => {
    actualizarEditorial(nuevosDatos);
};

// Permite buscar una editorial por su nombre
const buscarEditorial = (criterios) =>{
    const editorial = buscarEditorialPorNombre(criterios);
    return editorial ? JSON.stringify(editorial) : 'Editorial no encontrada.';
}

module.exports = {
    listarEditoriales,
    agregarEditorial,
    eliminarEditorialPorId,
    actualizarEditorialPorId,
    buscarEditorial
};