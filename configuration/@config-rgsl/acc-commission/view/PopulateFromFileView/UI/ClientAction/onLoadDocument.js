module.exports = function onLoadDocument(input, ambientProperties) {
    const customData = this.view.getCustomData();
    const body = input.context.Body;

    body.actId = customData.actId;
    body.actNo = customData.actNo;
    body.lastUpdated = customData.lastUpdated;
};
