'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { getChangeSubtypeByChangeClass } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');
const { typeOfRequest } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const {
    didPaymentClassTypes,
    changeAmendmentTypes
} = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

function checkPolicyStatus(input, validationErrors) {

    const policyInCorrectStatus = getValue(input, 'body.technicalInformation.policyInCorrectStatus', false);
    if (!policyInCorrectStatus) {
        validationErrors.push({
            errorCode: 'PolicyShouldBeActivated'
        });
    }

}

function checkPolicyAmendmentsStatus(input, validationErrors) {

    const policyAmendmentsInCorrectStatus = getValue(input, 'body.technicalInformation.policyAmendmentsInCorrectStatus', false);
    if (!policyAmendmentsInCorrectStatus) {
        validationErrors.push({
            errorCode: 'PolicyAmendmentsNotInCompletedStatus'
        });
    }

}

function checkNonFinAmendmentStatus(input, validationErrors) {

    const availableAmendments = getChangeSubtypeByChangeClass(input);
    const createdNonFinAmendmentNumber = getValue(input, 'body.contract.createdNonFinAmendmentNumber', false);
    const nonFinAmendmentWasCreated = getValue(input, 'body.technicalInformation.nonFinAmendmentWasCreated', false);

    if (!availableAmendments.isNonFinChange) {
        validationErrors.push({
            errorCode: 'NonFinAmendmentDoesNotFitTheCondition'
        });
    }

    if (createdNonFinAmendmentNumber && availableAmendments.isNonFinChange && nonFinAmendmentWasCreated) {
        validationErrors.push({
            errorCode: 'NonFinAmendmentWasCreated'
        });
    }

}

function checkFinAmendmentStatus(input, validationErrors) {

    const availableAmendments = getChangeSubtypeByChangeClass(input);
    const createdFinAmendmentNumber = getValue(input, 'body.contract.createdFinAmendmentNumber', false);
    const finAmendmentWasCreated = getValue(input, 'body.technicalInformation.finAmendmentWasCreated', false);

    if (!availableAmendments.isFinChange) {
        validationErrors.push({
            errorCode: 'FinAmendmentDoesNotFitTheCondition'
        });
    }

    if (createdFinAmendmentNumber && availableAmendments.isFinChange && finAmendmentWasCreated) {
        validationErrors.push({
            errorCode: 'FinAmendmentWasCreated'
        });
    }

}

function checkFinPolicyHolderAmendmentStatus(input, validationErrors) {

    const availableAmendments = getChangeSubtypeByChangeClass(input);

    const createdPolicyHolderChangeAmendmentNumber = getValue(input, 'body.contract.createdPolicyHolderChangeAmendmentNumber', false);
    const finPolicyHolderAmendmentWasCreated = getValue(input, 'body.technicalInformation.finPolicyHolderAmendmentWasCreated', false);

    if (!availableAmendments.isPolicyHolderChange) {
        validationErrors.push({
            errorCode: 'FinPolicyHolderAmendmentDoesNotFitTheCondition'
        });
    }

    if (createdPolicyHolderChangeAmendmentNumber && availableAmendments.isPolicyHolderChange && finPolicyHolderAmendmentWasCreated) {
        validationErrors.push({
            errorCode: 'FinPolicyHolderAmendmentWasCreated'
        });
    }

}

function checkCompleteAmendments(input, validationErrors) {

    const allAmendmentsCreated = getValue(input, 'body.technicalInformation.allAmendmentsCreated', false);

    if (!allAmendmentsCreated) {
        validationErrors.push({
            errorCode: 'AllAmendmentsShouldBeActivated'
        });
    }

}

function checkCancellation(input, validationErrors) {

    const { body } = input;
    const typeOfRequestBody = body.typeOfRequest;

    if (typeOfRequestBody != typeOfRequest.Cancellation) {
        validationErrors.push({
            errorCode: 'OnReview_ForCancellationOnly'
        });
    }

}

function checkInvestmentPeriod(input, validationErrors) {
    const { body } = input;
    const changeClass = body.changeClass;
    const changeSubtype = body.changeSubtype;
    const isFinancialChange = changeSubtype?.includes(changeAmendmentTypes.financialChange);
    const isDidPaymentClassTypes = checkAvailabilitySome(didPaymentClassTypes, changeClass);
    const productGroup = body.contract?.productGroup;
    const isEquityProductGroup = productGroup === lifeInsuranceConstants.productGroup.DSZ.descriptionRU;
    const isModificationTypeRequest = body.typeOfRequest === typeOfRequest.Modification;
    const investmentEndDate = input.body.contract?.investmentEndDate;

    if (!isEquityProductGroup || !isModificationTypeRequest || !isFinancialChange || !isDidPaymentClassTypes || !investmentEndDate) {
        return;
    }

    const daysBetween = DateTimeUtils.getDayDifference(new Date(), new Date(investmentEndDate));

    if (daysBetween < 90) {
        validationErrors.push({
            errorCode: 'InvestmentPeriodShouldBeMoreThan90Days'
        });
    }
}

function checkOnReviewToIssued(input, validationErrors) {

    if (!allowForEquity(input)) {
        checkCancellation(input, validationErrors);
    }
}

function checkIssuedToAmendmentsCreated(input, validationErrors) {

    if (!allowForEquity(input)) {
        checkCancellation(input, validationErrors);
    }
}

function allowForEquity(input) {
    const { body } = input;
    const changeClass = body.changeClass;
    const isDidPaymentClassTypes = checkAvailabilitySome(didPaymentClassTypes, changeClass);
    const productGroup = body.contract?.productGroup;
    const isEquityProductGroup = productGroup === lifeInsuranceConstants.productGroup.DSZ.descriptionRU;
    const isModificationTypeRequest = body.typeOfRequest === typeOfRequest.Modification;

    return isDidPaymentClassTypes && isEquityProductGroup && isModificationTypeRequest;
}

module.exports = {
    checkPolicyStatus,
    checkPolicyAmendmentsStatus,
    checkNonFinAmendmentStatus,
    checkFinAmendmentStatus,
    checkFinPolicyHolderAmendmentStatus,
    checkCompleteAmendments,
    checkCancellation,
    checkInvestmentPeriod,
    checkOnReviewToIssued,
    checkIssuedToAmendmentsCreated
};
