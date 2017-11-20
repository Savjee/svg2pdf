const OS = require('os');
const inkscapeLocator = require('./inkscapeLocator');

module.exports = {

    /**
     * The number of threads that will be used for the converstion.
     * By default we want this to be the number of physical CPU cores.
     * Node returns both logical and physical cores. I divide by 2 because
     * I assume that most machines support hyperthreading.
     */
    threads: OS.cpus().length / 2,

    /**
     * Try to find the path to the Inkscape CLI tool.
     */
    pathToInkscape: inkscapeLocator(),

    /**
     * Path to the output directory (should be absolute)
     */
    outputDirectory: "",

    /**
     * Path to the input directory (should be absolute)
     */
    inputDirectory: "",

    /**
     * Boolean controls if we show a progressbar or not. Useful for scripting.
     */
    noProgressBar: false,

    /**
     * Whether or not we allow output files to be overwritten.
     */
    overwriteFiles: false,
}