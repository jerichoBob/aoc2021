/**
 * day6-part2.js
 * Language: javascript
 * Path: src/day6-part1.js
 * Description:
 * 		Laternfish -- this algorithm is COMPLETELY DIFFERENT than the algorithm in day6-part1.js (which I guess is the whole point :)/
 *   for this implementatino, we will create an array of 9 element counters (I think) and each one will contain the number of fish that have that long to live.
 * so when you read in the input array, you have  96 fish with a lifetime of 1 left, 54 fish with a timer of 2, 48 fish with a timer of 3, 51 fish with with a timer of 4, and 51 fish with a timer of 5
 * or 
 *     timer val	count
 *			0		0
 *			1		96
 *			2		54
 *			3		48
 *			4		51
 *			5		51
 *          6		0
 *			7		0
 *			8		0
 * 	
 *  At each iteration, we will shift the array down one, add the value of the zeroth element to the value in index 6 position,
 *  and insert the zeroth element into the index 8 position. 
 *  Crazy simple, only took me walking away from the problem for about a week :)
 *  Cool part is that its lightening fast, and doesn't overflow the stack.
 * 
 * [
 * 	250717432314704720000,
 * 	271908150141302800000,
 * 	298188752025066400000,
 * 	324184549286704100000,
 * 	354192766057029960000,
 * 	386775372672323940000,
 * 	420716632794749300000,
 * 	210415066773747000000,
 * 	228449636349371100000
 * ]
 * iteration 500 count 2.7455483584149995e+21
 **/
import fs from 'graceful-fs';

let count = 0;
const day6_part2 = () => {
	console.log("day6 part1 exercise");
	var base = process.env.PWD;
	let file;
	const test = false;
	if (test) {
		file = fs.readFileSync(base + '/src/day6-input-sample.txt', 'utf8'); // sample input
	} else {
		file = fs.readFileSync(base + '/src/day6-input.txt', 'utf8');
	}
	const timer = [0,96,54,48,51,51,0,0,0];
	const iteration_count = 256;
	for (let iteration = 1; iteration <= iteration_count; iteration++) {
		// save off the oth element (to be used later)
		const zeroth_element = timer[0];
		// shift everything down one
		for (let i = 0; i < timer.length - 1; i++) {
			timer[i] = timer[i+1];
		}
		// add 0th value to the value in index 6
		timer[6] += zeroth_element;
		// insert 0th value into index 8
		timer[8] = zeroth_element;
		// count the number of fish
		const cnt = timer.reduce((acc, curr) => { return acc + curr; }, 0);
		console.dir(timer);
		console.log(`iteration ${iteration} count ${cnt}`);
	}
}  

export default day6_part2;

