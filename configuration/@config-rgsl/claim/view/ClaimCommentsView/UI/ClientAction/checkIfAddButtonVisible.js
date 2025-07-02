module.exports = function checkIfAddButtonVisible(input, ambientProperties) {

    const number = input.context.Number;
    const allowComments = input.context.AllowComments;

    if (number && allowComments == true)
    { return true; }
    return false;

};
