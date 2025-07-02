/* eslint no-undef: "off"*/

'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { actor } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

function setCopyQuoteMapping(body, that) {

    const currentDate = DateTimeUtils.formatDate(new Date().toISOString(), 'yyyy-MM-dd');
    const currentActor = that.applicationContext.actor;

    body.technicalInformation = {};
    body.technicalInformation.creatorUsername = that.applicationContext.originatingUser.username;
    body.technicalInformation.originalDocumentNumber = that.businessContext.documentNumber;

    if (currentActor == actor.Operations) {
        body.technicalInformation.isCreatedByOperations = true;
    }
    if (currentActor == actor.Agent) {
        body.basicConditions.issueDate = currentDate;
    }
    else {
        body.basicConditions.issueDate = undefined; // will be set in disableIsPolicyIssueDate.js
    }

    body.basicConditions.applicationDate = body.basicConditions.applicationDate ? currentDate : undefined;
    body.basicConditions.receiptDate = body.basicConditions.receiptDate ? currentDate : undefined;
    body.basicConditions.acceptToWorkDate = body.basicConditions.acceptToWorkDate ? currentDate : undefined;
    body.basicConditions.isSpecialOffer = undefined;

    body.risksCorrection = body.risksCorrection || {};
    body.risksCorrection.manualCorrection = false;
    body.cumulation = {};

    if (body.basicInvestmentParameters) {
        body.basicInvestmentParameters.rateOfReturn = undefined;
        body.basicInvestmentParameters.rateOfReturnManualRate = undefined;
    }

    const enrich = documents.getDocumentConfiguration(that.businessContext.configurationCodeName, 1).processEnrichmentsFn;
    enrich(undefined, body, ['/productConfiguration']);
    enrich(undefined, body, ['/policyTerms']);
    enrich(undefined, body, ['/risks']);

    return body;

}

module.exports = {
    setCopyQuoteMapping
};
