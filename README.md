# svg2pdf

[![Build status](https://img.shields.io/travis/Savjee/svg2pdf.svg?style=flat-square)](https://travis-ci.org/Savjee/google-sheets-wrapper)
[![Current version](https://img.shields.io/github/package-json/v/savjee/svg2pdf.svg?style=flat-square)](https://www.npmjs.com/package/svg2pdf)
[![Code coverage](https://img.shields.io/coveralls/github/Savjee/svg2pdf.svg?style=flat-square)]()
[![Downloads on npm](https://img.shields.io/npm/dt/svg2pdf.svg?style=flat-square)](https://www.npmjs.com/package/svg2pdf)
[![License](https://img.shields.io/npm/l/svg2pdf.svg?style=flat-square)](/LICENSE)
[![Dependencies](https://img.shields.io/david/savjee/svg2pdf.svg?style=flat-square)](https://www.npmjs.com/package/svg2pdf)


Simple CLI tool that batch converts all SVG files in a directory to PDF files.
It uses [Inkscape's CLI tool](https://inkscape.org/sk/doc/inkscape-man.html) to handle the conversion.

## Installation
```
npm install -g svg2pdf
```

## Basic usage

Convert all SVG's in `icons/` to PDF and put them in `icons-pdf/`:

```
$ svg2pdf icons/ icons-pdf/
```

svg2pdf requires Inkscape's CLI tool. If you're using macOS just download Inkscape and copy it to your Applications directory.

By default it looks for this path: `/Applications/Inkscape.app/Contents/Resources/bin/inkscape`

If you have installed [Inkscape](https://inkscape.org/en/) somewhere else, use the `--inkscape [path]` flag (see below).

## Other options
You can choose how many threads you want to use (defaults to the amount of CPU cores you have)

```
$ svg2pdf --threads 8 inputFolder/ outputFolder/
```

By default svg2pdf will never overwrite files. If you want it to be destructive:
```
$ svg2pdf --overwrite inputFolder/ outputFolder/
```


If svg2pdf cannot find the Inkscape binary, help it out:
```
$ svg2pdf --inkscape /path/to/your/inkscape/binary/inkscape inputFolder/ outputFolder/
```


You can disable the progress bar (for using it inside automated scripts):
```
$ svg2pdf --no-progress inputFolder/ outputFolder/
```


## Contributing
Feel free to contribute to this project! Create bug reports, give suggestions, make pull-requests, ...

Code is licensed under MIT license.