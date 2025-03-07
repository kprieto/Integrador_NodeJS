const net = require('net');

const PORT = 8080;
const HOST = 'localhost';

const client = net.createConnection({port:PORT, host: HOST}, () =>{
    console.log('Conectando al servidor TCP');

    client.write("Hola Servidor.");
    client.write('GET BOOKS\n');
    client.write('ADD BOOK')

    
})
client.setTimeout(1000, () => { 
    console.log('Tiempo de espera alcanzado, cerrando conexion...'); 
    client.end() });

setTimeout(() => { 
    console.log('Pausando la recepción de datos...'); client.pause() 
    setTimeout(() => { 
    console.log('Reanudando la recepción de datos...'); 
    client.resume() 
    client.write('Otro mensaje después de reanudar...')
        }, 3000) 
    }, 2000) 


client.on('data', (data) => {
    console.log('Respuesta del servidor: ', data.toString());
    
})

client.on('end', () =>{
    console.log('Desconectado del servidor TCP');
    
})

client.on('error', (err) =>{
    console.log('Error en la conexión:', err.message);
    
})