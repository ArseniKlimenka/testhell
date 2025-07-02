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

    let spData = undefined;

    const result = await ambientProperties.services.api.call(spRequest);
    if (result && result.data && result.data.length > 0) {
        spData = result.data;
    }

    let result2 = undefined;

    if (spData && spData.length == 1) {
        result2 = spData[0].resultData;
    }

    return result2;
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

    let aaData = undefined;

    const result = await ambientProperties.services.api.call(aaRequest);
    if (result && result.data && result.data.length > 0) {
        aaData = result.data;
    }

    let result2 = undefined;

    if (aaData && aaData.length == 1) {
        result2 = aaData[0].resultData;
    }

    return result2;
}

async function getAgentTabNumber(ambientProperties, aaNumber) {

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GetAgentTabNumberDataSource',
        data: {
            data: {
                criteria: {
                    aaNumber: aaNumber
                },
            }
        }
    };

    const resultData = await ambientProperties.services.api.call(request);
    const result = resultData.data.map(_ => _.resultData)[0];

    return result;
}

module.exports = {
    getServiceProviderData,
    getAgentAgreementData,
    getAgentTabNumber,
};
