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
        console.log('Datos de libros guardados exitosamente');
    } catch (err) {
        console.error('Error al guardar libros:', err);
    }
};

const eliminarLibro = (id) => {
    const libros = leerLibros();
    libros.books = libros.books.filter(libro => libro.id !== id);
    escribirLibros(libros);
};

const actualizarLibro = (id, nuevosDatos) => {
    const libros = leerLibros();
    const index = libros.books.findIndex(libro => libro.id === id);
    if (index !== -1) {
      libros.books[index] = { ...libros.books[index], ...nuevosDatos };
      escribirLibros(libros);
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
