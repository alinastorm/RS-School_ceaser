const { Command } = require("commander");
const { encrypt } = require("./encryption");

const cli = new Command();

cli
	.storeOptionsAsProperties(false)
	.requiredOption("-s, --shift <int number>", "a shift")
	.option("-i, --input <path>", "an input file")
	.option("-o, --output <path>", "an output file")
	.requiredOption("-a, --action <encode|decode>", "an action encode/decode");

cli.parse(process.argv);
let cliOption = cli.opts();

// A list of all the steps involved in our program
const steps = {
	start: async () => {
		if (cliOption.action != "encode" && cliOption.action != "decode") {
			console.log("action not a <encode|decode>");
			steps.end();
		}
		if (!Number.isInteger(+cliOption.shift)) {
			console.log("shift not a <number>");
			steps.end();
		}

		return steps._encryptStep();
	},
	_encryptStep: async () => {
		encrypt(cliOption);
	},

	_end: async () => {
		rl.close();
	},
};
steps.start();
