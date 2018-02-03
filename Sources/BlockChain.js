
const SHA256 = require('crypto-js/sha256');

class Block{
	constructor(index, transaction, otherProperties, previousHash){
		this.index = index;
		this.transaction = transaction;
		this.otherProperties = otherProperties;
		this.previousHash = previousHash;

		this.none = '';
	}

	calculateHash(){
		return SHA256(this.index + this.transaction + this.previousHash);
	}


}

class Transaction{

	constructor(seller, buyer, price, amount){
		this.seller = seller;
		this.buyer = buyer;
		this.price = price;
		this.amount = amount;

	}

	constructor(someDataString){
		this.someDataString = someDataString;
	}

	toString(){
		return someDataString;
	}
}

class BlochChain{
	
	constructor(){
		this.chain = [];
	}


	genesisBlock(){
		return new Block(0, new Transaction("Uco manda 10 bits a Klei"), ''. '0');
	}

}