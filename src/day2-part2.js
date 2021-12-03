/**
 * day2-part2.js
 * Language: javascript
 * Path: src/day2-part1.js
 * Description:
 * 		Input file is filled with directional commands, one command per line.
 * 		The commands instruct the submarine to either move forward, move up, or move down. 
 * 		Up   decreases the aim by the number of units specified.
 * 		Down increases the aim by the number of units specified.
 * 		Forward does 2 things:
 * 			it moves the horizontal position forward by the number of units specified.
 * 			it increases the depth by multiplying the aim by the number of units specified.
 **/
import fs from 'graceful-fs';

const day2_part1 = () => {
	console.log("day2 part2 exercise");
	var base = process.env.PWD;

	const file = fs.readFileSync(base + '/src/day2-input.txt', 'utf8');
	const lines = file.split('\n');
	let horizontal = 0;
	let depth = 0;
	let aim = 0;

	const regex = /^([\w]+)\s+(\d+)$/;
	lines.forEach(line => {
		let match = line.match(regex) || [];
		if (match.length > 0) {
			let command = match[1];
			let value = parseInt(match[2]);

			if (command === 'up') { aim -= value; }
			else if (command === 'down') { aim += value; }
			else if (command === 'forward') { 
				horizontal += value; 
				depth += aim * value;
			}

			console.log(`line: ${line}\t\tcommand: ${command.padStart(7)}\tvalue: ${value}\thorizontal: ${horizontal}\tdepth: ${depth} `);			
		} else {
			console.log(`line: ${line}\t\t no match`);		
		}
	});
	
	let final_value = horizontal * depth;
	console.log(`horizontal: ${horizontal} depth: ${depth} final value: ${final_value}`);
}  

export default day2_part1;

