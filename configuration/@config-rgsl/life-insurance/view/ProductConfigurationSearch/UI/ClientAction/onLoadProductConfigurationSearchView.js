'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { getProductConfigurationLastVersion } = require('@config-rgsl/life-insurance/lib/productConfigurationHelper');

module.exports = async function onLoadProductConfigurationSearchView(input, ambientProperties) {

    try {

        this.view.startBlockingUI();

        const viewContext = input.context.viewContext;
        const criteria = {
            issueDate: DateTimeUtils.formatDate(new Date())
        };
        const searchRequest = { data: { criteria: criteria } };

        const lastVersion = await getProductConfigurationLastVersion(ambientProperties);
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
