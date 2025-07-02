const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const {
    inquiryConfiguratuionName,
    policyInquiryConfiguratuionName,
    inquiryState,
    verificationConfiguratuionName,
    salesGroupByPartnerCode,
    userGroup,
    lifeInsuranceRequestConfigurationName,
    cnlInquiryConfiguratuionName,
    endowmentInquiryConfiguratuionName } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const lifeInsuranceRC = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const { activities } = require('@adinsure/runtime');
const { endowmentStates, endowmentStatesToAllocateActivities } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function allocate(input) {

    if (input.documentConfiguration.dimensions.universalDocumentType == inquiryConfiguratuionName) {

        return allocateLifeInsuranceInquiry(input, this);
    }

    if (input.documentConfiguration.dimensions.universalDocumentType == policyInquiryConfiguratuionName) {

        return allocateLifeInsuranceInquiry(input, this);
    }

    if (input.documentConfiguration.dimensions.universalDocumentType == cnlInquiryConfiguratuionName) {

        return allocateCancellationInquiry(input, this);
    }

    if (input.documentConfiguration.dimensions.universalDocumentType == endowmentInquiryConfiguratuionName) {

        return allocateEndowmentInquiry(input, this);
    }

    if (input.documentConfiguration.dimensions.universalDocumentType == verificationConfiguratuionName) {

        return allocateLifeInsuranceVerification(input, this);
    }

    if (input.documentConfiguration.dimensions.universalDocumentType == lifeInsuranceRequestConfigurationName) {

        return allocateLifeInsuranceRequest(input, this);
    }

    if (input.documentConfiguration.codeName === 'Endowment') {

        return allocateEndowment(input, this);
    }

    return null;
};

function allocateLifeInsuranceInquiry(input, that) {
    const groupCode = getValue(input, 'body.inquiry.department.code');
    const stateCodeName = getValue(input, 'stateCodeName');
    if (stateCodeName == inquiryState.Draft.code && groupCode) {
        return [{
            userGroup: groupCode
        }];
    }
    return null;
}

function allocateCancellationInquiry(input, that) {

    const groupCode = input.body.department?.code;
    const stateCodeName = input.stateCodeName;

    if (stateCodeName == inquiryState.Draft.code && groupCode) {

        return [{
            userGroup: groupCode
        }];
    }

    return [];
}

function allocateEndowmentInquiry(input, that) {

    const groupCode = input.body.department?.code;
    const stateCodeName = input.stateCodeName;

    if (stateCodeName == inquiryState.Draft.code && groupCode) {

        return [{
            userGroup: groupCode
        }];
    }

    return [];
}

function allocateLifeInsuranceVerification(input, that) {

    const stateCodeName = getValue(input, 'stateCodeName');
    const partnerBusinessCode = getValue(input, 'body.partnerBusinessCode');
    const salesGroup = salesGroupByPartnerCode[partnerBusinessCode];

    if (stateCodeName == inquiryState.Draft.code) {
        return [{
            userGroup: 'operations'
        }];
    } else if (stateCodeName == inquiryState.Cancelled.code) {
        if (input.body.sellerUsername) {
            return [{
                userGroup: salesGroup,
                username: input.body.sellerUsername
            }];
        }

        return [{
            userGroup: 'operations'
        }];

    }
    return null;
}

function allocateLifeInsuranceRequest(input, that) {

    const stateCodeName = getValue(input, 'stateCodeName');
    const partnerBusinessCode = getValue(input, 'body.contract.partnerBusinessCode');
    const salesGroup = salesGroupByPartnerCode[partnerBusinessCode];
    const currentUsername = getValue(that, 'applicationContext.originatingUser.username');
    const sellerUsername = getValue(input, 'body.sellerUsername');
    const operationsUsername = getValue(input, 'body.operationsUsername');

    if (stateCodeName == 'Draft') {
        return [{
            userGroup: salesGroup,
            username: currentUsername
        }];
    } else if (stateCodeName == 'Correction') {
        return [{
            userGroup: salesGroup,
            username: sellerUsername
        }];
    }

    return null;
}

function allocateEndowment(input, that) {

    const stateCodeName = input.stateCodeName;

    if (!endowmentStatesToAllocateActivities.includes(stateCodeName)) {

        return null;
    }

    const result = [];
    const assigment = {};

    const currentUsername = getValue(that, 'applicationContext.originatingUser.username');
    const operationsApprovalActivities = activities.getPreviousActivities('State', 'OperationsApproval', input.id);
    const latestAssignedUser = operationsApprovalActivities[0]?.assignedUsername;

    switch (stateCodeName) {

        case endowmentStates.operationsApproval: {

            assigment.userGroup = 'operations';
            assigment.username = latestAssignedUser ? undefined : currentUsername;
            break;
        }
        case endowmentStates.awaitingInquiries: {

            assigment.userGroup = 'operations';
            break;
        }
        case endowmentStates.awaitingApproval: {

            assigment.userGroup = 'operations';
            break;
        }
        case endowmentStates.awaitingEndowmentDate: {

            assigment.userGroup = 'operations';
            break;
        }
        case endowmentStates.operationsDirectorApproval: {

            assigment.userGroup = 'operationsDirector';
            break;
        }
        case endowmentStates.deputyDirectorApproval: {

            assigment.userGroup = 'deputyDirector';
            break;
        }
        default:
            return null;
    }

    result.push(assigment);
    return result;
}
