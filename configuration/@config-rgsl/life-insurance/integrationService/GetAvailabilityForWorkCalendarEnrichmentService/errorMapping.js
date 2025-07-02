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

    return {
        code: 'ERROR',
        message: errorInput.message,
    };
}
