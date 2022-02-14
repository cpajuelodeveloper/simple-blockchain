const crypto = require('crypto');

class Block {

	constructor({ previousHash, message, nonce = 0 }) {
		this.previousHash = previousHash
		this.message = message
		this.nonce = nonce
		this.hash = this.calculateHash()
	}

	calculateHash() {
		return crypto.createHash('sha256').update(`${this.previousHash},${this.message},${this.nonce}`).digest('hex');
	}

	mineBlock(difficulty) {
		while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
			this.nonce++
			this.hash = this.calculateHash()
		}
		console.log('Block mined: ' + this.hash)
	}

}

module.exports = {
	Block
}