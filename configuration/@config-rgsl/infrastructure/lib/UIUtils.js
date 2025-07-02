'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { operationCode } = require('@config-rgsl/infrastructure/lib/ImplConstants');
const { productCode, product, productDescription, policyState, actor } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const uriBuilder = require('@config-rgsl/infrastructure/lib/UriBuilder');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
* @description Shows is save operation available on view
* @param {object} view view
* @returns {boolean} is save operation available on view
*/
function isSaveOperationAvailable(view) {

    if (!view) { return false; }

    const viewContext = view.getContext();
    if (!viewContext) { return false; }

    const availableOperations = getValue(viewContext, 'AvailableOperations', []);
    if (availableOperations.length == 0) { return false; }

    return availableOperations.some(x => x.Code == 'Save');

}

/**
* @description Shows is version is applied
* @param {object} view view
* @returns {boolean} is version is applied
*/
function isVersionApplied(view) {

    if (!view) { return false; }

    const viewContext = view.getContext();
    if (!viewContext) { return false; }

    const selectedSequenceNumber = getValue(viewContext, 'SequenceNumber', 0);
    const versions = getValue(viewContext, 'Versions', []);
    const selectedVersion = versions.find(item => item.SequenceNumber == selectedSequenceNumber);

    return selectedVersion && selectedVersion.VersionState == 'Applied';

}

async function hideSaveButton(input, ambientProperties, that, hideSaveInStates, hideSaveForActors) {
    that.view.startBlockingUI();
    const isSaveHide = hideSaveInStates.includes(input.rootContext.State.Code) && hideSaveForActors.includes(input.rootContext.WorkUnitActor.CurrentActor);
    if (isSaveHide) {
        that.view.getContext().AvailableOperations = that.view.getContext().AvailableOperations.filter(
            operation => operation.Code != operationCode.Save
        );
    }
    that.view.stopBlockingUI();
}

async function createMedLifeInsuranceQuote(input, ambientProperties, that, currentPolicyInStates, currentProductInList, createMedQuoteFromButton, isTalentsDMSButton) {

    const isAgentOrOperations = [actor.Agent, actor.Operations].includes(input?.context?.WorkUnitActor?.CurrentActor);
    const currentProductCode = input?.context?.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    if ((!input.context.Body.technicalInformation.DMSquestion || createMedQuoteFromButton) && isAgentOrOperations &&
        currentProductInList.includes(currentProductCode) &&
        currentPolicyInStates.includes(input.rootContext.State.Code)
        && DateTimeUtils.isBefore(DateTimeUtils.formatDate(input?.context?.Body?.basicConditions?.issueDate), DateTimeUtils.formatDate('2025-02-07'))) {


        let productCodeToCreate;
        if ([product.CAPCLRELOAS, product.CAPCLRELBOXOAS].includes(currentProductCode)) {
            productCodeToCreate = product.GENCHKHEALTH;
        }
        if ([product.CAPCLCHILDOAS, product.CAPCLCHILDBOXOAS].includes(currentProductCode)) {
            productCodeToCreate = product.GENCHKSPORT;
        }
        if ([product.GENCHKSPORT].includes(currentProductCode)) {
            productCodeToCreate = product.GENCHKTALENTS;
        }
        if (isTalentsDMSButton) {
            productCodeToCreate = product.GENCHKTALENTS;
        }

        const request = {
            method: 'post',
            url: 'api/core/shared/integration-services/CreateMedLifeInsuranceQuote/1',
            data: {
                data: {
                    policyInput: input,
                    productCode: productCodeToCreate
                }
            }
        };

        const res = await ambientProperties.services.confirmationDialog.showQuestion(`Оформить доп. программу ДМС ${productDescription[productCodeToCreate]}?`, 'Да', 'Нет', 3);
        if (!input.context.Body.technicalInformation) {
            input.context.Body.technicalInformation = {};
        }
        let result;
        if (res) {
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

            if (result.data.code === 'OK') {
                input.context.Body.technicalInformation.DMSquestion = true;
                that.view.save();
                const urlToDMS = uriBuilder.getContractUri(productCode.MedLifeInsuranceQuote, 1, result.data.createdQuote.documentNumber);
                ambientProperties.services.navigation.navigateToUrlInNewTab(urlToDMS);
            }
        } else {
            input.context.Body.technicalInformation.DMSquestion = true;
            that.view.save();
            if (productCodeToCreate == product.GENCHKSPORT && !createMedQuoteFromButton) {
                productCodeToCreate = product.GENCHKTALENTS;
                request.data.data.productCode = productCodeToCreate;
                const res2 = await ambientProperties.services.confirmationDialog.showQuestion(`Оформить доп. программу ДМС ${productDescription[productCodeToCreate]}?`, 'Да', 'Нет', 3);
                if (res2) {
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

                    if (result.data.code === 'OK') {
                        input.context.Body.technicalInformation.DMSquestion = true;
                        that.view.save();
                        const urlToDMS = uriBuilder.getContractUri(productCode.MedLifeInsuranceQuote, 1, result.data.createdQuote.documentNumber);
                        ambientProperties.services.navigation.navigateToUrlInNewTab(urlToDMS);
                    }
                }
            }
        }
    }
}

