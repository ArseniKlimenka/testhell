'use strict';

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { salesSegmentRoles } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function onLoadGeneralRequestSearchView(input, ambientProperties) {

    // init key params
    // createdOnFrom - technical param to be available to search without input visible params
    const viewContext = input.context.viewContext;
    const criteria = {
        createdOnFrom: dateTimeUtils.formatDate('1900-01-01')
    };
    const searchRequest = { data: { criteria: criteria } };
    const protectedFields = ['createdOnFrom'];

    // set products array
    const productsArray = await getAvailableProducts(this, ambientProperties);
    input.context.productsArray = productsArray;
    const productsCodesArray = productsArray.map(item => item.productCode);
    protectedFields.push('productsArray');

    await finishLoad(this, searchRequest, protectedFields);
};

// help functions
async function getAvailableProducts(self, ambientProperties) {

    // get all products
    const request = {
        method: 'POST',
        url: 'api/entity-infrastructure/shared/datasource/ProductsDataSource',
        data: {
            data: {
                criteria: {}
            }
        }
    };

    let result;
    try {
        self.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        self.view.stopBlockingUI();
    }

    const allProducts = result.data.map(item => {
        return {
            productCode: item.resultData.productCode,
            productGroup: item.resultData.productGroup,
            productDescription: item.resultData.productDescription,
            productSalesSegment: item.resultData.salesSegment
        };
    });

    // filter available for user products
    const availableSalesSegments = [];
    const availableProductGroups = [];
    const userRoles = ambientProperties.applicationContext.currentUser().getUserRoles();
    userRoles
        .forEach(role => Object.keys(salesSegmentRoles)
            .forEach(segment => Object.keys(salesSegmentRoles[segment])
                .forEach(group => {
                    if (salesSegmentRoles[segment][group].includes(role.ApplicationRoleCodeName)) {
                        availableSalesSegments.push(segment);
                        availableProductGroups.push(group);
                    }
                })));

    const availableProducts = allProducts.filter(item =>
        availableProductGroups.includes(item.productGroup) &&
        availableSalesSegments.includes(item.productSalesSegment)
    );

    return availableProducts;
}

async function finishLoad(that, searchRequest, protectedFields) {
    that.setSearchRequest(searchRequest);
    that.setProtectedFields(protectedFields);
    // that.search();
}
