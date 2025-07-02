'use strict';

const { LocalDate } = require('@js-joda/core');
const currentDate = LocalDate.now().toString();
const { highlightErrorMessage } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { accCertificateIncomingSource, originatingClientIds, policyState } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

async function checkBeforeSaveAttributes(input, ambientProperties, that) {

    const body = getPolicyBody(input, ambientProperties, that);

    const typeOfRequestCode = body.typeOfRequest.code;
    const accountingYear = body.accountingYear?.year;
    const contractNumber = body.contract?.number;
    const contractTypeCode = body.contract?.type?.code;
    const contractIssueDate = body.contract?.issueDate;
    const contractStartDate = body.contract?.startDate;
    const contractEndDate = body.contract?.endDate;
    const correctionNumber = body.correctionNumber;
    const requestDate = body.requestDate;
    const applicantFullName = body.applicantFullName;
    const insuredPersonCode = body.insuredPerson?.personCode;

    that.view.validate();

    if (!typeOfRequestCode || !accountingYear || !contractNumber || !contractTypeCode || !contractIssueDate || !contractStartDate ||
        !contractEndDate || (!correctionNumber && correctionNumber != 0) || !requestDate || !applicantFullName || !insuredPersonCode) {
        ambientProperties.services.confirmationDialog.showConfirmation('Для сохранения справки должны быть заполнены все атрибуты', 'OK', 'OK', 2);
        return false;
    }

    return true;
}

function getPolicyBody(input, that) {

    if (input.data?.Body) {
        return input.data.Body;
    } else if (input.context?.Body) {
        return input.context.Body;
    } else if (that?.businessContext?.rootData) {
        return that.businessContext.rootData;
    }
}

function savePolicyData(input, ambientProperties, result, that) {

    const body = getPolicyBody(input, that);

    const resultData = result.data && result.data[0] ? result.data[0] : result[0];
    const policyResultData = resultData.resultData;

    body.contract.number = policyResultData.number;
    body.technicalInformation.policyWasFound = true;
    that.view.getControlByElementId('PolicyNumberForAccountingCertificate').disableElement();
    that.view.evaluate(['/accountingCertificateEnrichments'], false, true);
}

function updatePolicyData(dataSource, body) {

    const resultData = dataSource.data && dataSource.data[0] ? dataSource.data[0] : dataSource[0];
    const policyResultData = resultData.resultData;
    const policyMetadata = resultData.metadata;

    body.contract.number = policyResultData.number;
    body.contract.stateCode = policyResultData.stateCode;
    body.contract.stateCodeDescription = policyResultData.stateCodeDescription;
    body.contract.productCode = policyResultData.productCode;
    body.contract.configurationName = policyMetadata.configurationName;
    body.contract.issueDate = policyResultData.issueDate;
    body.contract.startDate = policyResultData.startDate;
    body.contract.endDate = policyResultData.endDate;
    body.contract.partner = policyResultData.partner;
    body.contract.parties = {
        holder: {
            personCode: policyResultData.parties.holder.personCode,
            partyType: policyResultData.parties.holder.partyType,
            fullName: policyResultData.parties.holder.fullName,
        },
        insuredPerson: {
            personCode: policyResultData.parties.insuredPerson.personCode,
            partyType: policyResultData.parties.insuredPerson.partyType,
            fullName: policyResultData.parties.insuredPerson.fullName,
        }
    };


    if (body.correctionNumber === 0
        && policyResultData.consent?.consentToDataTransferingFNS
        && policyResultData.stateCode !== policyState.CancelledByAmendment
        && body?.contract?.isInsurerSendDataToFns === undefined) {
        body.contract.isInsurerSendDataToFns = policyResultData.consent?.consentToDataTransferingFNS;
    }

    if (!body.technicalInformation) {
        body.technicalInformation = {};
    }
    body.technicalInformation.availableInsuredPersons = [];
    body.technicalInformation.availableInsuredPersons.push(body.contract.parties.holder);
    if (body.contract.parties.holder.personCode != body.contract.parties.insuredPerson.personCode) {
        body.technicalInformation.availableInsuredPersons.push(body.contract.parties.insuredPerson);
    }
    if (body.technicalInformation?.availableInsuredPersons?.length == 1) {
        body.insuredPerson = body.technicalInformation.availableInsuredPersons[0];
    }
    if (body.isApplicantPolicyHolder) {
        body.applicantFullName = body.contract?.parties?.holder?.fullName;
    }

    const risks = [];
    resultData?.resultData?.items?.forEach(item => item?.attributes?.risks?.forEach(risk => risks?.push(risk)));

    if (risks?.some(item => item.riskPerson === 'insuredPerson')) {
        body.insuredPerson = body.contract.parties.insuredPerson;
    }
    else {
        body.insuredPerson = body.contract.parties.holder;
    }

    body.technicalInformation.policyWasFound = true;

    if (body.seqNumber === 0) {
        body.correctionNumber = 0;
    }
}

