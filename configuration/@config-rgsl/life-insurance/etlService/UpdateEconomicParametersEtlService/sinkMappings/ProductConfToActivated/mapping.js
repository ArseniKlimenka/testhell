'use strict';

module.exports = function mapping(lineInput, sinkExchange) {

    if (!lineInput.productConfigurationNumber) {
        return;
    }

    return {
        businessNumber: lineInput.productConfigurationNumber,
        transition: {
            configurationName: 'ProductConfiguration',
            transitionName: 'Updating_to_Activated',
        }
    };
};
