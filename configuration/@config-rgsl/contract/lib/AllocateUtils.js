const { contractType, quoteState, userGroup, salesGroupByPartnerCode, productCode } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { isNoteProduct } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const ObjectUtils = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { activities } = require('@adinsure/runtime');

function allocateLifeInsuranceContract(input, that) {

    const documentContractType = input.documentConfiguration.dimensions.contractType;
    let assigment;

    switch (documentContractType) {
        case contractType.Quote: {
            assigment = allocateLifeInsuranceQuote(input, that);
            break;
        }
        case contractType.Policy: {
            assigment = allocateLifeInsurancePolicy(input, that);
            break;
        }
        case contractType.Amendment: {
            assigment = allocateLifeInsuranceAmendment(input, that);
            break;
        }
    }

    return assigment;

}

function allocateLifeInsuranceQuote(input, that) {

    const assigment = {};

    const transitionName = ObjectUtils.getValue(input, 'transitionName');
    const stateCodeName = ObjectUtils.getValue(input, 'stateCodeName');
    const isCreatedByOperations = ObjectUtils.getValue(input, 'body.technicalInformation.isCreatedByOperations');
    const creatorUsername = ObjectUtils.getValue(input, 'body.technicalInformation.creatorUsername');
    const initiatorUsername = ObjectUtils.getValue(input, 'body.initiator.userName');
    const currentUsername = ObjectUtils.getValue(that, 'applicationContext.originatingUser.username');
    const sellerUsername = ObjectUtils.getValue(input, 'commonBody.transitionResult.attributes.sellerUsername');
    const operationsUsername = ObjectUtils.getValue(input, 'commonBody.transitionResult.attributes.operationsUsername');
    const UKSPUsername = ObjectUtils.getValue(input, 'commonBody.transitionResult.attributes.UKSPUsername');
    const uwTriggers = ObjectUtils.getValue(input, 'body.uwTriggers', []);
    const documentConfigurationCodeName = ObjectUtils.getValue(input, 'documentConfiguration.codeName');
    const isCollectivePolicy = documentConfigurationCodeName == productCode.CollectiveLifeInsurancePolicy;

    const partnerBusinessCode = ObjectUtils.getValue(input, 'body.mainInsuranceConditions.partner.partnerBusinessCode');
    const salesGroup = salesGroupByPartnerCode[partnerBusinessCode];
    const transitionNameOperations = transitionName.indexOf('Operations') > -1;
    const currentProductCode = ObjectUtils.getValue(input, 'body.mainInsuranceConditions.insuranceProduct.productCode');
    const previousStateCodeName = input.previousStateCodeName;

    switch (stateCodeName) {
        case quoteState.Draft: {
            assigment.userGroup = isCreatedByOperations ? userGroup.operations : salesGroup;
            assigment.username = isCreatedByOperations ? operationsUsername || currentUsername : sellerUsername || currentUsername;
            break;
        }
        case quoteState.InfoRequest: {
            assigment.userGroup = isCreatedByOperations ? userGroup.operations : salesGroup;
            assigment.username = isCreatedByOperations ? operationsUsername || currentUsername : sellerUsername || currentUsername;
            break;
        }
        case quoteState.OnReview: {

            if (previousStateCodeName === quoteState.ChangeUnderwritingGroup) {
                assigment.userGroup = userGroup.underwriting2;
            }
            else {
                assigment.userGroup = userGroup.underwriting;
            }

            if (isCollectivePolicy && uwTriggers.some(trigger => trigger.departament == 'compliance')) {
                assigment.userGroup = userGroup.compliance;
            }
            break;
        }
        case quoteState.Approved: {
            if (isNoteProduct(currentProductCode)) {
                assigment.userGroup = userGroup.operations;
            }
            else {
                assigment.userGroup = isCreatedByOperations ? userGroup.operations : salesGroup;
                assigment.username = isCreatedByOperations ? operationsUsername : sellerUsername;
            }
            break;
        }
        case quoteState.Rejected: {
            assigment.userGroup = isCreatedByOperations ? userGroup.operations : salesGroup;
            assigment.username = isCreatedByOperations ? operationsUsername : sellerUsername;
            break;
        }
        case quoteState.Active: {
            assigment.userGroup = isCreatedByOperations ? userGroup.operations : salesGroup;
            assigment.username = isCreatedByOperations ? operationsUsername : (sellerUsername || currentUsername);
            break;
        }
        default:
            return null;

    }

    if (!assigment.userGroup) {
        throw new Error('`assigment.userGroup` should be defined!');
    }
    return assigment;

}

