const net = require('net');
const bookController = require('./controllers/booksControllers');
const authorController = require('./controllers/authorsController');
const publisherController = require('./controllers/publishersController');

const server = net.createServer((socket)=>{
    console.log('Cliente conectado.');

    socket.on('data', (data) => {
        console.log('Mensaje recibido del cliente:', data.toString());
        const command = data.toString().trim();
        if (command === 'GET BOOKS') {
            const response = bookController.listarLibros();
            socket.write(response);
        } else if (command.startsWith('ADD BOOK')) {
            const data = bookController.listarLibros();
            const match = command.match(/\{.*\}/);

            if (match) {
                try {
                    const parse = JSON.parse(match[0]);
                    const newBook = { id: data.length + 1, ...parse };
                    const response = bookController.agregarLibro(newBook);
                    socket.write(response);
                } catch (error) {
                    socket.write('❌ Error: No se pudo procesar el JSON.');
                }
            } else {
                socket.write('❌ Error: No se encontró un JSON válido.');
            }
        } else if (command.startsWith('SEARCH BOOK')) {
            const title = command.replace('SEARCH BOOK', '').trim();
            if (title) {
                const response = bookController.buscarLibro(title);
                socket.write(response);
            } else {
                socket.write('❌ Error: Debes proporcionar un título.');
            }
        } else if (command.startsWith('UPDATE BOOK')) { // ✏️ ACTUALIZAR LIBRO
            const match = command.match(/\{.*\}/);
            if (match) {
                try {
                    const updatedBook = JSON.parse(match[0]);
                    const response = bookController.actualizarLibroPorId(updatedBook);
                    socket.write(response);
                } catch (error) {
                    socket.write('❌ Error: No se pudo procesar el JSON.');
                }
            } else {
                socket.write('❌ Error: No se encontró un JSON válido.');
            }
        } else if (command.startsWith('DELETE BOOK')) { // 🗑️ ELIMINAR LIBRO
            const id = command.replace('DELETE BOOK', '').trim();
            if (!id) {
                socket.write('❌ Error: Debes proporcionar un ID.');
            } else {
                const response = bookController.eliminarLibroPorId(id);
                                
                socket.write(response || '❌ Error interno.');
            }
        } else if (command === 'GET AUTHORS') {
            const response = authorController.listarAutores();
            socket.write(response);
        } else if (command.startsWith('ADD AUTHOR')) {
            const data = authorController.listarAutores();
            const match = command.match(/\{.*\}/);

            if (match) {
                try {
                    const parse = JSON.parse(match[0]);
                    const newAuthor = {id: data.length + 1,...parse}
                    const response = authorController.agregarAutor(newAuthor);
                    socket.write(response);
                } catch (error) {
                    socket.write('❌ Error: No se pudo procesar el JSON.');
                }
            } else {
                socket.write('❌ Error: No se encontró un JSON válido.');
            }
        } else if (command.startsWith('SEARCH AUTHOR')) {
            const name = command.replace('SEARCH AUTHOR', '').trim();
            if (name) {
                const response = authorController.buscarAutor(name);
                socket.write(response);
            } else {
                socket.write('❌ Error: Debes proporcionar un nombre o nacionalidad.');
            }
        } else if (command.startsWith('UPDATE AUTHOR')) { // ✏️ ACTUALIZAR AUTOR
            const match = command.match(/\{.*\}/);
            if (match) {
                try {
                    const updatedAuthor = JSON.parse(match[0]);
                    const response = authorController.actualizarAutorPorId(updatedAuthor);
                    socket.write(response);
                } catch (error) {
                    socket.write('❌ Error: No se pudo procesar el JSON.');
                }
            } else {
                socket.write('❌ Error: No se encontró un JSON válido.');
            }
        } else if (command.startsWith('DELETE AUTHOR')) { // 🗑️ ELIMINAR AUTOR
            const id = command.replace('DELETE AUTHOR', '').trim();
            if (!id) {
                socket.write('❌ Error: Debes proporcionar un ID.');
            } else {
                const response = authorController.eliminarAutorPorId(id);
                                
                socket.write(response || '❌ Error interno.');
            }
        } else if (command === 'GET PUBLISHERS') {
            const response = publisherController.listarEditoriales();
            socket.write(response);
        } else if (command.startsWith('ADD PUBLISHER')) {
            const data = publisherController.listarEditoriales();
            const match = command.match(/\{.*\}/);

            if (match) {
                try {
                    const parse = JSON.parse(match[0]);
                    const newPublisher = {id: data.length + 1,...parse}
                    const response = publisherController.agregarEditorial(newPublisher);
                    socket.write(response);
                } catch (error) {
                    socket.write('❌ Error: No se pudo procesar el JSON.');
                }
            } else {
                socket.write('❌ Error: No se encontró un JSON válido.');
            }
        } else if (command.startsWith('SEARCH PUBLISHER')) {
            const name = command.replace('SEARCH PUBLISHER', '').trim();
            if (name) {
                const response = publisherController.buscarEditorial(name);
                socket.write(response);
            } else {
                socket.write('❌ Error: Debes proporcionar un nombre.');
            }
        } else if (command.startsWith('UPDATE PUBLISHER')) { // ✏️ ACTUALIZAR EDITORIAL
            const match = command.match(/\{.*\}/);
            if (match) {
                try {
                    const updatedPublisher = JSON.parse(match[0]);
                    const response = publisherController.actualizarEditorialPorId(updatedPublisher);
                    socket.write(response);
                } catch (error) {
                    socket.write('❌ Error: No se pudo procesar el JSON.');
                }
            } else {
                socket.write('❌ Error: No se encontró un JSON válido.');
            }
        } else if (command.startsWith('DELETE PUBLISHER')) { // 🗑️ ELIMINAR EDITORIAL
            const id = command.replace('DELETE PUBLISHER', '').trim();
            if (!id) {
                socket.write('❌ Error: Debes proporcionar un ID.');
            } else {
                const response = publisherController.eliminarEditorialPorId(id);
                                
                socket.write(response || '❌ Error interno.');
            }
        }else {
            socket.write('⚠️ Comando no válido.');
        }
        
    })

    socket.on('end', () =>{
        console.log('🔴 Cliente desconectado.');
        
    })

    socket.on('error', (err) =>{
        console.log('❌ Error en la conexión: ', err);
        
    })
    
})

server.listen(8080, () =>{
    console.log('Servidor TCP escuchando en el puerto 8080');
    
})

server.on('error', (err) =>{
    console.log('Error en el servidor: ', err.message);
    
})