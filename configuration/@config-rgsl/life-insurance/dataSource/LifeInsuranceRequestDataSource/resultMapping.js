'use strict';

const { translationUtils } = require('@adinsure/runtime');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function resultMapping(input) {

    const contractProductGroup = input.PRODUCT_GROUP_CODE;

    return {

        requestId: input.REQUEST_ID,
        requestNumber: input.REQUEST_NUMBER,
        requestConfName: input.REQUEST_CONF_NAME,
        requestState: input.REQUEST_STATE,
        requestStateDescription: translationUtils.getTranslation(
            'document/LifeInsuranceRequest/1',
            'states',
            null,
            input.REQUEST_STATE),
        requestType: input.REQUEST_TYPE,
        requestTypeDescription: translationUtils.getTranslation(
            'document/LifeInsuranceRequest/1',
            'enum',
            'typeOfRequest',
            input.REQUEST_TYPE,
            'LifeInsuranceRequest'),
        requestAmendmentReason: input.REQUEST_AMENDMENT_REASON,
        requestAmendmentReasonDescription: translationUtils.getTranslation(
            'document/LifeInsuranceRequest/1',
            'enum',
            'amendmentReason',
            input.REQUEST_AMENDMENT_REASON,
            'LifeInsuranceRequest'),
        requestApplicant: input.REQUEST_APPLICANT,
        requestIssueDate: input.REQUEST_ISSUE_DATE,
        requestBankName: input.REQUEST_BANK_NAME,
        requestBankNumber: input.REQUEST_BANK_NUMBER,
        contractNumber: input.CONTRACT_NUMBER,
        contractState: input.CONTRACT_STATE,
        contractStateDescription: translationUtils.getTranslation(
            'document/AccumulatedLifeInsurancePolicy/1',
            'states',
            null,
            input.CONTRACT_STATE),
        contractConfName: input.CONTRACT_CONF_NAME,
        contractHolderName: input.CONTRACT_HOLDER_NAME,
        contractProductCode: input.CONTRACT_PRODUCT_CODE,
        contractProductGroup: contractProductGroup,
        contractProductGroupDescription: translationUtils.getTranslation(
            'dataSource/GeneralContractSearchDataSource/1',
            'enum',
            'productGroup',
            contractProductGroup,
            'ProductGroup'),
        contractIssueDate: input.CONTRACT_ISSUE_DATE,
        contractStartDate: input.CONTRACT_START_DATE,
        contractRiskPremium: input.CONTRACT_RISK_PREMIUM ? round(input.CONTRACT_RISK_PREMIUM, 2) : undefined,
        contractPartnerName: input.CONTRACT_PARTNER_NAME

    };
};
