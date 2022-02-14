const fs = require('fs').promises;
const { ApplicationError } = require('../lib/error');
const config = require('../config')

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
		return { previusHash: fields[0], message: fields[1], nonce: fields[2] };
	} catch (error) {
		throw new ApplicationError(error.name, error.message);
	}
}

module.exports.fileExist = async (path) => {
	try {
		await fs.access(path);
		console.log(`File ${path} exists`);
		return true;
	} catch (error) {
		console.log(`File ${path} does not exist`);
		return false;
	}
}

module.exports.appendTransaction = async (data) => {
	try{
		await fs.appendFile(config.csvfile, `${data}\n`);
	} catch (error) {
		throw new ApplicationError(error.name, error.message);
	}
}