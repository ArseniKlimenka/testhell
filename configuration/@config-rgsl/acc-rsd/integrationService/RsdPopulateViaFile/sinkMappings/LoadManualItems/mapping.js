'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    return {
        input: {
            data: {
                fileId: sinkInput.importFileId,
            }
        }
    };
};
