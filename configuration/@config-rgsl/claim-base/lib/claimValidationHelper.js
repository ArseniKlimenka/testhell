'use strict';
/* eslint no-undef: "off"*/
const { claimStatesToValidateBankAccounts, endowmentStatesToValidateBankAccounts, beneficiaryPaymentTypes } = require('@config-rgsl/claim-base/lib/claimConsts');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const partyDocumentLib = require('@config-rgsl/party/component/PartyDocument/lib/partyDocumentLib');
const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

/**
 * @errorCode {errorCode} BeneficiariesWithoutBankAccountsError
 * @errorCode {errorCode} BeneficiariesWithoutBankAccountsWarning
 * @errorCode {errorCode} ErrorCheckingKPKFor
 * @errorCode {errorCode} KPKCheckNotPassedFor
 * @errorCode {errorCode} invalidAgePassport
 * @errorCode {errorCode} unableToValidatePassport
 * @errorCode {errorCode} BeneficiariesWithoutSelectedBankAccountsWarning
 * @errorCode {errorCode} BeneficiariesWithoutSelectedBankAccountsError
 * @errorCode {errorCode} requiredToCancelUnappliedPolicyAmendment
 * @errorCode {errorCode} policyDontNotHaveAppliedVersion
 * */

function validateInsuranceEventDate(input, configurationName, validationErrors) {

    const enrich = documents.getDocumentConfiguration(configurationName, 1).processEnrichmentsFn;
    enrich(undefined, input.body, ['[GetPolicyDates]']);

    const insuredEventDate = input.body?.mainAttributes?.insuredEvent?.insuredEventDate;
    const policyStartDate = input.body?.tempTechnicalData?.policyStartDate;
    const policyEndDate = input.body?.tempTechnicalData?.policyEndDate;

    if (insuredEventDate && policyStartDate && policyEndDate && (insuredEventDate < policyStartDate || insuredEventDate > policyEndDate)) {

        validationErrors.push({
            errorCode: 'insuredEventDateOutOfRange',
            errorDataPath: '/Body/mainAttributes/insuredEvent/insuredEventDate'
        });
    }
}

function validateClaimBeneficiaryBankAccounts(body, state, validationErrors) {

    if (!claimStatesToValidateBankAccounts.includes(state)) {

        return;
    }

    const beneficariesBankAccounts = body.tempTechnicalData?.beneficariesBankAccounts ?? [];
    const beneficaries = body.claimBeneficiaries ?? [];
    const noBankAccounts = beneficariesBankAccounts.filter(item => !item.bankAccounts || item.bankAccounts.length === 0);
    const noSelectedBankAccounts = beneficaries.filter(item => !item.bankAccount);
    const shouldUseNetting = body.claimAmounts?.shouldUseNetting ?? false;

    if (beneficariesBankAccounts.length > 0 && noBankAccounts.length > 0) {

        const names = noBankAccounts.map(item => item.fullName);

        if (shouldUseNetting) {

            validationErrors.push({
                errorCode: 'BeneficiariesWithoutBankAccountsWarning',
                reference: {
                    items: names.join()
                },
                severity: 'Warning'
            });
        }
        else {

            validationErrors.push({
                errorCode: 'BeneficiariesWithoutBankAccountsError',
                reference: {
                    items: names.join()
                },
                severity: 'Error'
            });
        }
    }

    if (beneficaries.length > 0 && noSelectedBankAccounts.length > 0) {

        const names = noSelectedBankAccounts.map(item => item.fullName);

        if (shouldUseNetting) {

            validationErrors.push({
                errorCode: 'BeneficiariesWithoutSelectedBankAccountsWarning',
                reference: {
                    items: names.join()
                },
                severity: 'Warning'
            });
        }
        else {

            validationErrors.push({
                errorCode: 'BeneficiariesWithoutSelectedBankAccountsError',
                reference: {
                    items: names.join()
                },
                severity: 'Error'
            });
        }
    }
}

