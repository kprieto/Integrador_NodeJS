const fs = require('fs');
const path = require('path');
const authorsPath = path.join(__dirname, '..', 'data', 'authors.json');

const leerAutores = () => {
    try {
        const data = fs.readFileSync(authorsPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error al leer autores:', err);
        return { authors: [] };
    }
};

const escribirAutores = (data) => {
    try {
        fs.writeFileSync(authorsPath, JSON.stringify(data, null, 2), 'utf8');
        console.log('Datos de autores guardados exitosamente');
    } catch (err) {
        console.error('Error al guardar autores:', err);
    }
};

const eliminarAutor = (id) => {
        try {
            const data = leerAutores();
            // 🔍 Verificar si el ID existe
            const autorExistente = data.authors.findIndex(book => String(book.id) === String(id));
            if (autorExistente === -1) {
                console.log('❌ Error: El libro con ese ID no existe.')
                return '❌ Error: El libro con ese ID no existe.';
            }
    
            // Eliminar el autor
            const autorEliminado = data.authors.splice(autorExistente, 1)[0];
            fs.writeFileSync(authorsPath, JSON.stringify(data, null, 2));
            console.log(`🗑️ Autor con ID ${id} eliminado correctamente.`);
            return ` Autor con ID ${id} eliminado correctamente.`
        
        } catch (error){
            console.log('❌ Error: No se pudo procesar la solicitud.');
        }
};

const actualizarAutor = (updatedAuthor) => {
    const autores = leerAutores();
    const index = autores.authors.findIndex(book => book.id == updatedAuthor.id);
    if (index !== -1) {
        autores.authors[index] = updatedAuthor;
        fs.writeFileSync(authorsPath, JSON.stringify(autores, null, 2));
        console.log('🔄 Autor actualizado correctamente.');
    } else {
        console.log('❌ Autor no encontrado.');
    }
};

module.exports = {
    leerAutores,
    escribirAutores,
    eliminarAutor,
    actualizarAutor
};