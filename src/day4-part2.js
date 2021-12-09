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
const re_comma = /\,/;
const re_bingo_row = /^\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s*$/;
const re_empty_line = /^\s*$/;
let numbers = [];
let boards = [];
let row_cnt = 0;
let board_solution_order = 1;
/**
 * defines an empty board object
 */
function Board () {
	this.used = false;
	this.board_number = -1; // the order in which this board was creatd
	this.solved = false;
	this.solved_order = -1; // the order in which each board was solved
	this.solved_number = -1; // the number that solved the board
	this.solved_num_ndx = -1; // the index of the number that solved the board
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
		if (re_comma.test(line)) {
			numbers = line.split(re_comma);
			// process.stdout.write('numbers: [' + numbers + ']\n');
			console.log('numbers: [ ' + numbers + ' ]\n');

		} else if (re_bingo_row.test(line)) {
			const row = line.match(re_bingo_row);
			boardAddRow(boards[boards.length-1], row_cnt, row);
			boards[boards.length-1].board_number = boards.length-1;
			row_cnt++;

		} else if (re_empty_line.test(line)) {
			// console.log(`empty line`);
			row_cnt=0;
			boards.push(new Board());
		}
	});
}

const boardAddRow= (board, row_index, row_array) => {
	board.used = true;
	for (let col=0;col<5;col++) {
		board.pos[row_index][col].val = parseInt(row_array[col+1]);
	}
}
const boardDisplayBoard = (board, bindex) => {
	console.log(`board[${bindex}]: `);
	console.log(`\t.solved: ${board.solved}`);
	console.log(`\t.board_number: ${board.board_number}`);
	console.log(`\t.solved_order: ${board.solved_order}`);
	console.log(`\t.solved_number: ${board.solved_number}`);
	console.log(`\t.solved_num_ndx: ${board.solved_num_ndx}`);

	board.pos.forEach(row => {
		row.forEach(cell => {
			// console.log(`\t.pos[${cell.val}]\t.sel: ${cell.sel}`);
			process.stdout.write(`\t${cell.val} (${(cell.sel)?1:0})`);
		});
		console.log('');
	});
}

const boardDisplayAllBoards = () => {
	boards.forEach((board,bindex) => {
		boardDisplayBoard(board, bindex);
	});
}

const boardRemoveUnused = () => {
	boards = boards.filter(board => board.used);
}

const ith = (num) => {
	return num + ((num ==1) ? "st" : (num == 2) ? "nd" : (num == 3) ? "rd" : "th");

}
/**
 * This method tests (and marks .solved=true and .solution_index=cnt) if any new rol or column solutions exist for boards that have not yet been solved.
 * Run this each time a new number is presented. 
 */

const boardMarkIfSolved = (number, nindex) => {
	// loop through all boards
	// if a board is solved but not marked as solved, mark it as solved and return the board index
	boards.forEach((board,bindex) => {
		
		if(!board.solved) {
			// see if there is any row solution yet
			for (let row=0;row<5;row++) {
				if (board.pos[row][0].sel && board.pos[row][1].sel && board.pos[row][2].sel && board.pos[row][3].sel && board.pos[row][4].sel) {
					board.solved = true;
					board.solved_order = board_solution_order++;
					board.solved_number = number;
					board.solved_num_ndx = nindex;

					console.log(`The ${ith(board.solved_order)} board to be solved is board[${bindex}] with ${number} - ROW`);
				}
			}
		}

		if(!board.solved) {
			// see if there is any column solution yet
			for (let col=0;col<5;col++) {
				if (board.pos[0][col].sel && board.pos[1][col].sel && board.pos[2][col].sel && board.pos[3][col].sel && board.pos[4][col].sel) {
					board.solved = true;
					board.solved_order = board_solution_order++;
					board.solved_number = number;
					board.solved_num_ndx = nindex;
		
					console.log(`The ${ith(board.solved_order)} board to be solved is board[${bindex}] with ${number} - ROW`);
				}
			}
		}
	});
}

/**
 * to score the board, add up all of the unseleced numbers 
 * @param {*} board 
 */
const boardScoreBoard = (board, winning_number) => {
	let sum_unselected = 0;
	board.pos.forEach(row => {
		row.forEach(cell => {
			if (!cell.sel) {
				sum_unselected += cell.val;
				console.log(`\t${cell.val} >> ${sum_unselected}`);
			}
		});
	});
	console.log(`sum_unselected: ${sum_unselected} * ${winning_number} = ${sum_unselected*winning_number}`);
	return sum_unselected*winning_number;
}

const day4_part2 = () => {
	console.log("day4 part2 exercise");
	var base = process.env.PWD;
	let file;
	const test = false;
	if (test) {
		file = fs.readFileSync(base + '/src/day4-input-sample.txt', 'utf8'); // sample input
	} else {
		file = fs.readFileSync(base + '/src/day4-input.txt', 'utf8');
	}
	parseFile(file);

	boardRemoveUnused();
	// boardDisplay();


	// loop through each number and see if it can be used to solve any of the boards
	numbers.forEach((number, nindex) => {
		// console.log("===============================");
		console.log(`The ${ith(nindex)} number to call is: ${number}`);
		boards.forEach((board,nindex) => {
			if (!board.solved) {
				board.pos.forEach(row => {
					row.forEach(cell => {
						if (cell.val == parseInt(number)) {
							cell.sel = true;
							// boardDisplayBoard(board, nindex);
						}
					});
				});
			}
		});

		boardMarkIfSolved(number, nindex);
	});

	// boardDisplayAllBoards();

	// boards.forEach((board,index) => {
	// 	console.log(`board[${index}].solved_order: ${board.solved_order}`);
	// });

	boards.filter(board => board.solved_order===boards.length).forEach((board,bindex) => {
		console.log();
		console.log(`The last board to be solved is board:`);
		boardDisplayBoard(board, board.board_number);
		let score = boardScoreBoard(board, board.solved_number);
		console.log();
		console.log(`>>>>>>>>>>>>>>>>>> score: ${score} <<<<<<<<<<<<<<<<<<<<<<<`);
	});

	boards.filter(board => board.solved===false).forEach(board => {
		console.log(`The unsolved board is board:`);
		boardDisplayBoard(board, board.board_number);
	});


}  

export default day4_part2;

