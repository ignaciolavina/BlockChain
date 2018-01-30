
const SHA256 = require('crypto-js/sha256');

class Block{
	constructor(index, transaction, otherProperties, previousHash){
		this.index = index;
		this.transaction = transaction;
		this.otherProperties = otherProperties;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();

		this.none = '';
	}

	calculateHash(){
		return SHA256(this.index + this.transaction + this.previousHash);
	}

}

class Transaction{

/*
	constructor(seller, buyer, price, amount){
		this.seller = seller;
		this.buyer = buyer;
		this.price = price;
		this.amount = amount;

	}
*/
	constructor(someDataString){
		this.someDataString = someDataString;
	}

	toString(){
		return this.someDataString;
	}
}

class BlochChain{
	
	constructor(){
		this.chain = [this.genesisBlock()];
	}

	getLatestBlock(){
		return this.chain[this.length - 1];
	}

	genesisBlock(){
		return new Block(0, new Transaction("Uco manda 10 bits a Klei"), '', '0');
	}

	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}

}

let prueba = new BlochChain();
prueba.addBlock(new Block("hbloque prueba"));
console.log(JSON.stringify(prueba, null, 4));
