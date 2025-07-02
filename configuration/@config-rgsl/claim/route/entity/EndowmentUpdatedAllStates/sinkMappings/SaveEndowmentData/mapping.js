'use strict';

const guidHelper = require("@config-rgsl/infrastructure/lib/GuidHelper");

module.exports = function endowmentMapping({
    id,
    number,
    state,
    body,
    commonBody,
    originalDocumentNumber,
    versionToRevertToId,
    previousCommonBody,
    dimensions
}, sinkExchange) {

    const approvalConclusions = body.approvalConclusions;
    const approvalRequests = body.approvalRequests;
    const endowmentAmounts = body.endowmentAmounts;
    const paymentLines = body.endowmentAmounts?.paymentLines ?? [];
    const endowmentBeneficiaries = body.endowmentBeneficiaries ?? [];
    const endowmentPaymentFrequency = body.endowmentPaymentFrequency;
    const endowmentPaymentVariant = body.endowmentPaymentVariant;
    const mainAttributes = body.mainAttributes;
    const applicationInfo = mainAttributes?.applicationInfo;
    const applicant = mainAttributes?.applicationInfo?.applicant;
    const contract = mainAttributes?.contract;
    const eventReason = mainAttributes?.eventReason;
    const eventType = mainAttributes?.eventType;
    const rejectionNote = mainAttributes?.rejectionNote;
    const rejectionReason = mainAttributes?.rejectionReason;
    const selectedRisk = mainAttributes?.selectedRisk;

    const result = {

        'EWT_IMPL.EWT_HUB': [{
            ENDOWMENT_NUMBER: number
        }],

        'EWT_IMPL.EWT_SAT': [{
            ENDOWMENT_NUMBER: number,
            ENDOWMENT_STATE: state,
            CONTRACT_CURRENCY: endowmentAmounts?.contractCurrency,
            EXCHANGE_RATE: endowmentAmounts?.exchangeRate,
            MANUAL_RZNU: endowmentAmounts?.manualRznu ?? false,
            NON_ACCEPTANCE: endowmentAmounts?.nonAcceptance ?? false,
            NUM_OF_NON_ACCEPTANCE_PAYMENT: endowmentAmounts?.numberOfNonAcceptancePayment,
            RZNU: endowmentAmounts?.rznu,
            SHOULD_USE_NETTING: endowmentAmounts?.shouldUseNetting ?? false,
            ACTUARY_REQUEST: approvalRequests?.actuaryRequest,
            COMPLIANCE_REQUEST: approvalRequests?.complianceRequest,
            INS_METHODOLOGY_REQUEST: approvalRequests?.insuranceMethodologyRequest,
            LEGAL_REQUEST: approvalRequests?.legalRequest,
            REQUEST_TO_CLIENT: approvalRequests?.requestToClient,
            SECURITY_REQUEST: approvalRequests?.securityRequest,
            ACTUARY_CONCLUSION: approvalConclusions?.actuaryConclusion,
            COMPLIANCE_CONCLUSION: approvalConclusions?.complianceConclusion,
            INS_METHODOLOGY_CONCLUSION: approvalConclusions?.insuranceMethodologyConclusion,
            LEGAL_CONCLUSION: approvalConclusions?.legalConclusion,
            RESPONSE_FROM_CLIENT: approvalConclusions?.responseFromClient,
            SECURITY_CONCLUSION: approvalConclusions?.securityConclusion,
            PAYMENT_FREQUENCY_CODE: endowmentPaymentFrequency?.code,
            PAYMENT_FREQUENCY_DESCRIPTION: endowmentPaymentFrequency?.description,
            PAYMENT_VARIANT_CODE: endowmentPaymentVariant?.code,
            PAYMENT_VARIANT_DESCRIPTION: endowmentPaymentVariant?.description,
            EVENT_REASON_CODE: eventReason?.code,
            EVENT_REASON_DESCRIPTION: eventReason?.description,
            EVENT_TYPE_CODE: eventType?.code,
            EVENT_TYPE_DESCRIPTION: eventType?.description,
            REJECTION_NOTE: rejectionNote,
            REJECTION_REASON: rejectionReason,
            CONTRACT_NUMBER: contract.number,
            CONTRACT_HOLDER_NAME: contract.holder,
            CONTRACT_CONF_CODE_NAME: contract.configurationName,
            FIXED_EXCH_RATE: endowmentAmounts?.fixedExchangeRate,
            USE_FIXED_EXCH_RATE: endowmentAmounts?.useFixedExchangeRate
        }],

        'EWT_IMPL.EWT_APPLICANT_LINK': applicant?.partyCode ? [
            {
                ENDOWMENT_NUMBER: number,
                PARTY_CODE: applicant.partyCode
            }
        ] : [],

        'EWT_IMPL.EWT_APPLICANT_SAT': [
            {
                $deleted: true,
                ENDOWMENT_NUMBER: number
            }],

        'EWT_IMPL.EWT_RISK_SAT': [
            {
                $deleted: true,
                ENDOWMENT_NUMBER: number
            }],

        'EWT_IMPL.EWT_PAYMENT_LINES_SAT': [
            {
                $deleted: true,
                ENDOWMENT_NUMBER: number
            }],

        'EWT_IMPL.EWT_BENEFICIARY_LINK': [],
        'EWT_IMPL.EWT_BENEFICIARY_SAT': [
            {
                $deleted: true,
                ENDOWMENT_NUMBER: number
            }
        ],

        'EWT_IMPL.EWT_CONTRACT_LINK': [
            {
                ENDOWMENT_NUMBER: number,
                CONTRACT_NUMBER: contract.number
            }
        ],
        'EWT_IMPL.EWT_CONTRACT_SAT': [
            {
                $deleted: true,
                ENDOWMENT_NUMBER: number
            }
        ],
    };

    result['EWT_IMPL.EWT_CONTRACT_SAT'].push({
        ENDOWMENT_NUMBER: number,
        CONTRACT_NUMBER: contract.number,
        EWT_CONTRACT_CONF_NAME: contract.configurationName
    });

    if (applicant?.partyCode) {

        result['EWT_IMPL.EWT_APPLICANT_SAT'].push({
            ENDOWMENT_NUMBER: number,
            PARTY_CODE: applicant.partyCode,
            EVENT_DATE: applicationInfo?.eventDate,
            STATEMENT_RECEIVED_DATE: applicationInfo?.statementReceivedDate,
            STATEMENT_APPLICATION_DATE: applicationInfo?.statementApplicationDate,
            RECEIVE_METHOD: applicationInfo?.receiveMethod,
        });
    }

    if (selectedRisk?.riskCode) {

        result['EWT_IMPL.EWT_RISK_SAT'].push({
            ENDOWMENT_NUMBER: number,
            CODE: selectedRisk.riskCode,
            DESCRIPTION: selectedRisk.riskShortDescription,
            INSURED_SUM: selectedRisk.riskInsuredSum,
            BUSINESS_LINE: selectedRisk.businessLine,
            START_DATE: selectedRisk.startDate,
            END_DATE: selectedRisk.endDate
        });
    }

    endowmentBeneficiaries.forEach(beneficiary => {

        if (beneficiary.partyCode) {

            const currentLinks = result['EWT_IMPL.EWT_BENEFICIARY_LINK'];
            const existingLink = currentLinks.find(item => item.ENDOWMENT_NUMBER === number && item.PARTY_CODE === beneficiary.partyCode);

            if (!existingLink) {

                result['EWT_IMPL.EWT_BENEFICIARY_LINK'].push({
                    ENDOWMENT_NUMBER: number,
                    PARTY_CODE: beneficiary.partyCode
                });
            }

            result['EWT_IMPL.EWT_BENEFICIARY_SAT'].push({
                ENDOWMENT_NUMBER: number,
                PARTY_CODE: beneficiary.partyCode,
                RECORD_ID: guidHelper.generate(),
                REASON_CODE: beneficiary.beneficiaryReason?.code,
                REASON_DESCRIPTION: beneficiary.beneficiaryReason?.description,
                PAYMENT_TYPE_CODE: beneficiary.beneficiaryPaymentType?.code,
                PAYMENT_TYPE_DESCRIPTION: beneficiary.beneficiaryPaymentType?.description,
                AMOUNT_TO_PAY_PERCENTAGE: beneficiary.amountToPayPercetage,
                AMOUNT_TO_PAY: beneficiary.amountToPay,
                AMOUNT_TO_PAY_RUB_CUR: beneficiary.amountToPayInRubCurrency,
                PIT_AMOUNT: beneficiary.pitAmount,
                PIT_AMOUNT_RUB_CUR: beneficiary.pitAmountInRubCurrency,
                IS_MANUAL_PIT: beneficiary.isManualPit ?? false,
                IS_PAID: beneficiary.isPaid ?? false,
                ASSIGNED_PO_NUMBER: beneficiary.assignedPaymentOrderNumber,
                ASSIGNED_PIT_PO_NUMBER: beneficiary.assignedPitPaymentOrderNumber,
                BANK_ACCOUNT_NUMBER: beneficiary.bankAccount?.number
            });
        }
    });

    paymentLines.forEach(paymentLine => {

        result['EWT_IMPL.EWT_PAYMENT_LINES_SAT'].push({
            ENDOWMENT_NUMBER: number,
            TYPE: paymentLine.lineType,
            CONTRACT_CURRENCY: paymentLine.lineAmountInContractCurrency,
            RUB_CURRENCY: paymentLine.lineAmountInRubCurrency
        });
    });

    return result;
};
