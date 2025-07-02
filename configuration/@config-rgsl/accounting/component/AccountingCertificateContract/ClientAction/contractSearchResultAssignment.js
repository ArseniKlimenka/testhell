'use strict';

const { savePolicyData } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function contractSearchResultAssignment(input, ambientProperties) {

    const selectedItems = input.getLookupSelection();
    if (selectedItems.length > 1) {
        throw "Only one item can be selected";
    }

    input.rootContext.ClientViewModel.isContractEnrichOnly = true;
    savePolicyData(input, ambientProperties, selectedItems, this);
};
