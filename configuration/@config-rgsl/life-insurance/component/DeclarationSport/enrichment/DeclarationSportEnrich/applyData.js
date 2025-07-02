const declarationUtils = require('@config-rgsl/life-insurance/lib/declarationUtils');

module.exports = function applyData(input, dataSourceResponse) {
    if (dataSourceResponse?.data?.length == 0) { return; }

    const response = declarationUtils.applyDataSport(input, dataSourceResponse, this);

    this.businessContext.rootData.declarationSport = response;
};
