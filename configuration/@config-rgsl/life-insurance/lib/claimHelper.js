'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

async function getSelectedRiskOnClaims (that, contractNumber, ambientProperties) {
    let data = [];

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GetClaimSelectedRiskDataSource',
        data: {
            data: {
                criteria: {
                    contractNumber: contractNumber
                }
            }
        }
    };

    let result;
    try {
        that?.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        that?.view.stopBlockingUI();
    }

    if (result && result.data) {

        data = result.data;
    }

    return data;
}

module.exports = {
    getSelectedRiskOnClaims
};
