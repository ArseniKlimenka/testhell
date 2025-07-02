'use strict';

module.exports = function partnerRequestMapping(input) {

    const uniqueProductConfPartners = input.rootContext.ClientViewModel.uniqueProductConfPartners;

    const searchCriteria = {};

    searchCriteria.businessCodes = uniqueProductConfPartners;

    return {
        data: {
            criteria: searchCriteria
        }
    };
};
