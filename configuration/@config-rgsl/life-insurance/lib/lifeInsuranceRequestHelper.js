'use strict';

const { additionalServicesRules } = require('@config-rgsl/life-insurance/lib/additionalServicesRules');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const implConstants = require('@config-rgsl/infrastructure/lib/ImplConstants');
const { changeAmendmentTypes, finChangeTypes, nonFinChangeTypes,
    policyHolderChangeTypes, changeTypes, equityLifeChangeTypes
} = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { documentStates, documentActors, typeOfRequest,
    paymentFrequencyCodes, documentRoles, applicantType,
    reasonForRecipient } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const lic = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { getProductConfiguration } = require('@config-rgsl/life-insurance/lib/productConfigurationHelper');
const { getFinalSumShare } = require('@config-rgsl/life-insurance/lib/equityStrategiesHelper');

async function getCoolOffPeriodEndSyncWithCalendar(input, ambientProperties) {

    const contractIssueDate = input.context.Body.contract.issueDate;
    const productCode = input?.context?.Body?.contract?.productCode;
    const issueDate = input?.context?.Body?.contract?.issueDate;
    const productConf = await getProductConfiguration(ambientProperties, productCode, issueDate);
    const coolOffPeriodByProductInDays = productConf.coolOffPeriodDays ?? 0;
    const coolOffPeriodEnd = DateTimeUtils.addDays(contractIssueDate, coolOffPeriodByProductInDays - 1);
    let coolOffPeriodEndSyncWithCalendar = coolOffPeriodEnd;

    const calendarCode = implConstants.workCalendar.companyCalendar;
    const checkWorkingDaysPeriod = 30;
    const fromDateString = coolOffPeriodEnd;
    const toDateString = DateTimeUtils.addDays(coolOffPeriodEnd, checkWorkingDaysPeriod);

    const request = {
        method: 'get',
        url: `api/organisation/public/work-calendars/${calendarCode}/availability?from=${fromDateString}&to=${toDateString}`
    };

    const result = await ambientProperties.services.api.call(request);

    const workCalendar = (result && result.availabilityPerDate) ? result.availabilityPerDate.sort((a, b) => a.date > b.date ? 1 : -1) : [];
    const workingDaysAfterCoolPeriod = workCalendar.filter(workingDays => workingDays.ruleLevel != 'exception');
    const firstWorkingDayAfterCoolPeriod = workingDaysAfterCoolPeriod && workingDaysAfterCoolPeriod[0] ? workingDaysAfterCoolPeriod[0] : undefined;
    coolOffPeriodEndSyncWithCalendar = firstWorkingDayAfterCoolPeriod && firstWorkingDayAfterCoolPeriod.date ? firstWorkingDayAfterCoolPeriod.date : undefined;

    return coolOffPeriodEndSyncWithCalendar;

}

async function getPolicyDataByStatuses(input, ambientProperties, that) {

    const policyStatesForCreateRequest = [lic.policyState.Draft, lic.policyState.Active, lic.policyState.Activated];
    const number = input.context.Body.contract.number;

    if (number) {
        const contractRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/GeneralContractSearchDataSource',
            data: {
                data: {
                    criteria: {
                        contractType: 'Policy',
                        number,
                        isStrictNumber: true
                    }
                },
                paging: {
                    page: 0,
                    pageSize: 15
                }
            }
        };

        let result;
        try {
            that.view.startBlockingUI();
            result = await ambientProperties.services.api.call(contractRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            that.view.stopBlockingUI();
        }

        if (result && result.data && result.data.length === 1) {

            const stateCode = result.data[0].resultData.stateCode;
            const stateCodeDescription = result.data[0].resultData.stateCodeDescription;

            if (policyStatesForCreateRequest.includes(stateCode)) {

                const productCode = result.data[0].resultData.productCode;
                const issueDate = result.data[0].resultData.issueDate;
                const productConf = await getProductConfiguration(ambientProperties, productCode, issueDate);
                const partnerBusinessCode = productConf?.partnerBusinessCode;
                const productGroup = result.data[0].resultData.productGroup;
                const creditProgram = result.data[0].resultData.creditProgram;

                input.context.Body.contract.percentRateImpact =
                    creditProgram && creditProgram.percentRateImpact ?
                        creditProgram.percentRateImpact : false;
                input.context.Body.contract.productCode = productCode;
                input.context.Body.contract.productGroup = productGroup;
                input.context.Body.contract.partnerBusinessCode = partnerBusinessCode;
                input.context.Body.contract.stateCode = stateCode;
                input.context.Body.contract.configurationName = result.data[0].metadata.configurationName;
                input.context.Body.contract.issueDate = result.data[0].resultData.issueDate;
                input.context.Body.contract.startDate = result.data[0].resultData.startDate;
                input.context.Body.contract.endDate = result.data[0].resultData.endDate;
                input.context.Body.contract.partner = result.data[0].resultData.partner;
                input.context.Body.holder.fullName = result.data[0].resultData.parties.holder.fullName;
                input.context.Body.holder.partyCode = result.data[0].resultData.parties.holder.personCode;
                input.context.Body.amountWithAllRisks = result.data[0].resultData.amountWithAllRisks;
                input.context.Body.technicalInformation.policyWasFound = true;

                that.view.rebind();
                that.view.reevaluateRules();
                that.view.validate();
                that.view.getControlByElementId('PolicyNumberInput').disableElement();

            } else {

                const notificationMessage = `По данному договору операция недоступна, статус договора «${stateCodeDescription}». Обратитесь в СК`;
                ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'ОК', 'ОК', 2);
            }

        } else {

            const notificationMessage = 'Договор не найден в системе, операция недоступна';
            ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'ОК', 'ОК', 2);
        }
    }
}

