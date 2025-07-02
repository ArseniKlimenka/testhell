'use strict';

const { sinkErrorWriter } = require('@config-rgsl/life-insurance/lib/sinkErrorHelper');

module.exports = function mapping(errorLineInput) {

    const relatedUniVersDocConf = 'ProductConfiguration';
    const relatedUniMasterEntityConf = 'ContractEntity';

    const additionalParameters = {
        relatedUniVersDocConf,
        relatedUniMasterEntityConf
    };

    return {
        'BFX_IMPL.SINK_ERROR': sinkErrorWriter(errorLineInput, this, additionalParameters)
    };
};
