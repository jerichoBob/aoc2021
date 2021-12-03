// day1.js
// read a file that contains 1 number for each line
// determine if the number on the current line is greater or less than the number on the previous line
// if greater than, then increase the count.
// display the count of decreses after the entire file is read
// const fs = require('graceful-fs');
import fs from 'graceful-fs';

function day1_part1() {
	console.log("day1 exercise");
	var base = process.env.PWD;

	const file = fs.readFileSync(base + '/src/day1-input.txt', 'utf8');
	const lines = file.split('\n');
	let count = 0;
	let prev = -1;

	lines.forEach(line => {
		const num = parseInt(line);
		if (prev !== -1 && num > prev) count++;
		// console.log(`curr: ${num} prev: ${prev}  count: ${count}`);
		prev = num;
	});
	console.log('number of times this line was greater: '+count);
}  

export default day1_part1;
