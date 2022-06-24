// const express = require('express');
const crypto = require('crypto');

// const app = express();

// const router = express.Router();

const HTTP_OK_STATUS = 200;

const login = ((_req, res) => {
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(HTTP_OK_STATUS).send({ token });
});

module.exports = login;