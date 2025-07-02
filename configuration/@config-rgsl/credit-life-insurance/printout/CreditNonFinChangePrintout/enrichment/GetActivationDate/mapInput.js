'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(input) {

    return {
        data: {
            criteria: {
                entityId: input.entityId
            }
        }
    };
};
