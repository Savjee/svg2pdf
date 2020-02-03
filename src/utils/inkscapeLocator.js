const fs = require('fs');

module.exports = () => {
    const pathsToCheck = [
        '/usr/bin/inkscape',
        '/Applications/Inkscape.app/Contents/Resources/bin/inkscape'
    ]

    for (const path of pathsToCheck) {
        if (fs.existsSync(path)) {
            return path;
        }
    }

    return ""; // This will fail in preflight checks!
}