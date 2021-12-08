/**
 * day4-part1.js
 * Language: javascript
 * Path: src/day4-part1.js
 * Description:
 * 		Let's play Bingo!
 * Board:
 * 		- pos[row][col].val = int_value
 * 		- pos[row][col].sel = true if selected
 * 		- solved = true if board is solved
 **/
import fs from 'graceful-fs';
const comma = /\,/;
const re_bingo_row = /^\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s*$/;
const re_empty_line = /^\s*$/;
let numbers = [];
let boards = [];
let row_cnt = 0;
let current_board = {};
let board_cnt = 0;

/**
 * defines an empty board object
 */
function Board () {
	this.used = false;
	this.solved = false;
	this.pos=new Array(5);
	this.pos[0] = new Array(5);
	this.pos[1] = new Array(5);
	this.pos[2] = new Array(5);
	this.pos[3] = new Array(5);
	this.pos[4] = new Array(5);
	for (let row=0;row<5;row++) {
		for (let col=0;col<5;col++) {
			this.pos[row][col] = {};
			this.pos[row][col].val = 0;
			this.pos[row][col].sel = false;
		}
	}
}

const parseFile = (file) => {
	const lines = file.split('\n');

	lines.forEach(line => {
		// console.log(`line: ${line}`);
		if (comma.test(line)) {
			numbers = line.split(comma);
			// process.stdout.write('numbers: [' + numbers + ']\n');
			console.log('numbers: [ ' + numbers + ' ]\n');

		} else if (re_bingo_row.test(line)) {
			const row = line.match(re_bingo_row);
			boardAddRow(current_board, row_cnt, row);
			row_cnt++;

		} else if (re_empty_line.test(line)) {
			// console.log(`empty line`);
			row_cnt=0;
			boards[board_cnt] = new Board();
			current_board = boards[board_cnt];
			board_cnt++;
		}
	});
}

const boardAddRow= (board, row_index, row_array) => {
	board.used = true;
	for (let col=0;col<5;col++) {
		board.pos[row_index][col].val = parseInt(row_array[col+1]);
	}
}
const boardDisplay = () => {
	boards.forEach((board,bindex) => {
		console.log(`board[${bindex}]: `);
		console.log(`\t.solved: ${board.solved}`);
		board.pos.forEach(row => {
			row.forEach(cell => {
				// console.log(`\t.pos[${cell.val}]\t.sel: ${cell.sel}`);
				process.stdout.write(`\t${cell.val} (${(cell.sel)?1:0})`);
			});
			console.log('');
		});
	});

}
const boardRemoveUnused = () => {
	boards = boards.filter(board => board.used);
}
/**
 * checks all of the boards and if any is solved, that board will be marked as solved and its index will be returned, otherwise -1
 * @returns index of solved board, otherwise -1
 */
const boardIsSolved = () => {
	let row = [];
	let board = [];
	for (let bindex=0; bindex<boards.length; bindex++) {
		board = boards[bindex];
		// see if there is any row solution yet
		for (let i=0;i<5;i++) {
			row = board.pos[i];
			// board.pos.forEach(row => {
			if (row[0].sel && row[1].sel && row[2].sel && row[3].sel && row[4].sel) {
				board.solved = true;
				return bindex;
			}
		};		

		// see if there is any column solution yet
		for (let col=0;col<5;col++) {
			if (board.pos[0][col].sel && board.pos[1][col].sel && board.pos[2][col].sel && board.pos[3][col].sel && board.pos[4][col].sel) {
				board.solved = true;
				return bindex;
			}
		}
	};

	return -100; // default return
}
/**
 * 
 */
const boardAreAllSolved = () => {
}

/**
 * to score the board, add up all of the unseleced numbers 
 * @param {*} board 
 */
const boardScoreBoard = (board, winning_number) => {
	let sum_unselected = 0;
	board.pos.forEach(row => {
		row.forEach(cell => {
			if (!cell.sel) sum_unselected += cell.val;
		});
	});
	return sum_unselected*winning_number;
}

const day4_part1 = () => {
	console.log("day4 part1 exercise");
	var base = process.env.PWD;
	let file;
	const test = true;
	if (test) {
		file = fs.readFileSync(base + '/src/day4-input-sample.txt', 'utf8'); // sample input
	} else {
		file = fs.readFileSync(base + '/src/day4-input.txt', 'utf8');
	}
	parseFile(file);

	boardRemoveUnused();
	// boardDisplay();

	// let number = "7";
	let solved_board_index = -1;
	let winning_number = -1;
	numbers.forEach(number => {
		// console.log("===============================");
		// console.log(`number: ${number}`);
		if (solved_board_index < 0) {
			boards.forEach(board => {
				board.pos.forEach(row => {
					row.forEach(cell => {
						if (cell.val == parseInt(number)) cell.sel = true;
					});
				});
			});
			// does that do it?
			solved_board_index = boardIsSolved();		
			// boardDisplay();
			if (solved_board_index >= 0) {
				console.log("Winning Board Index: "+ solved_board_index);	
				winning_number = number;
			}
		}
	});

	let score = boardScoreBoard(boards[solved_board_index], winning_number);
	console.log(`score: ${score} <<<<<<<<<<<<<<<<<<<<<<<`);
}  

export default day4_part1;

