/**
 * Path: src/day8-part2.js
 * Description:
 * 		7 segment displays are busted! you need to fix them.
 * 
 **/
import fs from 'graceful-fs';


// we will have a decoder_ring which maps the current_signal to the correct_signal
// correct_signal = [a,b,c,d,e,f,g]
// decoder_ring will be some re-arrangement of the correct_signal
// decoder_fn will take a word and correctly decode it to form a correct output

const count_segments = (digit) => {
	const reducer = (accumulator, currentValue) => 0 + accumulator + currentValue;
	return digit.reduce(reducer, 0);
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
let good = [10];
good[0] = [1,1,1,0,1,1,1].join('');
good[1] = [0,0,1,0,0,1,0].join('');
good[2] = [1,0,1,1,1,0,1].join('');
good[3] = [1,0,1,1,0,1,1].join('');
good[4] = [0,1,1,1,0,1,0].join('');
good[5] = [1,1,0,1,0,1,1].join('');
good[6] = [1,1,0,1,1,1,1].join('');
good[7] = [1,0,1,0,0,1,0].join('');
good[8] = [1,1,1,1,1,1,1].join('');
good[9] = [1,1,1,1,0,1,1].join('');



const remap = (bin_digit, mapper) => {
	let decoded = [0,0,0,0,0,0,0];
	mapper.forEach((segment,index) => {
		decoded[mapper[index]] = bin_digit[index];
	});
	return decoded;
}

const decode = (bin_digit, mapper) => {
	let decoded = [0,0,0,0,0,0,0];
	mapper.forEach((segment,index) => {
		decoded[mapper[index]] = bin_digit[index];
	});
	const d = decoded.join('');
	for (let i = 0; i < good.length; i++) {
		// console.log(`\t comparing ${d} vs ${good[i]}`);
		if (d == good[i]) return i;
	}
	

	return -1; // just in case - but shouldn't happen :D
}

const day8_part2 = () => {
	console.log("day8 part2 exercise");
	var base = process.env.PWD;
	let file;
	const test = false;
	if (test) {
		file = fs.readFileSync(base + '/src/day8-input-sample.txt', 'utf8'); // sample input
	} else {
		file = fs.readFileSync(base + '/src/day8-input.txt', 'utf8');
	}

	const lines = file.split('\n');
	const re_io_separator = /\s\|\s/;
	
	let ctl = false;
	let debug = false;
	let total = 0;
	// let bin_digit = [10];
	// let segs = [10];
	// let digit_count = [0,0,0,0,0,0,0];
	lines.forEach(line => {
		let bin_digit = [10];
		let segs = [10];
		let digit_count = [0,0,0,0,0,0,0];
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
		// analyze input
		if (!ctl && re_io_separator.test(line)) {
			const [signal, output] = line.split(' | ');
			if (debug) console.log(`signal: ${signal} \t output: ${output}`);
			signal.split(' ').forEach((digit,index) => {
				bin_digit[index] = bcd(digit);
				digit_count = vector_add(bin_digit[index], digit_count);
				segs[index] = count_segments(bin_digit[index]);
				
				const norml = sort_digit(digit);
				if (debug) console.log(`  ${bin_digit[index]} \t segs: ${segs[index]} \t norm: ${norml} \t digit_count: ${digit_count}`);
			});


			if (debug) console.log("findng the index for the 4, 6 and 9")
			// begin re-mapping the busted signals
			let mapper = [9,9,9,9,9,9,9];
			for (let i=0; i<7; i++) {
				if (digit_count[i] === 4) {
					mapper[i] = 4;
					for (let j=0; j<10; j++) {bin_digit[j][i] = 0;}
				} else if (digit_count[i] === 6) {
					mapper[i] = 1;
					for (let j=0; j<10; j++) {bin_digit[j][i] = 0;}
				} else if (digit_count[i] === 9) {
					mapper[i] = 5;
					for (let j=0; j<10; j++) {bin_digit[j][i] = 0;}
				}
			}
			if (debug) {
				console.log("===========================================================");
				console.log(`mapper:   ${mapper}`);
				console.log(`count:    ${digit_count}`);
				bin_digit.forEach((digit,index) =>{console.log(`digit[${index}]: ${digit} :: ${segs[index]}`);}); 
			}



			if (debug) console.log("findng the index for the 2")
			let index2 = -1;
			for (let i=0;i<10;i++) {
				if (count_segments(bin_digit[i]) === 1) {
					for (let seg=0; seg<7; seg++) {
						if (bin_digit[i][seg] === 1)  index2 = seg;
					}
				}
			}
			if (index2 === -1) {dieorex("index2 not found");}
			mapper[index2] = 2;
			for (let i=0;i<10;i++)  bin_digit[i][index2] = 0;


			if (debug) {
				console.log("===========================================================");
				console.log(`mapper:   ${mapper}`);
				console.log(`count:    ${digit_count}`);
				bin_digit.forEach((digit,index) =>{console.log(`digit[${index}]: ${digit} :: ${segs[index]}`);}); 
			}


			if (debug) console.log("findng the index for the 3")
			// find the unaccounted for segment where the segment count is 4
			let index3 = -1;
			for (let d_index=0; d_index<10; d_index++) { // loop through all digits
				if (segs[d_index] === 4) { // find the digit with 4 segments
					for (let seg=0; seg<7; seg++) { // loop through all segments
						if (bin_digit[d_index][seg] === 1)  index3 = seg; // and find the segment that is still on
					}
				}
			}
			if (index3 === -1) {dieorex("index3 not found");}
			mapper[index3] = 3;
			for (let i=0;i<10;i++)  bin_digit[i][index3] = 0;

			if (debug) {
				console.log("===========================================================");
				console.log(`mapper:   ${mapper}`);
				console.log(`count:    ${digit_count}`);
				bin_digit.forEach((digit,index) =>{console.log(`digit[${index}]: ${digit} :: ${segs[index]}`);}); 
			}



			if (debug) console.log("findng the index for the 0")
			let index0 = -1;
			for (let i=0;i<10;i++) {
				if (count_segments(bin_digit[i]) === 1) {
					for (let seg=0; seg<7; seg++) {
						if (bin_digit[i][seg] === 1)  index0 = seg;
					}
				}
			}
			if (index0 === -1) {dieorex("index0 not found");}
			mapper[index0] = 0;
			for (let i=0;i<10;i++)  bin_digit[i][index0] = 0;


			if (debug) {
				console.log("===========================================================");
				console.log(`mapper:   ${mapper}`);
				console.log(`count:    ${digit_count}`);
				bin_digit.forEach((digit,index) =>{console.log(`digit[${index}]: ${digit} :: ${segs[index]}`);}); 
			}





			if (debug) console.log("findng the index for the 6")
			let index6 = -1;
			for (let d_index=0; d_index<10; d_index++) { // loop through all digits
				if (segs[d_index] === 7) { // find the digit with 7 segments
					for (let seg=0; seg<7; seg++) { // loop through all segments
						if (bin_digit[d_index][seg] === 1)  index6 = seg; // and find the segment that is still on
					}
				}
			}
			if (index6 === -1) {dieorex("index6 not found");}
			mapper[index6] = 6;
			for (let i=0;i<10;i++)  bin_digit[i][index6] = 0;

			if (debug) {
				console.log("===========================================================");
				console.log(`mapper:   ${mapper}`);
				console.log(`count:    ${digit_count}`);
				bin_digit.forEach((digit,index) =>{console.log(`digit[${index}]: ${digit} :: ${segs[index]}`);}); 
				console.log("===========================================================");
			}


			bin_digit = [10];// resuse the array

			let array_val = [];
			// now that we have the decoder ring (mapper[]), let's loop through all of the outputs and decode them
			output.split(' ').forEach((digit,index) => {
				bin_digit[index] = bcd(digit);
				let good = remap(bin_digit[index], mapper);
				let decoded_digit = decode(bin_digit[index], mapper);
				array_val.push(decoded_digit);	
				if (debug) console.log(`output digit[${index}]: ${digit.padStart(7) } :: ${bin_digit[index]} :: ${good} ::: ${decoded_digit}`);
			});
			let val = 0;
			for (let i=array_val.length-1;i>=0;i--)  val += array_val[i] * 10**(array_val.length-1-i);
			total += val;
			if (debug) console.log(`output: ${output} :: ${val} <<<<<<<<<<<`);
			if (debug) {
				console.log("===========================================================");
				console.log("===========================================================");
				console.log();
			}
		}			
		// ctl = true;
	});	
	console.log(`total: ${total}`);
}  

export default day8_part2;
