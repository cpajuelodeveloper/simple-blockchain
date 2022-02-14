require('dotenv').config();

module.exports.port = process.env.PORT;
module.exports.difficulty = parseInt(process.env.DIFFICULTY || 2);
module.exports.csvfile = `${process.env.FILEPATH}${process.env.FILENAME}`;