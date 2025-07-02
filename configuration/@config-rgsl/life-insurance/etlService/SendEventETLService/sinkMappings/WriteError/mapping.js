'use strict';

module.exports = function mapping(sinkInput) {

    const sink = sinkInput.sink;
    const errorResponse = `Cause: ${sink?.cause}, Mapping result: ${sink?.mappingResult}, Name: ${sink?.name}, Message: ${sinkInput.message}. StackTrace: ${sinkInput.stackTrace}`;

    return {
        request: {
            sendEventId: sinkInput.input.sendEventId,
            response: errorResponse
        }
    };
};

