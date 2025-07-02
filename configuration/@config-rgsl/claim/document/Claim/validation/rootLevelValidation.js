'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { risksCodes, injuryRisks, anyReasonDisabilityRisks, risksWithPaidDays } = require('@config-rgsl/claim-base/lib/claimConsts');
const { getRiskInsuredSumByPeriod } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');
const { insurentEventTypesWithDiagnosis } = require('@config-rgsl/claim-base/lib/claimConsts');
const { validateClaimBeneficiaryBankAccounts } = require('@config-rgsl/claim-base/lib/claimValidationHelper');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

/**
 * @errorCode {errorCode} StatementReceivedDateSholdBeGreaterOrEqualToApplicationDate
 * @errorCode {errorCode} StatementReceivedDateSholdBeGreaterOrEqualToEventDate
 * @errorCode {errorCode} StatementReceivedDateIsRequired
 * @errorCode {errorCode} statementApplicationDateIsRequired
 * @errorCode {errorCode} StatementApplicationDateSholdBeGreaterOrEqualToInsuredEventDate
 * @errorCode {errorCode} StatementApplicationDateSholdBeLesserOrEqualToStatementReceivedDate
 * @errorCode {errorCode} InsuredEventDateIsRequired
 * @errorCode {errorCode} InsuredEventDateSholdBeLesserOrEqualToStatementApplicationDate
 * @errorCode {errorCode} InsuredEventDateSholdBeLesserOrEqualToStatementReceivedDate
 * @errorCode {errorCode} ContractNumberIsRequired
 * @errorCode {errorCode} RiskIRequired
 * @errorCode {errorCode} InsuredEventTypeIsRequired
 * @errorCode {errorCode} InsuredEventReasonIsRequired
 * @errorCode {errorCode} RequestedAmountIsRequired
 * @errorCode {errorCode} RejectionReasonIsRequired
 * @errorCode {errorCode} DiagnosisIsRequired
 * @errorCode {errorCode} receiveMethodIsRequired
 * @errorCode {errorCode} DuplicatedClaimsFound
 * @errorCode {errorCode} InsuredEventDateSholdBeLesserOrEqualToToday
 * @errorCode {errorCode} PaymentAmountIsTooBig
 * @errorCode {errorCode} InsuredEventRequired
 * @errorCode {errorCode} AtleastOneBeneficiaryIsRequired
 * @errorCode {errorCode} TotalDistributedAmountShouldBeLesserOrEqualToThanTotalAmount
 * @errorCode {errorCode} AtleastOneInjuryShouldBeAdded
 * @errorCode {errorCode} DuplicatedInjuriesFound
 * @errorCode {errorCode} InjuriesNotesAreAvailable
 * @errorCode {errorCode} NumberOfPaidDaysIsRequired
 * @errorCode {errorCode} DisabilityGroupIsRequired
 * @errorCode {errorCode} InsuredEventDateIsLaterThanCancellationDate
 * @errorCode {errorCode} contractIsNotPaidAtEventDateNotFirstPeriod
 * @errorCode {errorCode} DiagnosisNoteIsRequired
 * @errorCode {errorCode} NonAcceptancePaymentNumberIsRequired
 * @errorCode {errorCode} DuplicatedBeneficiariesFound
 * @errorCode {errorCode} amountToPayIsRequired
 * @errorCode {errorCode} amountToPayPercentageIsRequired
 * @errorCode {errorCode} paymentPercentageIsNotCorrect
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

    const notes = input.tempTechnicalData?.injuriesNotes ?? [];

    if (notes.length > 0) {

        validationErrors.push({
            errorCode: 'InjuriesNotesAreAvailable',
            severity: 'Note'
        });
    }

    const claimBeneficiaries = input.claimBeneficiaries ?? [];

    if (claimBeneficiaries.length > 1) {

        const partyCodes = claimBeneficiaries
            .filter(item => !item.isPaid)
            .map((item) =>
                ({
                    partyCode: item.partyCode,
                    reasonCode: item.beneficiaryReason.code
                }));

        let hasDuplicates = false;

        for (let i = 0; i < partyCodes.length; i++) {

            if (partyCodes.some((item, idx) =>
                partyCodes[i].partyCode == item.partyCode
                && partyCodes[i].reasonCode == item.reasonCode
                && i != idx)) {

                hasDuplicates = true;
                break;
            }
        }

        if (hasDuplicates) {

            validationErrors.push({
                errorCode: 'DuplicatedBeneficiariesFound',
                errorDataPath: '/Body/claimBeneficiaries',
            });
        }
    }

    for (let i = 0; i < claimBeneficiaries.length; i++) {

        if (claimBeneficiaries[i].isCalcFromAmountToPay ?? false) {

            const amountToPay = claimBeneficiaries[i].amountToPay;

            if (!amountToPay) {

                validationErrors.push({
                    errorCode: 'amountToPayIsRequired',
                    errorDataPath: `/Body/claimBeneficiaries/${i}/amountToPay`
                });
            }
        }
        else {

            const percentage = claimBeneficiaries[i].amountToPayPercetage;

            if (!percentage) {

                validationErrors.push({
                    errorCode: 'amountToPayPercentageIsRequired',
                    errorDataPath: `/Body/claimBeneficiaries/${i}/amountToPayPercetage`
                });
            }
        }
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

    if (!input.mainAttributes?.insuredEvent?.insuredEventNumber) {

        validationErrors.push({
            errorCode: 'InsuredEventRequired',
            errorDataPath: '/Body/mainAttributes/insuredEvent/insuredEventNumber'
        });
    }

    const beneficiaries = input.claimBeneficiaries ?? [];

    if (beneficiaries?.length > 0) {

        const reducer = (previousValue, currentValue) => previousValue + parseFloat(currentValue.amountToPay);
        const totalAmountDistributed = round(beneficiaries.reduce(reducer, 0));
        const paymentAmountInDocCurrency = input.claimAmounts?.paymentAmountInDocCurrency;

        if (paymentAmountInDocCurrency && totalAmountDistributed > paymentAmountInDocCurrency) {

            validationErrors.push({
                errorCode: 'TotalDistributedAmountShouldBeLesserOrEqualToThanTotalAmount',
                errorDataPath: '/Body/claimBeneficiaries'
            });
        }
    }
}

function validateClaimAmounts(input, validationErrors) {

    if (!input.claimAmounts?.requestedClaimAmount) {

        validationErrors.push({
            errorCode: 'RequestedAmountIsRequired',
            errorDataPath: '/Body/claimAmounts/requestedClaimAmount'
        });
    }
}

function validateClaimDates(input, validationErrors) {

    const statementReceivedDate = input.mainAttributes?.applicationInfo?.statementReceivedDate;
    const statementApplicationDate = input.mainAttributes?.applicationInfo?.statementApplicationDate;
    const insuredEventDate = input.mainAttributes?.insuredEvent?.insuredEventDate;

    if (statementReceivedDate) {

        if (statementApplicationDate && statementReceivedDate < statementApplicationDate) {

            validationErrors.push({
                errorCode: 'StatementReceivedDateSholdBeGreaterOrEqualToApplicationDate',
                errorDataPath: '/Body/mainAttributes/applicationInfo/statementReceivedDate'
            });
        }

        if (insuredEventDate && statementReceivedDate < insuredEventDate) {

            validationErrors.push({
                errorCode: 'StatementReceivedDateSholdBeGreaterOrEqualToEventDate',
                errorDataPath: '/Body/mainAttributes/applicationInfo/statementReceivedDate'
            });
        }
    }
    else {

        validationErrors.push({
            errorCode: 'StatementReceivedDateIsRequired',
            errorDataPath: '/Body/mainAttributes/applicationInfo/statementReceivedDate'
        });
    }

    if (statementApplicationDate) {

        if (insuredEventDate && statementApplicationDate < insuredEventDate) {

            validationErrors.push({
                errorCode: 'StatementApplicationDateSholdBeGreaterOrEqualToInsuredEventDate',
                errorDataPath: '/Body/mainAttributes/applicationInfo/statementApplicationDate'
            });
        }

        if (statementReceivedDate && statementReceivedDate < statementApplicationDate) {

            validationErrors.push({
                errorCode: 'StatementApplicationDateSholdBeLesserOrEqualToStatementReceivedDate',
                errorDataPath: '/Body/mainAttributes/applicationInfo/statementApplicationDate'
            });
        }
    }
    else {

        validationErrors.push({
            errorCode: 'statementApplicationDateIsRequired',
            errorDataPath: '/Body/mainAttributes/applicationInfo/statementApplicationDate'
        });
    }

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

    if (injuryRisks.includes(selectedRisk.riskCode)) {

        const injuries = input.mainAttributes?.riskAdditionalAttributes?.injuries ?? [];

        if (injuries.length === 0) {

            validationErrors.push({
                errorCode: 'AtleastOneInjuryShouldBeAdded',
                errorDataPath: '/Body/mainAttributes/riskAdditionalAttributes/injuries'
            });
        }
        else {

            const injuryCodes = injuries.map(item => item.injuryDetails?.code);
            const hasDuplicates = injuryCodes.some((item, idx) => injuryCodes.indexOf(item) != idx);

            if (hasDuplicates) {

                validationErrors.push({
                    errorCode: 'DuplicatedInjuriesFound',
                    errorDataPath: '/Body/mainAttributes/riskAdditionalAttributes/injuries'
                });
            }
        }
    }

    if (risksWithPaidDays.includes(selectedRisk.riskCode)) {

        const numberOfPaidDays = input.mainAttributes?.riskAdditionalAttributes?.numberOfPaidDays;

        if (!numberOfPaidDays) {

            validationErrors.push({
                errorCode: 'NumberOfPaidDaysIsRequired',
                errorDataPath: '/Body/mainAttributes/riskAdditionalAttributes/numberOfPaidDays'
            });
        }
    }

    if (selectedRisk.riskCode === risksCodes.disabilityByAccident || anyReasonDisabilityRisks.includes(selectedRisk.riskCode)) {

        const disabilityGroup = input.mainAttributes?.riskAdditionalAttributes?.disabilityGroup;

        if (!disabilityGroup) {

            validationErrors.push({
                errorCode: 'DisabilityGroupIsRequired',
                errorDataPath: '/Body/mainAttributes/riskAdditionalAttributes/disabilityGroup'
            });
        }
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

    const paymentPercentage = input.claimAmounts?.paymentPercentage;

    if (paymentPercentage && (paymentPercentage > 1 || paymentPercentage < 0)) {
        validationErrors.push({
            errorCode: 'paymentPercentageIsNotCorrect',
            errorDataPath: '/Body/claimAmounts/paymentPercentage'
        });
    }

    validateClaimBeneficiaryBankAccounts(input, state, validationErrors);
}
