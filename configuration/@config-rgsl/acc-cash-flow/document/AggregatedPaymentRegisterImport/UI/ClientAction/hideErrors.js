module.exports = function hideErrors(input) {
    const errors = input.context.Body.errors;
    return (!errors || errors.length == 0);
};