function checkIsMigratedPolicy(dataSource, body) {

    if (dataSource.data && dataSource.data[0]) {

        const migrated = 'Мигрированный';
        const isMigrated = dataSource.data[0].resultData?.body?.migrationAttributes?.isMigrated;
        body.contract.isMigrated = isMigrated;
        if (isMigrated) {
            body.contract.migrationStatus = migrated;
        }
    }
}

function updateInsuredPersonData(body, party) {

    if (!party) {
        const errorMsg = `E: Застрахованное лицо не найдено в системе`;
        throw new Error(highlightErrorMessage(errorMsg));
    }

    if (party.body) {

        const partyBody = party.body;
        const partyCommonBody = party.commonBody;
        const partyDocuments = partyBody.partyDocuments;

        if (!body.insuredPersonData) {

            body.insuredPersonData = {};
        }

        body.insuredPersonData.partyId = party.partyId;
        body.insuredPersonData.partyCode = party.partyCode;
        body.insuredPersonData.partyType = party.partyType;
        body.insuredPersonData.partyFullName = partyCommonBody.fullName;
        body.insuredPersonData.lastName = partyBody.partyPersonData?.lastName;
        body.insuredPersonData.firstName = partyBody.partyPersonData?.firstName;
        body.insuredPersonData.middleName = partyBody.partyPersonData?.middleName;
        body.insuredPersonData.INNKIO = partyBody.partyGeneralData.INNKIO;
        body.insuredPersonData.dateOfBirth = partyBody.partyPersonData?.dateOfBirth;
        body.insuredPersonData.middleName = partyBody.partyPersonData?.middleName;

        if (!body.insuredPerson) {
            body.insuredPerson = {};
        }

        body.insuredPerson.partyType = party.partyType;
        body.insuredPerson.fullName = partyCommonBody.fullName;
        body.insuredPerson.personCode = party.partyCode;

        if (!body.contract.parties.insuredPerson) {
            body.contract.parties.insuredPerson = {};
        }

        body.contract.parties.insuredPerson.partyType = party.partyType;
        body.contract.parties.insuredPerson.fullName = partyCommonBody.fullName;

        if (partyDocuments?.length > 0) {

            body.insuredPersonData.docTypeCode = partyDocuments[0].docType.docTypeCode;
            body.insuredPersonData.docSeries = partyDocuments[0].docSeries;
            body.insuredPersonData.docNumber = partyDocuments[0].docNumber;
            body.insuredPersonData.issueDate = partyDocuments[0].issueDate;
        }
    }
}

