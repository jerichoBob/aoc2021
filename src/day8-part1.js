/**
 * Path: src/day8-part1.js
 * Description:
 * 		7 segment displays are busted!
 * 
 **/
import fs from 'graceful-fs';

// expresses how many segments are on for each number (represented by the array index) - 
// 0 has 6 segments turned on, 1 has 2, etc.
const segments = [6,2,5,5,4,5,6,3,7,6];

const count_segments = (digit) => {
	return digit.split('').length;
};
const day8_part1 = () => {
	console.log("day8 part1 exercise");
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
	let count = 0;
	lines.forEach(line => {
		if (re_io_separator.test(line)) {
			const [input,output] = line.split(' | ');
			console.log(`input: ${input} \t output: ${output}`);
			output.split(' ').forEach(digit => {
				const segments_on = count_segments(digit);
				console.log(`   ${digit} has ${segments_on} segments active`);
				if (segments_on === segments[1] || 
					segments_on === segments[4] || 
					segments_on === segments[7] || 
					segments_on === segments[8]) {
					count++;
				}
			});
		}	
	});	
	console.log(`count: ${count}`);
}  

export default day8_part1;
