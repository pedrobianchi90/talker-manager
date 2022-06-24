const crypto = require('crypto');

const HTTP_OK_STATUS = 200;

const login = ((_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).send({ token });
});

const validateEmail = (req, res, next) => {
    const { email } = req.body;
    if (!email) { return res.status(400).json({ message: 'O campo "email" é obrigatório' }); }
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validation = email.match(regex);
    if (!validation) {
      return res.status(400).json({
        message: 'O "email" deve ter o formato "email@email.com"',
      });
    }
     next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
    if (!password) { 
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    } 
    const validPassword = password.lenght >= 6;
    if (!validPassword) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

module.exports = { login, validateEmail, validatePassword };