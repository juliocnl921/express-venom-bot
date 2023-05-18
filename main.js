const express = require('express')
const sender = require('./sender');

const app = express();
app.use(express.json({limit: "50mb"}));

const port = 3000;

app.get('/enviar', async (req, res) => {
  const result = await sender.sendText(req.query)

  res.send(result);
});

app.post('/send_whatsapp', async (req, res) => {
  const result = await sender.sendText(req.body)

  res.send(result);
});

app.post('/send_whatsapp_with_file', async (req, res) => {
  const result = await sender.sendFileFromBase64(req.body)

  res.send(result);
});

app.post('/send_sms', async (req, res) => {res.send({result: false, message: "No implementado.", data: null});});

app.post('/send_sms_with_file', async (req, res) => {res.send({result: false, message: "No implementado.", data: null});});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

