module.exports = function mapping(input) {

    return {
        quoteNumber: input.inquiry.quoteNumber,
        holder: input.inquiry.holder,
        configurationCodeName: input.inquiry.configurationCodeName,
    };

};
