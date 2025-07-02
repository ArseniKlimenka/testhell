'use static';

module.exports = function mapping(input) {

    return {
        businessNumber: input.number,
        transition: {
            configurationName: input.configurationCodeName,
            transitionName: "ChangeUnderwritingGroup_to_OnReview",
            skipIfNotAvailable: false
        }
    };
};
