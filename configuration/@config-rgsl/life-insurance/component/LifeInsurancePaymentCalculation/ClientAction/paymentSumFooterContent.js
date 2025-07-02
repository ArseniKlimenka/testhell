module.exports = function paymentSumFooterContent(input) {
    const paymentLines = input.data.paymentLines;

    const [did, buyer, tax] = ['DID', 'Buyer', 'Tax']
        .map(type => paymentLines.find(paymentLine => paymentLine.paymentLineType === type)?.paymentLineSum);

    return {
        totalSum: did + buyer - tax
    };
};