function updateTaxPayerData(body, party) {

    if (!party) {
        const errorMsg = `E: Налогоплательщик не найден в системе`;
        throw new Error(highlightErrorMessage(errorMsg));
    }

    if (party.body) {

        const partyBody = party.body;
        const partyCommonBody = party.commonBody;
        const partyDocuments = partyBody.partyDocuments;

        body.taxPayerData.partyId = party.partyId;
        body.taxPayerData.partyCode = party.partyCode;
        body.taxPayerData.partyType = party.partyType;
        body.taxPayerData.partyFullName = partyCommonBody.fullName;
        body.taxPayerData.lastName = partyBody.partyPersonData?.lastName;
        body.taxPayerData.firstName = partyBody.partyPersonData?.firstName;
        body.taxPayerData.middleName = partyBody.partyPersonData?.middleName;
        body.taxPayerData.INNKIO = partyBody.partyGeneralData.INNKIO;
        body.taxPayerData.dateOfBirth = partyBody.partyPersonData?.dateOfBirth;
        body.taxPayerData.middleName = partyBody.partyPersonData?.middleName;

        if (partyDocuments?.length > 0) {

            body.taxPayerData.docTypeCode = partyDocuments[0].docType.docTypeCode;
            body.taxPayerData.docSeries = partyDocuments[0].docSeries;
            body.taxPayerData.docNumber = partyDocuments[0].docNumber;
            body.taxPayerData.issueDate = partyDocuments[0].issueDate;
        }
    }
}

function setDocumentCodeView(body, dataSource, dataObj) {

    if (dataSource?.data?.length > 0) {
        body[dataObj].documentCodeView = dataSource.data[0].resultData?.viewCode?.toString();
    }
}

function updateIssueData(body, party) {

    if (party) {

        const partyFullName = party.commonBody.fullName?.split(' ') ?? [];

        body.issueData.employeePartyCode = party.partyCode;
        body.issueData.employeeLastName = partyFullName[0];
        body.issueData.employeeFirstName = partyFullName[1];
        body.issueData.employeeMiddleName = partyFullName[2];
        body.issueData.certificateIssueDate = body.issueData.certificateIssueDate ?? currentDate;
    }

}

function setAmountOfPremiumsPaid(body, dataSource) {

    if (dataSource.data?.length > 0) {
        body.paymentContract.amountOfPremiumsPaid = dataSource.data.reduce((accumulator, i) => accumulator + i.resultData.amountLifeRub, 0) ?? undefined;
    } else {
        body.paymentContract.amountOfPremiumsPaid = undefined;
    }
    body.paymentContract.isManualCorrectionSum = undefined;
}

function setAccountingYear(year, dataSource) {

    if (dataSource.data?.length == 0) {
        const errorMsg = `E: Отчетный год ${year} не попадает в допустимый диапазон`;
        throw new Error(highlightErrorMessage(errorMsg));
    }
}

function setDescription(body, dataSource) {

    if (dataSource.data?.length == 0) {
        const errorMsg = `E: Описание типа обращения по коду ${body.typeOfRequest?.code} не найдено в системе`;
        throw new Error(highlightErrorMessage(errorMsg));
    }

    body.typeOfRequest.description = dataSource.data[0].resultData.description;
}

function setContractTypeDescription(body, dataSource) {

    if (dataSource.data?.length == 0) {
        const errorMsg = `E: Описание типа документа по коду ${body.contract?.type?.code} не найдено в системе`;
        throw new Error(highlightErrorMessage(errorMsg));
    }

    body.contract.type.description = dataSource.data[0].resultData.description;
}

function checkAccountingCertificateDuplicates(body, dataSource, currentCertificateNumber) {

    const currentAccountingCertificateNumber = currentCertificateNumber ?? null;

    if (dataSource?.data?.length > 0) {

        const resultDuplicates = dataSource.data.filter(i => i.resultData.accountingCertificateNumber != currentAccountingCertificateNumber);

        const duplicates = resultDuplicates.map(item => {
            return {
                accountingCertificateNumber: item.resultData.accountingCertificateNumber,
                accountingCertificateState: item.resultData.accountingCertificateState,
                originalDocumentNumber: item.resultData.originalDocumentNumber
            };
        });

        if (duplicates && duplicates.length > 0) {
            return duplicates;
        }
    }
}

