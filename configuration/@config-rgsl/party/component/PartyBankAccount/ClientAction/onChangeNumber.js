'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function onChangeNumber(input, ambientProperties) {
    const number = input.context.number;

    if (number && number.length === 20) {
        const currencyNumericCodeFromNumber = number.substring(5, 8);

        const userRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/CurrenciesDataSource',
            data: {
                data: {
                    criteria: {
                    }
                }
            }
        };

        let result;
        try {
            this.view.getParentView().startBlockingUI('Поиск валюты по номеру счета');
            result = await ambientProperties.services.api.call(userRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            this.view.getParentView().stopBlockingUI();
        }

        if (result) {

            let incorrectNumericCode = true;

            for (let i = 0; i < result.data.length; i++) {
                const currencyData = result.data[i].resultData;

                if (currencyNumericCodeFromNumber === currencyData.currencyNumericCode ||
                    (currencyData.currencyNumericCode == '643' && currencyNumericCodeFromNumber == '810')) {
                    input.data.currency = currencyData;
                    incorrectNumericCode = false;
                    break;
                }
            }

            if (incorrectNumericCode) {
                input.data.currency = undefined;
            }
        }
    } else {
        input.data.currency = undefined;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