async function getFundLatestStatus(input, ambientProperties, that) {

    const documentNumber = input.context.Body?.contract?.number;
    const configurationName = input.context.Body?.contract?.configurationName;
    const isEquityLifeInsurancePolicy = configurationName == lic.productCode.EquityLifeInsurancePolicy;
    input.context.Body.technicalInformation.allowToChangeInvestmentParametersEdit = false;

    const isGeneralBackOffice = input.rootContext.WorkUnitActor.CurrentActor == documentActors.GeneralBackOffice;
    const isOperations = input.rootContext.WorkUnitActor.CurrentActor == documentActors.Operations;
    const isSalesVtbMassGroup = isCurrentUserHasRole(ambientProperties, documentRoles.SalesVTBMassGroup);
    const isInvestmentParametersEditor = isCurrentUserHasRole(ambientProperties, documentRoles.InvestmentParametersEditor);
    const isInvestmentParametersEditAvailable = isGeneralBackOffice || isOperations || isSalesVtbMassGroup || isInvestmentParametersEditor;

    if (documentNumber && isEquityLifeInsurancePolicy && isInvestmentParametersEditAvailable) {

        const fundRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/GetFundImportDataSource',
            data: {
                data: {
                    criteria: {
                        documentNumber: documentNumber,
                        isLatestReportDate: true
                    }
                }
            }
        };

        let result;
        try {
            that.view.startBlockingUI();
            result = await ambientProperties.services.api.call(fundRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            that.view.stopBlockingUI();
        }

        const resultDataLength = result?.data?.length;

        if (resultDataLength === 1) {

            const resultData = result.data[0].resultData;
            const fundStatus = resultData?.fundStatus;
            const fundStatusesForCreateRequest = [lic.fundStatusConst.FORMED_NOT_MATCHED_DECLARATION.DESCRIPTION, lic.fundStatusConst.FORMED_MATCHED_DECLARATION.DESCRIPTION];

            if (fundStatusesForCreateRequest.includes(fundStatus)) {

                input.context.Body.technicalInformation.allowToChangeInvestmentParametersEdit = true;
                if (!input.context.Body.contract.assets) {
                    input.context.Body.contract.assets = {};
                }
                input.context.Body.contract.assets.netAssetsAmount = resultData?.netAssetsAmount;

            } else {

                const messageMoreThanOne = `Статус фонда по договору ${documentNumber}: "${fundStatus}".
                При выборе класса изменения - "Изменение состава активов", статус фонда по договору должен быть одним из: "${fundStatusesForCreateRequest.join(", ")}".`;
                ambientProperties.services.confirmationDialog.showNotification(messageMoreThanOne, 'ОК', 'ОК', 2);
            }

            if (!input.context.Body.paymentCalculation) {
                input.context.Body.paymentCalculation = {};
            }
            input.context.Body.paymentCalculation.fundStatus = fundStatus;

        } else if (resultDataLength > 1) {

            const messageMoreThanOne = `За последнюю дату формирования отчёта фондов найдено более одного результата.
            Проверьте данные в разделе "Текущий статус фонда" во вкладке "Информация по инвестированию" на договоре ${documentNumber}.`;
            ambientProperties.services.confirmationDialog.showNotification(messageMoreThanOne, 'ОК', 'ОК', 2);

        } else {

            const messageNoResults = `Данные по фонду не найдены.
            Проверьте данные в разделе "Текущий статус фонда" во вкладке "Информация по инвестированию" на договоре ${documentNumber}.`;
            ambientProperties.services.confirmationDialog.showNotification(messageNoResults, 'ОК', 'ОК', 2);
        }
    }
}

async function getPolicyEquityStrategies(input, ambientProperties, that) {

    const contractNumber = input.context.Body?.contract?.number;
    const configurationName = input.context.Body?.contract?.configurationName;
    const isEquityLifeInsurancePolicy = configurationName == lic.productCode.EquityLifeInsurancePolicy;

    if (contractNumber && isEquityLifeInsurancePolicy) {

        const equityFundAssetsResult = await getFundAssets(input, ambientProperties, that);
        const isins = equityFundAssetsResult.map(i => i.isin).filter(Boolean);
        const equityFundAssetsInfoResult = await getFundAssetsInfo(input, ambientProperties, that, isins);

        const equityStrategiesPolicyRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/ContractVersionsDataSource',
            data: {
                data: {
                    criteria: {
                        contractNumber: contractNumber,
                        seqNumberMax: true,
                        policyOnly: true
                    }
                },
                paging: {
                    page: 0,
                    pageSize: 15
                }
            }
        };

        let equityStrategiesPolicyResult;
        try {
            that.view.startBlockingUI();
            equityStrategiesPolicyResult = await ambientProperties.services.api.call(equityStrategiesPolicyRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            that.view.stopBlockingUI();
        }

        const resultDataLength = equityStrategiesPolicyResult?.data?.length;

        if (resultDataLength === 1) {

            const resultData = equityStrategiesPolicyResult.data[0].resultData;
            const body = resultData?.body;

            const risks = body?.risks ?? [];
            const equityStrategies = body?.equityStrategies ?? [];

            input.context.Body.risks = risks;

            if (!equityFundAssetsResult || equityFundAssetsResult?.length == 0) {

                if (equityStrategies?.length == 0) {
                    input.context.Body.technicalInformation.allowToChangeInvestmentParametersEdit = true;
                }

                input.context.Body.equityStrategies = equityStrategies;
            } else {
                setFundAssets(input, ambientProperties, that, equityFundAssetsResult, equityFundAssetsInfoResult);
            }

        } else if (resultDataLength > 1) {

            const messageMoreThanOne = `Найдено более одного результата.
                Проверьте "Базовые параметры инвестирования" по договору ${contractNumber}.`;
            ambientProperties.services.confirmationDialog.showNotification(messageMoreThanOne, 'ОК', 'ОК', 2);

        } else {

            const messageNoResults = `Данные не найдены.
                Проверьте "Базовые параметры инвестирования" по договору ${contractNumber}.`;
            ambientProperties.services.confirmationDialog.showNotification(messageNoResults, 'ОК', 'ОК', 2);
        }


    }
}

