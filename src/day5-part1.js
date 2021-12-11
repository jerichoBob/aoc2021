/**
 * day5-part1.js
 * Language: javascript
 * Path: src/day5-part1.js
 * Description:
 * 		Looking for undersea thermal vents
 **/
import fs from 'graceful-fs';
const re_to_from = /^(\d+)\,(\d+)\s*\-\>\s*(\d+)\,(\d+)$/;
let nondiag_lines = [];
class Line {
	constructor(x1, y1, x2, y2) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
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
			if (c[1]===c[3]||c[2]===c[4]) {

				nondiag_lines.push(line);
				// console.log(`${line.print("|- >>>>>> non-diag line:")}`);
			// } else {
			// 	diag_lines.push(new Line(c[1],c[2],c[3],c[4]));
			// 	console.log(`${line.print("   \\/ >>>>>> diag line:")}`);

			}
		}
	});
}

const day5_part1 = () => {
	console.log("day5 part1 exercise");
	var base = process.env.PWD;
	let file;
	const test = false;
	if (test) {
		file = fs.readFileSync(base + '/src/day5-input-sample.txt', 'utf8'); // sample input
	} else {
		file = fs.readFileSync(base + '/src/day5-input.txt', 'utf8');
	}
	parseFile(file);

	// find max x,y
	let max_x = 0;
	let max_y = 0;
	nondiag_lines.forEach(line => {
		max_x = Math.max(max_x, line.x1, line.x2);
		max_y = Math.max(max_y, line.y1, line.y2);
	});
	console.log(`max_x: ${max_x} max_y: ${max_y}`);
	console.log(`nondiag_lines: ${nondiag_lines.length}`);

	let counter = {};
	let ckey = "";
	nondiag_lines.forEach(line => {
		if (line.x1 === line.x2) {
			const start = Math.min(line.y1, line.y2);
			const end = Math.max(line.y1, line.y2);
			for (let y = start; y <= end; y++) {
				ckey = `${line.x1},${y}`;
				counter[ckey]=(counter[ckey]||0)+1;
			}
			
		} else { // line.y1 === line.y2
			const start = Math.min(line.x1, line.x2);
			const end = Math.max(line.x1, line.x2);
			for (let x = start; x <= end; x++) {
				ckey = `${x},${line.y1}`;
				counter[ckey]=(counter[ckey]||0)+1;
			}
		}
	});

	let count = 0;
	Object.keys(counter).filter(key => counter[key]>1).forEach(key => {
		count++;
	});
	console.log(`count: ${count}`);
}  

export default day5_part1;

