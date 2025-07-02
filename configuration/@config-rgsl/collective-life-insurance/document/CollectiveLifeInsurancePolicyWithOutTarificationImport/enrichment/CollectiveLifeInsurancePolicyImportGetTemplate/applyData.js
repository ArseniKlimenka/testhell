module.exports = function mapping(input, dataSource) {

    if (dataSource.data.length > 0) {
        input.template = dataSource.data[0].resultData.file;
    }
};
