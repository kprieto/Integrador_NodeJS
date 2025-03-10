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
    const autores = leerAutores();
    autores.authors = autores.authors.filter(autor => autor.id !== id);
    escribirAutores(autores);
};

const actualizarAutor = (id, nuevosDatos) => {
    const autores = leerAutores();
    const index = autores.authors.findIndex(autor => autor.id === id);
    if (index !== -1) {
        autores.authors[index] = { ...autores.authors[index], ...nuevosDatos };
        escribirAutores(autores);
}
};

module.exports = {
    leerAutores,
    escribirAutores,
    eliminarAutor,
    actualizarAutor
};