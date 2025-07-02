'use strict';

const guidHelper = require("@config-rgsl/infrastructure/lib/GuidHelper");

module.exports = function claimMapping({
    id,
    number,
    state,
    body,
    configurationCodeName,
    commonBody,
    originalDocumentNumber,
    versionToRevertToId,
    previousCommonBody,
    dimensions
}, sinkExchange) {

    const applicant = body.mainAttributes?.applicationInfo?.applicant;
    const applicationInfo = body.mainAttributes?.applicationInfo;
    const insuredEvent = body.mainAttributes?.insuredEvent;
    const selectedRisk = body.mainAttributes?.selectedRisk;
    const riskAdditionalAttributes = body.mainAttributes?.riskAdditionalAttributes;
    const injuries = riskAdditionalAttributes?.injuries ?? [];
    const claimAmounts = body.claimAmounts;
    const mainAttributes = body.mainAttributes;
    const beneficiaries = body.claimBeneficiaries ?? [];

    const result = {

        'CLM_IMPL.CLM_HUB': [{
            CLAIM_NUMBER: number
        }],

        'CLM_IMPL.CLM_SAT': [{
            CLAIM_NUMBER: number,
            CLAIM_STATE: state,
            REJECTION_REASON_CODE: mainAttributes.rejectionReason?.code,
            REJECTION_REASON_DESCRIPTION: mainAttributes.rejectionReason?.description,
            REQUESTED_CLAIM_AMOUNT: claimAmounts?.requestedClaimAmount,
            PAYMENT_PERCENTAGE: claimAmounts?.paymentPercentage,
            EXCHANGE_RATE: claimAmounts?.exchangeRate,
            RZNU: claimAmounts?.rznu,
            SHOULD_USE_NETTING: claimAmounts?.shouldUseNetting ?? false,
            NON_ACCEPTANCE: claimAmounts?.nonAcceptance ?? false,
            NUM_OF_NON_ACCEPTANCE_PAYMENT: claimAmounts?.numberOfNonAcceptancePayment,
            LEGAL_CONCLUSION: body.approvalConclusions?.legalConclusion,
            SECURITY_CONCLUSION: body.approvalConclusions?.securityConclusion,
            REQUEST_TO_CLIENT_REASON: body.requestReasons?.requestToClientReason,
            REQUEST_TO_EXT_ORG_REASON: body.requestReasons?.requestToExtOrgReason,
            CONTRACT_NUMBER: mainAttributes.contract?.number,
            CONTRACT_HOLDER_NAME: mainAttributes?.policyHolderInfo?.policyHolder?.fullName,
            CONTRACT_INSURED_NAME: mainAttributes?.insuredPersonInfo?.insuredPerson?.fullName,
            CONTRACT_CONF_CODE_NAME: mainAttributes.contract?.configurationName,
            FIXED_EXCH_RATE: claimAmounts?.fixedExchangeRate,
            USE_FIXED_EXCH_RATE: claimAmounts?.useFixedExchangeRate ?? false
        }],

        'CLM_IMPL.CLM_IE_LINK': insuredEvent?.insuredEventNumber ? [
            {
                CLAIM_NUMBER: number,
                IE_NUMBER: insuredEvent.insuredEventNumber
            }
        ] : [],

        'CLM_IMPL.CLM_IE_SAT': [
            {
                $deleted: true,
                CLAIM_NUMBER: number
            }],

        'CLM_IMPL.CLM_APPLICANT_LINK': applicant?.partyCode ? [
            {
                CLAIM_NUMBER: number,
                PARTY_CODE: applicant.partyCode
            }
        ] : [],

        'CLM_IMPL.CLM_APPLICANT_SAT': [
            {
                $deleted: true,
                CLAIM_NUMBER: number
            }],

        'CLM_IMPL.CLM_RISK_SAT': [
            {
                $deleted: true,
                CLAIM_NUMBER: number
            }],

        'CLM_IMPL.CLM_BENEFICIARY_LINK': [],
        'CLM_IMPL.CLM_BENEFICIARY_SAT': [
            {
                $deleted: true,
                CLAIM_NUMBER: number
            }
        ],

        'CLM_IMPL.CLM_INJURY_SAT': [
            {
                $deleted: true,
                CLAIM_NUMBER: number
            }
        ]
    };

    if (insuredEvent?.insuredEventNumber) {

        result['CLM_IMPL.CLM_IE_SAT'].push({
            CLAIM_NUMBER: number,
            IE_NUMBER: insuredEvent.insuredEventNumber,
            CONTRACT_CURRENCY: claimAmounts?.contractCurrency,
        });
    }

    if (applicant?.partyCode) {

        result['CLM_IMPL.CLM_APPLICANT_SAT'].push({
            CLAIM_NUMBER: number,
            PARTY_CODE: applicant.partyCode,
            STATEMENT_RECEIVED_DATE: applicationInfo?.statementReceivedDate,
            STATEMENT_APPLICATION_DATE: applicationInfo?.statementApplicationDate,
            RECEIVE_METHOD: applicationInfo?.receiveMethod,
        });
    }

    if (selectedRisk?.riskCode) {

        result['CLM_IMPL.CLM_RISK_SAT'].push({
            CLAIM_NUMBER: number,
            CODE: selectedRisk.riskCode,
            DESCRIPTION: selectedRisk.riskShortDescription,
            INSURED_SUM: selectedRisk.riskInsuredSum,
            BUSINESS_LINE: selectedRisk.businessLine,
            DISABILITY_GROUP: riskAdditionalAttributes?.disabilityGroup,
            NUM_OF_PAID_DAYS: riskAdditionalAttributes?.numberOfPaidDays,
        });
    }

    beneficiaries.forEach(beneficiary => {

        if (beneficiary.partyCode) {

            const currentLinks = result['CLM_IMPL.CLM_BENEFICIARY_LINK'];
            const existingLink = currentLinks.find(item => item.CLAIM_NUMBER === number && item.PARTY_CODE === beneficiary.partyCode);

            if (!existingLink) {

                result['CLM_IMPL.CLM_BENEFICIARY_LINK'].push({
                    CLAIM_NUMBER: number,
                    PARTY_CODE: beneficiary.partyCode
                });
            }

            result['CLM_IMPL.CLM_BENEFICIARY_SAT'].push({
                CLAIM_NUMBER: number,
                PARTY_CODE: beneficiary.partyCode,
                RECORD_ID: guidHelper.generate(),
                REASON_CODE: beneficiary.beneficiaryReason?.code,
                REASON_DESCRIPTION: beneficiary.beneficiaryReason?.description,
                PAYMENT_TYPE_CODE: beneficiary.beneficiaryPaymentType?.code,
                PAYMENT_TYPE_DESCRIPTION: beneficiary.beneficiaryPaymentType?.description,
                AMOUNT_TO_PAY_PERCENTAGE: beneficiary.amountToPayPercetage,
                AMOUNT_TO_PAY: beneficiary.amountToPay,
                AMOUNT_TO_PAY_RUB_CUR: beneficiary.amountToPayInRubCurrency,
                IS_PAID: beneficiary.isPaid ?? false,
                ASSIGNED_PO_NUMBER: beneficiary.assignedPaymentOrderNumber,
                BANK_ACCOUNT_NUMBER: beneficiary.bankAccount?.number
            });
        }
    });

    injuries.forEach(injury => {

        result['CLM_IMPL.CLM_INJURY_SAT'].push({
            CLAIM_NUMBER: number,
            CODE: injury.injuryDetails?.code,
            DESCRIPTION: injury.injuryDetails?.description,
            DEFAULT_PAYMENT_PERCENTAGE: injury.injuryDetails?.defaultPymentPercentage ? injury.injuryDetails.defaultPymentPercentage : null,
            GROUP_CODE: injury.injuryDetails?.group?.code,
            GROUP_DESCRIPTION: injury.injuryDetails?.group?.description,
            SUBGROUP_CODE: injury.injuryDetails?.subgroupLevel1?.code,
            SUBGROUP_DESCRIPTION: injury.injuryDetails?.subgroupLevel1?.description,
            PAYMENT_PERCENTAGE: injury.paymentInjuryPercentage,
            NUMBER_OF_INJURIES: injury.numberOfInjuries
        });
    });

    if (configurationCodeName === 'CollectiveClaim') {

        result['CLM_IMPL.COLLECTIVE_CLM_SAT'] = [{
            CLAIM_NUMBER: number,
            IS_PAID: claimAmounts.isPaid ?? false,
            ASSIGNED_PO_NUMBER: claimAmounts.assignedPaymentOrderNumber
        }];
    }

    return result;
};
