const socket = io.connect()

socket.on("listaMensajes", (data) => {
    console.log(data)
    // const MappedCont = data.map(msg => `[${msg.socket}]: ${msg.mensaje}`).join("<br>");
    // document.querySelector("div").innerHTML = MappedCont;
})


function render(data) {
    const html = data.map((elem, index) => {
    return(`<link rel="stylesheet" href="../views/layouts/styles.css">
    <div>
    <strong class="msg_email"> ${elem.username}</strong> - 
    <strong class="msg_fechahora">${elem.fechahora}</strong> - 
    <em class="msg_texto"> ${elem.texto}</em> </div>` )
    }).join(" ");
    document .getElementById ('Mensajes' ).innerHTML = html;
}


function addMessage(e) {
    const mensaje = {
    username: document.getElementById('username').value,
    fechahora: Date(),
    texto: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    return false;
}


socket.on('messages' , function (data) { render(data); });
