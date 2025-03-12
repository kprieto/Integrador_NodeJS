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
    mostrarMenu();
    

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
    mostrarMenu();
        
        
});

client.on('end', () =>{
    console.log('Desconectado del servidor TCP');
    
})

client.on('error', (err) =>{
    console.log('Error en la conexión:', err.message);
    
})

function mostrarMenu() {
    console.log('\n📚 MENU PRINCIPAL');
    console.log('1️⃣ - Libros');
    console.log('2️⃣ - Autores');
    console.log('3️⃣ - Editoriales');
    console.log('4️⃣ - Salir');

    rl.question('Elige una opción: ', (opcion) => {
        switch (opcion) {
            case '1':
                menuLibros();
                break;
            case '2':
                menuAutores();
                break;
            case '3':
                menuEditoriales();
                break;
            case '4':
                console.log('👋 Gracias por visitar la Biblioteca...');
                client.end();
                rl.close();
                break;
            default:
                console.log('⚠️ Opción no válida.');
                mostrarMenu();
        }
    });
}

// 📚 Submenú para Libros
function menuLibros() {
    console.log('\n📖 LIBROS');
    console.log('1️⃣ - Ver todos los libros');
    console.log('2️⃣ - Buscar un libro por título');
    console.log('3️⃣ - Agregar un nuevo libro');
    console.log('4️⃣ - Actualizar un libro');
    console.log('5️⃣ - Eliminar un libro');
    console.log('6️⃣ - Volver al menú principal');

    rl.question('Elige una opción: ', (opcion) => {
        if (opcion === '1') {
            client.write('GET BOOKS');
        } else if (opcion === '2') {
            rl.question('📌 Ingresa el título del libro: ', (titulo) => {
                client.write(`SEARCH BOOK ${titulo}`);
            });
        } else if (opcion === '3') {
            rl.question('📖 Título: ', (title) => {
                rl.question('✍️ Autor: ', (author) => {
                    rl.question('🏢 Editorial: ', (publisher) => {
                        rl.question('📅 Año: ', (year) => {
                            const newBook = { title, author, publisher, year };
                            client.write(`ADD BOOK ${JSON.stringify(newBook)}`);
                        });
                    });
                });
            });
        } else if (opcion === '4') { // ✏️ ACTUALIZAR LIBRO
            rl.question('🔄 ID del libro a actualizar: ', (id) => {
                rl.question('📖 Nuevo título: ', (title) => {
                    rl.question('✍️ Nuevo autor: ', (author) => {
                        rl.question('🏢 Nueva editorial: ', (publisher) => {
                            rl.question('📅 Nuevo año: ', (year) => {
                                const updatedBook = { id, title, author, publisher, year };
                                client.write(`UPDATE BOOK ${JSON.stringify(updatedBook)}`);
                            });
                        });
                    });
                });
            });
        } else if (opcion === '5') { // 🗑️ ELIMINAR LIBRO
            rl.question('❌ ID del libro a eliminar: ', (id) => {
                client.write(`DELETE BOOK ${id}`);
            });
        }else if (opcion === '6') {
            mostrarMenu();
        } else {
            console.log('⚠️ Opción no válida.');
            menuLibros();
        }
    });
}

// ✍️ Submenú para Autores (se puede expandir)
function menuAutores() {
    console.log('\n🖊️ AUTORES');
    console.log('1️⃣ - Ver todos los autores (No implementado aún)');
    console.log('2️⃣ - Volver al menú principal');

    rl.question('Elige una opción: ', (opcion) => {
        if (opcion === '2') {
            mostrarMenu();
        } else {
            console.log('⚠️ Opción no válida.');
            menuAutores();
        }
    });
}

// 🏢 Submenú para Editoriales (se puede expandir)
function menuEditoriales() {
    console.log('\n🏢 EDITORIALES');
    console.log('1️⃣ - Ver todas las editoriales (No implementado aún)');
    console.log('2️⃣ - Volver al menú principal');

    rl.question('Elige una opción: ', (opcion) => {
        if (opcion === '2') {
            mostrarMenu();
        } else {
            console.log('⚠️ Opción no válida.');
            menuEditoriales();
        }
    });
}
