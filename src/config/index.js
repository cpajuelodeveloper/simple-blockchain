require('dotenv').config();

module.exports.port = process.env.PORT;
module.exports.difficulty = process.env.DIFFICULTY;
module.exports.csvfile = `${process.env.FILEPATH}${process.env.FILENAME}`;