module.exports = function resultMapping(input) {

    const output = {};

    output.itemNumber = input.ITEM_NUMBER;
    output.itemTextID = input.ITEM_TEXT_ID;
    output.itemText = input.ITEM_TEXT;
    output.departament = input.DEPARTAMENT;

    return output;
};
