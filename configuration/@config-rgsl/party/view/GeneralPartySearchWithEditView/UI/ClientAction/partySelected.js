const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function partySelected(input) {
    // map selected party to the lookup selection to enable select button

    const isLookup = getValue(input, 'context.viewContext.isLookup');

    if (isLookup)
    { input.data.selection = input.actionData.selection.selected(); }

};
