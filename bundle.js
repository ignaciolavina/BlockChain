(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var SHA256;// = require('crypto-js/sha256');

class Block{
	constructor(index, data, previousHash = ''){
		this.index = index;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();

//		this.transaction = transaction;
//		this..toString();otherProperties = otherProperties;
		this.nonce = 0;
	}

	calculateHash(){
		return SHA256(this.index + this.previousHash + JSON.stringify(this.data) + this.nonce)
	}

	mineBlock(miningDificulty){
		//Proof of work
		while(this.hash.substring(0, miningDificulty) != Array(miningDificulty +1).join("0")){
			this.nonce++;
			this.hash = this.calculateHash();
		}
	}

}



class BlochChain{
	
	constructor(){
		this.chain = [this.genesisBlock()];
		this.miningDificulty = 5;

		this.transactions = [];
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
		newBlock.mineBlock(this.miningDificulty);
		//newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);

	}

//	addBlock(newBlock){
//		newBlock.previousHash = this.getLatestBlock().hash;
//		newBlock.hash = newBlock.calculateHash();
//		this.chain.push(newBlock);
//	}

}


let prueba = new BlochChain();
console.log("minando el primer bloque");
prueba.addBlock(new Block(1, {amount: 10}));
console.log("minando el segundo bloque");
prueba.addBlock(new Block(2, {amount: 55}));
console.log("minando el tercer bloque");
prueba.addBlock(new Block(3, {amount: 55}));
console.log(JSON.stringify(prueba, null, 4));





class Transaction{


	constructor(seller, buyer, price, amount, notes){
		if((this.seller | this.buyer | this.amount | this.notes) == null){
			return;
		}else{
			this.seller = seller;
			this.buyer = buyer;
			this.price = price;
			this.amount = amount;
			this.notes = notes;
		}
	}



	toString(){
		return this.someDataString;
	}
}

},{}]},{},[1]);
