const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const errorDetails = getErrorDetails(input);
    const errorMessages = errorDetails.map(item => item.message);

    return {
        sourceId: input.SOURCE_ID,
        rowNumber: input.ROW_NUMBER ? input.ROW_NUMBER : -1,
        recordKey: input.RECORD_KEY ? input.RECORD_KEY : "",
        errorType: input.ERROR_TYPE ? translationUtils.getTranslation('masterEntity/DataSourceErrorType/1', 'localized-field', 'description', input.ERROR_TYPE) : input.ERROR_TYPE,
        errorMessages: errorMessages,
        rawData: input.RAW_DATA ? input.RAW_DATA : "",
        errorMessage: input.ERROR_MESSAGE ? input.ERROR_MESSAGE : "",
        mappingResult: input.MAPPING_RESULT ? input.MAPPING_RESULT : "",
        errorDetails: errorDetails
    };

};

function getErrorDetails(input) {
    const result = [];

    if (!input.ERROR_MESSAGE) {
        return result;
    }

    let errorDetail;

    try {
        errorDetail = JSON.parse(input.ERROR_MESSAGE);
    }
    // ERROR_MESSAGE can be a string, so we just push it to the result
    catch (err) {
        result.push({ message: input.ERROR_MESSAGE });
        return result;
    }

    if (Array.isArray(errorDetail)) {
        errorDetail.forEach(item => {
            result.push({
                code: item.code,
                message: item.message
            });
        });
    } else {
        result.push({
            message: JSON.stringify(input.ERROR_MESSAGE)
        });
    }

    return result;
}
