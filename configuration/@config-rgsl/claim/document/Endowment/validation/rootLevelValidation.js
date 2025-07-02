'use strict';

const { calculateTotalEndowmentAmount } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');
const { validateKpkSimple } = require('@config-rgsl/claim-base/lib/claimValidationHelper');
const { insuredEventTypes, insuredEventReasons, endowmentPaymentLineType, beneficiaryPaymentTypes } = require('@config-rgsl/claim-base/lib/claimConsts');
const { validateEndowmentBeneficiaryBankAccounts } = require('@config-rgsl/claim-base/lib/claimValidationHelper');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

/**
 * @errorCode {errorCode} StatementReceivedDateSholdBeGreaterOrEqualToApplicationDate
 * @errorCode {errorCode} StatementReceivedDateSholdBeGreaterOrEqualToEventDate
 * @errorCode {errorCode} StatementReceivedDateIsRequired
 * @errorCode {errorCode} statementApplicationDateIsRequired
 * @errorCode {errorCode} StatementApplicationDateSholdBeGreaterOrEqualToEventDate
 * @errorCode {errorCode} StatementApplicationDateSholdBeLesserOrEqualToStatementReceivedDate
 * @errorCode {errorCode} ContractNumberIsRequired
 * @errorCode {errorCode} RiskIRequired
 * @errorCode {errorCode} EventDateIsRequired
 * @errorCode {errorCode} RejectionReasonIsRequired
 * @errorCode {errorCode} ApplicantIsRequired
 * @errorCode {errorCode} receiveMethodIsRequired
 * @errorCode {errorCode} AtleastOneBeneficiaryIsRequired
 * @errorCode {errorCode} TotalDistributedAmountShouldBeLesserOrEqualToThanTotalAmount
 * @errorCode {errorCode} EventDateSholdBeLesserOrEqualToToday
 * @errorCode {errorCode} EventDateSholdBeLesserOrEqualToStatementApplicationDate
 * @errorCode {errorCode} EventDateSholdBeLesserOrEqualToStatementReceivedDate
 * @errorCode {errorCode} EventDateIsRequired
 * @errorCode {errorCode} ContractIsCancelled
 * @errorCode {errorCode} DuplicatedBeneficiariesFound
 * @errorCode {errorCode} StatementApplicationDateSholdBeGreaterThanEventDate
 * @errorCode {errorCode} EventReasonIsRequired
 * @errorCode {errorCode} DuplicatedEndowmentsFound
 * @errorCode {errorCode} BeneficiariesWithNetting
 * @errorCode {errorCode} hasActiveEndowmentInquiries
 * @errorCode {errorCode} DeputyDirectorApprovalIsRequired
 * @errorCode {errorCode} amountToPayIsRequired
 * @errorCode {errorCode} amountToPayPercentageIsRequired
 * @errorCode {errorCode} isContainsDeathRisk
 * */
module.exports = function rootLevelValidation(input, additionalContext, externalData, evaluationContext) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;
    const body = this.businessContext.rootData;
    const state = this.businessContext.documentState;

    validateMainAttributes(dataPath, input, validationErrors, body);
    validateEndowmentDates(input, validationErrors);
    validateBeneficiaries(input, state, validationErrors);

    const kpkValidateTransitions = [
        'DirectorAprovalToSentToPayment',
        'OperationsApproval_to_AwaitingApproval',
        'OperationsApproval_to_POCreation',
        'OperationsDirectorApprovalToDeputyDirectorAproval',
        'OperationsDirectorApprovalToSentToPayment',
    ];

    if (evaluationContext.kpkValidation?.kpkServiceResult && kpkValidateTransitions.includes(this.businessContext.transitionCodeName)) {
        validateKpkSimple(evaluationContext.kpkValidation.kpkServiceResult, validationErrors);
    }

    const duplicates = input.tempTechnicalData?.duplicates ?? [];

    if (duplicates.length > 0) {

        validationErrors.push({
            errorCode: 'DuplicatedEndowmentsFound',
            reference: {
                items: duplicates.join()
            },
            severity: 'Warning'
        });
    }

    if (input.technicalData.isContractCancelled) {

        validationErrors.push({
            errorCode: 'ContractIsCancelled'
        });
    }

    const inquiries = body.tempTechnicalData?.inquiries ?? [];
    const hasActiveInquiries = inquiries.some(i => i.stateCode === 'Draft');

    if (hasActiveInquiries) {

        validationErrors.push({
            errorCode: "hasActiveEndowmentInquiries",
            severity: 'Warning'
        });
    }

    const totalAmount = calculateTotalEndowmentAmount(body);

    if (totalAmount.amountInRubCurrency > 3000000) {

        const filteredInquiries = inquiries.filter(i => i.departmentCodeName === 'deputyDirector');
        const sortedInquiries = filteredInquiries
            .sort(function (a, b) { return new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime(); });

        if (sortedInquiries[0]?.stateCode !== "Issued") {

            validationErrors.push({
                errorCode: 'DeputyDirectorApprovalIsRequired',
                severity: 'Warning'
            });
        }
    }

    if (this.businessContext.rootData.technicalData?.selectedClaimRisks?.some(item => item.resultData.selectedRisk.risksGroup === 'Death')) {

        validationErrors.push({
            errorCode: 'isContainsDeathRisk',
            severity: 'Note'
        });
    }

    return validationErrors;
};