function validateExistingCancellationAmendments(body, validationErrors) {

    const policyVersionInfo = body.tempTechnicalData.policyVersionInfo;

    if (policyVersionInfo.latestAppliedSequenceNumber === undefined) {

        validationErrors.push({
            errorCode: 'policyDontNotHaveAppliedVersion',
            errorDataPath: '/Body/claimAmounts/paymentAmountInRubCurrency'
        });
    }
    else if (policyVersionInfo.latestAppliedSequenceNumber !== policyVersionInfo.latestNonDiscardedSequenceNumber) {

        validationErrors.push({
            errorCode: 'requiredToCancelUnappliedPolicyAmendment',
            errorDataPath: '/Body/claimAmounts/paymentAmountInRubCurrency'
        });
    }
}

function validateEndowmentBeneficiaryBankAccounts(body, state, validationErrors) {

    const nonAcceptance = body.endowmentAmounts?.nonAcceptance ?? false;

    if (!endowmentStatesToValidateBankAccounts.includes(state) || nonAcceptance) {

        return;
    }

    const beneficariesBankAccounts = body.tempTechnicalData?.beneficariesBankAccounts ?? [];
    const beneficaries = body.endowmentBeneficiaries ?? [];

    const noSelectedBankAccounts = beneficaries
        .filter(item => !item.bankAccount && item.beneficiaryPaymentType?.code !== beneficiaryPaymentTypes.netting);

    const statementApplicationDate = body.mainAttributes.applicationInfo.statementApplicationDate;

    const noBankAccountsCodes = beneficariesBankAccounts.filter(item => (!item.bankAccounts ||
        (item.bankAccounts
            .filter(a => a.closingDate && (statementApplicationDate ? a.closingDate <= statementApplicationDate : true)))
            .length === (item.bankAccounts?.length ?? 0)))
        .map(i => i.partyCode);

    const noBankAccounts = beneficaries.filter(i => i.beneficiaryPaymentType?.code !== beneficiaryPaymentTypes.netting &&
        noBankAccountsCodes.includes(i.partyCode));

    const shouldUseNetting = body.endowmentAmounts?.shouldUseNetting ?? false;

    if (beneficaries.length > 0 && noBankAccounts.length > 0) {

        const names = noBankAccounts.map(item => item.fullName);

        if (shouldUseNetting) {

            validationErrors.push({
                errorCode: 'BeneficiariesWithoutBankAccountsWarning',
                reference: {
                    items: names.join()
                },
                severity: 'Warning'
            });
        }
        else {

            validationErrors.push({
                errorCode: 'BeneficiariesWithoutBankAccountsError',
                reference: {
                    items: names.join()
                },
                severity: 'Error'
            });
        }
    }

    if (noSelectedBankAccounts.length > 0) {

        const names = noSelectedBankAccounts.map(item => item.fullName);

        if (shouldUseNetting) {

            validationErrors.push({
                errorCode: 'BeneficiariesWithoutSelectedBankAccountsWarning',
                reference: {
                    items: names.join()
                },
                severity: 'Warning'
            });
        }
        else {

            validationErrors.push({
                errorCode: 'BeneficiariesWithoutSelectedBankAccountsError',
                reference: {
                    items: names.join()
                },
                severity: 'Error'
            });
        }
    }
}

/**
 * @deprecated processEnrichmentsFn is bad. Use 'validateKpkSimple' function!
 */
