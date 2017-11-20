const OS = require('os');

module.exports = {

    /**
     * The number of threads that will be used for the converstion.
     * By default we want this to be the number of physical CPU cores.
     * Node returns both logical and physical cores. I divide by 2 because
     * I assume that most machines support hyperthreading.
     */
    threads: OS.cpus().length / 2,

    /**
     * Path to the Inkscape CLI tool
     * TODO: we should do a better job at trying to find where Inkscape is,
     * right now it only works for macOS.
     */
    pathToInkscape: "/Applications/Inkscape.app/Contents/Resources/bin/inkscape",

    /**
     * Path to the output directory (should be absolute)
     */
    outputDirectory: "",

    /**
     * Path to the input directory (should be absolute)
     */
    inputDirectory: "",
}