async function showDuplicatesMessage(duplicates, input, ambientProperties, that) {

    const body = getPolicyBody(input, that);

    const isCopy = body.technicalInformation?.isCopy;

    if (duplicates?.length > 0) {

        if (isCopy) {
            that.view?.getControlByElementId("accountingYearId")?.clear();
        }

        const duplicateNumbers = duplicates.map(i => i.accountingCertificateNumber);

        const message = getDuplicateCancelledMessage(duplicateNumbers);
        const reqLinks = duplicateNumbers.map(item => `<a href="/edit;entity=UniversalVersionedDocument;configurationCodeName=AccountingCertificate;version=1;documentNumber=${encodeURIComponent(item)}">${item}</a>`);
        ambientProperties.services.confirmationDialog.showNotification(`${message} ${reqLinks?.join(', ')}.`, 'OK', 'OK', 2);
        that.view.rebind();
        return true;
    }
}

function getDuplicateCancelledMessage(duplicateNumbers) {

    const isReqMany = duplicateNumbers.length > 1;
    return isReqMany ? 'Справки с заданными параметрами были сформированы ранее. Номера справок:' : 'Справка с заданными параметрами была сформирована ранее. Номер справки:';
}

function checkDuplicateLastCorrectionNumber(duplicates) {

    if ((duplicates?.length ?? 0) > 0) {
        const errorMsg = `E: Найдено ${duplicates.length} дубликатов по данной справке. Номера дубликатов: ${duplicates?.map(x => x.accountingCertificateNumber).join(', ')}`;
        throw new Error(highlightErrorMessage(errorMsg));
    }
}

const documentNumberRegExp = /(.*?)(?=\/)|(.*)/gm;

async function getAccountingCertificateAttachments(view) {

    const params = {
        SequenceNumber: null,
        IncludePreviousAttachments: false,
    };

    return await view.attachmentManager.getAttachments({ parameters: { params: params } });
}

async function dropAttachment(view) {

    const params = {
        SequenceNumber: null,
        IncludePreviousAttachments: false,
    };

    const attachments = (await view.attachmentManager.getAttachments({ parameters: { params: params } }))
        .filter(item => item.AttachmentType.Code === 'taxDeductionCertificate');

    if (attachments && attachments.length > 0) {
        await view.attachmentManager.deleteAttachment(attachments[0].AttachmentId);
    }
}

async function updateClientViewModel(input, view) {

    const attachments = await getAccountingCertificateAttachments(view);

    if (!input.rootContext.ClientViewModel?.canAddAttachmentWithType?.attachmentType) {

        input.rootContext.ClientViewModel.canAddAttachmentWithType = {
            attachmentType: "taxDeductionCertificate",
            warningText: "Невозможно добавить более 1-го вложения данного типа",
            allowed: true
        };
    }

    input.rootContext.ClientViewModel.canAddAttachmentWithType.allowed = !attachments.filter((attachment) =>
        attachment.AttachmentType.Code === input.rootContext.ClientViewModel.canAddAttachmentWithType.attachmentType).length > 0;

    const contractNo = input.rootContext.Body.contract?.number;
    const accountingYear = input.rootContext.Body.accountingYear?.year;
    const correctionNumber = input.rootContext.Body.correctionNumber;

    input.rootContext.ClientViewModel.attachmentsCommentMap = [{
        attachmentType: "taxDeductionCertificate",
        customName: `СПРАВКА_${contractNo}_${accountingYear ?? ''}_${correctionNumber}`
    },
    {
        attachmentType: "taxDeductionCertificateDraft",
        customName: `СПРАВКА_${contractNo}_${accountingYear ?? ''}_${correctionNumber}`
    }];

    if (input.context.Body?.contract?.number) {

        input.rootContext.ClientViewModel.isContractEnrichOnly = false;
    }
    else {

        input.rootContext.ClientViewModel.isContractEnrichOnly = true;
    }
}

function getCertificateSource(originatingClientId, originatingUserName) {

    if (originatingClientId === originatingClientIds.configStudioClient && isBitrix(originatingUserName)) {

        return accCertificateIncomingSource.Lkk;
    }

    return accCertificateIncomingSource.Ui;
}

function isBitrix(userName) {

    return userName.toLowerCase() === 'bitrix';
}

const accountingCertificateAttachmentTypes = {

    taxDeductionCertificate: 'taxDeductionCertificate'
};

const states = {

    Cancelled: 'Cancelled',
    Checked: 'Checked',
    Issued: 'Issued',
    Draft: 'Draft',
    Update: 'Update'
};

