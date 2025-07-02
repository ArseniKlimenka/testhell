'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { risksCodes, anyReasonDisabilityRisks, risksWithPaidDays } = require('@config-rgsl/claim-base/lib/claimConsts');
const { insurentEventTypesWithDiagnosis } = require('@config-rgsl/claim-base/lib/claimConsts');

/**
 * @errorCode {errorCode} InsuredEventDateIsRequired
 * @errorCode {errorCode} InsuredEventDateSholdBeLesserOrEqualToStatementApplicationDate
 * @errorCode {errorCode} InsuredEventDateSholdBeLesserOrEqualToStatementReceivedDate
 * @errorCode {errorCode} ContractNumberIsRequired
 * @errorCode {errorCode} RiskIRequired
 * @errorCode {errorCode} InsuredEventTypeIsRequired
 * @errorCode {errorCode} InsuredEventReasonIsRequired
 * @errorCode {errorCode} receiveMethodIsRequired
 * @errorCode {errorCode} DuplicatedClaimsFound
 * @errorCode {errorCode} InsuredEventDateSholdBeLesserOrEqualToToday
 * @errorCode {errorCode} InsuredEventRequired
 * @errorCode {errorCode} InsuredEventDateIsLaterThanCancellationDate
 * @errorCode {errorCode} contractIsNotPaidAtEventDateNotFirstPeriod
 * @errorCode {errorCode} DiagnosisNoteIsRequired
 * @errorCode {errorCode} NonAcceptancePaymentNumberIsRequired
 * @errorCode {errorCode} RequestedAmountIsRequired
 * @errorCode {errorCode} PaymentAmountIsTooBig
 * @errorCode {errorCode} AmountInRubCurrencyIsRequired
 * @errorCode {errorCode} AmountInDocCurrencyIsRequired
 * @errorCode {errorCode} applcantIsRequired
 * */
module.exports = function rootLevelValidation(input) {

    const validationErrors = [];

    const state = this.businessContext.documentState;

    validateMainAttributes(input, validationErrors);
    validateRiskAdditionalParameters(input, state, validationErrors);
    validateClaimDates(input, validationErrors);
    validateClaimAmounts(input, validationErrors);

    const duplicates = input.tempTechnicalData?.duplicates ?? [];

    if (duplicates.length > 0) {

        validationErrors.push({
            errorCode: 'DuplicatedClaimsFound',
            reference: {
                items: duplicates.join()
            },
            severity: 'Warning'
        });
    }

    const cancellationDate = input.tempTechnicalData?.cancellationDate;
    const eventDate = input.mainAttributes?.insuredEvent?.insuredEventDate;

    if (cancellationDate && eventDate && eventDate > cancellationDate) {

        validationErrors.push({
            errorCode: 'InsuredEventDateIsLaterThanCancellationDate',
            severity: 'Warning'
        });
    }

    return validationErrors;
};

function validateMainAttributes(input, validationErrors) {

    if (!input.mainAttributes?.contract?.number) {

        validationErrors.push({
            errorCode: 'ContractNumberIsRequired',
            errorDataPath: '/Body/mainAttributes/contract/number'
        });
    }

    if (!input.mainAttributes?.selectedRisk) {

        validationErrors.push({
            errorCode: 'RiskIRequired',
            errorDataPath: '/Body/mainAttributes/selectedRisk'
        });
    }

    if (!input.mainAttributes?.insuredEvent?.insuredEventType?.code) {

        validationErrors.push({
            errorCode: 'InsuredEventTypeIsRequired',
            errorDataPath: '/Body/mainAttributes/insuredEvent/insuredEventType'
        });
    }

    if (!input.mainAttributes?.insuredEvent?.insuredEventReason?.code) {

        validationErrors.push({
            errorCode: 'InsuredEventReasonIsRequired',
            errorDataPath: '/Body/mainAttributes/insuredEvent/insuredEventReason'
        });
    }

    const insuredEventType = input.mainAttributes?.insuredEvent?.insuredEventType?.code;
    const diagnosis = input.mainAttributes?.diagnosisNote;

    if (!diagnosis && insurentEventTypesWithDiagnosis.includes(insuredEventType)) {

        validationErrors.push({
            errorCode: 'DiagnosisNoteIsRequired',
            errorDataPath: '/Body/mainAttributes/diagnosisNote'
        });
    }

    if (!input.mainAttributes?.applicationInfo?.receiveMethod) {

        validationErrors.push({
            errorCode: 'receiveMethodIsRequired',
            errorDataPath: '/Body/mainAttributes/applicationInfo/receiveMethod'
        });
    }

    if (!input.mainAttributes?.applicationInfo?.applicant?.partyCode) {

        validationErrors.push({
            errorCode: 'applcantIsRequired',
            errorDataPath: '/Body/mainAttributes/applicationInfo/applicant/fullName'
        });
    }

    if (!input.mainAttributes?.insuredEvent?.insuredEventNumber) {

        validationErrors.push({
            errorCode: 'InsuredEventRequired',
            errorDataPath: '/Body/mainAttributes/insuredEvent/insuredEventNumber'
        });
    }
}

