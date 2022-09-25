const socket = io.connect()

socket.on("listaMensajes", (data) => {
    console.log(data)
    // const MappedCont = data.map(msg => `[${msg.socket}]: ${msg.mensaje}`).join("<br>");
    // document.querySelector("div").innerHTML = MappedCont;
})


function render(data) {
    const html = data.map((elem, index) => {
    return(`<div>
    <strong  style = "color: red;">${elem.username}</strong> - 
    <strong  style = "color: brown;">${elem.fechahora}</strong> - 
    <em style = "color: green;"> ${elem.texto}</em> </div>` )
    }).join(" ");
    document .getElementById ('Mensajes' ).innerHTML = html;
}


function addMessage(e) {
    const mensaje = {
    username: document.getElementById('username').value,
    fechahora: formatDate(new Date()),
    texto: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    return false;
}


function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }
  
 
  


socket.on('messages' , function (data) { render(data); });
