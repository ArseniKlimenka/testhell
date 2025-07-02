const { businessClock, translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const output = {};

    output.transition = input.TRANSITION ? input.TRANSITION : '';
    output.changedByUser = input.CHANGED_BY_USER ? input.CHANGED_BY_USER : '';

    // Format the date-time specifying when a state was entered
    output.validFrom = input.CHANGED_ON
        ? businessClock.convertFromBusinessTimeToUTC(input.CHANGED_ON)
        : '';

    output.stateCode = input.NEW_STATE;
    output.state = input.NEW_STATE
        ? translationUtils.getTranslation(`document/${input.CODE_NAME}/1`, 'states', null, input.NEW_STATE)
        : '';

    output.changedByUserId = input.CHANGED_BY_USER_ID;

    return output;
};
