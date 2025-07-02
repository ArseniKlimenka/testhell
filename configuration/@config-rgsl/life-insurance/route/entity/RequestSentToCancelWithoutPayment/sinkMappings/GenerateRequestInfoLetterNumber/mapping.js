'use strict';

const { LocalDate } = require('@js-joda/core');
const {
    documentConfiguration
} = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

module.exports = function mappingFunction(input, sinkExchange) {

    if (input.entityType != documentConfiguration.UniversalDocument ||
        input.dimensions.universalDocumentType != documentConfiguration.UniversalDocumentTypeValue ||
        sinkExchange.productCode != 'CACB') {
        return;
    }

    const thisYear = LocalDate.now().year();

    return {
        sequenceName: `CLM_IMPL.REQUEST_INFO_LETTER_NUMBER.${thisYear}`
    };

};
