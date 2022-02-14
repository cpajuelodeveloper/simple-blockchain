const { ApplicationError } = require('../lib/error');
const crypto = require('crypto');
const { TransactionRepository } = require('../repository');

module.exports.createTransaction = async (message) => {
	try {
		console.log(`message: ${message}`);
		const previusBlock = await this.getPreviusBlock();
		const previusHash = previusBlock?.hash || this.randomHash();
		console.log(`previusHash: ${previusHash}`);
		const block = this.calculateNewBlock(previusHash, message);
		const { hash, ...data } = block;
		await TransactionRepository.appendTransaction(Object.values(data).join(","));
		return block;
	} catch(error) {
		console.log(error)
		throw new ApplicationError(error.name, error.message, error.status);
	}
}

module.exports.getPreviusBlock = async () => {
	try {
		const lastTransactionHash = await TransactionRepository.getLastTransaction();
		if(lastTransactionHash){
			lastTransactionHash.hash = this.calculateHash(`${lastTransactionHash.previusHash},${lastTransactionHash.message},${lastTransactionHash.nonce}`);
			return {};
		}
		return false;
	} catch(error) {
		console.log(error)
		throw new ApplicationError(error.name, error.message, error.status);
	}
}

module.exports.randomHash = () => {
	try {
		return "00" + crypto.randomBytes(31).toString('hex');
	} catch(error) {
		console.log(error)
		throw new ApplicationError(error.name, error.message, error.status);
	}
}

module.exports.calculateHash = (data) => {
	try {
		return crypto.createHash('sha256').update(data).digest('hex');
	} catch(error) {
		console.log(error)
		throw new ApplicationError(error.name, error.message, error.status);
	}
}

module.exports.calculateNewBlock = (previusHash, message) => {
	try {
		let nonce = -1;
		let hash;
		const regex = /^(00).*\w/
		do {
			nonce++;
			hash = this.calculateHash(`${previusHash},${message},${nonce}`)
		} while(!regex.test(hash))
		return { previusHash, message, nonce, hash: hash };
	} catch(error) {
		console.log(error)
		throw new ApplicationError(error.name, error.message, error.status);
	}
}