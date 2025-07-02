"use strict";

module.exports = function dataSourceInputMapping(input) {

    return {
        data: {
            criteria: {
                amendmentNumber: input.amendmentNumber
            }
        }
    };
};
