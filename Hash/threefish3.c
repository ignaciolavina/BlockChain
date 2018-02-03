#include <stdint.h>
#include <inttypes.h>
#include <string.h>
#include "threefish.h"
#include <stdlib.h>
#include <stdio.h>


#define C_240 = 0x1BD11BDAA9FC1A22;
//#define C_matrix [8][2] = {{14, 16},{52, 57},{23, 40},{5, 37},{25, 33},{46, 12},{58, 22},{32, 32}}


#if 0 /* TODO change to 0 after you complete this task */


TODO FREE TEXT ASSIGNMENT

If there was a FAQ for this assignment, what question and answer would have helped you the most?

Q: <HOW TO DO FOR GETTING THE PHARAMETERS IN THE ARRAYS>

A: <USE: memcpy( &place_to_save, place_where_get, size);>


#warning "FAIL you have not completed the free text assignment"
#endif


/* Under key at k and tweak at t, encrypt 32 bytes of plaintext at p and store it at c. */
void threefish(unsigned char *c, const unsigned char *p, const unsigned char *k, const unsigned char *t) {


	int C_matrix [8][2] = {{14, 16},{52, 57},{23, 40},{5, 37},{25, 33},{46, 12},{58, 22},{32, 32}};


	/* transform the given variables to unsigned int 64 to work with the same variable-type*/
	uint64_t array_pText [4] = {};
	uint64_t array_tweak [3] = {};
	uint64_t array_key [5] = {};
	uint64_t array_encripted [4] = {}; // = *c this marks the state

	uint64_t aux1 = 0; //for shift function
	uint64_t aux2 = 0; //for shift function

	//variables for iteration
	int d=0;	//d = round
	int s=0;	//Subkey_round
	int i=0;	//iteration on loops
	int r=0;	//rest for the C_matrix
	int R_constant=0; //


	//FIRST RECEIVE THE PHARAMETERS AND STORE ON THE ARRAYS VARIABLES
	for (i=0; i<4; i++){
		memcpy(&array_pText[i], p + 8*i, sizeof (uint64_t));
		//print 1st state (for the programmer)
		//printf("%"PRIu64"\t",array_pText[i]);
	}
	printf("\n\n");


//memcpy(&array_key[0], k, sizeof (uint64_t));
//printf("%" PRIu64 "\t",array_key[0]);
	
	for (i=0; i<4; i++){
		memcpy(&array_key[i], k + 8*i, sizeof (uint64_t));
		//print 1st state (for the programmer)
		printf("%" PRIu64 "\t",array_key[i]);
	}
	printf("\n\n");
	

	for (i=0; i<2; i++){
		memcpy(&array_tweak[i], t + i, sizeof (uint64_t));
	}

	//first phase of key generator
	// t2 = t0 XOR t1;
	array_tweak [2] = array_tweak [0] ^ array_tweak [1];

	//first round of key
	for (i=0; i<4; i++){
		array_key[4]= array_key[4] ^ array_key[i];
	}


	//for 72 ROUNDS
	for (d=0; d<72; d++){

		//if in d round:  d mod 4 = 0
		if(d%4==0){



			//Normal addition subkey + plaintext
			for (i=0; i<4; i++){
				array_encripted[i] = array_encripted[i] + array_key[i];

			}

			//Next k round
			array_key[0] = array_key[s%5];
			array_key[1] = array_key[(s+1)%5];
			array_key[2] = array_key[(s+2)%5] + array_tweak [s%3];
			array_key[3] = array_key[(s+3)%5] + array_tweak [(s+1)%3];
			array_key[4] = array_key[(s+4)%5] + s;
			s++;

			//print calculated key: (just for the programer) 
			for (i=0; i<=3; i++){
				//printf("%"PRIu64"\t",array_key[i]);
			}
			printf("\n");
		}

		// MIX function
			// mix w0
			array_encripted[0] = array_encripted[0] + array_encripted[1];

			// mix w1	
			R_constant = C_matrix [d%8][0]; 			//R_constant = d mod 8, j			
			aux1 = array_encripted[1] << R_constant;	//shift part (in 3 phases)
			aux2 = array_encripted[1] >> (64- R_constant);
			array_encripted[1] = aux1 ^ aux2;			// XOR
			array_encripted[1] = array_encripted[1] ^ array_encripted[0];


			// mix w2
			array_encripted[2] = array_encripted[2] + array_encripted[3];

			// mix w3
			R_constant = C_matrix [d%8][1]; 
			aux1 = array_encripted[3] << R_constant;	//shift part (in 3 phases)
			aux2 = array_encripted[3] >> (64 - R_constant);
			array_encripted[3] = aux1 ^ aux2;			// XOR
			array_encripted[3] = array_encripted[3] ^ array_encripted[2];

		//PERMUTE function (W0= w0, W1= w3, W2=w2, W3=w1)
			//array_encripted[0]= array_encripted[0]; 	w0 keeps in the same place
			array_encripted[0]= array_encripted[0];		// w1 change with w4
			//array_encripted[0]= array_encripted[0];	w2 keeps the same
			array_encripted[3]= array_encripted[1];		// w3 change with w1


		//print state: (just for the programer) 
		for (i=0; i<=3; i++){
			printf("%"PRIu64" ",array_encripted[i]);
		}
		printf("\n");

		//end of round d, loop again		

	
	}

	//Store the solution on the *c
	*c=&array_encripted[0];
	/*
	for (i=0; i<4; i++){
	memcpy(&array_encripted[i], p + 8*i, sizeof (uint64_t));
	//printf("%"PRIu64"\t",array_encriptedi]);
	}
	*/

}

