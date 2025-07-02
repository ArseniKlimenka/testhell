const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

module.exports = function mapping(initialDocument) {

    const updatedDocument = Object.assign({}, initialDocument);

    // Modify initial amendment data here.

    return { body: updatedDocument };
};
