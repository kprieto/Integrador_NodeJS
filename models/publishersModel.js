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
    try {
        const editoriales = leerEditoriales();
         // 🔍 Verificar si el ID existe
        const editorialExistente = editoriales.publishers.findIndex(book => String(book.id) === String(id));
        if (editorialExistente === -1) {
            console.log('❌ Error: La editorial con ese ID no existe.')
            return '❌ Error: La editorial con ese ID no existe.';
        }
        
        // Eliminar el editor
        const editorialEliminado = editoriales.publishers.splice(editorialExistente, 1)[0];
        fs.writeFileSync(publishersPath, JSON.stringify(editoriales, null, 2));
        console.log(`🗑️ Editorial con ID ${id} eliminado correctamente.`);
        return ` Editorial con ID ${id} eliminado correctamente.`
            
    } catch (error){
            console.log('❌ Error: No se pudo procesar la solicitud.');
        }
};

const actualizarEditorial = (updatedPublisher) => {
    const editoriales = leerEditoriales();
    const index = editoriales.publishers.findIndex(book => book.id == updatedPublisher.id);
    if (index !== -1) {
        editoriales.publishers[index] = updatedPublisher;
        fs.writeFileSync(publishersPath, JSON.stringify(editoriales, null, 2));
        console.log('🔄 Editorial actualizado correctamente.');
    } else {
        console.log('❌ Editorial no encontrado.');
    }
};

module.exports = {
    leerEditoriales,
    escribirEditoriales,
    eliminarEditorial,
    actualizarEditorial
};