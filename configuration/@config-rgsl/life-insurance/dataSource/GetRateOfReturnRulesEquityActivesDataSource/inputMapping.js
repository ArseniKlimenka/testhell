'use strict';

module.exports = function (input) {

    const criteria = input?.data?.criteria;

    if (!criteria) {
        throw "Input criteria was not defined!";
    }

    const output = {
        parameters: {
            ...criteria,
        }
    };

    output.sort = {
        EXCEL_ROW_NUMBER: 'asc'
    };

    return output;
};
