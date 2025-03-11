const net = require('net');
const bookController = require('./controllers/booksControllers');

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
            const match = command.match(/\{.*\}/); // Extraer JSON

            if (match) {
                try {
                    const parse = JSON.parse(match[0]);
                    const newBook = {id: data.length + 1,...parse}
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
        } else {
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