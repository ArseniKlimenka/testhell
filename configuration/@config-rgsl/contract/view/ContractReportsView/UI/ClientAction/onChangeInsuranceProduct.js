const { getValue, setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function onChangeInsuranceProduct(input, ambientProperties) {

    await getStrategies(input, ambientProperties, this);

    this.view.validate();
    this.view.reevaluateRules();
    this.view.rebind();

};

async function getStrategies(input, ambientProperties, that) {

    setValue(input, 'context.Body.strategyCode', undefined);
    setValue(input, 'context.Body.strategies', []);

    const productCode = getValue(input, 'context.Body.productCode');
    if (!productCode) {

        return;
    }

    const request = {
        method: 'POST',
        url: 'api/entity-infrastructure/shared/datasource/ExistingInvestmentStrategyDataSource',
        data: {
            data: {
                criteria: {
                    productCode
                }
            }
        }
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

    const strategies = result.data.map(x => ({
        strategyCode : x.resultData.strategyCode,
        strategyDescription : x.resultData.strategyDescription
    }));

    setValue(input, 'context.Body.strategies', strategies);
}
