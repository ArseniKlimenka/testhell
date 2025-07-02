'use strict';

module.exports = function mapping(input, dataSourceResponse) {

    if ((dataSourceResponse?.data?.length ?? 0) > 0) {

        this.businessContext.rootData.endowmentAttachmentsPackage = dataSourceResponse.data.map(elem => elem.resultData);
    }
    else {

        this.businessContext.rootData.endowmentAttachmentsPackage = [];
    }

};
