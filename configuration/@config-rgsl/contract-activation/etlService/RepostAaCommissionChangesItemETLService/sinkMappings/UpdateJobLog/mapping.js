'use strict';

module.exports = function mapping(input) {

    return {
        "PAS_IMPL.INVOICED_COMMISSION_JOB_LOG": [
            {
                AA_NUMBER: this.businessContext.etlServiceInput.aaNumber,
                LAST_LOAD_DATE: this.businessContext.etlServiceInput.lastLoadDate,
            },
        ]
    };
};
