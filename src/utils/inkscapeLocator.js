const fs = require('fs');

module.exports = () => {
    const pathsToCheck = [
        '/usr/bin/inkscape',
        '/Applications/Inkscape.app/Contents/Resources/bin/inkscape', // Older Inkscape version
        '/Applications/Inkscape.app/Contents/MacOS/Inkscape' // Inkscape 1.0
    ]

    for (const path of pathsToCheck) {
        if (fs.existsSync(path)) {
            return path;
        }
    }

    return ""; // This will fail in preflight checks!
}