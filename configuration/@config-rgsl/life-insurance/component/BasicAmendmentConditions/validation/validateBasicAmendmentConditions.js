const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

/**
 * @errorCode {errorCode} CoolOffValidFrom
 * @errorCode {errorCode} NonCoolOffValidFrom
 * @errorCode {errorCode} ReceiveMethodRequired
 * @errorCode {errorCode} DatesBeforePolicy
 * @errorCode {errorCode} ZeroDebtAmount
 */

module.exports = function validateBasicAmendmentConditions(input) {

    const validationErrors = [];

    const dataPath = this.businessContext.dataPath;
    const body = this.businessContext.rootData;
    const documentState = this.businessContext.documentState;
    const amendmentType = this.businessContext.configurationDimensions.amendmentType;

    const allowedStates = [
        amendmentConstants.amendmentState.Draft,
        amendmentConstants.amendmentState.OperationsApproval
    ];

    // do valiations only in draft
    if (!allowedStates.includes(documentState)) { return []; }

    const contractVersions = body?.contractVersions ?? [];

    if (contractVersions.length === 0) {
        return validationErrors;
    }

    const contractStateVersions = contractVersions.filter(i => i.seqNumber == 0 ||
        i.dimensions?.some(d => d.Key === 'amendmentType' && (d.Value === 'NonFinancialChange' || d.Value === 'FinancialChange')));

    const originalContractStateVersion = contractStateVersions.find(i => i.seqNumber == 0);
    const latestContractStateVersion = contractStateVersions.sort((a, b) => b.seqNumber - a.seqNumber)[0];

    const stateBody = (latestContractStateVersion.seqNumber == 0 ? latestContractStateVersion.body : latestContractStateVersion.snapshotBody)
    ?? originalContractStateVersion.body;

    const policyIssueDate = input.policyData?.policyIssueDate ?? stateBody?.basicConditions?.issueDate;
    const policyStartDate = input.policyData?.policyStartDate ?? stateBody?.policyTerms?.startDate;
    const policyEndDate = stateBody?.policyTerms?.endDate;

    const amendmentReason = input.amendmentReason;
    const amendmentSubType = input.amendmentSubType;
    const receiveMethod = input.receiveMethod;
    const debtAmount = body.paymentAmendmentConditions?.paymentLines?.find(item => item.paymentLineType === amendmentConstants.amendmentPaymentLineType.debt)?.paymentLineSum;
    const validFrom = input.validFrom;
    const applicationSignDate = input.applicationSignDate;
    const applicationReceiveDate = input.applicationReceiveDate;
    const fullPackageReceiveDate = input.fullPackageReceiveDate;

    if (amendmentType == amendmentConstants.amendmentType.Cancellation) {

        if (applicationSignDate < policyIssueDate || applicationSignDate < policyStartDate) {

            validationErrors.push({
                errorCode: "DatesBeforePolicy",
                errorDataPath: `${dataPath}/applicationSignDate`
            });
        }

        if (applicationReceiveDate < policyIssueDate || applicationReceiveDate < policyStartDate) {

            validationErrors.push({
                errorCode: "DatesBeforePolicy",
                errorDataPath: `${dataPath}/applicationReceiveDate`
            });
        }

        if (fullPackageReceiveDate < policyIssueDate || fullPackageReceiveDate < policyStartDate) {

            validationErrors.push({
                errorCode: "DatesBeforePolicy",
                errorDataPath: `${dataPath}/fullPackageReceiveDate`
            });
        }

        if (debtAmount == 0 && amendmentReason == amendmentConstants.amendmentReason.byCompany && amendmentSubType == amendmentConstants.amendmentSubType.byCompanyDecision) {

            validationErrors.push({
                errorCode: "ZeroDebtAmount",
                errorDataPath: `${dataPath}/amendmentReason`
            });
        }
    }

    if (amendmentSubType == amendmentConstants.amendmentSubType.byClientDecision) {

        if (!receiveMethod) {
            validationErrors.push({
                errorCode: "ReceiveMethodRequired",
                errorDataPath: dataPath + '/receiveMethod'
            });
        }
    }

    if (amendmentReason == amendmentConstants.amendmentReason.byClientCoolOff) {

        if (validFrom && policyStartDate && policyStartDate != validFrom) {
            validationErrors.push({
                errorCode: "CoolOffValidFrom",
                errorDataPath: dataPath + '/validFrom'
            });
        }
    }
    else {

        if (validFrom && (policyStartDate > validFrom || policyEndDate < validFrom)) {
            validationErrors.push({
                errorCode: "NonCoolOffValidFrom",
                errorDataPath: dataPath + '/validFrom'
            });
        }
    }

    return validationErrors;

};
