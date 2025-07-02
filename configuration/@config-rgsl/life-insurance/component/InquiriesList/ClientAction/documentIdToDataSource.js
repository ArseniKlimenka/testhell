'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function documentIdToDataSource(input) {

    const currentView = this.getCurrentView();
    const configurationCodeName = input.rootContext.ConfigurationCodeName ?? 'None';

    currentView.setSearchRequest({
        data: {
            criteria: {
                quoteNumber: input.context.Number || null,
                isCollectivePolicy: configurationCodeName == lifeInsuranceConstants.productCode.CollectiveLifeInsurancePolicy
            }
        }
    });

    currentView.search();
};
