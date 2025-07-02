'use strict';

const { isSaveOperationAvailable, isVersionApplied } = require('@config-rgsl/infrastructure/lib/UIUtils');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const { documentStates } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const { currency } = require('@config-rgsl/infrastructure/lib/ImplConstants');
const { exchangeRateLookup } = require('@config-rgsl/acc-base/lib/currencyConversionHelper');
const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { paymentOrderType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');
const implConstants = require('@config-rgsl/infrastructure/lib/ImplConstants');
const { getProductConfiguration } = require('@config-rgsl/life-insurance/lib/productConfigurationHelper');
const { defaultPayments } = require('@config-rgsl/life-insurance/component/LifeInsurancePaymentCalculation/lib/paymentCalculationConsts');
const { equityLifeInsuranceAmendments } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

async function LifeAmendmentCancellationBeforeSaveMapping(input, ambientProperties, that) {

    const entityId = input.context.Id;
    const currentUser = ambientProperties.applicationContext.currentUser().getUserName();
    const isDocumentLocked = !isSaveOperationAvailable(that.view);
    let currentAssignee = undefined;
    const currentActor = ambientProperties.currentWorkUnitActor;
    const stateCode = input.context.State.Code;

    if (entityId) {

        currentAssignee = await getCurrentAssignee(input, ambientProperties);
    }

    if (amendmentConstants.cancellationStatesToAllocateActivities.includes(stateCode) &&
        !isDocumentLocked && currentActor !== 'Accounting' &&
        (!currentAssignee || currentAssignee !== currentUser)) {

        throw 'Невозможно сохранить документ! На текущего пользователя не назначена задача!';
    }

    await that.view.evaluate([
        '/allocationsInfo',
        '/attachmentsPackage',
        '/paymentAmendmentConditions[SetPolicyParties]'
    ], false, true);

    delete input.context.Body.tempTechnicalData;

    if (ambientProperties.configurationCodeName === equityLifeInsuranceAmendments.EquityLifeInsuranceCancellation) {
        await that.view.evaluate(['/paymentCalculation[SetPayments]'], false, true);
    }
}

async function LifeAmendmentCancellationAfterSaveMapping(input, ambientProperties, that) {

    await that.view.evaluate(['/paymentAmendmentConditions[GetCancellationRecipientsBankAccounts]'], false, true);
    await that.view.evaluate(['/taxDeductionItems[GetNotPaidEdowments]'], false, true);

    if (!input.rootContext.Body.tempTechnicalData) {

        input.rootContext.Body.tempTechnicalData = {};
    }

    input.rootContext.Body.tempTechnicalData.inquiries = [];
    await that.view.evaluate(['/tempTechnicalData/inquiries[SetCancellationInquiries]'], false, true);
    that.view.setClean();
}

async function LifeAmendmentCancellationOnLoadMapping(input, ambientProperties, that) {

    if (isVersionApplied(that.view)) {

        that.view.disableValidation();
    }

    const entityId = input.context.Id;
    const isDocumentLocked = !isSaveOperationAvailable(that.view);
    const currentUser = ambientProperties.applicationContext.currentUser().getUserName();
    let currentAssignee = undefined;

    if (entityId) {
        currentAssignee = await getCurrentAssignee(input, ambientProperties);
    }

    const isAssigneeCurrentUser = currentAssignee ? currentAssignee === currentUser : true;
    const stateCode = input.context.State.Code;
    const currentActor = ambientProperties.currentWorkUnitActor;

    if (isDocumentLocked ||
        stateCode === amendmentConstants.cancellationAmendmentState.RequestToClient ||
        stateCode === amendmentConstants.cancellationAmendmentState.SentToPayment ||
        stateCode === amendmentConstants.cancellationAmendmentState.AwaitingPaymentDocuments ||
        currentActor === 'Accounting') {

        that.view.disableAllElements();
    }

    if (stateCode === amendmentConstants.cancellationAmendmentState.POCreation) {

        subscribeToUpdatePage(that, stateCode);
    }

    input.rootContext.ClientViewModel.shouldShowPolicyAttachments = true;
    input.rootContext.ClientViewModel.shouldShowHolderAttachments = true;
    input.rootContext.ClientViewModel.shouldHideExternalFileUploadSpecial = true;
    input.rootContext.ClientViewModel.shouldDisableExternalFileEdit = true;
    input.rootContext.ClientViewModel.shouldDisableExternalFileDelete = true;
    input.rootContext.ClientViewModel.shouldDisableExternalFileAdd = true;

    let shouldSaveDocument = false;

    await that.view.evaluate(['/paymentAmendmentConditions[GetCancellationRecipientsBankAccounts]'], false, true);
    await that.view.evaluate(['/taxDeductionItems[GetNotPaidEdowments]'], false, true);

    const body = input.context.Body;
    const paymentAmendmentConditions = body.paymentAmendmentConditions;
    const contractVersions = body.contractVersions || [];

    const contractStateVersions = contractVersions.filter(i => i.seqNumber == 0 ||
        i.dimensions?.some(d => d.Key === 'amendmentType' && (d.Value === 'NonFinancialChange' || d.Value === 'FinancialChange')));

    const originalContractStateVersion = contractStateVersions.find(i => i.seqNumber == 0);
    const latestContractStateVersion = contractStateVersions.sort((a, b) => b.seqNumber - a.seqNumber)[0];

    const stateBody = (latestContractStateVersion.seqNumber == 0 ? latestContractStateVersion.body : latestContractStateVersion.snapshotBody)
        ?? originalContractStateVersion.body;

    const contractCurrency = stateBody.basicConditions.currency.currencyCode;

    if (!isDocumentLocked && !paymentAmendmentConditions.exchangeRate && contractCurrency) {

        paymentAmendmentConditions.exchangeRate = await exchangeRateLookup([], contractCurrency, currency.localCurrency, ambientProperties, dateUtils.dateNow());
        shouldSaveDocument = true;
    }

    // Updating UI after execution sink enrichments
    if (input.context.State.Code == amendmentConstants.amendmentState.OperationsApproval) {

        shouldSaveDocument = true;

        if (body.technicalInformation.requestAmendmentReason === amendmentConstants.amendmentReason.creditRepayment &&
            body.technicalInformation.requestState === documentStates.CancelWithoutPayment) {

            const paymentLines = body.paymentAmendmentConditions.paymentLines || [];

            paymentLines.forEach(item => {

                item.paymentLineSum = 0;
                item.paymentLineSumInRub = 0;

                if (item.paymentLineType === amendmentConstants.amendmentPaymentLineType.creditRefund) {

                    item.paymentLineSumByRisks = [];
                }
            });
        }
    }

    const policyNumber = input.context.OriginalDocumentNumber;
    const lastContractVersion = getLastFullfilledContractVersion(input);
    body.basicAmendmentConditions.policyData = await mapPolicyData(lastContractVersion, policyNumber, ambientProperties);

    await fillExistingPaymentOrders(input, ambientProperties);

    if (!input.rootContext.Body.tempTechnicalData) {

        input.rootContext.Body.tempTechnicalData = {};
    }

    input.rootContext.Body.tempTechnicalData.inquiries = [];
    await that.view.evaluate(['/tempTechnicalData/inquiries[SetCancellationInquiries]'], false, true);

    if (!input.rootContext.Body?.paymentCalculation?.paymentLines?.length
        && ambientProperties.configurationCodeName === equityLifeInsuranceAmendments.EquityLifeInsuranceCancellation
    ) {
        input.rootContext.Body.paymentCalculation = {
            paymentLines: defaultPayments
        };
    }

    that.view.rebind();

    if (shouldSaveDocument && !isDocumentLocked && isAssigneeCurrentUser) {

        await that.view.save();
    }
    else {

        that.view.setClean();
    }
}

function getLastFullfilledContractVersion(input) {
    return input.context.Body.contractVersions?.filter(
        item => item.body.productConfiguration?.productDescription
            && item.body.policyHolder?.partyData?.partyFullName
            && item.body.policyTerms?.startDate
            && item.body.policyTerms?.endDate
            && item.commonBody?.attributes?.contractIssueDate
            && item.body.basicConditions
    ).slice(-1)?.pop();
}

async function mapPolicyData(lastContractVersion, policyNumber, ambientProperties) {

    if (!lastContractVersion) {
        return;
    }

    const actualCoolOffDate = await getCoolOffPeriodEndSyncWithCalendar(lastContractVersion.body, ambientProperties);

    return {
        policyNumber: policyNumber,
        policyProductGroup: amendmentUtils.productGroups[lastContractVersion.body.productConfiguration?.productGroupCode],
        insuranceProductName: lastContractVersion.body.productConfiguration?.productDescription,
        policyHolderFullName: lastContractVersion.body.policyHolder?.partyData?.partyFullName,
        policyStartDate: lastContractVersion.body.policyTerms?.startDate,
        policyEndDate: lastContractVersion.body.policyTerms?.endDate,
        policyIssueDate: lastContractVersion.commonBody?.attributes?.contractIssueDate,
        contractCurrencyName: lastContractVersion.body.basicConditions?.currency?.currencyDesc,
        exchangeRate: lastContractVersion.body.basicConditions?.exchangeRate,
        isFixedRate: lastContractVersion.body.basicConditions?.isFixedRate,
        actualCoolOffDate: actualCoolOffDate
    };

}

async function getCoolOffPeriodEndSyncWithCalendar(contractBody, ambientProperties) {

    const contractIssueDate = contractBody.basicConditions?.issueDate;
    const productCode = contractBody.mainInsuranceConditions?.insuranceProduct?.productCode;
    const productConf = await getProductConfiguration(ambientProperties, productCode, contractIssueDate);
    const coolOffPeriodDays = productConf.coolOffPeriodDays;
    const coolOffPeriodEnd = dateUtils.addDays(contractIssueDate, coolOffPeriodDays);
    const calendarCode = implConstants.workCalendar.companyCalendar;
    const checkWorkingDaysPeriod = 30;
    const fromDate = coolOffPeriodEnd;
    const toDate = dateUtils.addDays(coolOffPeriodEnd, checkWorkingDaysPeriod);

    const request = {
        method: 'get',
        url: `api/organisation/public/work-calendars/${calendarCode}/availability?from=${fromDate}&to=${toDate}`
    };

    const result = await ambientProperties.services.api.call(request);

    const workCalendar = result?.availabilityPerDate?.sort((a, b) => a.date > b.date ? 1 : -1) || [];
    const workingDaysAfterCoolPeriod = workCalendar.filter(workingDays => workingDays.ruleLevel != 'exception');
    const coolOffPeriodEndSyncWithCalendar = workingDaysAfterCoolPeriod[0]?.date;

    return coolOffPeriodEndSyncWithCalendar;
}

async function fillExistingPaymentOrders(input, ambientProperties) {

    const paymentOrdersRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/PODocumentSearchDataSource',
        data: {
            data: {
                criteria: {
                    referenceNumber: input.rootContext.OriginalDocumentNumber,
                    isManual: false,
                    isCreatedFromNetting: false
                }
            }
        }
    };

    const result = await ambientProperties.services.api.call(paymentOrdersRequest);

    if (result.data && result.data.length > 0) {

        const activePaymentOrders = result.data.filter(item => item.resultData.originalStateCode !== 'Cancelled' &&
            item.resultData.recipient.code &&
            item.resultData.paymentOrderType === paymentOrderType.PolicyCancellation);

        input.context.ClientViewModel.existingPaymentOrders = activePaymentOrders.map(item => {

            return {
                paymentOrderNumber: item.metadata.code,
                recipientCode: item.resultData.recipient.code,
                paymentOrderType: item.resultData.paymentOrderType,
                paymentOrderSubType: item.resultData.paymentOrderSubType
            };
        });
    }
    else {

        input.context.ClientViewModel.existingPaymentOrders = [];
    }
}

function subscribeToUpdatePage(self, state) {

    const handlerName = 'cancellationPoCreation' + state + 'ServerSideHandler';

    const registryLoadHandler = (message) => {

        if (message.eventType === 'StatusChanged') {

            self.unsubscribeFromEventsFromCurrentEntity(handlerName);
            self.view.reloadEntity();
        }
    };

    self.subscribeToEventsFromCurrentEntity({
        handler: {
            name: handlerName,
            func: registryLoadHandler,
        }
    });
}

async function getCurrentAssignee(input, ambientProperties) {

    const activitiesRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/OpenStateActivityDataSource',
        data: {
            data: {
                criteria: {
                    entityId: input.context.Id,
                    stateCode: input.context.State.Code
                }
            }
        }
    };

    const result = await ambientProperties.services.api.call(activitiesRequest);

    let currentAssignee = undefined;
    if (result?.data?.length > 0) {

        currentAssignee = result.data[0].resultData.userName;
    }

    return currentAssignee;
}

module.exports = {
    LifeAmendmentCancellationBeforeSaveMapping,
    LifeAmendmentCancellationOnLoadMapping,
    LifeAmendmentCancellationAfterSaveMapping
};
