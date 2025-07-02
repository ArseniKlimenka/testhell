'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function productRequestMapping(input, ambientProperties) {

    return {
        data: {
            criteria: {
                partnerBusinessCode: input.data?.partner?.partnerBusinessCode
            }
        }
    };
};
