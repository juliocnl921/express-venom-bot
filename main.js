const express = require('express')
const sender = require('./sender');
const app = express();
app.use(express.json({limit: "50mb"}));

const port = 3000;

app.get('/enviar', async (req, res) => {
  let phone = req.query.phone;
  let message = req.query.message;

  const result = await sender.sendText(phone, message)

  res.send(result);
});

app.post('/send_whatsapp', async (req, res) => {
  let phone = req.body.phone;
  let message = req.body.message;
  console.log(">>>>>>>>>>>>>phone>",phone)
  phone = phone.replace("-", "").replace(" ", "").replace("(", "").replace(")", "").replace("+", "")

  const result = await sender.sendText(phone, message)

  res.send(result);
});

app.post('/send_whatsapp_with_file', async (req, res) => {
  let phone = req.body.phone;
  let message = req.body.message;
  let file = req.body.file;
  let file_name = req.body.file_name;

  phone = phone.replace("-", "").replace(" ", "").replace("(", "").replace(")", "").replace("+", "")

  const result = await sender.sendFileFromBase64(phone, file, file_name, message)

  res.send(result);
});

app.post('/send_sms', async (req, res) => {res.send({result: false, message: "No implementado.", data: null});});

app.post('/send_sms_with_file', async (req, res) => {res.send({result: false, message: "No implementado.", data: null});});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