async function getFundAssets(input, ambientProperties, that) {

    let equityFundAssetsResult;

    const contractNumber = input.context.Body?.contract?.number;
    const allowToChangeInvestmentParametersEdit = input.context.Body?.technicalInformation?.allowToChangeInvestmentParametersEdit;

    if (contractNumber && allowToChangeInvestmentParametersEdit) {

        const equityFundAssetsRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/GetFundAssetsImportDataSource',
            data: {
                data: {
                    criteria: {
                        documentNumber: contractNumber,
                        isRelatedToFundReportDate: true
                    }
                },
                paging: {
                    page: 0,
                    pageSize: 15
                }
            }
        };

        try {
            that.view.startBlockingUI();
            const equityFundAssetsResultData = await ambientProperties.services.api.call(equityFundAssetsRequest);
            equityFundAssetsResult = equityFundAssetsResultData.data.map(i => i.resultData);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            that.view.stopBlockingUI();
        }

    }

    return equityFundAssetsResult ?? [];
}

async function getFundAssetsInfo(input, ambientProperties, that, isins) {

    let equityFundAssetsInfoResult;

    const contract = input.context.Body?.contract;
    const contractNumber = contract?.number;
    const allowToChangeInvestmentParametersEdit = input.context.Body?.technicalInformation?.allowToChangeInvestmentParametersEdit;

    if (contractNumber && allowToChangeInvestmentParametersEdit) {

        const equityFundAssetsRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/EquityStrategyDataSource',
            data: {
                data: {
                    criteria: {
                        isins: isins
                    }
                },
                paging: {
                    page: 0,
                    pageSize: 15
                }
            }
        };

        try {
            that.view.startBlockingUI();
            const equityFundAssetsInfoResultData = await ambientProperties.services.api.call(equityFundAssetsRequest);
            equityFundAssetsInfoResult = equityFundAssetsInfoResultData.data.map(i => i.resultData);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            that.view.stopBlockingUI();
        }

    }

    return equityFundAssetsInfoResult ?? [];
}

async function setFundAssets(input, ambientProperties, that, equityFundAssetsResult, equityFundAssetsInfoResult) {

    if (equityFundAssetsResult?.length > 0) {

        input.context.Body.equityStrategies = equityFundAssetsResult.map(i => {
            const equityFundAssetsInfo = equityFundAssetsInfoResult.filter(j => j.isin == i.isin)[0];
            if (!equityFundAssetsInfo) {
                return null;
            }

            const finalSumShare = getFinalSumShare(input, ambientProperties, this, i.assetCurrentShare);
            const finalSum = finalSumShare?.finalSum;
            const finalShare = finalSumShare?.finalShare;

            return {
                payOffType: equityFundAssetsInfo?.payOffType,
                share: finalShare,
                strategy: {
                    strategyCode: equityFundAssetsInfo.strategyCode,
                    strategyName: equityFundAssetsInfo.strategyName,
                    payOffDescription: equityFundAssetsInfo.payOffDescription,
                    pipCategory: equityFundAssetsInfo.pipCategory,
                    payOffType: equityFundAssetsInfo.payOffType,
                    isin: i.isin,
                    repaymentDate: equityFundAssetsInfo.repaymentDate,
                    emitent: equityFundAssetsInfo.emitent,
                    couponRate: equityFundAssetsInfo.couponRate
                },
                sum: finalSum,
            };
        }).filter(item => item !== null);
    }
}

async function getPolicyCancellationAmendments(input, ambientProperties, that) {

    const contractNumber = input.context.Body.contract.number;
    const duplicateCancelledRequests = input.context.Body.technicalInformation?.duplicateCancelledRequests;
    const duplicateCancelledRequestsIssued = duplicateCancelledRequests?.filter(item => item.requestStateEn == documentStates.Issued);
    const duplicateCancelledRequestsNotIssued = duplicateCancelledRequests?.filter(item => item.requestStateEn != documentStates.Issued);

    if (contractNumber && duplicateCancelledRequestsIssued?.length > 0 && duplicateCancelledRequestsNotIssued?.length == 0) {
        const contractRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/ContractVersionsDataSource',
            data: {
                data: {
                    criteria: {
                        contractNumber: contractNumber
                    }
                }
            }
        };

        let result;
        try {
            that.view.startBlockingUI();
            result = await ambientProperties.services.api.call(contractRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            that.view.stopBlockingUI();
        }

        if (result && result.data && result.data.length > 0) {

            input.context.Body.technicalInformation.newCancellationRequestAvailable = result.data.filter(item => item.resultData.documentType == 'Расторжение' && (item.resultData.documentStateCode != documentStates.Cancelled && item.resultData.documentStateCode != documentStates.Rejected)).length == 0;
        }
    }
}

