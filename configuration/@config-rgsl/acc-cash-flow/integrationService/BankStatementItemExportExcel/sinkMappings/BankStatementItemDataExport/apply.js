module.exports = function (result, sinkInput, sinkExchange) {
    // map the created file id and the related package id
    sinkExchange.mapContext("fileId", result.fileId);
};
