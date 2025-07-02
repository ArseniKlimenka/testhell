'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {
    const skipPayment = sinkInput.paymentDate < '2023-08-28' && !this.businessContext.etlServiceInput.rgslGuid;
    const guidAlreadyExists = sinkExchange.resolveContext('guidAlreadyExists');

    sinkExchange.mapContext('skipPayment', skipPayment);

    const hub = {
        ETL_EXECUTION_STATUS_ID: this.businessContext.executionStatusId,
        RGSL_GUID: sinkInput.guid,
    };

    const sat = {
        ETL_EXECUTION_STATUS_ID: this.businessContext.executionStatusId,
        RGSL_GUID: sinkInput.guid,
        GUID_ALREADY_EXISTS: guidAlreadyExists,
        SKIP_PAYMENT: skipPayment,
        RESPONSE_SUCCESSFUL: false,
    };

    return {
        'ACC_IMPL.GET_NEW_BS_LOG_HUB': [hub],
        'ACC_IMPL.GET_NEW_BS_LOG_SAT': [sat],
    };
};