function validateClaimAmounts(input, validationErrors) {

    if (!input.claimAmounts?.requestedClaimAmount) {

        validationErrors.push({
            errorCode: 'RequestedAmountIsRequired',
            errorDataPath: '/Body/claimAmounts/requestedClaimAmount'
        });
    }

    const paymentAmountInDocCurrency = input.claimAmounts?.paymentAmountInDocCurrency;

    if (!paymentAmountInDocCurrency) {

        validationErrors.push({
            errorCode: 'AmountInDocCurrencyIsRequired',
            errorDataPath: '/Body/claimAmounts/paymentAmountInDocCurrency'
        });
    }

    if (!input.claimAmounts?.paymentAmountInRubCurrency) {

        validationErrors.push({
            errorCode: 'AmountInRubCurrencyIsRequired',
            errorDataPath: '/Body/claimAmounts/paymentAmountInRubCurrency'
        });
    }
}

function validateClaimDates(input, validationErrors) {

    const statementReceivedDate = input.mainAttributes?.applicationInfo?.statementReceivedDate;
    const statementApplicationDate = input.mainAttributes?.applicationInfo?.statementApplicationDate;
    const insuredEventDate = input.mainAttributes?.insuredEvent?.insuredEventDate;

    if (insuredEventDate) {

        if (statementApplicationDate && insuredEventDate > statementApplicationDate) {

            validationErrors.push({
                errorCode: 'InsuredEventDateSholdBeLesserOrEqualToStatementApplicationDate',
                errorDataPath: '/Body/mainAttributes/insuredEvent/insuredEventDate'
            });
        }

        if (statementReceivedDate && insuredEventDate > statementReceivedDate) {

            validationErrors.push({
                errorCode: 'InsuredEventDateSholdBeLesserOrEqualToStatementReceivedDate',
                errorDataPath: '/Body/mainAttributes/insuredEvent/insuredEventDate'
            });
        }

        const dateNow = dateUtils.dateNow();

        if (insuredEventDate > dateNow) {

            validationErrors.push({
                errorCode: 'InsuredEventDateSholdBeLesserOrEqualToToday',
                errorDataPath: '/Body/mainAttributes/insuredEvent/insuredEventDate'
            });
        }
    }
    else {

        validationErrors.push({
            errorCode: 'InsuredEventDateIsRequired',
            errorDataPath: '/Body/mainAttributes/insuredEvent/insuredEventDate'
        });
    }
}

function validateRiskAdditionalParameters(input, state, validationErrors) {

    const selectedRisk = input.mainAttributes?.selectedRisk;

    if (!selectedRisk) {

        return;
    }

    const openAmounts = input.tempTechnicalData?.policyOpenAmounts ?? [];
    const eventDate = input.mainAttributes?.insuredEvent?.insuredEventDate;

    if (eventDate && openAmounts.length > 0) {

        const notPaidPeriod = openAmounts.find(item => item.openAmount > 0);

        if (notPaidPeriod) {

            validationErrors.push({
                errorCode: 'contractIsNotPaidAtEventDateNotFirstPeriod',
                severity: 'Warning'
            });
        }
    }

    const nonAcceptance = input.claimAmounts?.nonAcceptance;
    const numberOfNonAcceptancePayment = input.claimAmounts?.numberOfNonAcceptancePayment;

    if (nonAcceptance && !numberOfNonAcceptancePayment) {

        validationErrors.push({
            errorCode: 'NonAcceptancePaymentNumberIsRequired',
            errorDataPath: '/Body/claimAmounts/numberOfNonAcceptancePayment'
        });
    }
}
