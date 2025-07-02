'use strict';

const { applicantType } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const { didPaymentClassTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function applicantTypeFilter(input, ambientProperties) {

    let applicantTypeItems = input.items;

    const changeClass = input.context.Body.changeClass;
    const isDidPaymentClassTypes = checkAvailabilitySome(didPaymentClassTypes, changeClass);

    if (isDidPaymentClassTypes) {
        applicantTypeItems = applicantTypeItems.filter(item => [applicantType.beneficiary, applicantType.beneficiaryRepresentative].includes(item));
    }
    else {
        applicantTypeItems = applicantTypeItems.filter(item => [applicantType.policyHolder].includes(item));
    }

    return applicantTypeItems;

};
