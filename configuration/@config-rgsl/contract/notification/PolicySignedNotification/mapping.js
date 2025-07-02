'use strict';

const { businessRules } = require('@adinsure/runtime');
const { issueForm } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input) {

    const output = {};

    const { businessNumber, commonBody, configuration } = input;

    const productCode = commonBody.productCode;
    const issueDate = commonBody.issueDate;
    const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
    const conf = ePolicytConfiguration({ productCode, issueDate }).result;
    const isOffer = commonBody.attributes.issueFormCode == issueForm.offer.issueFormCode;

    output.kidPrintout = conf?.kidPrintout;
    output.businessNumber = businessNumber;
    output.isOffer = isOffer;
    output.startDate = commonBody.startDate;
    output.issueDate = commonBody.issueDate;
    output.productCode = commonBody.productCode;
    output.additionalServices = commonBody.attributes?.additionalServices?.map(item => item.serviceCode);

    return output;
};
