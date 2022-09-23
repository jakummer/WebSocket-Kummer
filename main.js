const express = require("express");
const db = require("./db.js");
const app = express();
//const bcrypt = require("bcrypt");

const handlebars = require("express-handlebars");

 
const { Server: HttpServer } = require('http')
const { Server : SocketServer} = require('socket.io')

const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)

//quiero usar los archivos estáticos de la carpeta Public
app.use(express.static('./public'))



//view engine
const hbs = handlebars.engine({
  extname: "hbs",
  layoutsDir: "./views/layouts/",
});

app.engine("hbs", hbs);
app.set("view engine", "hbs");

//app.set("view engine", "pug");

const DB = new db("data");
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

 
 
app.get("/altaproductos", async (req, res) => {
  const productos = await DB.getAllProducts();
  res.render("main", { layout: "altaproductos", productos });

});


app.get("/productos", async (req, res) => {
  const productos = await DB.getAllProducts();
  res.render("main", { layout: "productos", productos });
});



app.post("/api/productos", async (req, res) => {
  console.log(req.body);
  const { nombre, precio, urlimagen } = req.body;
  const data = await DB.createProduct({ nombre, precio, urlimagen });
  return res.redirect("/altaproductos");
});


// app.listen(8080, () => {
//   console.log("Iniciado");
// });

const messages = [
	{ username: "juanlopresti@gmail.com", fechahora: "Fri Sep 23 2022 16:14:46 GMT-0300", texto: "¡Hola! ¿Que tal?" },
	{ username: "pedroarata@hotmail.com", fechahora: "Fri Sep 23 2022 16:14:46 GMT-0300", texto: "¡Muy bien! ¿Y vos?" },
	
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

 



//el servidor funciona en el puerto 
httpServer.listen(8080, () => console.log('Servidor corriendo en localhost:8080'))
