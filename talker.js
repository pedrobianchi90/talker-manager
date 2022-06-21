const { Router } = require('express');

const fs = require('fs');

const router = Router();

const readTalker = (req, res, next) => {
  const file = fs.readFileSync('./talker.json', 'utf8');
  if (!file) return res.status(200).json([]);
  const parse = JSON.parse(file);
  req.talkers = parse;
  next();
};
router.get('/', readTalker, (req, res) => {
  const { talkers } = req;
  res.status(200).json(talkers);
});

router.get('/:id', readTalker, (req, res) => {
  const { talkers } = req;
  const { id } = req.params;
  const currentTalker = talkers.find((talker) => talker.id === Number(id));
  if (!currentTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(currentTalker);
});
module.exports = router;
