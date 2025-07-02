'use strict';

const { fillCommonData, getQuoteByPolicyNumber, getContractAdditionalParameters } = require('@config-rgsl/contract/lib/contractEntityHelper');
const { reloadContractEntityOnUpdate } = require('@config-rgsl/life-insurance/lib/serverSideEventHelper');

module.exports = async function beforeSaveContractEntity(input, ambientProperties) {

    const quoteNumber = input.context.Body?.quote?.number;
    const policyNumber = input.context.Body?.policy?.number;

    reloadContractEntityOnUpdate(this);
    fillCommonData(input, ambientProperties, this);

    if (!quoteNumber && !policyNumber) {

        ambientProperties.services.confirmationDialog.showError(`Необходимо заполнить номер заявки на страхование или номер договора.`, 'OK', 'OK', 2);
        return false;
    }

    await getQuoteByPolicyNumber(input, ambientProperties, this);
    await getContractAdditionalParameters(input, ambientProperties, this);
};
