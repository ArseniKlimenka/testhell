const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const lifeConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

/**
 * @errorCode {errorCode} taxDeductionAmountIsRequired
 * @errorCode {errorCode} taxDeductionAmountIsTooLarge
 * @errorCode {errorCode} taxDeductionAmountIsTooSmall
 * @errorCode {errorCode} notPaidEndowmentsFound
 */

module.exports = function validateTaxDeduction(input) {

    const validationErrors = [];

    const dataPath = this.businessContext.dataPath;
    const items = input.taxDeductionItems;

    const body = this.businessContext.rootData;
    const contractVersions = getValue(body, 'contractVersions', []);
    const recipients = body.paymentAmendmentConditions.canellationRecipients ?? [];

    if (contractVersions.length === 0 || recipients.length === 0) {

        return validationErrors;
    }

    const contractStateVersions = contractVersions.filter(i => i.seqNumber == 0 ||
        i.dimensions?.some(d => d.Key === 'amendmentType' && (d.Value === 'NonFinancialChange' || d.Value === 'FinancialChange')));

    const originalContractStateVersion = contractStateVersions.find(i => i.seqNumber == 0);
    const latestContractStateVersion = contractStateVersions.sort((a, b) => b.seqNumber - a.seqNumber)[0];

    const originalDocumentConfName = originalContractStateVersion.configurationName;
    const stateBody = (latestContractStateVersion.seqNumber == 0 ? latestContractStateVersion.body : latestContractStateVersion.snapshotBody)
    ?? originalContractStateVersion.body;

    const originalDocumentStartDate = getValue(stateBody, 'policyTerms.startDate');
    const originalDocumentEndDate = getValue(stateBody, 'policyTerms.endDate');
    const amendmentReason = body.basicAmendmentConditions.amendmentReason;
    const policyTerm = dateUtils.getYearDifference(originalDocumentStartDate, dateUtils.addDays(originalDocumentEndDate, 1));

    if (lifeConstants.productCode.CreditLifeInsurancePolicy === originalDocumentConfName || amendmentReason === amendmentConstants.amendmentReason.byClientCoolOff || policyTerm < 5) {

        return validationErrors;
    }

    for (let index = 0; index < items.length; index++) {

        const item = items[index];

        if (!item.amount && item.amount !== 0) {

            validationErrors.push({
                errorCode: "taxDeductionAmountIsRequired",
                errorDataPath: `${dataPath}/${index}/amount`
            });
        }
        else if (item.amount > amendmentConstants.taxDeductionAmounts.max) {

            validationErrors.push({
                errorCode: "taxDeductionAmountIsTooLarge",
                errorDataPath: `${dataPath}/${index}/amount`
            });
        }
        else if (item.amount < amendmentConstants.taxDeductionAmounts.min) {

            validationErrors.push({
                errorCode: "taxDeductionAmountIsTooSmall",
                errorDataPath: `${dataPath}/${index}/amount`
            });
        }

    }

    const endowments = body.tempTechnicalData?.notPaidEndowments ?? [];

    if (endowments && endowments.length > 0) {

        validationErrors.push({
            errorCode: 'notPaidEndowmentsFound',
            reference: {
                items: endowments.join()
            },
            severity: 'Warning'
        });
    }

    return validationErrors;
};
