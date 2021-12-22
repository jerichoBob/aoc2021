/**
 * day7-part1.js
 * Language: javascript
 * Path: src/day7-part1.js
 * Description:
 * 		Killer Whales and Crabs in Subs - aka optimization of crab sub alignment 
 * 
 **/
import fs from 'graceful-fs';


const difference_maker = (array, point) => {
	const difference_reducer = (previousValue, currentValue) => previousValue + Math.abs(currentValue-point);

	return array.reduce(difference_reducer, 0);
};

const day7_part1 = () => {
	console.log("day7 part1 exercise");
	var base = process.env.PWD;
	let file;
	const test = false;
	if (test) {
		file = fs.readFileSync(base + '/src/day7-input-sample.txt', 'utf8'); // sample input
	} else {
		file = fs.readFileSync(base + '/src/day7-input.txt', 'utf8');
	}
	const input = file.split(',').map(Number);
	const sorted = input.slice().sort((a, b) => {
		return a - b;
	});
	console.log(sorted);
	const min = sorted[0];
	const max = sorted[sorted.length - 1];
	let min_diff = -1;
	for (let i = min; i <= max; i++) {
		const difference = difference_maker(sorted, i);
		// console.log(`i: ${i} total difference: , ${difference}`);
		if (min_diff === -1 || difference < min_diff) {
			min_diff = difference;
			console.log(`i: ${i} total difference: , ${difference}`);
		}
	}
	console.log(`min_diff: ${min_diff}`);
}  

export default day7_part1;

