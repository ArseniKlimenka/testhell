module.exports = function onLoadDocument(input, ambientProperties) {
    const customData = this.view.getCustomData();
    const body = input.context.Body;

    body.rsdNumber = customData.rsdNumber;
};
