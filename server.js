const net = require('net');

const server = net.createServer((socket)=>{
    console.log('Cliente conectado.');

    socket.on('data', (data) => {
        console.log('Mensaje recibido del cliente:', data.toString());

        
    })

    socket.on('end', () =>{
        console.log('Cliente desconectado.');
        
    })

    socket.on('error', (err) =>{
        console.log('Error en la conexión: ', err);
        
    })
    
})

server.listen(8080, () =>{
    console.log('Servidor TCP escuchando en el puerto 8080');
    
})

server.on('error', (err) =>{
    console.log('Error en el servidor: ', err.message);
    
})