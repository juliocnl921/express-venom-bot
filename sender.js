import { create } from 'venom-bot';

const SESSION_NAME = 'hcc-mensajeria-25a13d54f8a';
const END = '@c.us';
const PDF = 'data:application/pdf;base64,';
const PNG = 'data:image/png;base64,';
const JPG = 'data:image/jpeg;base64,';
const BMP = 'data:image/bmp;base64';

let client = undefined;
try{
  create({ session: SESSION_NAME,})
    .then((c) => client = c)
    .catch((erro) => console.log(erro));}
catch(e)
{console.error('Error when creating session: ', e);}


const addMimeType = (file, file_name) => {
  const normalizedType = file_name.toString().toLowerCase();
  
  if(normalizedType.endsWith('.pdf')  && !file.startsWith(PDF)) return PDF + file;
  if(normalizedType.endsWith('.png')  && !file.startsWith(PNG)) return PNG + file;
  if(normalizedType.endsWith('.jpeg') && !file.startsWith(JPG)) return JPG + file;
  if(normalizedType.endsWith('.jpg')  && !file.startsWith(JPG)) return JPG + file;
  if(normalizedType.endsWith('.bmp')  && !file.startsWith(BMP)) return BMP + file;

  return file;
}

const normalizePhone = (phone) => {
    return phone.replace("-", "").replace(" ", "").replace("(", "").replace(")", "").replace("+", "");
}

const sendText = async ({phone, message}) => {
  if(!client) return {result: false, message: "El cliente de venom no se ha cargado.", data: null};
  if(!phone) return {result: false, message: "No se ingreso el parámetro phone.", data: null};
  if(!message) return {result: false, message: "No se ingreso el parámetro message.", data: null};

  phone = normalizePhone(phone) + END;

  try {
    const a = await client.sendText(phone, message);
    console.log( { result: true, message: "Mensaje enviado", data: a}); 
    return {result: true, message: "Mensaje enviado"};
    
  } catch (e) {
    console.error('Error when sending: ', e); 
    return {result: false, message: e.text};
  }
}

const sendFileFromBase64 = async ({phone, file, file_name, message}) => {
  if(!client) return {result: false, message: "El cliente de venom no se ha cargado.", data: null};
  if(!phone) return {result: false, message: "No se ingreso el parámetro phone.", data: null};
  if(!file) return {result: false, message: "No se ingreso el parámetro file.", data: null};
  if(!file_name) return {result: false, message: "No se ingreso el parámetro file_name.", data: null};

  phone = normalizePhone(phone) + END;
  message= (!message) ? message : "";
  file = addMimeType(file, file_name);
  
  try {
    await client.sendFileFromBase64(phone, file, file_name, message);
    console.log( { result: true, message: "Mensaje enviado"}); 
    return {result: true, message: "Mensaje enviado con archivo"};
  } catch (e) {
    console.error('Error when sending: ', e); 
    return {result: false, message: e.text};
  }
}

export {sendText, sendFileFromBase64}