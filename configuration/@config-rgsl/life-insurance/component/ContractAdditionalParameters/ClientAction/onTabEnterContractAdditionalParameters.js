'use strict';

const { getContractAdditionalParameters } = require('@config-rgsl/contract/lib/contractEntityHelper');

module.exports = async function onTabEnterContractAdditionalParameters(input, ambientProperties) {

    if (!input.context?.ClientViewModel?.contractEntityCode) {

        await getContractAdditionalParameters(input, ambientProperties, this);

        const contractAdditionalParametersInlineView = this.view.getControlByElementId('ContractAdditionalParametersInlineViewId');

        if (contractAdditionalParametersInlineView && input.context?.ClientViewModel?.contractEntityCode) {

            contractAdditionalParametersInlineView.hideElement();
            contractAdditionalParametersInlineView.showElement();
        }
    }
};
