const express = require('express');
const bodyParser = require('body-parser');
const router = require('./talker');
const { login, validateEmail, validatePassword } = require('./login');
const {
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation } = require('./talkerValidation');

const app = express();
app.use(bodyParser.json());
const HTTP_OK_STATUS = 200;
const PORT = '3000';
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', router);
app.post('/login', validateEmail, validatePassword, login);
app.post('/talker',
nameValidation,
ageValidation,
talkValidation,
watchedAtValidation,
rateValidation);

app.listen(PORT, () => {
  console.log('Online');
});