'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {
    const response = sinkExchange.resolveContext('response');

    const sat = {
        ETL_EXECUTION_STATUS_ID: sinkInput.etlExecutionStatusId,
        RGSL_GUID: sinkInput.rgslGuid,
        GUID_ALREADY_EXISTS: sinkInput.guidAlreadyExists,
        SKIP_PAYMENT: sinkInput.skipPayment,
        RESPONSE: response,
        RESPONSE_SUCCESSFUL: 1,
    };

    return {
        'ACC_IMPL.GET_NEW_BS_LOG_SAT': [sat],
    };
};
