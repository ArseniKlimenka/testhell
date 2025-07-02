'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(initialDocument) {

    const newDocument = {};
    newDocument.mainAttributes = {};
    newDocument.mainAttributes.salesChannel = initialDocument.mainAttributes.salesChannel;
    newDocument.mainAttributes.rgsChannel = initialDocument.mainAttributes.rgsChannel;
    newDocument.mainAttributes.cbAgentType = initialDocument.mainAttributes.cbAgentType;
    newDocument.mainAttributes.documentCurrency = initialDocument.mainAttributes.documentCurrency;
    newDocument.mainAttributes.agency = initialDocument.mainAttributes.agency;
    newDocument.mainAttributes.orderNumber = initialDocument.mainAttributes.orderNumber;
    newDocument.mainAttributes.isPersonalBusiness = initialDocument.mainAttributes.isPersonalBusiness;
    newDocument.mainAttributes.isTechnical = initialDocument.mainAttributes.isTechnical;
    newDocument.additionalAttributes = initialDocument.additionalAttributes;
    newDocument.organisation = initialDocument.organisation;
    newDocument.participants = initialDocument.participants;
    newDocument.validity = {};
    newDocument.validity.startDate = initialDocument.validity.startDate;

    const originalCommRules = initialDocument.commissionRules;

    const copiedCommRules = originalCommRules.map(rule => {

        const newRule = Object.assign(rule);
        newRule.startDate = newDocument.validity.startDate;
        newRule.endDate = undefined;
        newRule.registratorNumber = undefined;
        return newRule;
    });

    newDocument.commissionRules = copiedCommRules;

    return { body: newDocument };
};
