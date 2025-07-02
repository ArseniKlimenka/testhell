
'use strict';

const { preEquityMinShare } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

/**
* @errorCode {errorCode} shareLessMin
*/
module.exports = function validateEquityStrategy(input, ambientProperties) {

    const validationErrors = [];

    const share = input.share;

    if (share < preEquityMinShare.value) {
        validationErrors.push({
            errorCode: "shareLessMin",
            errorDataPath: '/share',
            reference: {
                entity: {
                    preEquityMinShareText: preEquityMinShare.text
                }
            }
        });
    }

    return validationErrors;

};
