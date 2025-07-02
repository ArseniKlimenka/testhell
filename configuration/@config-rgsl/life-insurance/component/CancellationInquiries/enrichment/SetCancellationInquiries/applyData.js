'use strict';

module.exports = function applyData(input, dataSourceResponse) {

    if (dataSourceResponse.data?.length > 0) {

        const body = this.businessContext.rootData;
        body.tempTechnicalData.inquiries = dataSourceResponse.data.map(i => i.resultData);
    }
};
