'use strict';

module.exports = function (input) {
    return {
        data: {
            criteria: {
                productGroups: input.data.criteria.productGroups
            }
        }
    };
};