async function searchContractButtonClick(input, ambientProperties, that) {
    await getPolicyDataByStatuses(input, ambientProperties, that);
    await getFundLatestStatus(input, ambientProperties, that);
    await getPolicyEquityStrategies(input, ambientProperties, that);
    await checkDuplicateCancelledRequests(input, ambientProperties, that);
    await getPolicyCancellationAmendments(input, ambientProperties, that);
    await showDuplicateCancelledMessage(input, ambientProperties, that);
    await blockAgentCancellation(input, ambientProperties, that);
    await fillInTypeOfRequest(input, ambientProperties);
    that.view.rebind();
    that.view.reevaluateRules();
    that.view.validate();
}

async function getTransitionDateFromRequest(input, ambientProperties, that) {

    const requestNumber = input.context.Number;

    if (requestNumber) {

        const documentStateHistoryRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/DocumentStateHistoryDataSource',
            data: {
                data: {
                    criteria: {
                        documentCode: requestNumber
                    }
                }
            }
        };

        let result;
        try {
            that.view.startBlockingUI();
            result = await ambientProperties.services.api.call(documentStateHistoryRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            that.view.stopBlockingUI();
        }

        if (result?.data?.length > 0) {

            input.context.Body.receivedDate = DateTimeUtils.formatDate(result.data.filter(item => item.resultData.transition == 'Draft_to_OnReview')[0]?.resultData?.validFrom);
        }
    }
}

async function checkDuplicateCancelledRequests(input, ambientProperties, self) {

    input.context.Body.technicalInformation.duplicateCancelledRequestsNumbers = undefined;
    const contractNumber = input?.context?.Body?.contract?.number;
    const requestNumber = input.context.Number;

    if (contractNumber) {

        const contractRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/RelatedRequestsDataSource',
            data: {
                data: {
                    criteria: {
                        contractNumber
                    }
                }
            }
        };

        let result;
        try {
            self.view.startBlockingUI();
            result = await ambientProperties.services.api.call(contractRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            self.view.stopBlockingUI();
        }

        if (result && result.data && result.data.length > 0) {

            const requestsToCheck = result.data.filter(item => {
                if (item.resultData.requestNumber != requestNumber) {
                    return item;
                }
            });

            const duplicateCancelledRequestsNotCancelled = requestsToCheck.filter(item => {
                if (![documentStates.Cancelled, documentStates.RefusalToTerminateByPolicyholder].includes(item.resultData.requestStateEn)) {
                    return item;
                }
            });

            const duplicateCancelledRequestsCancellation = duplicateCancelledRequestsNotCancelled.filter(item => {
                if ([typeOfRequest.Cancellation].includes(item.resultData.typeOfRequestEn)) {
                    return item;
                }
            });

            const duplicateCancelledRequestsNumbers = duplicateCancelledRequestsCancellation.map(item => item.resultData.requestNumber);
            if (duplicateCancelledRequestsNumbers && duplicateCancelledRequestsNumbers.length > 0) {
                input.context.Body.technicalInformation.duplicateCancelledRequestsNumbers = duplicateCancelledRequestsNumbers.toString();
            }

            const duplicateCancelledRequests = duplicateCancelledRequestsCancellation.map(item => {
                return {
                    requestNumber: item.resultData.requestNumber,
                    requestStateEn: item.resultData.requestStateEn
                };
            });
            if (duplicateCancelledRequests && duplicateCancelledRequests.length > 0) {
                input.context.Body.technicalInformation.duplicateCancelledRequests = duplicateCancelledRequests;
            }

        }
    }

}

async function showDuplicateCancelledMessage(input, ambientProperties, that) {

    that.view.startBlockingUI();

    const newCancellationRequestNotAvailable = !input.context.Body.technicalInformation?.newCancellationRequestAvailable;
    const currentTypeOfRequest = input.context.Body.typeOfRequest;
    const isCancellation = currentTypeOfRequest == typeOfRequest.Cancellation;

    if (newCancellationRequestNotAvailable && (!currentTypeOfRequest || isCancellation)) {
        const duplicateCancelledRequestsNumbers = input?.context?.Body?.technicalInformation?.duplicateCancelledRequestsNumbers;
        if (duplicateCancelledRequestsNumbers) {
            const reqArr = duplicateCancelledRequestsNumbers.split(',');
            const message = getDuplicateCancelledMessage(duplicateCancelledRequestsNumbers);
            const reqLinks = reqArr.map(item => `<a href="/edit;entity=UniversalDocument;configurationCodeName=LifeInsuranceRequest;version=1;documentNumber=${item}">${item}</a>`);
            ambientProperties.services.confirmationDialog.showNotification(`${message} ${reqLinks}.`, 'OK', 'OK', 2);
        }
    }

    that.view.stopBlockingUI();
}

function getDuplicateCancelledMessage(duplicateCancelledRequestsNumbers, eng) {

    const reqArr = duplicateCancelledRequestsNumbers.split(',');
    const isReqMany = reqArr.length > 1;
    if (eng) {
        return isReqMany ? 'Termination requests under this contract has already been created. Request numbers:' : 'Termination request under this contract has already been created. Request number:';
    }
    return isReqMany ? 'Заявки на расторжение по данному договору уже созданы. Номера заявок:' : 'Заявка на расторжение по данному договору уже создана. Номер заявки:';


}

async function fillInTypeOfRequest(input, ambientProperties) {
    const isAgent = input.rootContext.WorkUnitActor.CurrentActor == documentActors.Agent;
    const currentStateCode = input.rootContext?.State?.Code;
    const technicalInformation = input?.context?.Body?.technicalInformation;
    const duplicateCancelledRequestsNumbers = technicalInformation?.duplicateCancelledRequestsNumbers;
    const newCancellationRequestAvailable = technicalInformation.newCancellationRequestAvailable;
    if (duplicateCancelledRequestsNumbers && !newCancellationRequestAvailable && (currentStateCode == documentStates.Draft || currentStateCode == documentStates.OnReview)) {
        if (isAgent) {
            input.context.Body.typeOfRequest = undefined;
        } else {
            input.context.Body.typeOfRequest = typeOfRequest.Modification;
        }
    }
}

