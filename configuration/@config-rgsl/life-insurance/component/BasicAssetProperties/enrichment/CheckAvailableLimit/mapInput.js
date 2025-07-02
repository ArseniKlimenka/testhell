'use strict';

module.exports = function mapInput(input) {

    const asset = input.assetProperties[0]?.asset;
    if (!asset) {

        return;
    }

    if (!asset.idIsin) {

        return;
    }

    return {
        data: {
            criteria: {
                isin: asset.idIsin,
                excludeContractNumber: this.businessContext.documentNumber
            }
        }
    };

};
