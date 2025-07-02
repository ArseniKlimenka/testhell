"use strict";

module.exports = function mapping(input) {

    const result = {
        businessNumber: input.number,
        transition: {
            transitionName: "InquiryCancelling_To_Draft"
        }
    };

    return result;
};
