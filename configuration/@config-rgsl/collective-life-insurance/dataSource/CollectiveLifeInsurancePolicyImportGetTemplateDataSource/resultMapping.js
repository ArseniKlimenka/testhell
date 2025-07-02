'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.file = {};
    output.file.fileId = input.FILE_ID;
    output.file.fileName = input.FILE_NAME;
    output.created = input.CREATED;
    output.createdBy = input.CREATED_BY;
    output.confirmed = input.CONFIRMED;
    output.confirmedBy = input.CONFIRMED_BY;

    return output;
};
