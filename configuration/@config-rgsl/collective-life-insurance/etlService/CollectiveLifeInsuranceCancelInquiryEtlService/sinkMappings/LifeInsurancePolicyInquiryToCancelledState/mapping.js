"use strict";

module.exports = function mapping(input) {

    const result = {
        businessNumber: input.inquiryNumber,
        transition: {
            transitionName: "DraftCancelled"
        }
    };

    return result;
};
