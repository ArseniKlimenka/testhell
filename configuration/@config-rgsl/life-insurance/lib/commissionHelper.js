'use strict';

function setManualRuleSearchCriteria(input) {

    const aaNumber = input.rootContext.Body.commission.agentAgreement.number;
    const policyStartDate = input.rootContext.Body.policyTerms.startDate;
    const productCode = input.rootContext.Body.productConfiguration.productCode;

    const searchCriteria = {};
    searchCriteria.data = {};
    searchCriteria.data.criteria = {};
    searchCriteria.data.criteria.calculationDate = policyStartDate;
    searchCriteria.data.criteria.product = productCode;
    searchCriteria.data.criteria.aaNumber = aaNumber;

    return searchCriteria;
}

module.exports = {
    setManualRuleSearchCriteria
};
