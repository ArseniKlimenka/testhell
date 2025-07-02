module.exports = function mapInput(quote) {

    const quoteNumber = this.businessContext.documentNumber ? this.businessContext.documentNumber :
        (quote.Number ? quote.Number : undefined);

    return {
        data: {
            criteria: {
                quoteNumber
            }
        }
    };

};
