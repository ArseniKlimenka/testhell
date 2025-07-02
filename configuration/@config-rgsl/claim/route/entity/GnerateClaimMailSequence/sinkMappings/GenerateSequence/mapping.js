'use strict';

const {LocalDate} = require('@js-joda/core');
const { printoutConsts } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function mappingFunction(sinkInput, sinkExchange) {


    const currentYear = LocalDate.now().year();

    return {
        sequenceName: `${printoutConsts.cliamMailPrefix}.${currentYear}`
    };
};
