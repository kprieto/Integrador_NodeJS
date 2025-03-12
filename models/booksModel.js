const fs = require('fs');
const path = require('path');
const booksPath = path.join(__dirname, '..', 'data', 'books.json');

const leerLibros = () => {
    try {
        const data = fs.readFileSync(booksPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error al leer libros:', err);
        return { books: [] };
    }
};

const escribirLibros = (data) => {
    try {
        fs.writeFileSync(booksPath, JSON.stringify(data, null, 2), 'utf8');
        console.log('✅ Datos de libros guardados exitosamente');
    } catch (err) {
        console.error('Error al guardar libros:', err);
    }
};

const eliminarLibro = (id) => {
    const data = leerLibros();
    try {
    // 🔍 Verificar si el ID existe
    const libroExistente = data.books.find(book => book.id == id);
    if (libroExistente === -1) {
        return '❌ Error: El libro con ese ID no existe.';
    }

    // Eliminar el libro
    data.books.splice(libroExistente, 1);
    fs.writeFileSync(booksPath, JSON.stringify(data, null, 2));
    console.log(`🗑️ Libro con ID ${id} eliminado correctamente.`);
    return ` Libro con ID ${id} eliminado correctamente.`
    
    } catch (error){
        console.log('❌ Error: No se pudo procesar la solicitud.');
    }
};

const actualizarLibro = (updatedBook) => {
    const data = leerLibros();
    const index = data.books.findIndex(book => book.id == updatedBook.id);
    if (index !== -1) {
        data.books[index] = updatedBook;
        fs.writeFileSync(booksPath, JSON.stringify(data, null, 2));
        console.log('🔄 Libro actualizado correctamente.');
    } else {
        console.log('❌ Libro no encontrado.');
    }
    
};

const buscarLibroPorTitulo = (title) =>{
    const libros = leerLibros();
    return libros.books.find(book => book.title.toLowerCase() === title.toLowerCase()) || null;
}

module.exports = {
    leerLibros,
    escribirLibros,
    eliminarLibro,
    actualizarLibro,
    buscarLibroPorTitulo
};
