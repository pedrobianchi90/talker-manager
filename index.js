const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const read = require('./read');
const write = require('./write');
const loginValidation = require('./login');
const {
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
  watchedAtValidation,
} = require('./talkerValidation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await read();
  if (talkers.length === 0) {
    return res.status(200).json([]);
  }
  return res.status(200).json(talkers);
});

app.get('/talker/search', tokenValidation, async (req, res) => {
  const { q } = req.query;
  const talkers = await read();
  if (!q) {
    return res.status(200).json(talkers);
  }
  const result = talkers.filter((talker) => talker.name.includes(q));
  return res.status(200).json(result);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const file = await read();
  const talkers = file.find((talker) => talker.id === Number(id));
  if (talkers) return res.status(200).json(talkers);
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', loginValidation, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

app.use(
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
  watchedAtValidation,
);

app.post('/talker',
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await read();
    const id = talkers.length + 1;
    talkers.push({ name, age, id, talk: { ...talk } });
    write(talkers);
    res.status(201).json({ name, age, id, talk: { ...talk } });
  });

app.put('/talker/:id',
  async (req, res) => {
    const { id } = req.params;
    const talkers = await read();
    const { name, age, talk } = req.body;
    const indexId = talkers.findIndex((item) => item.id === Number(id));
    talkers[indexId] = { ...talkers[indexId], name, age, talk };
    await write(talkers);
    res.status(HTTP_OK_STATUS).json(talkers[indexId]);
  });

app.delete('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await read();
  const indexId = talkers.findIndex((item) => item.id === Number(id));
  talkers.splice(indexId, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log('Online');
});