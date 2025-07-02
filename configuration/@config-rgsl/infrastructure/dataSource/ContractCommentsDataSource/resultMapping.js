module.exports = function resultMapping(dataProviderOutput) {

    const output = {};

    if (dataProviderOutput && dataProviderOutput.length > 0 && dataProviderOutput[0].COMMENTS && dataProviderOutput[0].COMMENTS.length > 0) {
        output.comments = dataProviderOutput[0].COMMENTS;
    }

    return output;

};
