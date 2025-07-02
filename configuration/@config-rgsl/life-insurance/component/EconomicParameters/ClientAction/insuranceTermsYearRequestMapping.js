'use strict';

module.exports = function insuranceTermsYearRequestMapping(input) {

    const searchCriteria = {};

    return {
        data: {
            criteria: searchCriteria
        },
        paging: {
            pageSize: 30
        }
    };
};
