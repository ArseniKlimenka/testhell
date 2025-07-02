const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    return {
        rsdNumber: input.RSD_NUMBER,
        rsdAmount: input.RSD_AMOUNT,
        stateCode: input.STATE_CODE,
        stateDescription: translationUtils.getTranslation('document/RSD/1', 'states', null, input.STATE_CODE),
        stateChangedOn: input.STATE_CHANGED_ON,
        stateChangedBy: input.STATE_CHANGED_BY,
        createdDate: input.CREATED_DATE,
    };
};
