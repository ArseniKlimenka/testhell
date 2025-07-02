'use strict';

module.exports = function mapping(initialDocument) {

    const updatedDocument = Object.assign({}, initialDocument);
    // Modify initial correction data here.

    return { body: updatedDocument };
};
