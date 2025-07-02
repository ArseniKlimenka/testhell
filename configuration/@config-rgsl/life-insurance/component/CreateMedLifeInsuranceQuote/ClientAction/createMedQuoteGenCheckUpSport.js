'use strict';

const { createMedLifeInsuranceQuoteFromAccumulated, createMedLifeInsuranceQuoteFromMed } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { productCode } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function createMedQuoteGenCheckUpSport(input, ambientProperties) {

    const createMedQuoteFromButton = true;

    const isAccumulatedLifeInsurancePolicy = ambientProperties?.configurationCodeName == productCode.AccumulatedLifeInsurancePolicy;
    const isMedLifeInsurancePolicy = ambientProperties?.configurationCodeName == productCode.MedLifeInsurancePolicy;

    if (isAccumulatedLifeInsurancePolicy) {
        createMedLifeInsuranceQuoteFromAccumulated(input, ambientProperties, this, createMedQuoteFromButton);
    }

    if (isMedLifeInsurancePolicy) {
        createMedLifeInsuranceQuoteFromMed(input, ambientProperties, this, createMedQuoteFromButton);
    }

};
