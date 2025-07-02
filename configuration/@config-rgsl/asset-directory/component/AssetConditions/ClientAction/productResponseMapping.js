'use strict';

module.exports = function productResponseMapping(input, ambientProperties) {

    let output = [];

    if (input.response?.data?.length > 0) {

        output = input.response.data
            .map(elem => elem.resultData)
            .map(elem => ({ ...elem, productDescriptionWithCode: `${elem.productDescription} (${elem.productCode})` }))
            .filter(elem => {
                return elem.productDescriptionWithCode.toLowerCase().includes(input.searchText != null ? input.searchText.toLowerCase() : '');
            });
    }
    else if (input.response?.data?.length === 0 && input.context.product) {
        output.push(input.context.product);
    }

    const sortedOutput = output.sort((a, b) => (a.productDescriptionWithCode > b.productDescriptionWithCode)
        ? 1
        : ((b.productDescriptionWithCode > a.productDescriptionWithCode) ? -1 : 0));

    const result = sortedOutput;
    return result;
};
