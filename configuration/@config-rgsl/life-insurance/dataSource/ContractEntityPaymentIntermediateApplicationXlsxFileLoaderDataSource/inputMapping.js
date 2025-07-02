'use strict';

module.exports = function (input) {
    if (!input.data.fileId) {

        throw 'No criteria provided!';
    }

    return {
        fileId: input.data.fileId
    };
};