function validateKPK(input, validationErrors) {

    const enrich = documents.getDocumentConfiguration("Endowment", 1).processEnrichmentsFn;
    enrich(undefined, input.body, ['[GetPolicyParties]']);
    enrich(undefined, input.body, ['[GetParticipantsData]']);
    enrich(undefined, input.body, ['[GetKPKValidationStatus]']);

    const holder = input.body.tempTechnicalData.policyParties.holder;
    const insured = input.body.tempTechnicalData.policyParties.insuredPerson;
    const paticipantsData = input.body.tempTechnicalData.paticipantsData;

    const validationResults = input.body.tempTechnicalData.kpkValidationData || [];

    let participantTypeName = " ";
    let participantPartyName = " ";

    validationResults.forEach(item => {

        const participant = paticipantsData.find(p => p.resultData.code == item.resultData.ContractorPartyCode);
        participantPartyName = participant.resultData.fullName;

        if (item.resultData.ContractorPartyCode == holder.personCode) {

            participantTypeName = "Страхователь";
        }
        else if (item.resultData.ContractorPartyCode == insured.personCode) {

            participantTypeName = "Застрахованный";
        }
        else {

            participantTypeName = "Выгодоприобретатель";
        }

        if (item.resultData.CheckResultData.Error) {

            validationErrors.push({
                errorCode: "ErrorCheckingKPKFor",
                reference: {
                    participant: participantTypeName,
                    participantName: participantPartyName
                }
            });
        }
        else if (item.resultData.CheckResultData.Reject == 'true' || ["НаСогласовании", "НеСогласован"].includes(item.resultData.CheckResultData.Agreement)) {

            validationErrors.push({
                errorCode: "KPKCheckNotPassedFor",
                reference: {
                    participant: participantTypeName,
                    participantName: participantPartyName
                }
            });
        }

        const passports = participant.resultData.identityDocuments.filter(doc => doc.identityDocumentType === 'passport');
        let latestPassport = passports.length > 0 && passports[0] || undefined;
        passports.forEach(function (pass) { latestPassport = new Date(pass.issueDate) > new Date(latestPassport.issueDate) ? pass : latestPassport; });

        const passportValidationResult = partyDocumentLib.checkPassportAge(
            {
                issueDate: latestPassport?.issueDate,
                dateOfBirth: participant.resultData.dateOfBirth,
                validationDate: DateTimeUtils.dateNow()
            });

        if (!latestPassport) {

            validationErrors.push({
                errorCode: "unableToValidatePassport",
                reference: {
                    participant: participantTypeName,
                    participantName: participantPartyName
                }
            });
        }
        else if (passportValidationResult.invalidAgePassport14 || passportValidationResult.invalidAgePassport20 || passportValidationResult.invalidAgePassport4) {

            validationErrors.push({
                errorCode: "invalidAgePassport",
                reference: {
                    participant: participantTypeName,
                    participantName: participantPartyName
                }
            });
        }
    });
}

function validateKpkSimple(kpkServiceResult, validationErrors) {

    for (const item of kpkServiceResult) {

        const pvr = item.passportValidationResult;

        if (item.CheckResultData.Error) {

            validationErrors.push({
                errorCode: 'ErrorCheckingKPKFor',
                reference: {
                    participant: item.participantTypeName,
                    participantName: item.participantPartyName,
                }
            });
        }
        else if (item.CheckResultData.Reject == 'true' || ['НаСогласовании', 'НеСогласован'].includes(item.CheckResultData.Agreement)) {

            validationErrors.push({
                errorCode: 'KPKCheckNotPassedFor',
                reference: {
                    participant: item.participantTypeName,
                    participantName: item.participantPartyName,
                }
            });
        }


        if (!item.passportExists) {

            validationErrors.push({
                errorCode: 'unableToValidatePassport',
                reference: {
                    participant: item.participantTypeName,
                    participantName: item.participantPartyName,
                }
            });
        }
        else if (pvr.invalidAgePassport14 || pvr.invalidAgePassport20 || pvr.invalidAgePassport45) {

            validationErrors.push({
                errorCode: 'invalidAgePassport',
                reference: {
                    participant: item.participantTypeName,
                    participantName: item.participantPartyName,
                }
            });
        }
    }
}

module.exports = {
    validateInsuranceEventDate,
    validateClaimBeneficiaryBankAccounts,
    validateEndowmentBeneficiaryBankAccounts,
    validateKPK,
    validateKpkSimple,
    validateExistingCancellationAmendments
};