const actors = {

    AccountingCertificateEditor: 'AccountingCertificateEditor',
    AccountingCertificateViewer: 'AccountingCertificateViewer',
    AccountingCertificateAttachmentEditor: 'AccountingCertificateAttachmentEditor',
    System: 'System'
};

const accountingAttachmentsTabId = 'accountingAttachmentsTabId';

const messages = {

    AttachmentAlreadyExisits: 'AttachmentAlreadyExisits',
    noVerificationsInProperStates: 'noVerificationsInProperStates',
    massIssueVerificationsAlert: 'massIssueVerificationsAlert',
    finalAlert: 'finalAlert',
    Create: 'Create',
    Back: 'Back',
    SaveDocPlease: 'SaveDocPlease',
    OK: 'OK',
    Cancel: 'Cancel',
    Yes: 'Да',
    No: 'Нет'
};

const smallSize = 1;
const largeSize = 3;

const AccountingCertificateDocNameConsts = {

    AccountingCertificate: 'AccountingCertificate',
    AccountingCertificateCorrection: 'AccountingCertificateCorrection'
};

const AccountingCertificateRelationNameConsts = {

    AccountingCertificateCreateAmendmentRelation: 'AccountingCertificateCreateAmendmentRelation'
};

const configurationVersion = '1';

const taxAttachmentType = {

    XML: 'XML',
    PDF: 'PDF'
};

function mapOnLoadRequest(input) {

    const body = input.context.Body;
    const contractNumber = body.contract?.number;
    const accountingYear = body.accountingYear?.year;
    const insuredPartyCode = body.insuredPerson?.personCode;
    const correctionNumber = body.correctionNumber;
    const accountingCertificateNumber = input.context.Number;

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GetAccountingCertificateDataSource',
        data: {
            data: {
                criteria: {
                    contractNumber,
                    accountingYear,
                    insuredPartyCode,
                    correctionNumber,
                    accountingCertificateNumber
                }
            }
        }
    };

    return request;
}

async function executeEtl(selectedNumbers, url, that, ambientProperties) {

    const request = {
        method: 'post',
        url: url,
        data: {
            data: {
                selectedNumbers: selectedNumbers,
                accountingCertificateStates: [states.Draft, states.Checked],
                taxCertificateFormats: [taxAttachmentType.PDF, taxAttachmentType.XML]
            }
        },
        returnHttpPromise: true
    };

    let result;
    try {
        that.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        that.view.stopBlockingUI();
    }
}

/**
 * @translationKey {translationKey} noVerificationsInProperStates
 * @translationKey {translationKey} massIssueVerificationsAlert
 * @translationKey {translationKey} finalAlert
 */

async function massIssue(allCertificatesData, ambientProperties, that, isNeedAlert) {

    const translate = ambientProperties.services.translate.getSync;

    const draft = getDraftItemsByStates(allCertificatesData, states.Draft);
    const checked = getDraftItemsByStates(allCertificatesData, states.Checked);
    const allItems = allCertificatesData?.map(i => i.resultData.accountingCertificateNumber);
    const draftAndCheckedlength = (draft?.length ?? 0) + (checked.length ?? 0);

    if (draftAndCheckedlength === 0) {
        noSertificatesAlert(ambientProperties, translate);
        return;
    }

    if (isNeedAlert) {
        const result = await massIssueAlert(draft, checked, ambientProperties, translate);

        if (!result) {
            return;
        }
    }

    await executeEtl(allItems, 'api/core/shared/etl-services/AccountingCertificateChangeStateEtlService/1', that, ambientProperties);
    finalAlert(ambientProperties, translate);
}

function getDraftItemsByStates(allItems, state) {

    return allItems?.filter((x) => x.resultData.accountingCertificateState === state)
        .map(i => i.resultData.accountingCertificateNumber);
}

function noSertificatesAlert(ambientProperties, translate) {

    const ONLY_OK_BUTTON = 1;
    const msg = translate(ambientProperties.configurationCodeName.toUpperCase(), messages.noVerificationsInProperStates);

    ambientProperties.services.confirmationDialog.showWarning(msg, messages.OK, messages.Cancel, ONLY_OK_BUTTON);
}

