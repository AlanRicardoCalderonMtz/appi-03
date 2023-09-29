//Crear el servidor
const { json } = require('express');
const express = require('express');
const app = express();
// Que tome el puerto establecido a la nube (render )
const puerto = process.env.PORT || 3000;

// Midleware - Intermediario
app.use(express.json())

//Arreglo de objeto de categorias
let categorias = [
    { id: 1, nombre: "cocina", descripcion: "Elementos para cocinar" },
    { id: 2, nombre: "Limpieza", descripcion: "Elementos para Limpieza" },
    { id: 3, nombre: "Eletronica", descripcion: "Elementos de Electronica" },
    { id: 4, nombre: "Ropa bebe", descripcion: "Elementos para bebe" },
    { id: 5, nombre: "Linea blanca", descripcion: "Elementos de linea blanca" },
    { id: 6, nombre: "Jardineria", descripcion: "Elementos para cocinar" },
    { id: 7, nombre: "Salud", descripcion: "Elementos de jardineria" },
    { id: 8, nombre: "Muebles", descripcion: "Elementos para la sala y demas " },
    { id: 9, nombre: "Lacteos", descripcion: "Elementos para beber" },
    { id: 10, nombre: "Licores", descripcion: "Elementos para fiestas" }
]

//Solicitud , respuesta
app.get('/socios/v1/categorias', (req, res) => {
    //1° Verificar si existe categorias
    if (categorias.length > 0) {
        //Existen categorias
        res.status(200).json({
            estado: 1,
            mensaje: "Existen categorias",
            //var : contenido
            categories: categorias
        })
    } else {
        //No existen categorias
        res.status(404).json({
            estado: 0,
            mensaje: "No se encontraron categorias",
            categories: null

        })

    }
    //2° Mostrarla con un estado y mensaje
    //3° No existe, mostrar estado y mensaje
    //4° En formato JSON
})

app.get('/socios/v1/categorias/:id', (req, res) => {
    //  Solo una categoria

    // Obtener el ID de la categoría desde los parámetros de la URL
    const categoryId = req.params.id;

    //Programación funcional
    // Buscar la categoría por su ID en tu arreglo 
    const categoriaEncontrada = categorias.find(categoria => categoria.id == categoryId);
    if (categoriaEncontrada) {
        // Si se encontró la categoría, devolverla en formato JSON
        res.status(200).json({
            estado: 1,
            mensaje: "Categoría encontrada",
            category: categoriaEncontrada
        });
    } else {
        // Si no se encontró la categoría, devolver un mensaje de error en JSON
        res.status(404).json({
            estado: 0,
            mensaje: "Categoría no encontrada",
            category: null
        });
    }
});

//res.send('Crear una categoria');

// 1° Crear un recurso - crear una categoria
// 2° Requerimos:
//      3° id = Generar un numero aleatorio
//      4° nombre y descripción = cuerpo
app.post('/socios/v1/categorias', (req, res) => {
    // Crear un recurso - Crear una categoria
    const { nombre, descripcion } = req.body
    const id = Math.round(Math.random() * 100);
    //Comprobar que el cliente (chrome, edge, insomnia, etc) => que el usuario es el 'programador'
    if (nombre == undefined || descripcion == undefined) {
        //Hay un error en la solicitud por parte del programador
        res.status(400).json({
            estado: 0,
            mensaje: "Faltan parametros en la solicitud",
        })
    } else {
        //En js como se agregan elementos al array -> (push)
        const categoria = { id: id, nombre: nombre, descripcion: descripcion }
        const longitud_inicial = categorias.length;
        categorias.push(categoria)
        if (categorias.length > longitud_inicial) {
            //All bien por parte del cliente y servidor
            // 200 (todo ok) y 201(creado)
            res.status(201).json({
                estado: 1,
                mensaje: "Categoria creada",
                categoria: categoria
            })
        } else {
            //Error del servidor -> 'creador de la API o de la BD, Quien configura el servidor'
            // 500 -> error interno
            res.status(500).json({
                estado: 0,
                mensaje: "Ocurrio un error desconocido"
            })
        }
    }
})

// Actualizar un recurso - Actualizar una categoria
    //res.send('Actualizar una categoria por su id');

    //id viene ? -> 'params'
    //nombre y descripción ? -> 'body'

app.put('/socios/v1/categorias/:id', (req, res) => {
    // Actualizar un recurso - Actualizar una categoria
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    //verificar que nombre y descripcion vengan en el body
    if (nombre == undefined || descripcion == undefined) {
        res.status(400).json({
            estado: 0,
            mensaje: "Faltan parametros en la solicitud"
        })
    } else {
        const posActualizar = categorias.findIndex(categoria => categoria.id == id)
        if (posActualizar != -1) {
            //Si encontro la categoria con el id buscado
            //Actualizar la categoria
            categorias[posActualizar].nombre = nombre;
            categorias[posActualizar].descripcion = descripcion
            res.status(200).json({
                estado: 1,
                mensaje: "Categoría actualizada correctamente"
            });
        } else {
            res.status(404).json({
                estado: 0,
                mensaje: "Categoria no encontrada"
            })
        }
    }
})

    //res.send('Eliminar una categoria por su id');
    // Obtener el ID de la categoría de los parámetros de la URL
app.delete('/socios/v1/categorias/:id', (req, res) => {
    //Eliminar un recurso - Eliminar una categoria
    const { id } = req.params;

    // Buscar la posición de la categoría en el array 'categorias' por su ID
    const posEliminar = categorias.findIndex(categoria => categoria.id == id);

    if (posEliminar != -1) {
        // Si se encontró la categoría con el ID buscado, eliminarla del array
        categorias.splice(posEliminar, 1);

        res.status(201).json({
            estado: 1,
            mensaje: "Categoría eliminada correctamente"
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "Categoría no encontrada"
        });
    }

})

app.listen(puerto, () => {
    console.log('Servidor corriendo en el puerto: ', puerto);
})