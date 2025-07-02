'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function onChangeIsPersonalManager(input, ambientProperties) {

    const isPersonalManager = input.data.isPersonalManager;
    input.context.request.data.criteria.initiatorServiceProviderCodes = [];

    if (isPersonalManager) {

        const requestServiceProvider = {
            method: 'POST',
            url: 'api/entity-infrastructure/shared/datasource/ServiceProviderDataSource',
            data: {
                data: {
                    criteria: {
                        isPersonalManager: true
                    }
                }
            }
        };

        let result;
        try {
            this.view.startBlockingUI();
            result = await ambientProperties.services.api.call(requestServiceProvider);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            this.view.stopBlockingUI();
        }

        if (result.data && result.data.length > 0) {
            result.data.forEach(item =>
                input.context.request.data.criteria.initiatorServiceProviderCodes.push(item.resultData.serviceProviderCode)
            );
        }
    }
};
