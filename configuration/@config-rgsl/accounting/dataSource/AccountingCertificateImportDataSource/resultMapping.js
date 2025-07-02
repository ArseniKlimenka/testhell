'use strict';

const { boolLogicalConsts } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function resultMapping(input) {

    // called from route, but we need to provire RU translations
    this.applicationContext.locale = "ru-RU";

    const isTaxPayerIsPolicyHolder = input.isTaxPayerIsPolicyHolder != undefined ?
        (input.isTaxPayerIsPolicyHolder.toLowerCase() === boolLogicalConsts.boolTrueRus ||
        input.isTaxPayerIsPolicyHolder.toLowerCase() === boolLogicalConsts.boolTrueEng) :
        undefined;

    const mapped = {
        policyNumber: input.policyNumber,
        holderFullName: input.holderFullName,
        requestDate: input.requestDate,
        accountingYear: input.accountingYear,
        correctionNumber: input.correctionNumber,
        certificateIssueDate: input.certificateIssueDate,
        isTaxPayerIsPolicyHolder: isTaxPayerIsPolicyHolder,
    };

    return {
        data: mapped,
        $recordKey: `${input.$rowNumber}`
    };

};