async function massIssueAlert(draft, checked, ambientProperties, translate) {

    const data = {
        draftCount: draft?.length ?? 0,
        checkedCount: checked?.length ?? 0
    };
    const message = translate(ambientProperties.configurationCodeName.toUpperCase(), messages.massIssueVerificationsAlert, data);
    const ALL_BUTTONS = 3;
    const result = await ambientProperties.services.confirmationDialog.showConfirmation(message, messages.Yes, messages.No, ALL_BUTTONS);

    return result;
}

function finalAlert(ambientProperties, translate) {

    const ONLY_OK_BUTTON = 1;
    const msg = translate(ambientProperties.configurationCodeName.toUpperCase(), messages.finalAlert);

    ambientProperties.services.confirmationDialog.showWarning(msg, messages.OK, messages.Cancel, ONLY_OK_BUTTON);
}

const logLevels = {

    debug: 'debug',
    error: 'error'
};

const logMessages = {

    certificateCreated: 'Создана справка',
    correctionCreated: 'error'
};

const maxAccountingYearOffset = 2;

function mapFormat(input, result) {
    const body = input.context.Body;
    body.issueData.taxCertificateFormat = result.data[0].resultData.taxCertificateFormat;
}

async function getDuplicatesInformation(input, ambientProperties, self) {

    const body = input.context.Body;
    const contractNumber = body.contract?.number;
    const accountingYear = body.accountingYear?.year;
    const insuredPartyCode = body.insuredPerson?.personCode;

    if (!contractNumber || !accountingYear || !insuredPartyCode) {
        return;
    }

    const duplicatesRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GetAccountingCertificateDataSource',
        data: {
            data: {
                criteria: {
                    contractNumber,
                    accountingYear,
                    insuredPartyCode
                }
            }
        }
    };

    let duplicates;
    try {
        self.view.startBlockingUI();
        duplicates = await ambientProperties.services.api.call(duplicatesRequest);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        self.view.stopBlockingUI();
    }

    /*
    TODO: revert this line after LJADIRDSUP-22615 will be fixed
    const resultDuplicates = duplicates.data.filter(i => i.resultData.originalDocumentNumber != input.context.OriginalDocumentNumber);
    */
    const resultDuplicates = duplicates.data.filter(i => (i.resultData.originalDocumentNumber != (input.context.OriginalDocumentNumber ?? input.context.Number)));

    const duplicatesLocal = resultDuplicates.map(item => {
        return {
            accountingCertificateNumber: item.resultData.accountingCertificateNumber,
            accountingCertificateState: item.resultData.accountingCertificateState,
            originalDocumentNumber: input.context.OriginalDocumentNumber,
            requestDate: item.resultData.requestDate
        };
    });

    return duplicatesLocal;
}

module.exports = {
    checkBeforeSaveAttributes,
    getPolicyBody,
    savePolicyData,
    updatePolicyData,
    checkIsMigratedPolicy,
    updateIssueData,
    setDocumentCodeView,
    setAmountOfPremiumsPaid,
    setAccountingYear,
    checkAccountingCertificateDuplicates,
    showDuplicatesMessage,
    checkDuplicateLastCorrectionNumber,
    updateInsuredPersonData,
    updateTaxPayerData,
    getDuplicateCancelledMessage,
    documentNumberRegExp,
    getAccountingCertificateAttachments,
    updateClientViewModel,
    setDescription,
    setContractTypeDescription,
    isBitrix,
    accountingCertificateAttachmentTypes,
    mapOnLoadRequest,
    mapFormat,
    dropAttachment,
    states, actors, messages,
    accountingAttachmentsTabId,
    smallSize, largeSize,
    taxAttachmentType, executeEtl,
    massIssue,
    logLevels,
    logMessages,
    configurationVersion,
    maxAccountingYearOffset,
    getDuplicatesInformation,
    getCertificateSource,
    AccountingCertificateDocNameConsts,
    AccountingCertificateRelationNameConsts
};
