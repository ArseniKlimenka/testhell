'use strict';

module.exports = function onLoad(input, ambientProperties) {

    this.view.setSearchRequest({
        data: {
            criteria: {
                contractNumber: input.context.request.data.criteria.contractNumber
            }
        }
    });
};
