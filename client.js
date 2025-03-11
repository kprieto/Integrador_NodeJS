const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const PORT = 8080;
const HOST = 'localhost';

const client = new net.Socket();

client.connect(8080, 'localhost', () =>{
    console.log('Conectando al servidor TCP.');
    
    rl.question('Escribe un comando (Por ejemplo: GET BOOKS o ADD BOOK{"title": "1984", "author": "George Orwell", "publisher": "Secker & Warburg", "year": 1949} o SEARCH BOOK)', (command) =>{
        client.write(command);
    });
});


/*client.setTimeout(1000, () => { 
    console.log('Tiempo de espera alcanzado, cerrando conexion...'); 
    client.end() });

setTimeout(() => { 
    console.log('Pausando la recepción de datos...'); client.pause() 
    setTimeout(() => { 
    console.log('Reanudando la recepción de datos...'); 
    client.resume() 
    client.write('Otro mensaje después de reanudar...')
        }, 3000) 
    }, 2000) */


client.on('data', (data) =>{
    console.log('Respuesta del servidor:');
    console.log(data.toString());
    rl.close();
    client.destroy();
        
        
});

client.on('end', () =>{
    console.log('Desconectado del servidor TCP');
    
})

client.on('error', (err) =>{
    console.log('Error en la conexión:', err.message);
    
})