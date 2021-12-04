/**
 * day3-part1.js
 * Language: javascript
 * Path: src/day3-part1.js
 * Description:
 * 		Input file is filled with a binary string, one binary string per line.
 * 		We are asked to calculate the Life Support Rating based on 2 new variables, the O2 Generator Rate and the CO2 Scrubber Rate.
 
 **/
import fs from 'graceful-fs';
const re_digits = /(\d)/g;

const display_bits = (base, bin_array) => {
	let output = base + "   ";
	for (let i = 0; i < bin_array.length; i++) {
		output += bin_array[i]+" ";
	}
	console.log(output);
}

const count_digits_at_pos = (lines, digit_val, pos) => {
	let count = 0;
	lines.forEach(line => {
		let bits = line.match(re_digits) || [];
		if (bits.length > 0) {
			if (bits[pos] == digit_val) count++;
		}
	});
	return count;
}
/**
 * most_common_digit
 * loop through all of the lines, split the line into an array of bits.
 * For the position specified, determine if that position in the 
 */
const most_common_digit = (lines, position) => {
	let count_1s = count_digits_at_pos(lines, 1, position);
	let count_0s = count_digits_at_pos(lines, 0, position);
	let most_common_val = (count_1s > count_0s)? 1 : 0;
	console.log(`pos: ${position}   count_1s: ${count_1s}\tcount_0s: ${count_0s}  most_common_val: ${most_common_val}`);

	return most_common_val;
}

/**
 * Takes an array of binary digits and returns the decimal value.
 * @param {[]} bin_array - an array of 0's and 1's
 * @returns {int} decimal value
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
		inverted.push(bin_array[i] == 1 ? 0 : 1);
	}
	return inverted;
}

const filter_lines = (lines, mode, bit_cnt) => {
	let lines_copy = lines.slice(); // copy the lines array
	let count_1s = 0, count_0s = 0;
	let comparison_val; // turns out we need to override the criteria bit once we start filtering :)
	for (let pos = 0; pos < bit_cnt; pos++) {
		let filtered_set = [];

		if (lines_copy.length > 1) { // filtering only works if there is more than one line
			console.log(`\npos: ${pos}\t# of lines to be processed: ${lines_copy.length} (shown above)`);
			count_1s = count_digits_at_pos(lines_copy, 1, pos);
			count_0s = count_digits_at_pos(lines_copy, 0, pos);

			if (mode == 'O2') {
				comparison_val = (count_1s >= count_0s)? 1 : 0; // most common value, or 1 (if same number of 1's and 0's)
			} else { // mode == 'CO2'
				comparison_val = (count_1s >= count_0s)? 0 : 1; // least common value, or 0 (if same number of 1's and 0's)
			}
			console.log(`pos: ${pos}   count_1s: ${count_1s}\tcount_0s: ${count_0s}  comparison_val: ${comparison_val}`);

			lines_copy.forEach(line => { // loop through each line
				let line_bits = line.match(re_digits) || []; // split the line into an array of bits
				if (line_bits.length > 0) {
					if (line_bits[pos] == comparison_val) filtered_set.push(line);
				}
			});
			// console.log(`pos: ${pos}\tlength of filtered_set: ${filtered_set.length}`);

			// set up for the next time around
			lines_copy = filtered_set.slice(); // copy the filtered_set array	
			console.log(lines_copy);
		}
	}
	console.log(`result: ${lines_copy}`);
	return lines_copy[0];
}

const day3_part2 = () => {
	console.log("day3 part2 exercise");
	var base = process.env.PWD;
	let bit_cnt, file;
	const test = false;
	if (test) {
		bit_cnt = 5;
		file = fs.readFileSync(base + '/src/day3-input-sample.txt', 'utf8'); // sample input
	} else {
		bit_cnt = 12;
		file = fs.readFileSync(base + '/src/day3-input.txt', 'utf8');
	}
	const lines = file.split('\n');

	
	console.log("\n================= Calculate Oxygen Generator Rate =================");
	let ox_gen_rate_line = filter_lines(lines, "O2", bit_cnt);
	let ox_gen_rate_val_bits = ox_gen_rate_line.match(re_digits) || [];
	let ox_gen_rate_val_decimal = binary_to_decimal(ox_gen_rate_val_bits);
	console.log(`Oxygen Generator Rate (bits): ${ox_gen_rate_val_bits.join('')} Oxygen Generator Rate (Decimal): ${ox_gen_rate_val_decimal}`);

	console.log("\n================= Calculate CO2 Scrubber Rate =================");
	let c02_scrub_rate_line = filter_lines(lines, "CO2", bit_cnt);
	let c02_scrub_rate_val_bits = c02_scrub_rate_line.match(re_digits) || [];
	let c02_scrub_rate_val_decimal = binary_to_decimal(c02_scrub_rate_val_bits);
	console.log(`CO2 Scrub Rate (bits): ${c02_scrub_rate_val_bits.join('')} CO2 Scrub Rate (Decimal): ${c02_scrub_rate_val_decimal}`);

	console.log("\n================= Life Support Rating =================");

	console.log(`O2 Gen Rate (bits):    ${ox_gen_rate_val_bits.join('')}\tO2 Gen Rate (Decimal):    ${ox_gen_rate_val_decimal}`);
	console.log(`CO2 Scrub Rate (bits): ${c02_scrub_rate_val_bits.join('')}\tCO2 Scrub Rate (Decimal): ${c02_scrub_rate_val_decimal}`);
	// console.log("");
	console.log(`\nLife Support Rating: ${ox_gen_rate_val_decimal * c02_scrub_rate_val_decimal}`);
	/**
	 * ================= Life Support Rating =================
	 * O2 Gen Rate (bits):    110100010111     O2 Gen Rate (Decimal):    3351
	 * CO2 Scrub Rate (bits): 001001101010     CO2 Scrub Rate (Decimal): 618
	 * Life Support Rating: 2070918
	 * ================= Life Support Rating =================
	 * O2 Gen Rate (bits):    111101010001     O2 Gen Rate (Decimal):    3921
	 * CO2 Scrub Rate (bits): 101000000100     CO2 Scrub Rate (Decimal): 2564
	 * Life Support Rating: 10053444
	 * ================ Life Support Rating =================
	 * O2 Gen Rate (bits):    111101010001     O2 Gen Rate (Decimal):    3921
	 * CO2 Scrub Rate (bits): 001101001011     CO2 Scrub Rate (Decimal): 843
	 * Life Support Rating: 3305403
	 * ================ Life Support Rating =================
	 * O2 Gen Rate (bits):    111101010001     O2 Gen Rate (Decimal):    3921
	 * CO2 Scrub Rate (bits): 001101000100     CO2 Scrub Rate (Decimal): 836
	 * Life Support Rating: 3277956  <<<<<< finally, the right answer!
	 */
}  

export default day3_part2;

