const venom = require('venom-bot');
const session = 'session-name1';

let client = undefined;

venom
  .create({ session: session,})
  .then((c) => client = c)
  .catch((erro) => console.log(erro));

sendText = async (phone, text) => {
  if(!client) {
	  return {result: true, message: "", data: null};
  }

  try {
    const result = await client.sendText(phone, text);
    console.log('Result: ', result); 
    return {result: true, message: "", data: result};
  } catch (e) {
    console.error('Error when sending: ', e); 
    return {result: false, message: e.text, data: e};
  }
}

module.exports = {sendText}