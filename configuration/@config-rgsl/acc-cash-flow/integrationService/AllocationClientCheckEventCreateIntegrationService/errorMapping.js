'use strict';

const { prepareError } = require('@config-rgsl/infrastructure/component/IntegrationServiceErrorData/lib/errorMappingUtils');

module.exports = function mapping({ errorInput, sinkExchange, additionalDataSources }) {

    const errorResponse = getErrorResponse(errorInput, sinkExchange);

    return {
        responseCode: 422,
        response: {
            errorResponse: errorResponse
        }
    };
};

function getErrorResponse(errorInput, sinkExchange) {

    const response = prepareError('ERROR-1', 'Unexpected error occurred');

    response.additionalErrorData = errorInput;

    return response;
}
