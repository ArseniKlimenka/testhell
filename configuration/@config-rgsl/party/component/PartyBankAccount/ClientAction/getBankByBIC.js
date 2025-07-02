'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function getBankByBIC(input, ambientProperties) {

    const bankBic = input.context.bankBic;

    if (bankBic && bankBic.length == 9) {

        const request = {
            method: 'post',
            url: 'api/entity-infrastructure/datasource/BanksDataSource',
            data: {
                data: {
                    criteria: {
                        fullBic: bankBic
                    }
                }
            }
        };

        let result;
        try {
            this.view.getParentView().startBlockingUI('Поиск банка по БИК');
            result = await ambientProperties.services.api.call(request);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            this.view.getParentView().stopBlockingUI();
        }

        if (result && result.data && result.data.length > 0) {
            const resultData = result.data[0].resultData;
            input.context.bankId = resultData.id;
            input.context.bankName = resultData.name;
            input.context.bankCorrespondentAccount = resultData.correspondentAccount;
            input.context.ftdName = resultData.ftdName;
        }
        else {
            input.context.bankId = undefined;
            input.context.bankName = undefined;
            input.context.bankCorrespondentAccount = undefined;
            input.context.ftdName = undefined;
        }
    }
    else {
        input.context.bankId = undefined;
        input.context.bankName = undefined;
        input.context.bankCorrespondentAccount = undefined;
        input.context.ftdName = undefined;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
