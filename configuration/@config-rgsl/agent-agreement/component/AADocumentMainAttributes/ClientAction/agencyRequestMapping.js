'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function agencyRequestMapping(input) {

    const agency = input.componentContext.agency;

    const result = basicCtDropdownRequestMapping(agency, input.searchText);


    if (!agency || input.searchText) {

        const conclusionDate = input.rootContext.Body.validity.conclusionDate;
        result.data.criteria.effectiveDate = conclusionDate;
    }

    return result;
};
