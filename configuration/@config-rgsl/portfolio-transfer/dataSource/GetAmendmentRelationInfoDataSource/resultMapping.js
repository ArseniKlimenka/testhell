'use strict';


module.exports = function resultMapping(input) {

    return {
        mainStateCode: input.MAIN_STATE_CODE,
        amendmentStateCode: input.AMENDMENT_STATE_CODE,
        mainConfigurationName: input.MAIN_CONFIGURATION_NAME,
        amendmentConfigurationName: input.AMENDMENT_CONFIGURATION_NAME,
        relationName: input.RELATION_NAME,
    };
};
