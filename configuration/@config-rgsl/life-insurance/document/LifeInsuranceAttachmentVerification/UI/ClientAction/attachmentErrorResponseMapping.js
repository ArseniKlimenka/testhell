module.exports = function attachmentErrorResponseMapping (input) {
    let output = [];
    const attachmentErrorArray = input.context.attachmentErrorArray;
    if (input.searchText || attachmentErrorArray == undefined) {
        if (input && input.response && input.response.data && input.response.data && input.response.data.length > 0) {
            output = _.map(input.response.data, (elem) => {
                return elem.resultData;
            });
        }
    }
    else {
        output.push(attachmentErrorArray);
    }
    return output;
};
