const { getValue, setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { calcEndDate } = require('@config-rgsl/life-insurance/lib/collectivePolicyHelper');

module.exports = async function onChangeWithTarification(input, ambientProperties) {

    const result = await ambientProperties.services.confirmationDialog.showConfirmation('Изменение параметра Тарификации приведёт к удалению списка застрахованных и сохранению договора. Изменить параметр?', 'Да', 'Нет', 3);

    const body = input.context.Body;
    const withTarification = input.componentContext.withTarification ?? false;

    if (!result) {

        input.componentContext.withTarification = !withTarification;

        return;
    }

    if (!withTarification) {
        input.componentContext.insuranceTerms = undefined;
    }

    calcEndDate(input, ambientProperties);

    setValue(body, 'technicalInformation.collectivePolicyPremiumWasCalculated', false);
    setValue(body, 'technicalInformation.collectivePolicyInsuredCount', 0);

    if (input.rootContext.Number) {

        await clearCollectivePolicyPremium(input, ambientProperties);
        await clearCollectivePolicyInsuredList(input, ambientProperties);
    }

    this.view.validate();
    this.view.reevaluateRules();
    this.view.rebind();

    await this.view.save();
};

async function clearCollectivePolicyPremium(input, ambientProperties) {

    const request = {
        method: 'post',
        url: 'api/core/shared/integration-services/ClearCollectivePolicyPremiumIS/1',
        data: {
            data: {
                contractNumber: input.context.Number,
                isNeedClearSummaryRiskData: true
            }
        }
    };

    await ambientProperties.services.api.call(request);
}

async function clearCollectivePolicyInsuredList(input, ambientProperties) {

    const request = {
        method: 'post',
        url: 'api/core/shared/integration-services/ClearCollectivePolicyInsuredListIS/1',
        data: {
            data: {
                contractNumber: input.context.Number
            }
        }
    };

    await ambientProperties.services.api.call(request);
}
