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
        let file;
        if(data.file===undefined) {
            let list = fs.readdirSync(rootPath);
            file = list[Math.floor(Math.random() * (list.length))];
        } else {
            file = data.file[Math.floor(Math.random() * (data.file.length))];
        }
        file = path.resolve(path.join(rootPath, file));
        res.download(file);
    }
}

module.exports = new DownloadHandler()