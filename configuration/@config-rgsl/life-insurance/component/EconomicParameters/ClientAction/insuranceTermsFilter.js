'use strict';

module.exports = function insuranceTermsFilter(input, ambientProperties) {

    const insuranceTermsYear = input.items;

    const uniqueProductConfInsuranceTermsYear = input.rootContext.ClientViewModel?.uniqueProductConfInsuranceTermsYear ?? [];

    const availableInsuranceTerms = insuranceTermsYear.filter(i => uniqueProductConfInsuranceTermsYear.includes(i.insuranceTermsYearCode));

    return availableInsuranceTerms;
};
