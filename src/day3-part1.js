/**
 * day3-part1.js
 * Language: javascript
 * Path: src/day3-part1.js
 * Description:
 * 		Input file is filled with a binary string, one binary string per line.
 * 		There are 2 new variables we will be calculating, 'gamma' and 'epsilon'
 * 		'gamma' is the bitwise "most common digit" across all of the bitstrings of the input
 * 		'epsilon' is the bitwise "least common digit" across all of the bitstrings of the input
 * 			for the most significant bit of 'gamma', we look at the most sign bit of each bitstring and if the most common bit is 1, then the msb in gamma will be 1.
 * 			the next most significant bit of 'gamma' is computed the same way, across all the bits for gamma.
 **/
import fs from 'graceful-fs';
const regex = /(\d)/g;

const display_bits = (base, bin_array) => {
	let output = base + "   ";
	for (let i = 0; i < bin_array.length; i++) {
		output += bin_array[i]+" ";
	}
	console.log(output);
}

/**
 * most_common_digit
 * loop through all of the lines, split the line into an array of bits.
 * For the position specified, determine if that position in the 
 */
const most_common_digit = (lines, position) => {
	let count = 0;
	let valid_lines = 0;
	lines.forEach(line => { // loop through each line
		let bits = line.match(regex) || []; // split the line into an array of bits
		if (bits.length > 0) {
			valid_lines++;
			count += bits[position] == '1' ? 1 : 0;
		}
		// console.log(`position: ${position}   line: ${line}  count: ${count}  valid_lines: ${valid_lines}`);
	});
	console.log(`position: ${position}   result: ${count > valid_lines/2}      ${count} ${valid_lines/2}`);
	return (count > valid_lines/2) ? 1 : 0;
}

/**
 * Takes an array of binary digits and returns the decimal value.
 * @param {*} binary 
 * @returns 
 */
const binary_to_decimal = (bin_array) => {
	let decimal = 0;
	let power = 0;
	for (let i = bin_array.length - 1; i >= 0; i--) {
		decimal += bin_array[i] * Math.pow(2, power);
		power++;
	}
	return decimal;
}

const binary_inversion = (bin_array) => {
	let inverted = [];
	for (let i = 0; i < bin_array.length; i++) {
		inverted.push(bin_array[i] == '1' ? '0' : '1');
	}
	return inverted;
}

const day3_part1 = () => {
	console.log("day3 part1 exercise");
	var base = process.env.PWD;

	const file = fs.readFileSync(base + '/src/day3-input.txt', 'utf8');
	const lines = file.split('\n');

	const str = '000000000000'; // 12 bits long
	const gamma_bits = str.match(regex);
	// display_bits("gamma_bits", gamma_bits);
	
	gamma_bits.forEach((bit,index) => {
		gamma_bits[index] = most_common_digit(lines, index);
	});
	let gamma = binary_to_decimal(gamma_bits);
	console.log(`gamma: ${gamma_bits.join('')} gamma: ${gamma}`);
	
	const epsilon_bits = binary_inversion(gamma_bits);
	let epsilon = binary_to_decimal(epsilon_bits);
	console.log(`epsilon: ${epsilon_bits.join('')} epsilon: ${epsilon}`);

	const power = gamma * epsilon;
	console.log(`power: ${power}`);
}  

export default day3_part1;

