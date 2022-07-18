const { readFile } = require('fs').promises;

const read = async () => {
    const file = await readFile('./talker.json', 'utf-8');
    console.log(file);
    return JSON.parse(file);
};

module.exports = read;
