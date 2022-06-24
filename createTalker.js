const fs = require('fs');

const createTalker = (req, res) => {
    try {
      const { name, age, talk } = req.body;
      const talkers = fs.readFile('./talker.json', 'utf-8');
      const parsedTalkers = JSON.parse(talkers);
  
      const id = parsedTalkers.length + 1;
      const newTalker = { id, name, age, talk };
      parsedTalkers.push(newTalker);
  
      const talkerStringfy = JSON.stringify(parsedTalkers, null, 2);
  
      fs.writeFile('./talker.json', talkerStringfy);
  
      return res.status(201).json(newTalker);
    } catch (error) {
      console.error(error);
    }
  };

  module.exports = createTalker;