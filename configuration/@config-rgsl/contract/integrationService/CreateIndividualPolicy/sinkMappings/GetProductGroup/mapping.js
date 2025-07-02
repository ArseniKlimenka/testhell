'use strict';

module.exports = function mapping(input, sinkExchange) {
    let contractBody = {};

    try {
        contractBody = JSON.parse(input.request);
    } catch (error) {
        this.stopExecution('JsonIsNotValid');
        return;
    }

    const productCode = contractBody.Data?.mainInsuranceConditions?.insuranceProduct?.productCode?.trim();

    if (!productCode) {
        this.stopExecution('ProductCodeIsRequired');
        return;
    }

    const partyCodes = [];
    partyCodes.push(contractBody.Data?.policyHolder.partyData.partyCode);
    partyCodes.push(contractBody.Data?.insuredPerson.partyData.partyCode);

    sinkExchange.mapContext('partyCodes', partyCodes);
    sinkExchange.mapContext('serviceProviderCode', contractBody.Data?.mainInsuranceConditions.partner.partnerCode);

    const output = {
        input: {
            data: {
                criteria: {
                    code: productCode
                }
            }
        }
    };

    return output;
};

