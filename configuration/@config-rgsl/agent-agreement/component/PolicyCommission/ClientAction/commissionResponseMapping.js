'use strict';

module.exports = function commissionResponseMapping(input) {

    let output = [];

    if (input.response?.data?.length > 0) {
        output = input.response.data
            .map(elem => elem.resultData)
            .map(elem => {
                elem.manualRuleDescription = `${elem.manualRule} ${elem.manualRuleDescription}`;
                return elem;
            });
    }

    return output;
};
