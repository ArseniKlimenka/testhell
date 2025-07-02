module.exports = function (input) {
    if (!input?.data?.criteria) {
        throw 'Input criteria was not defined!';
    }

    const attachmentIdsArray = input.data.criteria.attachmentIds ?? [];
    const attachmentIds = attachmentIdsArray.join(',');

    const searchRequest = {
        parameters: {
            attachmentIds: attachmentIds
        }
    };

    return searchRequest;
};
