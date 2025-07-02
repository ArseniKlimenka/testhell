module.exports = function enableDocumentNumbers(input) {

    if (input.rootContext.Number) {

        return true;
    }

    return false;
};
