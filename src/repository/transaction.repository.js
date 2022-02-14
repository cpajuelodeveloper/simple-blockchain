const fs = require('fs').promises;
const { ApplicationError } = require('../lib/error');
const config = require('../config')
const { Block } = require('../models/block');

module.exports.getLastTransaction = async () => {
	try {
		const file = await this.fileExist(config.csvfile)
		if(!file){
			return null;
		}
		const data = await fs.readFile(config.csvfile, 'utf8');
		const lines = data.trim().split('\n');
		const lastLine = lines.slice(-1)[0];
		const fields = lastLine.split(',');
		const [previousHash, message, nonce] = fields
		const block = new Block({ previousHash, message, nonce });
		return block;
	} catch (error) {
		console.error(error)
		throw new ApplicationError(error.name, error.message);
	}
}

module.exports.fileExist = async (path) => {
	try {
		await fs.access(path);
		console.info(`File ${path} exists`);
		return true;
	} catch (error) {
		console.info(`File ${path} does not exist`);
		return false;
	}
}

module.exports.appendTransaction = async (data) => {
	try{
		await fs.appendFile(config.csvfile, `${data}\n`);
	} catch (error) {
		console.error(error)
		throw new ApplicationError(error.name, error.message);
	}
}