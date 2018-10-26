#!/usr/bin/node

// affine a b input

const a = parseInt(process.argv[2], 10);
const b = parseInt(process.argv[3], 10);
var input = process.argv[4].toLowerCase().split('');

// NOTE: a and 26 must be coprime

let out = input.map(c => {
	let code = charToNum(c);
	if (code >= 0 && code < 25) {
		let encrypted = encrypt(code, a, b);
		return numToChar(encrypted).toUpperCase();
	} else {
		return c;
	}
});

console.log(out.join(''));

function encrypt(num, a, b) { return ((a * num) + b) % 26; }
function charToNum(c) { return c.charCodeAt() - 97; }
function numToChar(n) { return String.fromCharCode(n + 97); }
