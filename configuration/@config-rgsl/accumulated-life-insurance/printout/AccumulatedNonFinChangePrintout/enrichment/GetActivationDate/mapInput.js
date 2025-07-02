'use strict';

module.exports = function mapping(input) {

    return {
        data: {
            criteria: {
                entityId: input.entityId
            }
        }
    };
};
