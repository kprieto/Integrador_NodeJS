const { leerEditoriales, escribirEditoriales, eliminarEditorial, actualizarEditorial, buscarEditorialPorNombre } = require('../models/publishersModel');
const responseView = require('../views/responseFormatter');

const listarEditoriales = () => {
    const publisher = leerEditoriales();
    return responseView.formatResponse(publisher);
};


const agregarEditorial = (editorial) => {
    const editoriales = leerEditoriales();
    editoriales.publishers.push(editorial);
    escribirEditoriales(editoriales);
};

const eliminarEditorialPorId = (id) => {
    eliminarEditorial(id);
};

const actualizarEditorialPorId = (nuevosDatos) => {
    actualizarEditorial(nuevosDatos);
};

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