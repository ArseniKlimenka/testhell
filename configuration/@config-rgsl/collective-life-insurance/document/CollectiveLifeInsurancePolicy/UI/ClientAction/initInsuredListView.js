const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function initInsuredListView(input, ambientProperties) {

    const contractNumber = getValue(input, 'context.Number');
    if (!contractNumber) {

        return;
    }

    this.getCurrentView().setSearchRequest({
        data: {
            criteria: {
                contractNumber
            }
        }
    });

    this.getCurrentView().search();
};
