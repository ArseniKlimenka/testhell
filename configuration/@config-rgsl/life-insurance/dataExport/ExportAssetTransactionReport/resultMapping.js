'use strict';

const { translationUtils } = require('@adinsure/runtime');
const formatHelper = require('@config-rgsl/infrastructure/lib/FormatUtils');

module.exports = function resultMapping(input) {

    const result = input.data.map(item => {
        return {
            id_isin: item.resultData.id_isin || '',
            dealDate: formatHelper.formatDateTimeToString(item.resultData.dealDate) || '',

            contractNumber: item.resultData.contractNumber || '',
            assetUnitCount: item.resultData.assetUnitCount || '',
            state: translationUtils.getTranslation(
                `document/InvestmentLifeInsurancePolicy/1`,
                'states',
                null,
                item.resultData.state) || '',

            assetUnitPrice: item.resultData.assetUnitPrice || '',
            purchase: item.resultData.purchase || '',
            sale: item.resultData.sale || '',
        };
    });

    return result;

};
