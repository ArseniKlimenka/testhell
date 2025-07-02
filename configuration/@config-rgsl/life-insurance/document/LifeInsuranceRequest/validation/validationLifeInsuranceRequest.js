'use strict';

const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const { documentStates, documentActors, typeOfRequest, applicantType } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const { nonFinChangeTypesForChangeClass, investmentParametersEditClassTypes,
    didPaymentClassTypes, changeAmendmentTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getDuplicateCancelledMessage } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');

/**
 * @errorCode {errorCode} registrationDateShouldBeMoreThanCurrentDate
 * @errorCode {errorCode} issueDateShouldBeMoreThanRegistrationDate
 * @errorCode {errorCode} receivedDateShouldBeMoreThanIssueDate
 * @errorCode {errorCode} amendmentReasonIsRequired
 * @errorCode {errorCode} bankAccountIsRequired
 * @errorCode {errorCode} applicantIsNotPolicyHolderOutOfSystemWithMail
 * @errorCode {errorCode} applicantIsNotPolicyHolderOutOfSystem
 * @errorCode {errorCode} sendRequestAfterClientCoolOffPeriod
 * @errorCode {errorCode} duplicateCancelledRequestsNumbers
 * @errorCode {errorCode} changeSubtypeIsRequired
 * @errorCode {errorCode} changeClassIsRequired
 * @errorCode {errorCode} changeTypeIsRequired
 * @errorCode {errorCode} signatureFormIsRequired
 * @errorCode {errorCode} receiveMethodIsRequired
 * @errorCode {errorCode} changeReasonIsRequired
 * @errorCode {errorCode} AttachmentCancellationApplicationShouldBeAdded
 * @errorCode {errorCode} AttachmentChangeApplicationShouldBeAdded
 * @errorCode {errorCode} AttachmentDidPaymentApplicationShouldBeAdded
 * @errorCode {errorCode} AttachmentInvestmentParametersEditApplicationShouldBeAdded
 * @errorCode {errorCode} AttachmentCopyPassportShouldBeAdded
 * @errorCode {errorCode} initiatorIsRequired
 * @errorCode {errorCode} blockAgentModification
 * @errorCode {errorCode} blockAgentCancellation
 * @errorCode {errorCode} PolicyShouldBeActivated
 * @errorCode {errorCode} PolicyAmendmentsNotInCompletedStatus
 * @errorCode {errorCode} lastFundStatusIsRequired
 * @errorCode {errorCode} applicantTypeIsRequired
 * @errorCode {errorCode} amendmentBeneficiaryDataDoesNotMatch
 * @errorCode {errorCode} amendmentBeneficiaryDataIsRequired
 * @errorCode {errorCode} paymentLinesTotalSumMustBeGreaterThanZero
 * @errorCode {errorCode} reasonForRecipientIsRequired
 * @errorCode {errorCode} recipientBankAccountIsRequired
 * @errorCode {errorCode} recipientPartyDataIsRequired
 * @errorCode {errorCode} didPaymentUnavailableToSelect
 * @errorCode {errorCode} changeSubtypeShouldBeOne
 * @errorCode {errorCode} changeClassShouldBeOne
 */

