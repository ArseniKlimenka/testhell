module.exports = function resultMapping(input) {

    const output = {};

    output.id = input.ID;
    output.itemText = input.TEXT;
    output.itemNumber = input.ITEM_NUMBER;

    return output;
};