function allocateLifeInsurancePolicy(input, that) {

    // same allocation logic for now
    return allocateLifeInsuranceQuote(input, that);
}

function allocateLifeInsuranceAmendment(input, that) {

    const amendmentType = ObjectUtils.getValue(input, 'documentConfiguration.dimensions.amendmentType');
    let assigment = {};

    switch (amendmentType) {
        case amendmentConstants.amendmentType.Cancellation:
            assigment = allocateCancellationLifeInsuranceAmendment(input, that);
            break;
        case amendmentConstants.amendmentType.Reactivation:
            assigment = allocateReactivationLifeInsuranceAmendment(input, that);
            break;
        case amendmentConstants.amendmentType.FinancialChange:
            assigment = allocateFinancialChangeLifeInsuranceAmendment(input, that);
            break;
        case amendmentConstants.amendmentType.NonFinancialChange:
            assigment = allocateNonFinancialChangeLifeInsuranceAmendment(input, that);
            break;
        default:
            assigment = null;
    }

    return assigment;
}

function allocateCancellationLifeInsuranceAmendment(input, that) {

    const assigment = {};
    const stateCodeName = input.stateCodeName;

    if (!amendmentConstants.cancellationStatesToAllocateActivities.includes(stateCodeName)) {

        return null;
    }

    const currentUsername = that.applicationContext?.originatingUser?.username;
    const lastOperationsUsername = input.commonBody.transitionResult?.attributes?.lastOperationsUsername;
    const isCreatedByOperations = input.body.technicalInformation?.isCreatedByOperations;
    const partnerBusinessCode = input.commonBody.ownership?.partnerBusinessCode;
    const salesGroup = partnerBusinessCode && salesGroupByPartnerCode[partnerBusinessCode];

    switch (stateCodeName) {
        case amendmentConstants.amendmentState.Draft: {
            assigment.userGroup = isCreatedByOperations ? userGroup.operations : salesGroup;
            assigment.username = currentUsername;
            break;
        }
        case amendmentConstants.amendmentState.OperationsApproval: {
            assigment.userGroup = userGroup.operations;
            assigment.username = lastOperationsUsername ? undefined : currentUsername;
            break;
        }
        case amendmentConstants.amendmentState.RequestToClient: {
            assigment.userGroup = userGroup.UKSP;
            break;
        }
        case amendmentConstants.amendmentState.OperationsDirectorApproval: {
            assigment.userGroup = userGroup.operationsDirector;
            break;
        }
        case amendmentConstants.cancellationAmendmentState.AwaitingApproval: {
            assigment.userGroup = userGroup.operations;
            break;
        }
        case amendmentConstants.cancellationAmendmentState.AwaitingCancellationDate: {
            assigment.userGroup = userGroup.operations;
            break;
        }
        case amendmentConstants.cancellationAmendmentState.AwaitingPaymentDocuments: {
            assigment.userGroup = userGroup.operations;
            break;
        }
        default:
            return null;
    }

    return assigment;
}

function allocateReactivationLifeInsuranceAmendment(input, that) {

    const assigment = {};

    const stateCodeName = ObjectUtils.getValue(input, 'stateCodeName');
    const currentUsername = ObjectUtils.getValue(that, 'applicationContext.originatingUser.username');
    const isCreatedByOperations = ObjectUtils.getValue(input, 'body.technicalInformation.isCreatedByOperations');
    const partnerBusinessCode = ObjectUtils.getValue(input, 'commonBody.ownership.partnerBusinessCode');
    const salesGroup = partnerBusinessCode && salesGroupByPartnerCode[partnerBusinessCode];

    switch (stateCodeName) {
        case amendmentConstants.amendmentState.Draft: {
            assigment.userGroup = isCreatedByOperations ? userGroup.operations : salesGroup;
            assigment.username = currentUsername;
            break;
        }
        default:
            return null;
    }

    return assigment;
}

function allocateFinancialChangeLifeInsuranceAmendment(input, that) {

    const assigment = {};
    const stateCodeName = input.stateCodeName;
    const currentUsername = that.applicationContext.originatingUser.username;

    switch (stateCodeName) {

        case amendmentConstants.financialAmendmentState.OperationsApproval: {

            input.body.isAutoconversionAmendment ?
                allocateActivityToGroupOrPrevUser(assigment, stateCodeName, userGroup.operations) :
                allocateActivityToGroupOrPrevUser(assigment, stateCodeName, userGroup.operations, currentUsername);

            break;
        }
        default:
            return null;
    }

    return assigment;
}

