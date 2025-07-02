'use strict';

const { businessClock, translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const output = {};

    output.contractNumber = input.CONTRACT_NUMBER ? input.CONTRACT_NUMBER : '';
    output.holderName = input.HOLDER_NAME ? input.HOLDER_NAME : '';
    output.stateCode = input.NEW_STATE;
    output.state = input.NEW_STATE
        ? translationUtils.getTranslation(`document/${input.CONTRACT_CODE_NAME}/1`, 'states', null, input.NEW_STATE)
        : '';
    output.transitionCode = input.TRANSITION;
    output.transition = input.TRANSITION
        ? translationUtils.getTranslation(`document/${input.CONTRACT_CODE_NAME}/1`, 'transitions', null, input.TRANSITION)
        : '';
    output.changedOn = input.CHANGED_ON ? businessClock.convertFromBusinessTimeToUTC(input.CHANGED_ON) : '';

    return output;

};