async function fillInAmendmentReason(input, ambientProperties) {
    const currentStateCode = input.rootContext?.State?.Code;
    const typeOfRequest = input.rootContext?.Body?.typeOfRequest;
    const isCancellation = typeOfRequest == 'Cancellation';

    if (isCancellation && (currentStateCode == documentStates.Draft || currentStateCode == documentStates.OnReview)) {
        const amendmentReasonItems = [
            amendmentConstants.amendmentReason.byClientCoolOff,
            amendmentConstants.amendmentReason.byClientNonCoolOff,
            amendmentConstants.amendmentReason.creditRepayment
        ];
        const amendmentReasonFilteredItems = amendmentReasonFilterMapping(input, ambientProperties, amendmentReasonItems);
        if (amendmentReasonFilteredItems.length == 1) {
            input.context.Body.amendmentReason = amendmentReasonFilteredItems[0];
        }
    }
}

async function getBankAccounts(input, ambientProperties) {
    input.context.Body.bankAccountsArray = [];
    const partyCode = input.context.Body.holder?.partyCode;

    if (partyCode) {
        input.context.Body.bankAccountsArray = await getBankAccountsByPartyCode(partyCode, ambientProperties);
    }
}

async function getRecipientBankAccounts(input, ambientProperties) {
    const recipient = input.context.Body.recipient;

    if (!recipient) {
        return;
    }

    recipient.bankAccountsArray = [];
    const partyCode = input.context.Body.recipient.partyData?.partyCode;

    if (partyCode) {
        input.context.Body.recipient.bankAccountsArray = await getBankAccountsByPartyCode(partyCode, ambientProperties);
    }
}

async function getBankAccountsByPartyCode(partyCode, ambientProperties) {
    const contractRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GetPartyDataSource',
        data: {
            data: {
                criteria: {
                    partyCode: partyCode,
                }
            },
        }
    };

    const result = await ambientProperties.services.api.call(contractRequest);

    if (result.data.length !== 0) {
        const party = result.data[0].resultData;
        const partyBankAccounts = party.body.partyBankAccounts;

        if (partyBankAccounts?.length > 0) {
            const bankAccountsArray = partyBankAccounts.map(element => {
                return {
                    'bankId': element.bankId,
                    'bankName': element.bankName,
                    'bankBic': element.bankBic,
                    'bankCorrespondentAccount': element.bankCorrespondentAccount,
                    'SWIFT': element.SWIFT,
                    'IBAN': element.IBAN,
                    'foreignBank': element.foreignBank,
                    'currencyCode': element.currency.currencyCode,
                    'currencyDesc': element.currency.currencyDesc,
                    'currencyNumericCode': element.currency.currencyNumericCode,
                    'number': element.number,
                    'openingDate': element.openingDate,
                    'closingDate': element.closingDate,
                    'bankInn': element.bankInn,
                    'displayName': element.number + ' (' + (element.bankName ? element.bankName : 'Иностранный банк') + ')'
                };
            });

            return bankAccountsArray;
        }
    }
}

async function fillInBankAccount(input) {
    const bankAccountsArray = input.context.Body.bankAccountsArray;
    if (bankAccountsArray?.length == 1 && !input.context.Body.bankAccount?.bankId) {
        input.context.Body.bankAccount = bankAccountsArray[0];
    }
}

function fillInRecipientBankAccount(input) {
    const bankAccountsArray = input.context.Body.recipient?.bankAccountsArray;
    if (bankAccountsArray?.length == 1 && !input.context.Body.recipient.bankAccount?.bankId) {
        input.context.Body.recipient.bankAccount = bankAccountsArray[0];
    }
}

function filterSubtypes(input) {

    let subTypesItems = input.items;

    const isAgent = input.rootContext.WorkUnitActor.CurrentActor == documentActors.Agent;

    if (input.context.Body.typeOfRequest === typeOfRequest.Modification && isAgent) {
        subTypesItems = input.items.filter(item => item === changeAmendmentTypes.nonFinancialChange);
        input.context.Body.changeSubtype = subTypesItems;
    }

    return subTypesItems;
}

function filterChangeClassByChangeSubtype(input, ambientProperties) {

    let changeClassItems = input.items;
    const body = input.context.Body;
    const changeSubtype = body.changeSubtype;
    const allowToChangeInvestmentParametersEdit = body.technicalInformation.allowToChangeInvestmentParametersEdit;
    const isGeneralBackOffice = input.rootContext.WorkUnitActor.CurrentActor == documentActors.GeneralBackOffice;
    const isOperations = input.rootContext.WorkUnitActor.CurrentActor == documentActors.Operations;
    const isSalesVtbMassGroup = isCurrentUserHasRole(ambientProperties, documentRoles.SalesVTBMassGroup);
    const productGroup = body.contract.productGroup;
    const isEquityProductGroup = productGroup == lic.productGroup.DSZ.descriptionRU;

    if (changeSubtype == changeAmendmentTypes.financialChange) {
        if (changeSubtype == changeAmendmentTypes.financialChange) {
            changeClassItems = changeClassItems.filter(item => finChangeTypes.includes(item));
            if (isEquityProductGroup) {
                changeClassItems = changeClassItems.filter(item => equityLifeChangeTypes.includes(item));
            } else {
                changeClassItems = changeClassItems.filter(item => !equityLifeChangeTypes.includes(item));
            }
        }
    } else if (changeSubtype == changeAmendmentTypes.nonFinancialChange) {
        changeClassItems = changeClassItems.filter(item => nonFinChangeTypes.includes(item));

        if (!allowToChangeInvestmentParametersEdit) {
            changeClassItems = changeClassItems.filter(item => item != changeTypes.investmentParametersEdit);
        }
        if (!(isGeneralBackOffice || isOperations || isSalesVtbMassGroup)) {
            changeClassItems = changeClassItems.filter(item => item == changeTypes.investmentParametersEdit);
        }

    }

    return changeClassItems;

}

