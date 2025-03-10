const { leerEditoriales, escribirEditoriales, eliminarEditorial, actualizarEditorial } = require('../models/publishersModel');

const listarEditoriales = () => {
    return leerEditoriales().publishers;
};

const agregarEditorial = (editorial) => {
    const editoriales = leerEditoriales();
    editoriales.publishers.push(editorial);
    escribirEditoriales(editoriales);
};

const eliminarEditorialPorId = (id) => {
    eliminarEditorial(id);
};

const actualizarEditorialPorId = (id, nuevosDatos) => {
    actualizarEditorial(id, nuevosDatos);
};

module.exports = {
    listarEditoriales,
    agregarEditorial,
    eliminarEditorialPorId,
    actualizarEditorialPorId
};