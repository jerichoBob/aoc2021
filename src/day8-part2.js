/**
 * Path: src/day8-part2.js
 * Description:
 * 		7 segment displays are busted! you need to fix them.
 * 
 **/
import fs from 'graceful-fs';

// expresses how many segments are on for each number (represented by the array index) - 
// 0 has 6 segments turned on, 1 has 2, etc.
const segments = [6,2,5,5,4,5,6,3,7,6];

// we will have a decoder_ring which maps the current_signal to the correct_signal
// correct_signal = [a,b,c,d,e,f,g]
// decoder_ring will be some re-arrangement of the correct_signal
// decoder_fn will take a word and correctly decode it to form a correct output

const count_segments = (digit) => {
	return digit.split('').length;
};
const sort_digit = (digit) => {
	return digit.split('').sort().join('');
};
const bcd = (signals) => {
	const digit = [0,0,0,0,0,0,0];
	signals.split('').forEach((char) => {
		switch(char) {
			case 'a': digit[0] = 1; break;				
			case 'b': digit[1] = 1; break;
			case 'c': digit[2] = 1; break;
			case 'd': digit[3] = 1; break;
			case 'e': digit[4] = 1; break;
			case 'f': digit[5] = 1; break;
			case 'g': digit[6] = 1; break;
		}
	});
	return digit;
}
const vector_add= (a,b) => {
	return [a[0]+b[0],a[1]+b[1],a[2]+b[2],a[3]+b[3],a[4]+b[4],a[5]+b[5],a[6]+b[6]];
}

const day8_part2 = () => {
	console.log("day8 part2 exercise");
	var base = process.env.PWD;
	let file;
	const test = true;
	if (test) {
		file = fs.readFileSync(base + '/src/day8-input-sample.txt', 'utf8'); // sample input
	} else {
		file = fs.readFileSync(base + '/src/day8-input.txt', 'utf8');
	}

	const lines = file.split('\n');
	const re_io_separator = /\s\|\s/;
	
	let ctl = false;
	let bin_digit = [10];
	let digit_count = [0,0,0,0,0,0,0];
	lines.forEach(line => {
		// building the decoder ring (input->output mapping)
		// for each line
		// split the line into signal and output
		// split the signal into 10 digits
		// for each signal digit:
		//    count the number of segments in that digit
		//    count the number of digits that use that segment
		//
		// digit[0] = [0,0,1,0,0,1,0] and digit[0].length==2 is the segment count
		// segment[0].cnt == 4 is the digit count
		if (!ctl && re_io_separator.test(line)) {
			const [signal, output] = line.split(' | ');
			console.log(`signal: ${signal} \t output: ${output}`);
			signal.split(' ').forEach((digit,index) => {
				bin_digit[index] = bcd(digit);
				digit_count = vector_add(bin_digit[index], digit_count);
				const segments_on = count_segments(digit);
				
				const norml = sort_digit(digit);
				console.log(`  ${bin_digit[index]} \t segs: ${segments_on} \t norm: ${norml} \t digit_count: ${digit_count}`);
			});
		}	
		ctl = true;
	});	
}  

export default day8_part2;