function validateMainAttributes(dataPath, input, validationErrors, body) {

    if (!input.mainAttributes?.contract?.number) {

        validationErrors.push({
            errorCode: 'ContractNumberIsRequired',
            errorDataPath: '/Body/mainAttributes/contract/number'
        });
    }

    if (!input.mainAttributes?.eventReason?.code) {

        validationErrors.push({
            errorCode: 'EventReasonIsRequired',
            errorDataPath: '/Body/mainAttributes/eventReason'
        });
    }

    if (!input.mainAttributes?.selectedRisk?.riskCode &&
        input.mainAttributes?.eventType?.code === insuredEventTypes.endowment) {

        validationErrors.push({
            errorCode: 'RiskIRequired',
            errorDataPath: dataPath + '/mainAttributes/selectedRisk'
        });
    }

    if (!input.mainAttributes?.applicationInfo?.applicant?.partyCode) {

        validationErrors.push({
            errorCode: 'ApplicantIsRequired',
            errorDataPath: '/Body/mainAttributes/applicationInfo/applicant/fullName'
        });
    }

    if (!input.mainAttributes?.applicationInfo?.receiveMethod) {

        validationErrors.push({
            errorCode: 'receiveMethodIsRequired',
            errorDataPath: '/Body/mainAttributes/applicationInfo/receiveMethod'
        });
    }

    const beneficiaries = input.endowmentBeneficiaries ?? [];

    if (beneficiaries.length === 0) {

        validationErrors.push({
            errorCode: 'AtleastOneBeneficiaryIsRequired',
            errorDataPath: '/Body/endowmentBeneficiaries'
        });
    }
    else {

        const reducer = (previousValue, currentValue) => previousValue + parseFloat(currentValue.amountToPay);
        const totalAmountDistributed = round(beneficiaries.reduce(reducer, 0));
        let paymentAmount = calculateTotalEndowmentAmount(body).amountInContractCurrency;

        const paymentLines = body.endowmentAmounts.paymentLines ?? [];
        const pitAmount = paymentLines.find(l => l.lineType === endowmentPaymentLineType.PIT)?.lineAmountInContractCurrency ?? 0;
        paymentAmount = paymentAmount - pitAmount;

        if (totalAmountDistributed > paymentAmount) {

            validationErrors.push({
                errorCode: 'TotalDistributedAmountShouldBeLesserOrEqualToThanTotalAmount',
                errorDataPath: '/Body/endowmentBeneficiaries'
            });
        }
    }
}

