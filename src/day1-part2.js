/**
 * day1-part2.js
 * Language: javascript
 * Path: src/day1-part2.js
 * Description:
 *    Read a file that contains 1 number for each line.
 *    Read in the first 3 lines (line1_val, line2_val, line3_val)
 *    Add those 3 values together: curr_val = line1_val + line2_val + line3_val
 *    Move one line ahead in the file, and read those three lines (line2_val, line3_val, line4_val)
 *    Add those 3 values together: curr_val = line2_val + line2_val + line3_val

 **/
import fs from 'graceful-fs';

const day1_part2 = () => {
	console.log("day1 part2 exercise");
	var base = process.env.PWD;

	const file = fs.readFileSync(base + '/src/day1-input.txt', 'utf8');
	const lines = file.split('\n');

	let count=0;
	let index = 3;
	let line1_val = parseInt(lines[0]);
	let line2_val = parseInt(lines[1]);
	let line3_val = parseInt(lines[2]);
	let line4_val = parseInt(lines[3]);
	while(index < lines.length) {

		let windowA = line1_val+line2_val+line3_val;
		let windowB = line2_val+line3_val+line4_val;

		console.log(windowA, windowB, (windowA < windowB) ? "++" : "-----");
		if (windowA < windowB) count++;
		index++;
		line1_val = line2_val;
		line2_val = line3_val;
		line3_val = line4_val;
		line4_val = parseInt(lines[index]);

	}

	console.log('number of times this window(size3) was greater than the previous: '+count);
}  

export default day1_part2;

