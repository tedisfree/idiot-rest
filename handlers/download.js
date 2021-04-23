const Handler = require('./handler');
const config = require('../private/config.json');
const fs = require('fs');
const path = require('path');

class DownloadHandler extends Handler {
    handle(data, req, res) {
        if(!config['resource']) {
            res.sendStatus(500);
            return;
        }
        let rootPath = path.join(config.resource, 'download');
        let list = fs.readdirSync(rootPath);
        let file = list[Math.floor(Math.random()*(list.length))];
        file = path.resolve(path.join(rootPath, file));

        res.download(file);
    }
}

module.exports = new DownloadHandler()