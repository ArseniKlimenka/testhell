'use strict';

module.exports = function mapping(input, dataSourceResponse) {

    if (dataSourceResponse && dataSourceResponse.data && dataSourceResponse.data.length > 0) {
        this.businessContext.rootData.attachmentsPackage = dataSourceResponse.data.map(elem => elem.resultData);
    }
    else {
        this.businessContext.rootData.attachmentsPackage = [];
    }

};
