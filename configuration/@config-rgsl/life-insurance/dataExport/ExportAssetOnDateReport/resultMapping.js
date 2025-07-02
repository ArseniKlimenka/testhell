'use strict';

const formatHelper = require('@config-rgsl/infrastructure/lib/FormatUtils');

module.exports = function resultMapping(input) {

    const result = input.data.map(item => {
        return {
            id_isin: item.resultData.id_isin || '',
            reportDate: formatHelper.formatDateTimeToString(item.resultData.reportDate) || '',
            assetSize: item.resultData.assetSize || 0,
            issuedCount: item.resultData.issuedCount || 0,
            reservedForActivatedAssetUnitsCount: item.resultData.reservedForActivatedAssetUnitsCount || 0,
            contractsInCooloffAssetUnitsCount: item.resultData.contractsInCooloffAssetUnitsCount || 0,
            contractsNotInCooloffAssetUnitsCount: item.resultData.contractsNotInCooloffAssetUnitsCount || 0,
            availableForSale: item.resultData.availableForSale ?? 0
        };
    });

    return result;

};
