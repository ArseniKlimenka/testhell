const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

function getIgnoreValidationsFlag(ambientProperties) {
    const flag = ambientProperties.services.navigation.getCurrentUrlEntityData().parametersData.parameters.ignoreValidations;

    if (flag)
    {
        const result = parseInt(flag) !== 0;
        return result;
    }
}

async function raiseActItemsChangedEvent(ambientProperties) {
    const eventArgs = {
        sender: {
            elementId: 'actItemsChanged'
        }
    };

    await ambientProperties.services.util.raiseEvent('ACT_ITEMS_CHANGED', eventArgs);
}

async function getServiceProviderData(ambientProperties, agentCode) {
    const spRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/ServiceProviderDataSource',
        data: {
            data: {
                criteria: {
                    serviceProviderCode: agentCode,
                }
            }
        }
    };

    let result;
    try {
        result = await ambientProperties.services.api.call(spRequest);
    }
    catch (err) {
        throwResponseError(err);
    }

    if (result?.data && result.data.length === 1) {
        return result.data[0].resultData;
    }
}

async function getAgentAgreementData(ambientProperties, agentCode) {
    const aaRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/AADocumentSearchDataSource',
        data: {
            data: {
                criteria: {
                    agentServiceProviderCode: agentCode,
                }
            }
        }
    };

    let result;
    try {
        result = await ambientProperties.services.api.call(aaRequest);
    }
    catch (err) {
        throwResponseError(err);
    }

    if (result?.data && result.data.length === 1) {
        return result.data[0].resultData;
    }
}

function getActIncludedProducts(productsData, allProducts) {
    let includedProducts;
    if (productsData.productGroupInclude || (productsData.includedProducts?.length ?? 0 > 0)) {
        let products = productsData.includedProducts;
        if (!products) {
            products = allProducts.filter(_ => _.productGroup === productsData.productGroupInclude).map(_ => _.productCode);
        }
        if (productsData.excludedProducts) {
            products = products.filter(_ => !productsData.excludedProducts.includes(_));
        }

        includedProducts = products;
    } else if (productsData.productGroupExclude || (productsData.excludedProducts?.length ?? 0 > 0)) {
        let products = productsData.excludedProducts;
        if (!products) {
            products = allProducts.filter(_ => _.productGroup === productsData.productGroupExclude).map(_ => _.productCode);
        }

        includedProducts = allProducts.filter(_ => !products.includes(_.productCode)).map(_ => _.productCode);
    } else {
        includedProducts = allProducts.map(_ => _.productCode);
    }
    return includedProducts;
}

async function getCalcAmounts(ambientProperties, actNo) {

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/CommissionActCalcInfoDataSource',
        data: {
            data: {
                criteria: {
                    actNo,
                },
            }
        }
    };

    const resultData = await ambientProperties.services.api.call(request);
    const result = resultData.data.map(_ => _.resultData);

    return result[0];
}

module.exports = {
    getIgnoreValidationsFlag,
    raiseActItemsChangedEvent,
    getServiceProviderData,
    getAgentAgreementData,
    getActIncludedProducts,
    getCalcAmounts,
};
