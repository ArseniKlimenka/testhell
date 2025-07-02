'use strict';

module.exports = function mapping(lineInput) {

    return {
        request: {
            sendEventId: lineInput.sendEventId,
            response: lineInput.response
        }
    };
};
