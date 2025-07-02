'use strict';

const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input) {

    const body = input.context?.Body || this.businessContext?.rootData;
    const configurationCodeName = input.context?.ConfigurationCodeName || this.businessContext?.configurationCodeName;
    const isCollectivePolicy = configurationCodeName == 'CollectiveLifeInsurancePolicy';
    const partyCode = body?.insuredPerson?.partyData?.partyCode;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const copyForProducts = [
        ...productGroupArray.RHE,
        ...productGroupArray.GENCHK,
        ...productGroupArray.MEDPRO
    ].includes(productCode);

    if (!isCollectivePolicy && copyForProducts) {

        body.beneficiaries.beneficiaries = [];

        if (partyCode) {

            return {
                data: {
                    criteria: {
                        partyCode: partyCode
                    }
                }
            };

        }

    }

    return null;

};
