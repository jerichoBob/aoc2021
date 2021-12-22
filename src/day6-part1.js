/**
 * day6-part1.js
 * Language: javascript
 * Path: src/day6-part1.js
 * Description:
 * 		Looking for undersea thermal vents
 **/
import fs from 'graceful-fs';

let count = 0;
const day6_part1 = () => {
	console.log("day6 part1 exercise");
	var base = process.env.PWD;
	let file;
	const test = false;
	if (test) {
		file = fs.readFileSync(base + '/src/day6-input-sample.txt', 'utf8'); // sample input
	} else {
		file = fs.readFileSync(base + '/src/day6-input.txt', 'utf8');
	}
	let fish_timer_list = file.split(',');
	const iteration_count = 256;
	for (let iteration = 0; iteration <= iteration_count; iteration++) {
		count = fish_timer_list.length;
		console.log(`${iteration}::  ${count}`);
		let additions = [];
		for (let ndx = 0; ndx < fish_timer_list.length; ndx++) {
			fish_timer_list[ndx]--;
			if (fish_timer_list[ndx] < 0) {
				fish_timer_list[ndx] = 6;
				additions.push(8);
			}
		}
		if (iteration < iteration_count) fish_timer_list = fish_timer_list.concat(additions);
	}
	count = fish_timer_list.length;
	console.log(`# of fish: ${count}`);
	// 

}  

export default day6_part1;

