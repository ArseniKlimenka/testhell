module.exports = function mapping(input) {

    return {
        listName: input.listName,
        listDate: input.listDate,
        partyCodes: input.partyCodes,
        creationDate: input.creationDate,
        transitionResult: input.transitionResult,
        validations: input.validations,
        summary: input.summary,
        foundCodes: input.foundCodes,
        notFoundCodes: input.notFoundCodes,
        listNumber: input.listNumber
    };
};