function mapChangeClassByChangeSubtype(changeSubtype, changeClass) {

    if (changeClass) {
        if (changeSubtype.includes(changeAmendmentTypes.financialChange) && changeSubtype.includes(changeAmendmentTypes.nonFinancialChange)) {
            return changeClass;
        } else if (changeSubtype.includes(changeAmendmentTypes.financialChange)) {
            return changeClass.filter(elem => finChangeTypes.includes(elem));
        } else if (changeSubtype.includes(changeAmendmentTypes.nonFinancialChange)) {
            return changeClass.filter(elem => nonFinChangeTypes.includes(elem));
        }
    }

    return [];

}

function mapChangeSubtypeByChangeClass(changeSubtype, changeClass) {

    if (changeClass.some(elem => finChangeTypes.includes(elem)) && changeClass.some(elem => nonFinChangeTypes.includes(elem))) {
        return [changeAmendmentTypes.financialChange, changeAmendmentTypes.nonFinancialChange];
    } else if (changeClass.some(elem => finChangeTypes.includes(elem))) {
        return [changeAmendmentTypes.financialChange];
    } else if (changeClass.some(elem => nonFinChangeTypes.includes(elem))) {
        return [changeAmendmentTypes.nonFinancialChange];
    }
    return [];


}

function getChangeClassElementsBySubtype(input) {

    const changeClass = input.body.changeClass;

    return {
        finChangeElements: changeClass.filter(elem => finChangeTypes.includes(elem)).filter(elem => !policyHolderChangeTypes.includes(elem)),
        nonFinChangeElements: changeClass.filter(elem => nonFinChangeTypes.includes(elem)),
        policyHolderChangeElements: changeClass.filter(elem => policyHolderChangeTypes.includes(elem)),
    };
}

function getChangeSubtypeByChangeClass(input) {

    const elementsBySubtype = getChangeClassElementsBySubtype(input);
    const finChangeElements = elementsBySubtype.finChangeElements;
    const nonFinChangeElements = elementsBySubtype.nonFinChangeElements;
    const policyHolderChangeElements = elementsBySubtype.policyHolderChangeElements;

    return {
        isFinChange: finChangeElements.length > 0,
        isNonFinChange: nonFinChangeElements.length > 0,
        isPolicyHolderChange: policyHolderChangeElements.length > 0
    };

}

function amendmentReasonFilterMapping(input, ambientProperties, amendmentReasonItems) {

    amendmentReasonItems = filterAmendmentReasonsByConfigurationName(input, ambientProperties, amendmentReasonItems);
    amendmentReasonItems = filterAmendmentReasonsByCoolOffPeriod(input, ambientProperties, amendmentReasonItems);
    amendmentReasonItems = filterAmendmentReasonsByCreditBFKO(input, ambientProperties, amendmentReasonItems);

    return amendmentReasonItems;

}

function filterAmendmentReasonsByConfigurationName(input, ambientProperties, items) {

    const configurationName = input?.context?.Body?.contract?.configurationName;

    if (configurationName != 'CreditLifeInsurancePolicy') { items = items.filter(item => item != 'creditRepayment'); }

    return items;

}

function filterAmendmentReasonsByCoolOffPeriod(input, ambientProperties, items) {

    const requestIssueDate = input.context.Body.issueDate;

    if (requestIssueDate <= input.context.Body.coolOffPeriodEndSyncWithCalendar) {
        items = items.filter(item => item == amendmentConstants.amendmentReason.byClientCoolOff);
    } else {
        items = items.filter(item => item != amendmentConstants.amendmentReason.byClientCoolOff);
    }

    return items;

}

function filterAmendmentReasonsByCreditBFKO(input, ambientProperties, items) {

    const productGroup = input?.context?.Body?.contract?.productGroup;
    const partnerBusinessCode = input?.context?.Body?.contract?.partnerBusinessCode;
    const currentDate = new Date().toISOString();
    const onlyClientCoolOffStartDate = '2022-09-29';

    if (currentDate >= onlyClientCoolOffStartDate && productGroup == 'credit' && partnerBusinessCode == lic.partnerCode.BFKO) { items = items.filter(item => item == amendmentConstants.amendmentReason.byClientCoolOff); }

    return items;

}

function createLifeInsuranceRequestMapping(body, that) {

    const policyNumber = that.businessContext.documentNumber;
    const policyHolderPartyData = body.policyHolder?.partyData;
    const policyHolderCode = policyHolderPartyData?.partyCode;
    const policyHolderFullName = policyHolderPartyData?.partyFullName;
    const partnerBusinessCode = body.mainInsuranceConditions?.partner?.partnerBusinessCode;

    const requestBody = {
        contract: {
            number: policyNumber,
            partnerBusinessCode: partnerBusinessCode
        },
        holder: {
            fullName: policyHolderFullName,
            partyCode: policyHolderCode
        },
        applicant: {
            partyData: policyHolderPartyData
        },
        technicalInformation: {
            createdFromPolicy: policyNumber
        }
    };

    return requestBody;
}

