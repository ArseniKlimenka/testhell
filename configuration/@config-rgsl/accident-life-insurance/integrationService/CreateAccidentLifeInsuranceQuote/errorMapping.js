'use strict';

const errorMappingUtils = require('@config-rgsl/infrastructure/lib/errorMappingUtils');

module.exports = function mapping({errorInput, sinkExchange, additionalDataSources}) {

    const errorResponse = getErrorResponse(errorInput, sinkExchange);

    return {
        responseCode: 422,
        response: {
            errorResponse: errorResponse
        }
    };
};

function getErrorResponse(errorInput, sinkExchange) {

    const errorResponse = errorMappingUtils.prepareError('ERROR', 'Error while creating a accident life insurance quote', errorInput.message);

    return errorResponse;
}
