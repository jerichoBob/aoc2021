/**
 * day7-part1.js
 * Language: javascript
 * Path: src/day7-part1.js
 * Description:
 * 		Killer Whales and Crabs in Subs - aka optimization of crab sub alignment 
 * 
 **/
import fs from 'graceful-fs';

// const simple_cost = (value, point) => { return Math.abs(value - point); }
const additive_cost = (value, point) => { 
	const diff = Math.abs(value - point); 
	let sum = 0;
	for (let i = 0; i <= diff; i++) {
		sum += i;
	}
	// console.log(`value: ${value} point: ${point} diff: ${diff} sum: ${sum}`);
	return sum;
}

const difference_maker = (array, point) => {
	const difference_reducer = (previousValue, currentValue) => previousValue + additive_cost(currentValue, point);
	return array.reduce(difference_reducer, 0);
};

const day7_part2 = () => {
	console.log("day7 part2 exercise");
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
		// console.log("===========================");
		const difference = difference_maker(sorted, i);
		// console.log(`i: ${i} total difference: , ${difference}`);
		if (min_diff === -1 || difference < min_diff) {
			min_diff = difference;
			console.log(`i: ${i} total difference: ${difference}`);
		}
	}
	console.log(`min_diff: ${min_diff}`);
}  

export default day7_part2;
