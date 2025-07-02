'use strict';

const { endowmentStates, endowmentStatesToValidateBankAccounts } = require('@config-rgsl/claim-base/lib/claimConsts');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { currency } = require('@config-rgsl/infrastructure/lib/ImplConstants');
const { exchangeRateLookup } = require('@config-rgsl/acc-base/lib/currencyConversionHelper');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function onLoadDocumentAction(input, ambientProperties) {

    if (input.rootContext.ConfigurationCodeName != input.context.ConfigurationCodeName) {

        return;
    }

    this.view.startBlockingUI();

    setVmFlags(input);

    const isDocumentLocked = !isSaveOperationAvailable(this.view);
    const stateCode = input.context.State.Code;
    const entityId = input.context.Id;

    const currentUser = ambientProperties.applicationContext.currentUser().getUserName();
    let currentAssignee = undefined;

    if (entityId) {

        currentAssignee = await getCurrentAssignee(input, ambientProperties, this);
    }

    const isAssigneeCurrentUser = currentAssignee ? currentAssignee === currentUser : true;

    if (stateCode === endowmentStates.poCreation) {

        subscribeToUpdatePage(this, stateCode);
    }

    await this.view.evaluate(['[GetPolicyParties]'], false, true);
    await this.view.evaluate(['[GetParticipantsData]'], false, true);
    await this.view.evaluate(['[GetDuplicatedEndowments]'], false, true);
    await this.view.evaluate(['[SetEndowmentInquiries]'], false, true);

    let shouldSaveDocument = false;

    if (endowmentStatesToValidateBankAccounts.includes(stateCode)) {

        await this.view.evaluate(['[GetBeneficiariesBankAccounts]'], false, true);
    }

    if (input.rootContext.Number) {

        await fillExistingPaymentOrders(input, ambientProperties, this);
    }

    const endowmentAmounts = input.rootContext.Body.endowmentAmounts;

    if (!endowmentAmounts.exchangeRate && endowmentAmounts.contractCurrency) {

        endowmentAmounts.exchangeRate = await exchangeRateLookup([], endowmentAmounts.contractCurrency, currency.localCurrency, ambientProperties, dateUtils.dateNow());
        shouldSaveDocument = true;
    }

    const contractNumber = input.context.Body.mainAttributes?.contract?.number;
    const contractConfName = input.context.Body.mainAttributes?.contract?.configurationName;

    if (stateCode === endowmentStates.operationsApproval && contractNumber && contractConfName) {

        const contractRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/GeneralContractSearchDataSource',
            data: {
                data: {
                    criteria: {
                        number: contractNumber,
                        configurationName: contractConfName
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
            this.view.startBlockingUI();
            result = await ambientProperties.services.api.call(contractRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            this.view.stopBlockingUI();
        }
        let contractState = undefined;
        if (result?.data?.length > 0) {

            contractState = result.data[0].resultData.stateCode;
        }

        if (!input.context.Body.technicalData) {

            input.context.Body.technicalData = {};
        }

        if (contractState === 'Cancelled' || contractState === 'CancelledByAmendment') {

            input.context.Body.technicalData.isContractCancelled = true;
            input.context.Body.mainAttributes.rejectionReason = 'policyCancelled';

        }
        else {

            if (input.context.Body.technicalData.isContractCancelled) {

                input.context.Body.technicalData.isContractCancelled = false;
            }

            if (input.context.Body.mainAttributes.rejectionReason === 'policyCancelled') {

                input.context.Body.mainAttributes.rejectionReason = undefined;
            }
        }

        shouldSaveDocument = true;
    }


    const policyRisks = input.context.Body.mainAttributes.availableRisks ?? [];
    const policyRisksCodes = policyRisks.map(item => item.riskCode);
    input.context.ClientViewModel.risksInfo = [];

    if (policyRisksCodes.length > 0) {

        const risksInfoRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/RiskInfoDataSource',
            data: {
                data: {
                    criteria: {
                        riskCodes: policyRisksCodes,
                        selectEndowmentRisksOnly: true
                    }
                }
            }
        };

        let result;
        try {
            this.view.startBlockingUI();
            result = await ambientProperties.services.api.call(risksInfoRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            this.view.stopBlockingUI();
        }

        if (result && result.data && result.data.length > 0) {

            input.context.ClientViewModel.risksInfo = result.data.map(i => i.resultData);
        }
    }

    const currentActor = ambientProperties.currentWorkUnitActor;

    const statesToDisableElements = [
        endowmentStates.insuranceMethodologyApproval,
        endowmentStates.actuaryApproval,
        endowmentStates.accountingApproval,
        endowmentStates.complianceApproval,
        endowmentStates.securityApproval,
        endowmentStates.legalApproval,
        endowmentStates.callCenterApproval,
        endowmentStates.partnerSalesSupportApproval,
        endowmentStates.clientServiceApproval,
        endowmentStates.requestToClient,
        endowmentStates.sentToPayment,
        endowmentStates.paid,
        endowmentStates.rejected,
        endowmentStates.cancelled,
        endowmentStates.awaitingInquiries];

    if (isDocumentLocked || statesToDisableElements.includes(stateCode) || currentActor === 'Accounting') {

        this.view.disableAllElements();
    }

    if (shouldSaveDocument && !isDocumentLocked && isAssigneeCurrentUser) {

        await this.view.save();
    }
    else {

        this.view.setClean();
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();

    this.view.stopBlockingUI();
};

async function fillExistingPaymentOrders(input, ambientProperties, self) {

    const paymentOrdersRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/PODocumentSearchDataSource',
        data: {
            data: {
                criteria: {
                    referenceNumber: input.rootContext.Number,
                    isManual: false,
                    isCreatedFromNetting: false
                }
            }
        }
    };

    let result;
    try {
        self.view.startBlockingUI();
        result = await ambientProperties.services.api.call(paymentOrdersRequest);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        self.view.stopBlockingUI();
    }

    if (result.data && result.data.length > 0) {

        const activePaymentOrders = result.data.filter(item => item.resultData.originalStateCode !== 'Cancelled' && item.resultData.recipient.code);

        input.context.ClientViewModel.existingPaymentOrders = activePaymentOrders.map(item => {

            return {
                paymentOrderNumber: item.metadata.code,
                beneficiaryCode: item.resultData.recipient.code,
                paymentOrderType: item.resultData.paymentOrderType,
                paymentOrderSubType: item.resultData.paymentOrderSubType
            };
        });
    }
}

function subscribeToUpdatePage(self, state) {

    const handlerName = 'endowmentPoCreation' + state + 'ServerSideHandler';

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

function setVmFlags(input) {

    input.rootContext.ClientViewModel.shouldShowPolicyAttachments = true;
    input.rootContext.ClientViewModel.shouldHideExternalFileUploadSpecial = true;
    input.rootContext.ClientViewModel.shouldDisableExternalFileEdit = true;
    input.rootContext.ClientViewModel.shouldDisableExternalFileDelete = true;
    input.rootContext.ClientViewModel.shouldDisableExternalFileAdd = true;
}

async function getCurrentAssignee(input, ambientProperties, self) {

    let currentAssignee = undefined;

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

    let result;
    try {
        self.view.startBlockingUI();
        result = await ambientProperties.services.api.call(activitiesRequest);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        self.view.stopBlockingUI();
    }

    if (result?.data?.length > 0) {

        currentAssignee = result.data[0].resultData.userName;
    }

    return currentAssignee;
}
