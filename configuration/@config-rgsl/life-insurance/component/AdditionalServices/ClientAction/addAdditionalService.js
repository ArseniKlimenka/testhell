const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const { copyAdditionalServicesToClientViewModel } = require('@config-rgsl/life-insurance/lib/collectivePolicyHelper');

/**
 * @translationKey {translationKey} AdditionalServiceTitle
 * @translationKey {translationKey} ProductCodeIsEmpty
 * @translationKey {translationKey} AdditionalServicesAreNotAvailable
 */

module.exports = async function addAdditionalService(input, ambientProperties) {

    const { Body, ClientViewModel } = input.context;

    const issueDate = getValue(Body, 'basicConditions.issueDate') || DateTimeUtils.newDateAsString();
    const productCode = getValue(Body, 'mainInsuranceConditions.insuranceProduct.productCode');
    if (!productCode) {

        await ambientProperties.services.confirmationDialog.showError(translate(ambientProperties, 'ProductCodeIsEmpty'), 'OK', 'OK', 1);

        return;
    }
    const productConf = confCorp({ productCode, issueDate });

    ClientViewModel.additionalServices = await copyAdditionalServicesToClientViewModel(Body, productConf, ambientProperties);

    const availableServices = getData(input);
    if (availableServices.length == 0) {

        await ambientProperties.services.confirmationDialog.showError(translate(ambientProperties, 'AdditionalServicesAreNotAvailable'), 'OK', 'OK', 1);

        return;
    }

    const dialogParams = getDialogParams(input, ambientProperties);
    const viewDialogService = getViewDialogService(ambientProperties);

    await viewDialogService.show(dialogParams);

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};

function getData(input) {

    const difference = [];
    const existingServices = input.componentContext ?? [];
    const additionalServices = getValue(input, 'context.ClientViewModel.additionalServices', []);
    additionalServices.forEach(a => {
        const additionalService = existingServices.find(b => a.serviceCode == b.serviceCode);
        if (!additionalService) {
            difference.push(a);
        }
    });

    return difference;
}

function getViewDialogService(ambientProperties) {

    return ambientProperties.services.viewDialog;
}

function translate(ambientProperties, translationKey) {

    const translateService = ambientProperties.services.translate;

    return translateService.getSync(ambientProperties.configurationCodeName.toUpperCase(), translationKey);
}

function getDialogViewReference() {

    return {
        configurationCodeName: 'AdditionalServicesView',
        configurationConceptType: 'CustomView',
        configurationVersion: '1'
    };
}

/**
 * @uses ClientAction:confirmSelectAdditionalServices
 * @uses ClientAction:checkBeforeConfirmSelectAdditionalServices
 */
function getDialogParams(input, ambientProperties) {

    const dialogViewReference = getDialogViewReference();
    const inputContext = getData(input);
    const titleTranslated = translate(ambientProperties, 'AdditionalServiceTitle');

    return {
        dialogViewReference,
        customData: inputContext,
        title: titleTranslated,
        dialogSize: 'Medium',
        dialogButtonOptions: {
            onConfirmAction: 'confirmSelectAdditionalServices',
            beforeConfirmationAction: 'checkBeforeConfirmSelectAdditionalServices'
        },
    };
}
