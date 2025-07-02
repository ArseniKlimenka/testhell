'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function productResponseMapping(input, ambientProperties) {

    let output = [];

    if (input.response?.data?.length > 0) {

        output = input.response.data
            .map(elem => ({
                productCode: elem.resultData.productCode,
                productDescription: elem.resultData.productDescription,
                productGroup: elem.resultData.productGroup,
                salesSegment: elem.resultData.salesSegment,
                isMigrated: elem.resultData.isMigrated
            }))
            .map(elem => ({ ...elem, productDescriptionWithCode: `${elem.productDescription} (${elem.productCode})` }))
            .filter(elem => {
                return elem.productDescriptionWithCode.toLowerCase().includes(input.searchText != null ? input.searchText.toLowerCase() : '');
            });
    }
    else {
        output.push(input.context.product);
    }

    // sort alphabetically and filter products by product group
    const filteringAttribute = input.rootContext?.Dimensions?.productGroup;
    const sortedOutput = output.sort((a, b) => (a.productDescriptionWithCode > b.productDescriptionWithCode)
        ? 1
        : ((b.productDescriptionWithCode > a.productDescriptionWithCode) ? -1 : 0));

    const isCollectivePolicy = ambientProperties.configurationCodeName == lifeInsuranceConstants.productCode.CollectiveLifeInsurancePolicy;

    if (isCollectivePolicy) {

        return sortedOutput.filter(t => t && lifeInsuranceConstants.productGroupCollective.AllConfigGroups.includes(t.productGroup));
    }

    const result = sortedOutput;
    return result;
};
