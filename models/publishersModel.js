const fs = require('fs');
const path = require('path');
const publishersPath = path.join(__dirname, '..', 'data', 'publishers.json');

const leerEditoriales = () => {
    try {
        const data = fs.readFileSync(publishersPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error al leer editoriales:', err);
        return { publishers: [] };
    }
};

const escribirEditoriales = (data) => {
    try {
        fs.writeFileSync(publishersPath, JSON.stringify(data, null, 2), 'utf8');
        console.log('Datos de editoriales guardados exitosamente');
    } catch (err) {
        console.error('Error al guardar editoriales:', err);
    }
};

const eliminarEditorial = (id) => {
    const editoriales = leerEditoriales();
    editoriales.publishers = editoriales.publishers.filter(editorial => editorial.id !== id);
    escribirEditoriales(editoriales);
};

const actualizarEditorial = (id, nuevosDatos) => {
    const editoriales = leerEditoriales();
    const index = editoriales.publishers.findIndex(editorial => editorial.id === id);
    if (index !== -1) {
        editoriales.publishers[index] = { ...editoriales.publishers[index], ...nuevosDatos };
        escribirEditoriales(editoriales);
    }
};

module.exports = {
    leerEditoriales,
    escribirEditoriales,
    eliminarEditorial,
    actualizarEditorial
};