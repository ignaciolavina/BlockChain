const SHA256 = require('crypto-js/sha256');

class Block{
	constructor(index, data, previousHash = ''){
		this.index = index;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();

//		this.transaction = transaction;
//		this.otherProperties = otherProperties;
		this.none = '';
	}

	calculateHash(){
		return SHA256(this.index + this.previousHash + JSON.stringify(this.data)).toString();
	}

}



class BlochChain{
	
	constructor(){
		this.chain = [this.genesisBlock()];
	}

	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}

	genesisBlock(){
		let b = new Block(0, "Uco manda 10 bits a Klei", "0");
		return b;
	}

	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);

	}

//	addBlock(newBlock){
//		newBlock.previousHash = this.getLatestBlock().hash;
//		newBlock.hash = newBlock.calculateHash();
//		this.chain.push(newBlock);
//	}

}


let prueba = new BlochChain();
prueba.addBlock(new Block(1, {amount: 10}));
prueba.addBlock(new Block(2, {amount: 55}));
console.log(JSON.stringify(prueba, null, 4));


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
