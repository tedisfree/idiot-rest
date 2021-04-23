module.exports = class Handler {
    constructor() {
        if(!this.handle) {
            throw new Error('handler must have handle method');
        }
    }
}