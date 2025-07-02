module.exports = function mapping(input) {
    const documentNumbers = input.contractNumbers ?? [];

    if (input.contractNumber) {
        documentNumbers.push(input.contractNumber);
    }
    return {
        documentNumbers,
    };
};
