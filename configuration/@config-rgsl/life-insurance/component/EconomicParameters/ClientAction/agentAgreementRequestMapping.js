'use strict';

module.exports = function agentAgreementRequestMapping(input) {

    const uniqueProductConfPartners = input.rootContext.ClientViewModel.uniqueProductConfPartners;

    const searchCriteria = {};

    searchCriteria.partnerCodes = uniqueProductConfPartners;

    return {
        data: {
            criteria: searchCriteria
        }
    };
};
