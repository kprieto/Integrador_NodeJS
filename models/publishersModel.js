const fs = require('fs');
const path = require('path');
const publishersPath = path.join(__dirname, '..', 'data', 'publishers.json');

// Leer el json de editoriales
const leerEditoriales = () => {
    try {
        const data = fs.readFileSync(publishersPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error al leer editoriales:', err);
        return { publishers: [] };
    }
};

//Guardar informacion en el json de editoriales
const escribirEditoriales = (data) => {
    try {
        fs.writeFileSync(publishersPath, JSON.stringify(data, null, 2), 'utf8');
        console.log('✅ Datos de editoriales guardados exitosamente');
        return data;
    } catch (err) {
        console.error('❌ Error al guardar editoriales:', err);
    }
};

// Permite Eliminar una editorial
const eliminarEditorial = (id) => {
    const editoriales = leerEditoriales();

    try {
         // 🔍 Verificar si el ID existe
        const editorialExistente = editoriales.publishers.findIndex(publisher => String(publisher.id) === String(id));
        if (editorialExistente === -1) {
            console.log('❌ Error: La editorial con ese ID no existe.')
            return '❌ Error: La editorial con ese ID no existe.';
        }
        
        // Eliminar el editorial
        const editorialEliminado = editoriales.publishers.splice(editorialExistente, 1)[0];
        fs.writeFileSync(publishersPath, JSON.stringify(editoriales, null, 2));
        console.log(`🗑️ Editorial con ID ${id} eliminado correctamente.`);
        return editoriales;
            
    } catch (error){
            console.log('❌ Error: No se pudo procesar la solicitud.');
        }
};

//Permite actualizar un editorial
const actualizarEditorial = (updatedPublisher) => {
    const editoriales = leerEditoriales();
    const index = editoriales.publishers.findIndex(book => book.id == updatedPublisher.id);
    if (index !== -1) {
        editoriales.publishers[index] = updatedPublisher;
        fs.writeFileSync(publishersPath, JSON.stringify(editoriales, null, 2));
        console.log('🔄 Editorial actualizado correctamente.');
        return editoriales;
    } else {
        console.log('❌ Editorial no encontrada.');
    }
};

// Permite buscar una editorial por nombre
const buscarEditorialPorNombre = (name) =>{
    const editorial = leerEditoriales();
    const resultados = editorial.publishers.filter(publisher => publisher.name.toLowerCase().includes(name.toLowerCase()) || null);
    
    if (resultados.length > 0) {
        console.log('🔍 Editorales encontradas:', resultados);
        return resultados;
    } else {
        console.log('❌ No se encontraron editoriales con ese criterio.');
    }
}

module.exports = {
    leerEditoriales,
    escribirEditoriales,
    eliminarEditorial,
    actualizarEditorial,
    buscarEditorialPorNombre
};