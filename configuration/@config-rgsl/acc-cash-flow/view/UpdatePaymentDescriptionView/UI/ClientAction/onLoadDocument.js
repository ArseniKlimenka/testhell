module.exports = function onLoadDocument(input) {
    input.context.Body.paymentDescription = input.rootContext.selection[0].resultData.description;
};
