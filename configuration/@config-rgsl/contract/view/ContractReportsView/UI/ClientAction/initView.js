'use strict';

const { setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { noteProducts } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function initView(input, ambientProperties) {

    await getNoteProducts(input, ambientProperties, this);
    await getAllProducts(input, ambientProperties, this);
};

async function getNoteProducts(input, ambientProperties, self) {

    const request = {
        method: 'POST',
        url: 'api/entity-infrastructure/shared/datasource/ProductsDataSource',
        data: {
            data: {
                criteria: {
                    codes: noteProducts
                }
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

    const insuranceProducts = result.data.map(x => ({
        productCode: x.resultData.productCode,
        productDescription: x.resultData.productDescription
    }));

    setValue(input, 'context.Body.insuranceProducts', insuranceProducts);
}

async function getAllProducts(input, ambientProperties, self) {

    const request = {
        method: 'POST',
        url: 'api/entity-infrastructure/shared/datasource/ProductsDataSource',
        data: {
            data: {
                criteria: {

                }
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

    const insuranceProducts = result.data.map(x => ({
        productCode: x.resultData.productCode,
        productDescription: `${x.resultData.productDescription} (${x.resultData.productCode})`
    }));

    setValue(input, 'context.Body.allInsuranceProducts', insuranceProducts);
}
