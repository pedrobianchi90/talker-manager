const BAD_REQUEST = 400;

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  return next();
};

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(BAD_REQUEST).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res
      .status(BAD_REQUEST).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageValidation = (req, res, next) => {
  const { age } = req.body;
  const minimumAge = 18;
  if (!age) { 
    return res.status(BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < minimumAge) {
    return res.status(BAD_REQUEST).json({
      message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const watchedAtValidation = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  if (!watchedAt) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  const validWatchAt = watchedAt.match(regex);
  if (!validWatchAt) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const rateValidation = (req, res, next) => {
  const { rate } = req.body.talk;
  if (!rate) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "rate" é obrigatório' });
  }
  const isValidRate = rate >= 1 && rate <= 5;
  if (!isValidRate) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation }; 