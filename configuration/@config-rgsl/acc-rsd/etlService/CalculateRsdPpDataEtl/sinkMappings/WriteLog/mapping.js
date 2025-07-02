'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const sat = {
        ETL_EXECUTION_STATUS_ID: this.businessContext.executionStatusId,
        EXECUTION_DATE: this.businessContext.etlServiceInput.executionDate,
    };

    return {
        'ACC_IMPL.RSD_JOB_LOG': [sat],
    };
};
