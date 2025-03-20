const fs = require('fs');
const path = require('path');
const booksPath = path.join(__dirname, '..', 'data', 'books.json');

// Leer el json de libros
const leerLibros = () => {
    try {
        const data = fs.readFileSync(booksPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error al leer libros:', err);
        return { books: [] };
    }
};

//Guardar informacion en el json de autores
const escribirLibros = (data) => {
    try {
        fs.writeFileSync(booksPath, JSON.stringify(data, null, 2), 'utf8');
        console.log('✅ Datos de libros guardados exitosamente');
        return data;
    } catch (err) {
        console.error('❌ Error al guardar libros:', err);
    }
};

// Permite eliminar un libro
const eliminarLibro = (id) => {
    
    try {
        const data = leerLibros();
        // 🔍 Verificar si el ID existe
        const libroExistente = data.books.findIndex(book => String(book.id) === String(id));
        if (libroExistente === -1) {
            console.log('❌ Error: El libro con ese ID no existe.')
            return '❌ Error: El libro con ese ID no existe.';
        }

        // Eliminar el libro
        const libroEliminado = data.books.splice(libroExistente, 1)[0];
        fs.writeFileSync(booksPath, JSON.stringify(data, null, 2));
        console.log(`🗑️ Libro con ID ${id} eliminado correctamente.`);
        return data;
    
    } catch (error){
        console.log('❌ Error: No se pudo procesar la solicitud.');
    }
};

// Permite acutializar un libro
const actualizarLibro = (updatedBook) => {
    const data = leerLibros();
    const index = data.books.findIndex(book => book.id == updatedBook.id);
    if (index !== -1) {
        data.books[index] = updatedBook;
        fs.writeFileSync(booksPath, JSON.stringify(data, null, 2));
        console.log('🔄 Libro actualizado correctamente.');
        return data;
    } else {
        console.log('❌ Libro no encontrado.');
    }
    
};

// Permite buscar un libro por titulo
const buscarLibroPorTitulo = (title) =>{
    const libros = leerLibros();
    const resultados = libros.books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()) || null);
    
    if (resultados.length > 0) {
        console.log('🔍 Libros encontrados:', resultados);
        return resultados;
    } else {
        console.log('❌ No se encontraron libros con ese criterio.');
    }
}

module.exports = {
    leerLibros,
    escribirLibros,
    eliminarLibro,
    actualizarLibro,
    buscarLibroPorTitulo
};
