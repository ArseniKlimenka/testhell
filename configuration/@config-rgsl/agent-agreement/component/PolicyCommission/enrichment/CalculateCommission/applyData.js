const { getCommissionItems, setCaclResult } = require('@config-rgsl/agent-agreement-base/lib/AAComCalculationIntegrationServiceHelper');

module.exports = function mapping(input, dataSourceResponse) {

    const body = this.businessContext.rootData;
    const commItems = getCommissionItems(dataSourceResponse.data, body);
    const existingCommItems = body.commission?.policyCommissionItems ?? [];

    setCaclResult(existingCommItems,
        commItems,
        dataSourceResponse.data.amendmentNumber,
        body,
        dataSourceResponse.data.budgetRule,
        dataSourceResponse.data.budgetRuleAlgorithm);
};
