const express = require('express')
const sender = require('./sender');
const app = express();
const port = 3000;

app.get('/enviar', async (req, res) => {
  const telefono = req.query.telefono+'@c.us';
  const mensaje = req.query.mensaje;

  const result = await sender.sendText(telefono, mensaje)

  res.send(result);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

