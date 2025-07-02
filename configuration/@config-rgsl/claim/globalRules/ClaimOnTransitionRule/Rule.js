'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { transitionNames } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function onTransition(
    { documentConfiguration,
        commonBody,
        previousCommonBody,
        appliesVersion,
        discardsVersion,
        businessVersionNumber,
        newDocumentState,
        transitionName,
        transitionResult }) {

    const applicationContext = this.applicationContext;
    const user = applicationContext.originatingUser;
    const businessContext = this.businessContext;
    const configurationCode = businessContext.configurationCodeName;

    transitionResult = onTransitionClaim(
        configurationCode,
        user,
        commonBody,
        previousCommonBody,
        appliesVersion,
        discardsVersion,
        businessVersionNumber,
        newDocumentState,
        transitionName);

    return transitionResult;
};

function onTransitionClaim(
    configurationCode,
    user,
    commonBody,
    previousCommonBody,
    appliesVersion,
    discardsVersion,
    businessVersionNumber,
    newDocumentState,
    transitionName) {

    let transition = commonBody.transitionResult;

    if (!transition) {

        transition = {};
    }

    if (transition && !transition.attributes) {

        transition.attributes = {};
    }

    transition.attributes.executedById = user.id;
    transition.attributes.executedBy = user.username;
    transition.attributes.executionTime = dateUtils.dateTimeNow();
    transition.transitionName = transitionName;

    if (transitionName === transitionNames.legalToCalimManager) {

        transition.processedByLegal = true;
    }
    else if (transitionName === transitionNames.securityToClaimManager) {

        transition.processedBySecurity = true;
    }
    else {

        transition.processedByLegal = previousCommonBody?.transitionResult?.processedByLegal;
        transition.processedBySecurity = previousCommonBody?.transitionResult?.processedBySecurity;
    }

    return transition;
}
