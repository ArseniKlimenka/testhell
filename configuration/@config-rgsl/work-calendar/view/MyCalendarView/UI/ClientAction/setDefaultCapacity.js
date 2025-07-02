'use strict';

module.exports = function setDefaultCapacity(input) {

    const { data } = input;

    if (!data) {
        return;
    }

    if (data.isWork) {
        // set default capacity to be 1 day for working days
        data.capacity = 8;
    }
    else {
        // reset capacity
        data.capacity = undefined;
    }
};
