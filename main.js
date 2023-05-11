const express = require('express')
const venom = require('venom-bot');

const app = express();
const port = 3000;
const session = 'session-name1';
let client = undefined;

venom
  .create({ session: session,})
  .then((c) => client = c)
  .catch((erro) => console.log(erro));
  
app.get('/enviar', (req, res) => {
  
  if(!client) {
	  res.send(req.query.mensaje);
	  return;
  }

  const telefono = req.query.telefono+'@c.us';
  const mensaje = req.query.mensaje;
  
   client
        .sendText(telefono, mensaje)
        .then((result) => {
          console.log('Result: ', result); 
		  res.send(result);
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); 
		  res.send(erro);
        });
	
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