function allocateNonFinancialChangeLifeInsuranceAmendment(input, that) {

    const assigment = {};
    const stateCodeName = ObjectUtils.getValue(input, 'stateCodeName');
    const currentUsername = ObjectUtils.getValue(that, 'applicationContext.originatingUser.username');

    switch (stateCodeName) {

        case amendmentConstants.nonFinancialAmendmentState.OperationsApproval: {

            allocateActivityToGroupOrPrevUser(assigment, stateCodeName, userGroup.operations, currentUsername);
            break;
        }
        case amendmentConstants.nonFinancialAmendmentState.InsuranceMethodologyApproval: {

            allocateActivityToGroupOrPrevUser(assigment, stateCodeName, userGroup.methodology);
            break;
        }
        case amendmentConstants.nonFinancialAmendmentState.ActuaryApproval: {

            allocateActivityToGroupOrPrevUser(assigment, stateCodeName, userGroup.actuary);
            break;
        }
        case amendmentConstants.nonFinancialAmendmentState.LegalApproval: {

            allocateActivityToGroupOrPrevUser(assigment, stateCodeName, userGroup.legal);
            break;
        }
        case amendmentConstants.nonFinancialAmendmentState.SecurityApproval: {

            allocateActivityToGroupOrPrevUser(assigment, stateCodeName, userGroup.security);
            break;
        }
        case amendmentConstants.nonFinancialAmendmentState.UnderwriterApproval: {

            allocateActivityToGroupOrPrevUser(assigment, stateCodeName, userGroup.underwriting);
            break;
        }
        case amendmentConstants.nonFinancialAmendmentState.CallCenterApproval: {

            allocateActivityToGroupOrPrevUser(assigment, stateCodeName, userGroup.callCenter);
            break;
        }
        case amendmentConstants.nonFinancialAmendmentState.PartnerSalesSupportApproval: {

            allocateActivityToGroupOrPrevUser(assigment, stateCodeName, userGroup.partnerSalesSupport);
            break;
        }
        case amendmentConstants.nonFinancialAmendmentState.CustomerServiceApproval: {

            allocateActivityToGroupOrPrevUser(assigment, stateCodeName, userGroup.clientServiceCenter);
            break;
        }
        case amendmentConstants.nonFinancialAmendmentState.RequestToClient: {

            allocateActivityToRequestToClientForNonFinChangeAmendment(input, assigment, stateCodeName);
            break;
        }
        default:
            return null;
    }

    return assigment;
}

function allocateActivityToRequestToClientForNonFinChangeAmendment(input, assigment, state) {

    const lastTransition = ObjectUtils.getValue(input, 'commonBody.transitionResult.attributes.lastTransitionInfo');
    let groupName = undefined;

    switch (lastTransition.transitionName) {
        case amendmentConstants.nonFinancialAmendmentTransition.CallCenterApprovalToRequestToClient:
            groupName = userGroup.callCenter;
            break;
        case amendmentConstants.nonFinancialAmendmentTransition.CustomerServiceApprovalToRequestToClient:
            groupName = userGroup.clientServiceCenter;
            break;
        case amendmentConstants.nonFinancialAmendmentTransition.PartnerSalesSupportApprovalToRequestToClient:
            groupName = userGroup.partnerSalesSupport;
            break;
        default:
            break;
    }

    if (!groupName) {

        return;
    }

    assigment.userGroup = groupName;
    assigment.username = lastTransition.executedBy;
}

function allocateActivityToGroupOrPrevUser(assigment, state, groupName, userToAssign) {

    const prevActivity = getPreviousActivity(state, groupName);
    assigment.userGroup = groupName;

    if (prevActivity) {

        assigment.username = prevActivity.assignedUsername;
    }
    else if (userToAssign) {

        assigment.username = userToAssign;
    }
}

function getPreviousActivity(state, groupName) {

    const previousActivities = activities.getPreviousActivities('State', state);

    if (previousActivities && previousActivities.length > 0) {

        if (groupName) {

            return previousActivities.find(a => a.assignedGroup === groupName);
        }

        return previousActivities[0];

    }

    return undefined;
}

module.exports = {
    allocateLifeInsuranceContract
};
