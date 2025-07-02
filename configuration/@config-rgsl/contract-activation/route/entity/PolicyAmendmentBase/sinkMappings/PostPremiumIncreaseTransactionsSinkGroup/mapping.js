module.exports = function mapping(input) {

    return {
        contractNumbers: [input.originalDocumentNumber],
        postingDescription: 'Policy amendment is activated',
        premiumEvent: input.dimensions.premiumEvent,
    };

};
