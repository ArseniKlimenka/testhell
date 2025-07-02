const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(input, dataSourceResponse) {

    if (dataSourceResponse && dataSourceResponse.data && dataSourceResponse.data.length > 0) {

        this.businessContext.rootData.amendmentData.amendmentAttachmentsPackage = dataSourceResponse.data.map(elem => elem.resultData);
    }
    else {

        this.businessContext.rootData.amendmentData.amendmentAttachmentsPackage = [];
    }

};
