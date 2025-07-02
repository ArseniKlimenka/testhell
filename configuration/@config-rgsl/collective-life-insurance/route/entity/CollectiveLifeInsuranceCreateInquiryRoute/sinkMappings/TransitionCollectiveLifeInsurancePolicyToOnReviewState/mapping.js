"use strict";

module.exports = function mapping(input) {

    const result = {
        businessNumber: input.number,
        transition: {
            transitionName: "InquiryCreating_To_OnReview"
        }
    };

    return result;
};
