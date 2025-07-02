'use strict';

const { universalMasterEntity } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input, sinkExchange) {

    const universalMasterEntityCode = input.universalMasterEntityCode;

    if (universalMasterEntityCode) {

        return {
            destinations: [
                {
                    entityType: universalMasterEntity.Entity.UniversalMasterEntity,
                    identifier: universalMasterEntityCode
                }
            ]
        };
    }
};
