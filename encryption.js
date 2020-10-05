const { CeaserStream } = require("./ceaser");
const fs = require("fs");


// { shift: '1', action: 'encode',input: '', output:'' }

function encrypt({ shift, action, input, output }) {
	if (input && output) {
		fs.createReadStream(input,'utf8')
			.pipe(new CeaserStream(shift, action))
			.pipe(fs.createWriteStream(output,'utf8'));
	}
	if (!input && !output) {
		process.stdin
		.pipe(new CeaserStream(shift, action))
		.pipe(process.stdout);
	}
	if (input&&!output) {
		fs.createReadStream(input)
			.pipe(new CeaserStream(shift, action))
			.pipe(process.stdout);
	}
	if (!input&&output) {
		process.stdin
			.pipe(new CeaserStream(shift, action))
			.pipe(fs.createWriteStream(output));
	}

}

module.exports.encrypt = encrypt;