function checkMinSumPremAdditionalService(body, additionalServiceConfiguration) {

    const minSumPrem = additionalServiceConfiguration.minSumPrem;
    const riskPremium = body.paymentPlan && body.paymentPlan[0] && body.paymentPlan[0].paymentSum ? body.paymentPlan[0].paymentSum : 0;
    const paymentFrequencyCode = body?.basicConditions?.paymentFrequency?.paymentFrequencyCode;
    let riskPremiumToCheck;

    if (paymentFrequencyCode == paymentFrequencyCodes.Single || paymentFrequencyCode == paymentFrequencyCodes.Yearly) { riskPremiumToCheck = riskPremium; }
    if (paymentFrequencyCode == paymentFrequencyCodes.HalfYearly) { riskPremiumToCheck = riskPremium * 2; }
    if (paymentFrequencyCode == paymentFrequencyCodes.Quarterly) { riskPremiumToCheck = riskPremium * 4; }
    if (paymentFrequencyCode == paymentFrequencyCodes.Monthly) { riskPremiumToCheck = riskPremium * 12; }

    if (!minSumPrem || (minSumPrem && riskPremium && riskPremiumToCheck >= minSumPrem)) {
        return true;
    }
    return false;


}

function isGiftServices(body) {

    const issueDate = body?.basicConditions?.issueDate;

    const issueDateAfterOrEqual20230310 = DateTimeUtils.isAfterOrEqual(
        DateTimeUtils.formatDate(issueDate),
        DateTimeUtils.formatDate('2023-03-27'));

    const currentProductCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const totalRisksPremium = body?.risks?.reduce((total, currentValue) => total + currentValue.riskPremium, 0);
    const totalRisksPremiumToFixed = totalRisksPremium ? totalRisksPremium.toFixed(2) : 0;

    // This showing services condition for old closed products. We should show them for the products, but they will never change anymore.
    if (issueDateAfterOrEqual20230310 &&
        ((currentProductCode == lic.product.EFRBFKO && totalRisksPremiumToFixed >= 150000) ||
            ((currentProductCode == lic.product.EBMIBFKO ||
                currentProductCode == lic.product.EBMGBFKO) && totalRisksPremiumToFixed >= 300000) ||
            ((currentProductCode == lic.product.IBI5BFKO ||
                currentProductCode == lic.product.IBI3BFKO ||
                currentProductCode == lic.product.IBI5BFKO17 ||
                currentProductCode == lic.product.IBI3BFKO17 ||
                currentProductCode == lic.product.IBA5BFKO ||
                currentProductCode == lic.product.IBA3BFKO) && totalRisksPremiumToFixed >= 1500000))) {
        return true;
    }

    const currentProductConfiguration = body?.productConfiguration ?? {};
    const giftServicesPremium = currentProductConfiguration?.giftServicesPremium;

    if (totalRisksPremiumToFixed >= giftServicesPremium && currentProductConfiguration.giftServices.length > 0) {
        return true;
    }

    return false;
}

function resetGiftServices(input) {
    const body = input.context.Body;
    if (isGiftServices(body)) {
        if (!input.context.Body.giftServices) {
            input.context.Body.giftServices = {};
        }
        input.context.Body.giftServices.selectedGiftServices = {};
    }
}

async function blockAgentModification(input, ambientProperties, that) {
    const currentTypeOfRequest = input.context.Body?.typeOfRequest;
    const isAgent = input.rootContext.WorkUnitActor.CurrentActor == documentActors.Agent;
    const isModification = currentTypeOfRequest == typeOfRequest.Modification;
    const isSalesVtbMassGroup = await isCurrentUserHasRole(ambientProperties, documentRoles.SalesVTBMassGroup);
    const isInvestmentParametersEditor = await isCurrentUserHasRole(ambientProperties, documentRoles.InvestmentParametersEditor);
    if (isAgent && isModification && !(isSalesVtbMassGroup || isInvestmentParametersEditor)) {
        ambientProperties.services.confirmationDialog.showNotification(`Для роли Агент работа с заявкой на внесение изменений временно закрыта.`, 'OK', 'OK', 2);
        input.context.Body.typeOfRequest = undefined;
        that.view.disableAllElements();
    }
}

function isCurrentUserHasRole(ambientProperties, role) {
    const userRoles = ambientProperties.applicationContext.currentUser().getUserRoles();
    const result = userRoles.some(item => item.ApplicationRoleCodeName === role);

    return result;
}

async function blockAgentCancellation(input, ambientProperties, that) {

    input.context.Body.technicalInformation.blockedAgentCancellation = undefined;
    const userId = ambientProperties.applicationContext.currentUser().getUserId();

    if (userId) {

        const contractRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/GetUserGroupsDataSource',
            data: {
                data: {
                    criteria: {
                        userId: userId
                    }
                }
            }
        };

        let result;
        try {
            that.view.startBlockingUI();
            result = await ambientProperties.services.api.call(contractRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            that.view.stopBlockingUI();
        }

        if (result.data && result.data.length > 0) {
            const userGroups = result.data.map(item => item.resultData.userGroupCode);
            const isBlockedUserGroup = checkAvailabilitySome(userGroups, ['salesBFKO', 'salesBFKOAuto', 'salesBFKOVIP']);
            const currentTypeOfRequest = input.context.Body?.typeOfRequest;
            const currentProductCode = input.context.Body?.contract?.productCode;
            const isBlockedProductCode = ['CCP', 'CMC', 'CCP2', 'CCP3', 'CCP4', 'CMS', 'CMS2', 'CMP', 'CMP3', 'CMP4', 'CMP5'].includes(currentProductCode);
            const isAgent = input.rootContext.WorkUnitActor.CurrentActor == documentActors.Agent;
            const isCancellation = currentTypeOfRequest == typeOfRequest.Cancellation;
            if (isAgent && isCancellation && isBlockedUserGroup && isBlockedProductCode) {
                ambientProperties.services.confirmationDialog.showNotification(`Сервис временно недоступен. Обратитесь в СК.`, 'OK', 'OK', 2);
                input.context.Body.technicalInformation.blockedAgentCancellation = true;
                input.context.Body.typeOfRequest = undefined;
                that.view.disableAllElements();
                that.view.getContext().AvailableOperations = [];
                that.view.getContext().AvailableTransitions = [];
                that.view.rebind();
                that.view.reevaluateRules();
                that.view.validate();
            }
        }
    }
}

