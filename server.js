const express = require("express")
const { Server: HttpServer } = require('http')
const { Server : SocketServer} = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)

//quiero usar los archivos estáticos de la carpeta Public
app.use(express.static('./public'))

//esta ruta carga el index.html en la raíz
// app.get('/', (req, res) => {
// 	res.sendFile('index.html', {root: __dirname})
// })

const messages = [
	{ author: "Juan", text: "¡Hola! ¿Que tal?" },
	{ author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
	{ author: "Ana", text: "¡Genial!" }
	];


 io.on('connection', function(socket) {
	console.log('Un cliente se ha conectado');
	socket.emit('messages', messages);
});

io.on('connection',socket => {
	console.log('Un cliente se ha conectado');
	socket.emit('messages', messages);
	
	socket.on('new-message',data => {
	messages.push(data);
	io.sockets.emit('messages', messages);
	});
});

// const Mensajes =[];

// io.on("connection", (socket) => {
// 	console.log("Nuevo cliente se ha conectado!!")
// 	//socket.emit("Mi mensaje", "Este es mi primer mensaje")
// 	socket.id

// 	socket.on("mensaje", (data) => {
// 		console.log()
// 		Mensajes.push({socket : socket.id, mensaje : data})
// 		io.sockets.emit('listaMensajes', Mensajes)
// 	})

// })




//el servidor funciona en el puerto 3000
httpServer.listen(8080, () => console.log('Servidor corriendo en localhost:8080'))