module.exports = function validationLifeInsuranceRequest(input) {
    const validationErrors = [];

    const dataPath = this.businessContext.dataPath;
    const documentState = this.businessContext.documentState;
    const documentNumber = this.businessContext.documentNumber;
    const currentActor = this.applicationContext.actor;
    const attachmentsPackage = input.attachmentsPackage ?? [];
    const currentTypeOfRequest = input.typeOfRequest;
    const amendmentReason = input.amendmentReason;
    const changeSubtype = input.changeSubtype;
    const changeClass = input.changeClass;
    const changeType = input.changeType;
    const signatureForm = input.signatureForm;
    const receiveMethod = input.receiveMethod;
    const initiator = input.initiator;
    const changeReason = input.changeReason;
    const bankAccount = input.bankAccount;
    const productGroup = input.contract.productGroup;
    const partnerBusinessCode = input.contract.partnerBusinessCode;
    const isGeneralBackOffice = currentActor == documentActors.GeneralBackOffice;
    const isOperations = currentActor == documentActors.Operations;
    const isAgent = currentActor == documentActors.Agent;
    const currentDate = new Date().toISOString();
    const registrationDate = input.registrationDate;
    const issueDate = input.issueDate;
    const receivedDate = input.receivedDate;
    const isCancellation = currentTypeOfRequest == typeOfRequest.Cancellation;
    const contractConfigurationName = input.contract.configurationName;
    const investmentParametersEditClassFilled = checkAvailabilitySome(investmentParametersEditClassTypes, changeClass);
    const didPaymentClassTypesFilled = checkAvailabilitySome(didPaymentClassTypes, changeClass);
    const lastFundStatus = input.paymentCalculation?.fundStatus;
    const contractNumber = input.contract.number;
    const isEquityProductGroup = productGroup === lifeInsuranceConstants.productGroup.DSZ.descriptionRU;
    const applicantPartyData = input.applicant?.partyData ?? {};
    const amendmentBeneficiaryData = input?.technicalInformation?.amendmentBeneficiaryData;
    const paymentLines = input.paymentCalculation?.paymentLines;

    if (registrationDate > currentDate) {
        validationErrors.push({
            errorCode: "registrationDateShouldBeMoreThanCurrentDate",
            errorDataPath: dataPath + '/registrationDate'
        });
    }

    if (issueDate > registrationDate) {
        validationErrors.push({
            errorCode: "issueDateShouldBeMoreThanRegistrationDate",
            errorDataPath: dataPath + '/issueDate'
        });
    }

    if (receivedDate < issueDate) {
        validationErrors.push({
            errorCode: "receivedDateShouldBeMoreThanIssueDate",
            errorDataPath: dataPath + '/receivedDate'
        });
    }

    if (documentNumber && documentState == documentStates.Draft) {
        const cancellationApplicationExists = attachmentsPackage.some(item => item.attachmentType == 'cancellationApplication');
        if (!cancellationApplicationExists && currentTypeOfRequest == 'Cancellation') {
            validationErrors.push({
                errorCode: 'AttachmentCancellationApplicationShouldBeAdded'
            });
        }

        if (investmentParametersEditClassFilled) {

            const investmentParametersEditApplicationExists = attachmentsPackage.some(item => item.attachmentType == 'investmentParametersEditApplication');
            if (!investmentParametersEditApplicationExists && currentTypeOfRequest == 'Modification' && investmentParametersEditClassFilled) {
                validationErrors.push({
                    errorCode: 'AttachmentInvestmentParametersEditApplicationShouldBeAdded'
                });
            }

        } else {

            if (didPaymentClassTypesFilled) {
                const didPaymentApplicationExists = attachmentsPackage.some(item => item.attachmentType == 'didPaymentApplication');
                if (!didPaymentApplicationExists && currentTypeOfRequest == 'Modification') {
                    validationErrors.push({
                        errorCode: 'AttachmentDidPaymentApplicationShouldBeAdded'
                    });
                }
            }
            else {
                const changeApplicationExists = attachmentsPackage.some(item => item.attachmentType == 'changeApplication');
                if (!changeApplicationExists && currentTypeOfRequest == 'Modification') {
                    validationErrors.push({
                        errorCode: 'AttachmentChangeApplicationShouldBeAdded'
                    });
                }
            }

            const copyPassportExists = attachmentsPackage.some(item => item.attachmentType == 'copyPassport');
            if (!copyPassportExists) {
                validationErrors.push({
                    errorCode: 'AttachmentCopyPassportShouldBeAdded'
                });
            }
        }

        if (!initiator) {
            validationErrors.push({
                errorCode: 'initiatorIsRequired',
                errorDataPath: dataPath + '/initiator'
            });
        }
    }

    if (documentNumber && !receiveMethod && (isGeneralBackOffice || isOperations)) {
        validationErrors.push({
            errorCode: "receiveMethodIsRequired",
            errorDataPath: dataPath + '/receiveMethod'
        });
    }


    if (input?.technicalInformation?.blockedAgentCancellation) {
        validationErrors.push({
            errorCode: "blockAgentCancellation",
            errorDataPath: dataPath + '/typeOfRequest'
        });
    }

    if (documentNumber && currentTypeOfRequest == typeOfRequest.Cancellation) {

        if (!amendmentReason) {
            validationErrors.push({
                errorCode: "amendmentReasonIsRequired",
                errorDataPath: dataPath + '/amendmentReason'
            });
        }
        const isCancelTypeRequest = currentTypeOfRequest === typeOfRequest.Cancellation;
        const isByClientCoolOff = amendmentReason == amendmentConstants.amendmentReason.byClientCoolOff;
        const isByClientNonCoolOff = amendmentReason == amendmentConstants.amendmentReason.byClientNonCoolOff;

        if (!bankAccount && (isByClientCoolOff || (isCancelTypeRequest && isEquityProductGroup))) {
            validationErrors.push({
                errorCode: "bankAccountIsRequired",
                errorDataPath: dataPath + '/bankAccount'
            });
        }

        if (contractConfigurationName == lifeInsuranceConstants.productCode.CreditLifeInsurancePolicy) {
            validationErrors.push({
                severity: "Note",
                errorCode: "applicantIsNotPolicyHolderOutOfSystem"
            });
        } else {
            validationErrors.push({
                severity: "Note",
                errorCode: "applicantIsNotPolicyHolderOutOfSystemWithMail"
            });
        }

        if (isByClientNonCoolOff && isEquityProductGroup && !lastFundStatus) {
            validationErrors.push({
                errorCode: "lastFundStatusIsRequired",
                reference: {
                    contractNumber
                }
            });
        }

        const totalSum = paymentLines?.reduce((acc, v) => { acc += v.paymentLineSum; return acc; }, 0);
        if (isEquityProductGroup && isGeneralBackOffice && totalSum === 0) {
            validationErrors.push({
                errorCode: 'paymentLinesTotalSumMustBeGreaterThanZero',
                errorDataPath: dataPath + '/paymentCalculation'
            });
        }

        if (!signatureForm && isEquityProductGroup) {
            validationErrors.push({
                errorCode: "signatureFormIsRequired",
                errorDataPath: dataPath + '/signatureForm'
            });
        }
    }

    if (documentNumber && currentTypeOfRequest == typeOfRequest.Modification) {

        if (!changeSubtype || changeSubtype.length == 0) {
            validationErrors.push({
                errorCode: "changeSubtypeIsRequired",
                errorDataPath: dataPath + '/changeSubtype'
            });
        }

        if (!changeClass || changeClass.length == 0) {
            validationErrors.push({
                errorCode: "changeClassIsRequired",
                errorDataPath: dataPath + '/changeClass'
            });
        }

        if (!changeReason && initiator == 'insurer') {
            validationErrors.push({
                errorCode: "changeReasonIsRequired",
                errorDataPath: dataPath + '/changeReason'
            });
        }

        const changeTypeShouldBeFilled = checkAvailabilitySome(nonFinChangeTypesForChangeClass, changeClass);
        if ((!changeType || changeType.length == 0) && changeTypeShouldBeFilled) {
            validationErrors.push({
                errorCode: "changeTypeIsRequired",
                errorDataPath: dataPath + '/changeType'
            });
        }

        const signatureFormShouldBeFilled = checkAvailabilitySome(investmentParametersEditClassTypes, changeClass) || isEquityProductGroup;
        if (!signatureForm && signatureFormShouldBeFilled) {
            validationErrors.push({
                errorCode: "signatureFormIsRequired",
                errorDataPath: dataPath + '/signatureForm'
            });
        }

        if (!input.applicantType || applicantType.length == 0) {
            validationErrors.push({
                errorCode: "applicantTypeIsRequired",
                errorDataPath: dataPath + '/applicantType'
            });
        }

        if (input.applicantType === applicantType.beneficiary) {
            if (!amendmentBeneficiaryData) {
                validationErrors.push({
                    errorCode: "amendmentBeneficiaryDataIsRequired",
                    errorDataPath: dataPath + '/applicantType'
                });
            } else {
                if (applicantPartyData.partyFullName !== amendmentBeneficiaryData.beneficiaryName ||
                    applicantPartyData.dateOfBirth !== amendmentBeneficiaryData.beneficiaryDateOfBirth) {

                    validationErrors.push({
                        errorCode: "amendmentBeneficiaryDataDoesNotMatch",
                        errorDataPath: dataPath + '/applicantType',
                    });
                }
            }
        }

        if (didPaymentClassTypesFilled && input.recipient) {
            const recipientPartyData = input.recipient.partyData;
            if (!recipientPartyData?.partyCode) {
                validationErrors.push({
                    errorCode: "recipientPartyDataIsRequired",
                    errorDataPath: dataPath + '/recipient/partyData/partyFullName'
                });
            }

            const recipientBankAccount = input.recipient.bankAccount;
            if (!recipientBankAccount?.bankId) {
                validationErrors.push({
                    errorCode: "recipientBankAccountIsRequired",
                    errorDataPath: dataPath + '/recipient/bankAccount'
                });
            }

            const reasonForRecipient = input.recipient.reasonForRecipient;
            if (!reasonForRecipient || reasonForRecipient.length == 0) {
                validationErrors.push({
                    errorCode: "reasonForRecipientIsRequired",
                    errorDataPath: dataPath + '/recipient/reasonForRecipient'
                });
            }
        }

        if (changeSubtype && changeSubtype.length > 0 && changeClass && changeClass.length > 0) {
            const isFinancialChange = changeSubtype?.includes(changeAmendmentTypes.financialChange);
            const isDidPaymentClassTypes = checkAvailabilitySome(didPaymentClassTypes, changeClass);
            const nonDidStatuses = !lifeInsuranceConstants.fundFormedStatuses.includes(lastFundStatus);
            if (isEquityProductGroup && isFinancialChange && isDidPaymentClassTypes && nonDidStatuses) {
                validationErrors.push({
                    errorCode: "didPaymentUnavailableToSelect",
                    errorDataPath: dataPath + '/changeClass'
                });
            }

            if (isEquityProductGroup && changeSubtype.length > 1) {
                validationErrors.push({
                    errorCode: "changeSubtypeShouldBeOne",
                    errorDataPath: dataPath + '/changeSubtype'
                });
            }

            if (isEquityProductGroup && isFinancialChange && changeClass.length > 1) {
                validationErrors.push({
                    errorCode: "changeClassShouldBeOne",
                    errorDataPath: dataPath + '/changeClass'
                });
            }
        }
    }

    if (input.issueDate > input.coolOffPeriodEndSyncWithCalendar &&
        productGroup == 'credit' && partnerBusinessCode == '249411'
        && currentTypeOfRequest == typeOfRequest.Cancellation &&
        (!amendmentReason || amendmentReason == amendmentConstants.amendmentReason.byClientCoolOff)) {

        validationErrors.push({
            errorCode: "sendRequestAfterClientCoolOffPeriod",
            errorDataPath: dataPath + '/amendmentReason'
        });
    }


    if (documentNumber &&
        (documentState == documentStates.OnReview || documentState == documentStates.CreateAmendment ||
            (documentState == documentStates.Draft && investmentParametersEditClassFilled))) {

        const policyInCorrectStatus = input.technicalInformation.policyInCorrectStatus ?? false;

        if (!policyInCorrectStatus) {
            validationErrors.push({
                errorCode: 'PolicyShouldBeActivated'
            });
        }

        const policyAmendmentsInCorrectStatus = input.technicalInformation.policyAmendmentsInCorrectStatus ?? false;
        if (!policyAmendmentsInCorrectStatus) {
            validationErrors.push({
                errorCode: 'PolicyAmendmentsNotInCompletedStatus'
            });
        }

    }

    const duplicateCancelledRequestsNumbers = input?.technicalInformation?.duplicateCancelledRequestsNumbers;
    const newCancellationRequestAvailable = input?.technicalInformation?.newCancellationRequestAvailable;
    if (duplicateCancelledRequestsNumbers &&
        ((isCancellation && !newCancellationRequestAvailable) ||
            (!currentTypeOfRequest || currentTypeOfRequest == typeOfRequest.Modification) && isAgent)) {
        const message = `${getDuplicateCancelledMessage(duplicateCancelledRequestsNumbers)} ${duplicateCancelledRequestsNumbers}`;
        const messageEn = `${getDuplicateCancelledMessage(duplicateCancelledRequestsNumbers, true)} ${duplicateCancelledRequestsNumbers}`;
        validationErrors.push({
            errorCode: 'duplicateCancelledRequestsNumbers',
            errorDataPath: dataPath + '/contract/number',
            reference: {
                duplicateCancelledRequestsMessage: message,
                duplicateCancelledRequestsMessageEn: messageEn
            }
        });
    }

    return validationErrors;

};
