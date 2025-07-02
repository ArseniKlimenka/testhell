const declarationUtils = require('@config-rgsl/life-insurance/lib/declarationUtils');

module.exports = function applyData(input, dataSourceResponse) {
    if (dataSourceResponse && dataSourceResponse.data && dataSourceResponse.data.length == 0) { return; }

    const responce = declarationUtils.applyDataMed(input, dataSourceResponse, this);

    this.businessContext.rootData.declarationMedicalPolicyHolder = responce;
};
