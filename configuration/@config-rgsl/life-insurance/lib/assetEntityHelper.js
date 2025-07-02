const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

async function createEntity(input, ambientProperties, self) {

    const body = input.context.Body;

    if (body.entityCode) {
        return;
    }

    const entityCreationRequest = {
        method: 'post',
        url: 'api/core/universal-master-entities/AssetEntity',
        data: {
            data: {}
        }
    };

    try {
        self.view.startBlockingUI();
        body.entityCode = parseInt((await ambientProperties.services.api.call(entityCreationRequest)).Code);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        self.view.stopBlockingUI();
    }
}

async function getEntity(assetNumber, ambientProperties) {

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/AssetEntityDataSource',
        data: {
            data: {
                criteria: {
                    assetNumber: assetNumber
                }
            }
        }
    };

    const result = await ambientProperties.services.api.call(request);
    if (result?.data?.length > 0) {
        return result?.data[0]?.resultData?.assetEntityNumber;
    }

    return;
}

function setRequest(input) {
    return {
        data: {
            criteria: {
                productCode: input.additionalContext?.productCode,
                insuranceTerms: input?.rootContext?.Body?.basicConditions?.insuranceTerms
            }
        }
    };
}

function setEntityCode(input) {
    return input.context?.Body?.entityCode
    ?? input.context?.Body?.basicAssetProperties?.assetProperties[0]?.asset?.assetEntityNumber;
}

module.exports = {
    createEntity, getEntity, setRequest, setEntityCode
};
