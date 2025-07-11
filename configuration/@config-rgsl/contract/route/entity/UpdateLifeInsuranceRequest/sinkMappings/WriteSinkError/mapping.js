'use strict';

const { sinkErrorWriter } = require('@config-rgsl/life-insurance/lib/sinkErrorHelper');

module.exports = function mapping(errorLineInput) {

    const relatedUniDocConf = 'LifeInsuranceRequest';

    const additionalParameters = {
        relatedUniDocConf
    };

    return {
        'BFX_IMPL.SINK_ERROR': sinkErrorWriter(errorLineInput, this, additionalParameters)
    };
};
