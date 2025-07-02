'use strict';

const formatHelper = require('@config-rgsl/infrastructure/lib/FormatUtils');

module.exports = function resultMapping(input) {

    const result = input.data.map(item => {
        return {
            id_isin: item.resultData.id_isin || '',
            originalDocumentNumber: item.resultData.originalDocumentNumber || '',

            issuedCountBeginDate: item.resultData.issuedCountBeginDate || 0,
            issuedCountChange: item.resultData.issuedCountChange || 0,
            issuedCountEndDate: item.resultData.issuedCountEndDate || 0,

            reservedForActivatedAssetUnitsCountBeginDate: item.resultData.reservedForActivatedAssetUnitsCountBeginDate || 0,
            reservedForActivatedAssetUnitsCountChange: item.resultData.reservedForActivatedAssetUnitsCountChange || 0,
            reservedForActivatedAssetUnitsCountEndDate: item.resultData.reservedForActivatedAssetUnitsCountEndDate || 0,

            contractsInCooloffAssetUnitsCountBeginDate: item.resultData.contractsInCooloffAssetUnitsCountBeginDate || 0,
            contractsInCooloffAssetUnitsCountChange: item.resultData.contractsInCooloffAssetUnitsCountChange || 0,
            contractsInCooloffAssetUnitsCountEndDate: item.resultData.contractsInCooloffAssetUnitsCountEndDate || 0,

            contractsNotInCooloffAssetUnitsCountBeginDate: item.resultData.contractsNotInCooloffAssetUnitsCountBeginDate || 0,
            contractsNotInCooloffAssetUnitsCountChange: item.resultData.contractsNotInCooloffAssetUnitsCountChange || 0,
            contractsNotInCooloffAssetUnitsCountEndDate: item.resultData.contractsNotInCooloffAssetUnitsCountEndDate || 0,

            beginDate: formatHelper.formatDateTimeToString(item.resultData.beginDate) || '',
            endDate: formatHelper.formatDateTimeToString(item.resultData.endDate) || ''
        };
    });

    return result;

};
