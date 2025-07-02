module.exports = function canUpload(input) {
    const body = input.context.Body;
    return body.itemCount > 0;
};
