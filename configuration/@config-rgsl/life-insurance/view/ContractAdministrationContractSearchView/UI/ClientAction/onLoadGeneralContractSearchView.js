'use strict';

module.exports = async function onLoadGeneralContractSearchView(input, ambientProperties) {

    this.setSearchRequest({
        data: {
            criteria: {
                contractType: 'Policy'
            }
        }
    });

    this.setProtectedFields([
        'contractType'
    ]);

    input.context.productsArray = await getAvailableProducts(ambientProperties);
};

async function getAvailableProducts(ambientProperties) {

    let allProducts = [];
    const request = {
        method: 'POST',
        url: 'api/entity-infrastructure/shared/datasource/ProductsDataSource',
        data: {
            data: {
                criteria: {}
            }
        }
    };
    const result = await ambientProperties.services.api.call(request);
    allProducts = result.data.map(item => {
        return {
            productCode: item.resultData.productCode,
            productGroup: item.resultData.productGroup,
            productDescription: item.resultData.productDescription,
            productSalesSegment: item.resultData.salesSegment
        };
    });

    return allProducts;
}
