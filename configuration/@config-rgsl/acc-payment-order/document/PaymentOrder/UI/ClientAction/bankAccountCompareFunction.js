'use strict';

module.exports = function bankAccountCompareFunction(input) {

    if (input.item1 && input.item2) {

        return input.item1 === input.item2;
    }

    return false;
};
