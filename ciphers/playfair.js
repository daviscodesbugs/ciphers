#!/usr/bin/node

// playfair key input

var key = process.argv[2];
var input = process.argv[3].toUpperCase();

let table = makeTable(key);
let digrams = makeDigrams(input);

let encrypted = [];
digrams.forEach(dg => {
	let c1 = getCoords(dg[0], table);
	let c2 = getCoords(dg[1], table);

	let coords = {};

	// row
	if (c1.row == c2.row) {
		coords.column = (c1.column + 1) % 5;
		coords.row = c1.row;
		encrypted.push(fromCoords(coords, table));

		coords.column = (c2.column + 1) % 5;
		coords.row = c2.row;
		encrypted.push(fromCoords(coords, table));
	// column
	} else if (c1.column == c2.column) {
		coords.row = (c1.row + 1) % 5;
		coords.column = c1.column;
		encrypted.push(fromCoords(coords, table));

		coords.row = (c2.row + 1) % 5;
		coords.column = c2.column;
		encrypted.push(fromCoords(coords, table));
	// rect
	} else {
		coords.row = c1.row;
		coords.column = c2.column;
		encrypted.push(fromCoords(coords, table));

		coords.row = c2.row;
		coords.column = c1.column;
		encrypted.push(fromCoords(coords, table));
	}
});

console.log(encrypted.join(''));

// In this version, I is omitted. i.e. I -> J
function makeTable(key) {
	let table = new Set();

	key.toUpperCase().split('').forEach(c => {
		if (c == 'I') { c = 'J'; }
		table.add(c);
	});

	"ABCDEFGHJKLMNOPQRSTUVWXYZ".split('').forEach(c => {
		table.add(c);
	});

	return Array.from(table);
}

// In this version, X is appended to mismatched digram
function makeDigrams(input) {
	let stripped = input
		.replace(/I/g, 'J')
		.split('')
		.filter(c => { return /[A-Z]/.test(c); });

	let padded = [];
	for (let i = 1; i < stripped.length; i += 2) {
		// repeat
		if (stripped[i] == stripped[i-1]) {
			padded.push(stripped[i-1] + "X");
			i--;
		// good
		} else {
			padded.push(stripped[i-1] + stripped[i]);
		}

		// single
		if (i + 2 == stripped.length) {
			padded.push(stripped[i+1] + "X");
			break;
		}
	}

	return padded;
}

function getCoords(letter, table) {
	let index = table.indexOf(letter);
	return {
		index: index,
		row: Math.floor(index / 5),
		column: index % 5
	};
}

function fromCoords(coords, table) {
	return table[(coords.row * 5) + coords.column];
}