async function createMedLifeInsuranceQuoteFromAccumulated(input, ambientProperties, that, createMedQuoteFromButton, isTalentsDMSButton) {
    const currentPolicyInStates = [policyState.Active];
    const currentProductInList = [product.CAPCLCHILDOAS, product.CAPCLCHILDBOXOAS, product.CAPCLRELOAS, product.CAPCLRELBOXOAS];
    createMedLifeInsuranceQuote(input, ambientProperties, that, currentPolicyInStates, currentProductInList, createMedQuoteFromButton, isTalentsDMSButton);
}

async function createMedLifeInsuranceQuoteFromMed(input, ambientProperties, that, createMedQuoteFromButton) {
    const currentPolicyInStates = [policyState.Active];
    const currentProductInList = [product.GENCHKSPORT];
    createMedLifeInsuranceQuote(input, ambientProperties, that, currentPolicyInStates, currentProductInList, createMedQuoteFromButton);
}

async function checkDateForCreateMed(input, ambientProperties, that) {

    const contractNumber = input.context.Number;

    if (contractNumber) {

        const contractRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/GetPolicyInfoTestDataSource', // TODO: we should not reference testing package from anywhere!
            data: {
                data: {
                    criteria: {
                        contractNumber: contractNumber,
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
        let ppLoadDate = result?.data?.ppLoadDate;
        const currentDate = (DateTimeUtils.formatDate(new Date().toISOString(), 'dd.MM.yyyy'));
        if (ppLoadDate) {
            ppLoadDate = DateTimeUtils.formatDate(ppLoadDate, 'dd.MM.yyyy');
            if (ppLoadDate == currentDate) {
                input.context.ClientViewModel.showMedQuoteSectionByDate = true;
            }
        }
    }
}

function shouldDisableSaveableContract(input, view) {

    return shouldDisableSaveablePolicy(input, view) || shouldDisableSaveableQuote(input, view);
}

function shouldDisableSaveablePolicy(input, view) {

    const currentActor = input.rootContext.WorkUnitActor.CurrentActor;
    const currentState = input.rootContext.State.Code;
    const contractType = input.rootContext.Dimensions.contractType;
    const configurationCodeName = input.rootContext.ConfigurationCodeName;
    const futureContractNumber = getValue(input, 'context.Body.technicalInformation.futureContractNumber');

    return isSaveOperationAvailable(view)
        && contractType === 'Policy'
        && currentState === policyState.Draft
        && currentActor === actor.Operations
        && configurationCodeName != 'CollectiveLifeInsurancePolicy';
}

function shouldDisableSaveableQuote(input, view) {

    const currentActor = input.rootContext.WorkUnitActor.CurrentActor;
    const currentState = input.rootContext.State.Code;
    const contractType = input.rootContext.Dimensions.contractType;
    const futureContractNumber = getValue(input, 'context.Body.technicalInformation.futureContractNumber');

    return isSaveOperationAvailable(view)
        && contractType === 'Quote'
        && currentState === policyState.Draft
        && currentActor === actor.Agent
        && futureContractNumber;
}

function isTermLifeProduct(input) {

    const body = input.context?.Body;
    const productTermLife = getValue(body, 'mainInsuranceConditions.insuranceProduct.productCode') == product.TERMVVTB;

    return productTermLife;
}

function isEBMGProduct(input) {

    const body = input.context?.Body;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const productEbmgVTB = [product.EBMGRETVTB, product.EBMMGREINVEST, product.EBMGNRETVTB].includes(productCode);

    return productEbmgVTB;
}


module.exports = {
    isSaveOperationAvailable,
    isVersionApplied,
    hideSaveButton,
    createMedLifeInsuranceQuote,
    createMedLifeInsuranceQuoteFromAccumulated,
    createMedLifeInsuranceQuoteFromMed,
    checkDateForCreateMed,
    shouldDisableSaveableContract,
    isTermLifeProduct,
    isEBMGProduct
};
