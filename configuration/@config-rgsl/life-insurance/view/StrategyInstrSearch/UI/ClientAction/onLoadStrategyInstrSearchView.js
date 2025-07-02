'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { getStrategyInstrLastVersion } = require('@config-rgsl/life-insurance/lib/strategyInstrHelper');

module.exports = async function onLoadStrategyInstrSearchView(input, ambientProperties) {

    try {

        this.view.startBlockingUI();

        const viewContext = input.context.viewContext;
        const criteria = {
            issueDate: DateTimeUtils.formatDate(new Date())
        };
        const searchRequest = { data: { criteria: criteria } };

        const lastVersion = await getStrategyInstrLastVersion(ambientProperties);
        criteria.version = lastVersion;

        this.view.setSearchRequest(searchRequest);
        this.view.search();

        this.view.stopBlockingUI();
    }

    catch (error) {
        this.view.stopBlockingUI();
        throw error;
    }
};
