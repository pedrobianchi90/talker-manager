const { Router } = require('express');

const fs = require('fs');

const router = Router();

router.get('/', (_req, res) => {
    const file = fs.readFileSync('./talker.json', 'utf8');
    if (!file) return res.status(200).json([]);
    const parsed = JSON.parse(file);
    res.status(200).json(parsed);
});

module.exports = router;