function validateEndowmentDates(input, validationErrors) {

    const statementReceivedDate = input.mainAttributes?.applicationInfo?.statementReceivedDate;
    const statementApplicationDate = input.mainAttributes?.applicationInfo?.statementApplicationDate;
    const eventDate = input.mainAttributes?.applicationInfo?.eventDate;

    const isBeneficiariesWithNettingExists = input.endowmentBeneficiaries
        .filter(item => item.beneficiaryPaymentType?.code === beneficiaryPaymentTypes.netting)?.length > 0;

    if (statementReceivedDate) {

        if (statementApplicationDate && statementReceivedDate < statementApplicationDate) {

            validationErrors.push({
                errorCode: 'StatementReceivedDateSholdBeGreaterOrEqualToApplicationDate',
                errorDataPath: '/Body/mainAttributes/applicationInfo/statementReceivedDate'
            });
        }

        if (eventDate && !isBeneficiariesWithNettingExists && statementReceivedDate < eventDate) {

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

        const eventReason = input.mainAttributes?.eventReason?.code;

        if (eventDate && !isBeneficiariesWithNettingExists &&
            eventReason !== insuredEventReasons.contractEnd.code && statementApplicationDate < eventDate) {

            validationErrors.push({
                errorCode: 'StatementApplicationDateSholdBeGreaterOrEqualToEventDate',
                errorDataPath: '/Body/mainAttributes/applicationInfo/statementApplicationDate'
            });
        }
        else if (eventDate && !isBeneficiariesWithNettingExists && eventReason === insuredEventReasons.contractEnd.code &&
            statementApplicationDate <= eventDate) {

            validationErrors.push({
                errorCode: 'StatementApplicationDateSholdBeGreaterThanEventDate',
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

    if (eventDate) {

        if (statementApplicationDate && !isBeneficiariesWithNettingExists && eventDate > statementApplicationDate) {

            validationErrors.push({
                errorCode: 'EventDateSholdBeLesserOrEqualToStatementApplicationDate',
                errorDataPath: '/Body/mainAttributes/applicationInfo/eventDate'
            });
        }

        if (statementReceivedDate && !isBeneficiariesWithNettingExists && eventDate > statementReceivedDate) {

            validationErrors.push({
                errorCode: 'EventDateSholdBeLesserOrEqualToStatementReceivedDate',
                errorDataPath: '/Body/mainAttributes/applicationInfo/eventDate'
            });
        }
    }
    else {

        validationErrors.push({
            errorCode: 'EventDateIsRequired',
            errorDataPath: '/Body/mainAttributes/applicationInfo/eventDate'
        });
    }
}

function validateBeneficiaries(input, state, validationErrors) {

    if (input.endowmentBeneficiaries && input.endowmentBeneficiaries.length > 1) {

        const itemsToCheck = input.endowmentBeneficiaries.filter(item => !item.isPaid).map(i => { return { code: i.partyCode, paymentType: i.beneficiaryPaymentType?.code }; });
        const unique = itemsToCheck.filter((obj, index) => itemsToCheck.findIndex((item) => item.code === obj.code && item.paymentType === obj.paymentType) === index);
        const duplicated = itemsToCheck.filter(i => !unique.includes(i));

        if (duplicated?.length > 0) {

            validationErrors.push({
                errorCode: 'DuplicatedBeneficiariesFound',
                errorDataPath: '/Body/endowmentBeneficiaries'
            });
        }
    }

    const beneficiariesWithNetting = input.endowmentBeneficiaries.filter(item => item.beneficiaryPaymentType?.code === beneficiaryPaymentTypes.netting);

    if (beneficiariesWithNetting.length > 0) {

        const names = beneficiariesWithNetting.map(item => item.fullName);

        validationErrors.push({
            errorCode: 'BeneficiariesWithNetting',
            reference: {
                items: names.join()
            },
            severity: 'Warning'
        });
    }

    for (let i = 0; i < input.endowmentBeneficiaries.length; i++) {

        if (input.endowmentBeneficiaries[i].calculateFromAmount ?? false) {

            const amountToPay = input.endowmentBeneficiaries[i].amountToPay;

            if (!amountToPay) {

                validationErrors.push({
                    errorCode: 'amountToPayIsRequired',
                    errorDataPath: `/Body/endowmentBeneficiaries/${i}/amountToPay`
                });
            }
        }
        else {

            const percentage = input.endowmentBeneficiaries[i].amountToPayPercetage;

            if (!percentage) {

                validationErrors.push({
                    errorCode: 'amountToPayPercentageIsRequired',
                    errorDataPath: `/Body/endowmentBeneficiaries/${i}/amountToPayPercetage`
                });
            }
        }
    }

    validateEndowmentBeneficiaryBankAccounts(input, state, validationErrors);
}
