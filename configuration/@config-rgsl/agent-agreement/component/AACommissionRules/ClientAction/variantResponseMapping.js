'use strict';

module.exports = function variantResponseMapping(input, ambientProperties) {

    let output = [];
    const data = input.response?.data ?? [];
    const selectedProducts = input.context.insuranceProduct?.values ?? [];
    const selectedProductCodes = selectedProducts.map(i => i.code);
    const filteredData = data.filter(i => selectedProductCodes.includes(i.resultData.productCode));
    const uniqueFilteredData = filteredData.filter((obj, index) => {
        return index === filteredData.findIndex(o => obj.resultData.variantCode === o.resultData.variantCode);
    });
    input.rootContext.ClientViewModel.productVariantsList = filteredData.map(i => i.resultData);

    if (uniqueFilteredData.length > 0) {

        output = uniqueFilteredData.map((element) => {

            const version = element.resultData['variantVersion'];
            const versionString = version ? `(${version})` : '';

            return {
                value: {
                    description: element.resultData['variantDescription'],
                    code: element.resultData['variantCode']
                },
                displayName: `${element.resultData['variantDescription']} ${versionString}`
            };
        });
    }

    return output;
};
