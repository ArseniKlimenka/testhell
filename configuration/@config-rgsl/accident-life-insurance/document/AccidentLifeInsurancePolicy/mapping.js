"use strict";

const mappingHelper = require('@config-rgsl/life-insurance/lib/commonSchemaMappingHelper');
const { mapSportTypes, getAvailableInsuranceTermDay } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function mapping(input) {

    const commonBody = mappingHelper.generateCommonBody(input, this);
    const productCode = input.mainInsuranceConditions?.insuranceProduct?.productCode;

    // format "insuranceTermsDays" for display in input in ui.
    const insuranceTermsDays = input.basicConditions.insuranceTermsDays;
    if (!insuranceTermsDays?.description) {

        input.basicConditions.insuranceTermsDays = getAvailableInsuranceTermDay(insuranceTermsDays?.value);
    }

    // format "availableSportTypes" for for display in input in ui.
    const selectedSportTypes = input.basicConditions.sportTypes.selectedTypes;
    if (!selectedSportTypes?.some(x => x.name)) {

        input.basicConditions.sportTypes.selectedTypes = mapSportTypes(selectedSportTypes, productCode);
    }

    return commonBody;
};
