const fs = require('fs');
const path = require('path');
const authorsPath = path.join(__dirname, '..', 'data', 'authors.json');

// Leer el json de autores
const leerAutores = () => {
    try {
        const data = fs.readFileSync(authorsPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error al leer autores:', err);
        return { authors: [] };
    }
};

//Guardar informacion en el json de autores
const escribirAutores = (data) => {
    try {
        fs.writeFileSync(authorsPath, JSON.stringify(data, null, 2), 'utf8');
        console.log('✅ Datos de autores guardados exitosamente');
        return data;
    } catch (err) {
        console.error('❌ Error al guardar autores:', err);
    }
};

// Permite eliminar un autor
const eliminarAutor = (id) => {
        try {
            const data = leerAutores();
            // 🔍 Verificar si el ID existe
            const autorExistente = data.authors.findIndex(author => String(author.id) === String(id));
            if (autorExistente === -1) {
                console.log('❌ Error: El libro con ese ID no existe.')
                return '❌ Error: El libro con ese ID no existe.';
            }
    
            // Eliminar el autor
            const autorEliminado = data.authors.splice(autorExistente, 1)[0];
            fs.writeFileSync(authorsPath, JSON.stringify(data, null, 2));
            console.log(`🗑️ Autor con ID ${id} eliminado correctamente.`);
            return data;
        
        } catch (error){
            console.log('❌ Error: No se pudo procesar la solicitud.');
        }
};

// Permite actualizar un autor 
const actualizarAutor = (updatedAuthor) => {
    const autores = leerAutores();
    const index = autores.authors.findIndex(author => author.id == updatedAuthor.id);
    if (index !== -1) {
        autores.authors[index] = updatedAuthor;
        fs.writeFileSync(authorsPath, JSON.stringify(autores, null, 2));
        console.log('🔄 Autor actualizado correctamente.');
    } else {
        console.log('❌ Autor no encontrado.');
    }
};

//Permite buscar un autor por su nomble o nacionalidad
const buscarAutorPorNombreoNacionalidad = (criterio) => {
    const autores = leerAutores();
    
     const resultados = autores.authors.filter(autor => 
        autor.name.toLowerCase().includes(criterio.toLowerCase()) ||
        autor.nationality.toLowerCase().includes(criterio.toLowerCase())
    );

    if (resultados.length > 0) {
        console.log('🔍 Autores encontrados:', resultados);
        return resultados;
    } else {
        console.log('❌ No se encontraron autores con ese criterio.');
    }
};

module.exports = {
    leerAutores,
    escribirAutores,
    eliminarAutor,
    actualizarAutor,
    buscarAutorPorNombreoNacionalidad
};