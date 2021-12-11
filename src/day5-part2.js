/**
 * day5-part2.js
 * Language: javascript
 * Path: src/day5-part1.js
 * Description:
 * 		Looking for undersea thermal vents
 **/
import fs from 'graceful-fs';
const re_to_from = /^(\d+)\,(\d+)\s*\-\>\s*(\d+)\,(\d+)$/;
let line_array = [];
// let diag_lines = [];
class Line {
	constructor(x1, y1, x2, y2) {
		this.x1 = parseInt(x1);
		this.y1 = parseInt(y1);
		this.x2 = parseInt(x2);
		this.y2 = parseInt(y2);
	}
	print = (str) => {
		return `${str} ${this.x1},${this.y1} - ${this.x2},${this.y2}`;
	};
}

const parseFile = (file) => {
	const file_lines = file.split('\n');

	file_lines.forEach(file_line => {
		// console.log(`line: ${file_line}`);
		if (re_to_from.test(file_line)) {
			const c = file_line.match(re_to_from);
			// console.log(`coords: [${c[1]},${c[2]}]<---->[${c[3]},${c[4]}]`);
			const line = new Line(c[1], c[2], c[3], c[4]);

			line_array.push(line);
			// console.log(`${line.print("line: ")}`);
		}
	});
}

const day5_part2 = () => {
	console.log("day5 part2 exercise");
	var base = process.env.PWD;
	let file;
	const test = false;
	if (test) {
		file = fs.readFileSync(base + '/src/day5-input-sample.txt', 'utf8'); // sample input
	} else {
		file = fs.readFileSync(base + '/src/day5-input.txt', 'utf8');
	}
	parseFile(file);
// 
	let counter = {};
	let ckey = "";
	line_array.forEach(line => {

		const xsteps = Math.abs(line.x2 - line.x1);
		const xincr = (line.x1 < line.x2) ? 1 : (line.x1 > line.x2) ? -1 : 0;
		const ysteps = Math.abs(line.y2 - line.y1);
		const yincr = (line.y1 < line.y2) ? 1 : (line.y1 > line.y2) ? -1 : 0;

		// console.log(`${line.print("line: ")}`);
		// console.log(`xsteps: ${xsteps}\txincr: ${xincr}\tysteps: ${ysteps}\tyincr: ${yincr}`);

		for (let step=0;step<=Math.max(xsteps,ysteps);step++) {
			let x = line.x1 + (step * xincr);
			let y = line.y1 + (step * yincr);
			ckey = `${x},${y}`;
			counter[ckey]=(counter[ckey]||0)+1;
			// console.log(`${ckey} :::: ${counter[ckey]}`);
		}
	});


	let count = 0;
	Object.keys(counter).filter(key => counter[key]>1).forEach(key => {
		console.log(`${key} : ${counter[key]}`);
		count++;
	});
	console.log(`count: ${count}`);
}  

export default day5_part2;

