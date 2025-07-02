module.exports = function (input) {

    const updatedDocument = Object.assign({}, input);

    return { body: updatedDocument };
};
