const ProgressBar = require('progress');


module.exports = class ProgressBarWrapper{

    constructor(config) {
        this.config = config;
        this.barInstance = new ProgressBar('svg2pdf, ' + config.threads +' threads [:bar] :current/:total :lastProcessed', {
            total: filesToProcess.length,
            complete: '=',
            incomplete: ' ',
            width: 50,
        });
    }

    getInstance() {
    }
}