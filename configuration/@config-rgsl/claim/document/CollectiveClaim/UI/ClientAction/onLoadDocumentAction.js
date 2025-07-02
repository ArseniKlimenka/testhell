'use strict';

const { claimStates } = require('@config-rgsl/claim-base/lib/claimConsts');
const { disableTabs } = require('@config-rgsl/life-insurance/lib/uiHelper');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { currency } = require("@config-rgsl/infrastructure/lib/ImplConstants");
const { exchangeRateLookup } = require('@config-rgsl/acc-base/lib/currencyConversionHelper');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function onLoadDocumentAction(input, ambientProperties) {

    this.view.startBlockingUI();

    const isDocumentLocked = !isSaveOperationAvailable(this.view);
    const stateCode = input.context.State?.Code;
    const number = input.context.Number;

    if (stateCode === claimStates.poCreation) {

        subscribeToUpdatePage(this, stateCode);
    }

    await this.view.evaluate(['[GetDuplicatedClaims]'], false, true);
    await this.view.evaluate(['[GetPolicyOpenAmountData]'], false, true);
    await this.view.evaluate(['[GetPolicyCancellationData]'], false, true);

    this.view.setClean();

    const applicantCode = input.rootContext.Body.applicationInfo?.applicant?.partyCode;

    if (!applicantCode && !number) {

        await this.view.evaluate(['[GetApplicant]'], false, true);
    }

    if (isDocumentLocked || stateCode === claimStates.legalApproval || stateCode === claimStates.securityApproval || stateCode === claimStates.sentToPayment || stateCode === claimStates.partiallyPaid) {

        const tabLayout = this.view.getControlByElementId('tabLayout');
        disableTabs(tabLayout);
    }

    if (number) {

        await fillExistingPaymentOrders(input, ambientProperties, this);
    }

    const claimAmounts = input.rootContext.Body.claimAmounts;

    if (!claimAmounts.exchangeRate && claimAmounts.contractCurrency) {

        claimAmounts.exchangeRate = await exchangeRateLookup([], claimAmounts.contractCurrency, currency.localCurrency, ambientProperties, dateUtils.dateNow());
    }

    if (stateCode === claimStates.claimImportInProgress) {

        try {
            await setImportDocumentNumber(input, ambientProperties);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            this.view.stopBlockingUI();
        }
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();

    this.view.stopBlockingUI();
};

async function setImportDocumentNumber(input, ambientProperties) {

    const importDocumentRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GetCollectiveClaimImportDocumentNumberDataSource',
        data: {
            data: {
                criteria: {
                    claimNumber: input.rootContext.Number
                }
            }
        }
    };

    const importDocumentResult = await ambientProperties.services.api.call(importDocumentRequest);
    input.rootContext.ClientViewModel.importDocumentNumber = importDocumentResult.data[0]?.resultData.importDocumentNumber;
}

function subscribeToUpdatePage(self, state) {

    const handlerName = 'claimPoCreation' + state + 'ServerSideHandler';

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
                paymentOrderState: item.resultData.stateCode
            };
        });
    }
}
