const { writeFile } = require('fs').promises;

const write = async (data) => {
    await writeFile('./talker.json', JSON.stringify(data));
};

module.exports = write;