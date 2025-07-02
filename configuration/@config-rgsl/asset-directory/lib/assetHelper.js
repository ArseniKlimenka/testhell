'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

const documentNumberRegExp = /(.*?)(?=\/)|(.*)/gm;

const assetStates = {
    draft: "Draft",
    open: "Open",
    closed: "Closed",
    cancelled: "Cancelled"
};

const assetAmendmentStates = {
    draft: "Draft",
    activated: "Activated",
    annuled: "Annulled"
};

const finalStates = [
    assetStates.cancelled,
    assetStates.closed,
    assetStates.open,
    assetAmendmentStates.activated,
    assetAmendmentStates.annuled
];

function isStateFinal(state) {

    return finalStates.includes(state);
}

const assetDocumentConfigirations = {
    Asset: 'Asset',
    AssetChangeAmendment: 'AssetChangeAmendment'
};

const assetActors = {
    AssetEditor: 'AssetEditor',
    AssetViewer: 'AssetViewer'
};

async function getAssetReservedSizeData(idIsin, ambientProperties, documentNumber) {

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/AssetLimitDataSource',
        data: {
            data: {
                criteria: {
                    isin: idIsin
                }
            }
        }
    };

    if (documentNumber) {
        request.data.data.criteria.contractNumber = documentNumber;
    }

    const resultData = await ambientProperties.services.api.call(request);
    return resultData.data.amount;
}

async function getAssetConditionsData(idIsin, ambientProperties, productCode) {

    const conditionsRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/AssetConditionsDataSource',
        data: {
            data: {
                criteria: {
                    idIsin: idIsin
                }
            }
        }
    };
    if (productCode) {
        conditionsRequest.productCode = productCode;
    }
    const conditionsResultData = await ambientProperties.services.api.call(conditionsRequest);
    return conditionsResultData?.data?.map(_ => _?.resultData);
}

async function getDuplicatesInformation(input, ambientProperties, self) {

    const body = input.context.Body;
    const idIsin = body.mainInformation?.idIsin;

    const duplicatesRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/AssetDataSource',
        data: {
            data: {
                criteria: {
                    idIsin: idIsin
                }
            }
        }
    };

    let duplicates;
    try {
        self.view.startBlockingUI();
        duplicates = await ambientProperties.services.api.call(duplicatesRequest);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        self.view.stopBlockingUI();
    }

    duplicates = duplicates.data.map(x => x.resultData);

    if (duplicates.filter(x => x.number !== input.context?.Number).length > 0) {

        input.context.Body.isDuplicate = true;
    }
    else {

        input.context.Body.isDuplicate = false;
    }
}


module.exports = {
    documentNumberRegExp,
    isStateFinal,
    assetStates,
    assetAmendmentStates,
    finalStates,
    assetDocumentConfigirations,
    getAssetReservedSizeData,
    getAssetConditionsData,
    assetActors,
    getDuplicatesInformation
};
