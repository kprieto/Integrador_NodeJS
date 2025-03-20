# API de Gestión de Biblioteca
Desarrollar una API para gestionar una biblioteca usando un servidor 
TCP implementado con Node.js. Utilizando el patrón de diseño MVC.

El sistema está organizado de manera que al ejecutar la aplicación, se presenta un menú principal con las siguientes opciones:

Libros

Autores

Editoriales

Salir


# Funcionalidades de la API

Al elegir cada opción, el usuario puede acceder a un submenú específico. Por ejemplo:

# Libros

Ver todos los libros: Lista todos los libros almacenados en el sistema.
Buscar un libro por título: Permite buscar un libro por su título.
Agregar un nuevo libro: Permite agregar un nuevo libro a la biblioteca.
Actualizar un libro: Actualiza los datos de un libro existente.
Eliminar un libro: Elimina un libro de la biblioteca.


Si eliges la opción Agregar un nuevo libro, puedes agregar un libro usando alguno de los siguientes ejemplos:

{
  "id": 4,
  "title": "Demasiado Lejos",
  "author": "Eduardo Sacheri",
  "publisher": "Alfaguara",
  "year": 2025
}

{
  "id": 5,
  "title": "Hábitos Atómicos",
  "author": "James Clear",
  "publisher": "Booket",
  "year": 2018
}

{
  "id": 6,
  "title": "Las Voces del Desierto",
  "author": "Marlo Morgan",
  "publisher": "B de Bolsillo",
  "year": 2021
}

# Autores
Ver todos los autores
Buscar un autor por nombre o nacionalidad
Agregar un nuevo autor
Actualizar un autor
Eliminar un autor:
Si eliges la opción Agregar un nuevo autor, puedes agregar un autor usando uno de los siguientes ejemplos:
{
  "name": "Eduardo Sacheri",
  "nationality": "Argentina"
}

{
  "name": "James Clear",
  "nationality": "Estados Unidos"
}

{
  "name": "Marlo Morgan",
  "nationality": "Estados Unidos"
}


# Editoriales
Ver todas las editoriales:
Buscar una editorial por nombre
Agregar una nueva editorial
Actualizar una editorial
Eliminar una editorial
Si eliges la opción Agregar una nueva editorial, puedes agregar una editorial usando uno de los siguientes ejemplos:
{
  "name": "Alfaguara",
  "numBooks": "10209"
}

{
  "name": "Booket",
  "numBooks": "7948"
}

{
  "name": "B de Bolsillo",
  "numBooks": "8154"
}

# EJECUCIÓN

1. Iniciar el servidor: Para iniciar el servidor TCP, ejecuta el siguiente comando en tu terminal:

node server.js

El servidor comenzará a escuchar en el puerto 8080.


2. Conectar al cliente: Para interactuar con la API, ejecuta el siguiente comando en otro terminal:

node client.js

Esto abrirá un menú donde podrás realizar diversas operaciones con los libros, autores y editoriales.

# ESTRUCTURA DE ARCHIVOS

El proyecto tiene la siguiente estructura de carpetas:
book-api/

├── controllers/

│   ├── booksController.js

│   ├── authorsController.js

│   └── publishersController.js

├── models/

│   ├── booksModel.js

│   ├── authorsModel.js

│   └── publishersModel.js

├── data/

│   ├── books.json

│   ├── authors.json

│   └── publishers.json

├── views/

│   └── responseFormatter.js

├── server.js

└── client.js
