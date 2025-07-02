'use strict';

const { actor, contractType } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showOriginalReceiptDate(input, ambientProperties) {
    const currentActor = ambientProperties?.currentWorkUnitActor;
    const currentContractType = input?.context?.Dimensions?.contractType;

    // Не убирать, закомментировано для временного скрытия функционала
    // if (currentContractType === contractType.Policy && currentActor === actor.Operations) {
    //     return true;
    // }

    return false;
};
