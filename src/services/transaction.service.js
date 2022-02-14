const { ApplicationError } = require('../lib/error');
const crypto = require('crypto');
const { TransactionRepository } = require('../repository');
const { Block } = require('../models/block');
const config = require('../config')

module.exports.createTransaction = async (message) => {
	try {
		const previousBlock = await this.getPreviusBlock();
		const previousHash = previousBlock.hash || this.randomHash();
		const block = new Block({ previousHash: previousHash, message: message });
		block.mineBlock(config.difficulty);
		const { hash, ...data } = block;
		await TransactionRepository.appendTransaction(Object.values(data).join(","));
		return block;
	} catch(error) {
		console.error(error)
		throw new ApplicationError(error.name, error.message, error.status);
	}
}

module.exports.getPreviusBlock = async () => {
	try {
		const previousBlock = await TransactionRepository.getLastTransaction();
		if(previousBlock){
			previousBlock.mineBlock(config.difficulty);
			return previousBlock;
		}
		return false;
	} catch(error) {
		console.error(error)
		throw new ApplicationError(error.name, error.message, error.status);
	}
}

module.exports.randomHash = () => {
	try {
		return "00" + crypto.randomBytes(31).toString('hex').toString();
	} catch(error) {
		console.error(error)
		throw new ApplicationError(error.name, error.message, error.status);
	}
}