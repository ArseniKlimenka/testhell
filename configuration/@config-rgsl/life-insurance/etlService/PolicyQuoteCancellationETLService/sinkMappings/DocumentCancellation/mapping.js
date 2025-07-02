'use strict';

module.exports = function mapping(sinkInput) {

    return {
        businessNumber: sinkInput.contractNumber,
        transition: {
            configurationName: sinkInput.configurationName,
            transitionName: `${sinkInput.state}_to_Cancelled`,
            skipIfNotAvailable: true
        }
    };
};
