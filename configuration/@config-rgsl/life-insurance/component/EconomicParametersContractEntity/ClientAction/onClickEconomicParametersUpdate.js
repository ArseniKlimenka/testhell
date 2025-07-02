'use strict';

const { updateEconomicParameters, getContractAdditionalParameters } = require('@config-rgsl/contract/lib/contractEntityHelper');

module.exports = async function onClickEconomicParametersUpdate(input, ambientProperties) {

    const contractAdditionalParameters = this.view?.getContext();
    const contract = this.view.getParentView()?.getContext();

    const economicParameters = input.componentContext;
    const isManualCorrection = economicParameters?.isManualCorrection;

    if (isManualCorrection) {
        ambientProperties.services.confirmationDialog.showNotification(`Параметры экономики не будут обновлены, т.к. указана ручная корректировка.`, 'OK', 'OK', 2);
        return;
    }

    const productConfigurationNumber = undefined;
    const productCode = contract?.Body?.mainInsuranceConditions?.insuranceProduct?.productCode; /* eslint-disable-line */
    const selectedRules = [];
    const contractNumbers = [contract?.Number];

    const economicParametersUpdateButton = this.view.getControlByElementId('EconomicParametersUpdateButton');
    economicParametersUpdateButton.disableElement();

    await updateEconomicParameters(input, ambientProperties, this, productConfigurationNumber, productCode, selectedRules, contractNumbers);
    await getContractAdditionalParameters(input, ambientProperties, this);

    await new Promise(resolve => setTimeout(resolve, 5000));
    economicParametersUpdateButton.enableElement();
};