function filterServicesByCondition(body, services) {

    const issueDate = body.basicConditions?.issueDate;
    const riskPremium = body.basicConditions?.riskPremium;
    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const paymentFrequency = body.basicConditions?.paymentFrequency?.paymentFrequencyCode;

    if (!riskPremium) { return services; }

    if (lic.productGroupArray.SERVICE_RULES.includes(productCode)) {

        const rules = additionalServicesRules({ productCode, issueDate, paymentFrequency, riskPremium }) || {};
        services = services.filter(p => rules?.allowedServices.includes(p.serviceCode));
    }

    return services;
}

async function updateAmendmentBeneficiaryData(input, ambientProperties, that) {
    const body = input.context.Body;

    if (body.applicantType === 'beneficiary') {
        body.technicalInformation.amendmentBeneficiaryData = await getEquityLifeBeneficiaryData(input, ambientProperties, that);
    }
}


async function getEquityLifeBeneficiaryData(input, ambientProperties, that) {
    const number = input.context.Body.contract.number;

    if (number) {
        const contractRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/EquityLifeBeneficiaryCheckDataSource',
            data: {
                data: {
                    criteria: {
                        contractNumber: number
                    }
                }
            }
        };

        let result;
        try {
            that.view.startBlockingUI();
            result = await ambientProperties.services.api.call(contractRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            that.view.stopBlockingUI();
        }

        if (result && result.data && result.data.length === 1) {
            return result.data[0].resultData;
        }
    }
}

async function getRelatedRequest(input, ambientProperties, that) {
    const number = input.context.Body.contract.number;

    if (number) {
        const contractRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/RelatedRequestsDataSource',
            data: {
                data: {
                    criteria: {
                        contractNumber: number,
                        isDidPayment: true,
                        excludeRequestNumber: input.context.Number
                    }
                }
            }
        };

        let result;
        try {
            that.view.startBlockingUI();
            result = await ambientProperties.services.api.call(contractRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            that.view.stopBlockingUI();
        }

        if (result?.data?.length > 0) {
            return result.data[0].resultData;
        }
    }
}

function checkApplicantType(input) {
    const body = input.context.Body;

    const amendmentBeneficiaryData = body.technicalInformation.amendmentBeneficiaryData;
    const isNotBeneficiary = applicantType.beneficiary !== body.applicantType;
    const isBeneficiaryByEndowment = body.recipient?.reasonForRecipient === reasonForRecipient.beneficiaryByEndowment;
    const isNotPartyData = !body.recipient?.partyData?.partyCode;

    return isNotPartyData || (amendmentBeneficiaryData && isNotBeneficiary && isBeneficiaryByEndowment);
}

async function setRequestDefaultValues(input, ambientProperties, that) {
    const body = input.context.Body;

    body.applicant.partyData = await getPolicyHolderData(input, ambientProperties, that);
    delete body.applicantType;
    delete body.receiveMethod;
    delete body.amendmentReason;
    delete body.bankAccount;
    delete body.changeSubtype;
    delete body.changeClass;
    delete body.changeType;
    delete body.signatureForm;
    delete body.changeReason;
    delete body.recipient;
    delete body.initiator;
}


async function getPolicyHolderData(input, ambientProperties, that) {
    const number = input.context.Body.contract.number;

    if (number) {
        const contractRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/GetContractFullDataDataSource',
            data: {
                data: {
                    criteria: {
                        contractNumber: number
                    }
                }
            }
        };

        let result;
        try {
            that.view.startBlockingUI();
            result = await ambientProperties.services.api.call(contractRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            that.view.stopBlockingUI();
        }

        if (result && result.data && result.data.length === 1) {
            const partyData = result.data[0].resultData?.body?.policyHolder?.partyData;
            return partyData;
        }
    }
}

module.exports = {
    getCoolOffPeriodEndSyncWithCalendar,
    getPolicyDataByStatuses,
    getFundLatestStatus,
    getPolicyEquityStrategies,
    getPolicyCancellationAmendments,
    searchContractButtonClick,
    getTransitionDateFromRequest,
    filterChangeClassByChangeSubtype,
    mapChangeClassByChangeSubtype,
    mapChangeSubtypeByChangeClass,
    getChangeClassElementsBySubtype,
    getChangeSubtypeByChangeClass,
    checkDuplicateCancelledRequests,
    showDuplicateCancelledMessage,
    getDuplicateCancelledMessage,
    amendmentReasonFilterMapping,
    fillInTypeOfRequest,
    fillInAmendmentReason,
    getBankAccounts,
    getRecipientBankAccounts,
    fillInBankAccount,
    fillInRecipientBankAccount,
    createLifeInsuranceRequestMapping,
    checkMinSumPremAdditionalService,
    isGiftServices,
    resetGiftServices,
    blockAgentModification,
    blockAgentCancellation,
    filterServicesByCondition,
    isCurrentUserHasRole,
    filterSubtypes,
    updateAmendmentBeneficiaryData,
    getRelatedRequest,
    checkApplicantType,
    setRequestDefaultValues,
    getPolicyHolderData
};
