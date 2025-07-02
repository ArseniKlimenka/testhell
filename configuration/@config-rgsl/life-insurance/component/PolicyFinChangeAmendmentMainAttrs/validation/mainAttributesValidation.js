'use strict';

const { changeAmendmentTypes, changeTypes, equityLifeChangeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

/**
 * @errorCode {errorCode} ChangeTypeIsRequired
 * @errorCode {errorCode} insuredPersonPesonalDataChangeTypeIsRequired
 * @errorCode {errorCode} policyHolderPesonalDataChangeTypeIsRequired
 * @errorCode {errorCode} AmendmentIssueDateIsRequired
 * @errorCode {errorCode} AmendmentEffectiveDateIsRequired
 * @errorCode {errorCode} AcceptDateIsRequired
 * @errorCode {errorCode} BeneficiaryEditChangeTypeIsNotAllowedWhenHeritorsAreAvailable
 * @errorCode {errorCode} amendmentEffectiveDateMustBeEqualToAnyPeriodStartDate
 * @errorCode {errorCode} amendmentEffectiveDateMustBeAnniversary
 * @errorCode {errorCode} atLeastOneChangedCommission
 * @errorCode {errorCode} atLeastOneChangedCommissionNotInEffectivePeriodAmendment
 */

module.exports = function rootLevelValidation(input) {

    const amendmentType = this.businessContext.configurationDimensions['amendmentType'];
    const body = this.businessContext.rootData;
    const isPolicyHolder = getValue(body, 'insuredPerson.isPolicyHolder');
    const dataPath = this.businessContext.dataPath;

    const validationErrors = [];

    if (!input.changeTypes || input.changeTypes.length === 0) {

        validationErrors.push({
            errorCode: 'ChangeTypeIsRequired',
            errorDataPath: dataPath + '/changeTypes'
        });
    }
    else if (input.changeTypes.includes(changeTypes.policyHolderPersonalDataEdit) && isPolicyHolder && !input.changeTypes.includes(changeTypes.insuredPersonPersonalDataEdit)) {

        validationErrors.push({
            errorCode: 'insuredPersonPesonalDataChangeTypeIsRequired',
            errorDataPath: dataPath + '/changeTypes'
        });
    }
    else if (input.changeTypes.includes(changeTypes.insuredPersonPersonalDataEdit) && isPolicyHolder && !input.changeTypes.includes(changeTypes.policyHolderPersonalDataEdit)) {

        validationErrors.push({
            errorCode: 'policyHolderPesonalDataChangeTypeIsRequired',
            errorDataPath: dataPath + '/changeTypes'
        });
    }

    const isHeritors = getValue(body, 'beneficiaries.isHeritors');

    if (input.changeTypes && input.changeTypes.includes(changeTypes.beneficiaryEdit) && isHeritors) {

        validationErrors.push({
            errorCode: 'BeneficiaryEditChangeTypeIsNotAllowedWhenHeritorsAreAvailable',
            errorDataPath: dataPath + '/changeTypes'
        });
    }

    if (!input.amendmentIssueDate) {

        validationErrors.push({
            errorCode: 'AmendmentIssueDateIsRequired',
            errorDataPath: dataPath + '/amendmentIssueDate'
        });
    }

    if (!input.amendmentEffectiveDate) {

        validationErrors.push({
            errorCode: 'AmendmentEffectiveDateIsRequired',
            errorDataPath: dataPath + '/amendmentEffectiveDate'
        });
    }

    if (!input.acceptDate && amendmentType === changeAmendmentTypes.financialChange) {

        validationErrors.push({
            errorCode: 'AcceptDateIsRequired',
            errorDataPath: dataPath + '/acceptDate'
        });
    }

    const amendmentData = body.amendmentData?.finChangeAmendmentData;
    const amendmentEffectiveDate = amendmentData?.mainAttributes?.amendmentEffectiveDate;
    const startDate = body.policyTerms.startDate; getValue(body, 'policyTerms.startDate');
    const endDate = body.policyTerms.endDate;
    const amendmentChangeTypes = amendmentData?.mainAttributes?.changeTypes;

    let isPeriodStartDateEqual = true;
    let isAnniversary = true;

    const changeTypesPeriodsCheck = [changeTypes.allowPaymentStateChange, changeTypes.commissionRateEdit];
    const contractPeriods = body.paymentPlan ?? [];

    if (amendmentChangeTypes?.some(item => changeTypesPeriodsCheck.includes(item))) {
        isPeriodStartDateEqual = contractPeriods.some(p => p.paymentPeriodStart === amendmentEffectiveDate);
    }
    else {
        const contractPeriods = dateUtils.getPeriodsTableByMonths(startDate, endDate, 12) ?? [];
        isAnniversary = contractPeriods.some(p => p.periodStartDate === amendmentEffectiveDate);
    }

    if (amendmentEffectiveDate && !isPeriodStartDateEqual) {

        validationErrors.push({
            errorCode: 'amendmentEffectiveDateMustBeEqualToAnyPeriodStartDate',
            errorDataPath: '/Body/amendmentData/finChangeAmendmentData/mainAttributes/amendmentEffectiveDate'
        });
    }

    if (amendmentEffectiveDate && !isAnniversary) {

        const productGroup = body.mainInsuranceConditions.insuranceProduct.productGroup;
        const isEquityProductGroup = productGroup === lifeInsuranceConstants.productGroup.DSZ.descriptionRU;
        const isEquityChangeTypes = checkAvailabilitySome(equityLifeChangeTypes, input.changeTypes);

        if (!isEquityProductGroup && !isEquityChangeTypes) {

            validationErrors.push({
                errorCode: 'amendmentEffectiveDateMustBeAnniversary',
                errorDataPath: '/Body/amendmentData/finChangeAmendmentData/mainAttributes/amendmentEffectiveDate'
            });
        }
    }

    const isCommissionRateEdit = input.changeTypes?.some(item => item === changeTypes.commissionRateEdit);
    const isContainsChangedCommission = body.commission.policyCommissionItems.some(item => item?.isChanged === true);

    if (isCommissionRateEdit && !isContainsChangedCommission) {

        validationErrors.push({
            errorCode: 'atLeastOneChangedCommission',
            errorDataPath: '/Body/commission'
        });
    }

    const thereArePeriodsMoreEarlyThanAmendment = body.commission.policyCommissionItems.some(item => Date.parse(item.periodStartDate) < Date.parse(amendmentEffectiveDate) && item?.isChanged === true);

    if (isCommissionRateEdit && thereArePeriodsMoreEarlyThanAmendment) {

        validationErrors.push({
            errorCode: 'atLeastOneChangedCommissionNotInEffectivePeriodAmendment',
            errorDataPath: '/Body/commission'
        });
    }

    return validationErrors;
};
