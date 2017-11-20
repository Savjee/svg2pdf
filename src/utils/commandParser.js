const Commander = require('commander');
const packageJson = require('../../package.json');

module.exports = (config, args) => {

    // Force creating a new instance, see issue:
    // https://github.com/tj/commander.js/issues/438
    const program = new Commander.Command();

    program
        .version(packageJson.version)
        .description('Convert SVG\'s to PDF')

        .arguments('<inputDir> [outputDir]')
        .action((inputDir, outputDir) => {
            if (inputDir) {
                config.inputDirectory = inputDir;
            }

            if (outputDir) {
                config.outputDirectory = outputDir;
            }
        })
        .option('-o, --overwrite', 'Overwrite output PDF files if already exists')
        .option('-t, --threads <n>', 'Number of threads to use (defaults to the amount of CPU cores)', parseInt)
        .option('--no-progress', 'Don\'t show the progress bar')
        .option('--inkscape <path>', 'Path to the Inkscape binary');

    program.parse(args || process.argv);

    if (program.threads) {
        config.threads = program.threads;
    }

    if (program.overwrite) {
        config.overwriteFiles = true;
    }

    if (program.inkscape) {
        config.pathToInkscape = program.inkscape;
    }

    // A bit tricky: Commander sets "progress" to false if it's being passed by the user
    // but we use a variable "noProgressBar" so we invert that boolean.
    if (program.progress === false) {
        config.noProgressBar = true;
    }

    // If input and output directoy are not defined, show the help!
    if (config.inputDirectory === "" || config.outputDirectory === "") {
        program.help();
    }
}