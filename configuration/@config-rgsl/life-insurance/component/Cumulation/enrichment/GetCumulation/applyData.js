'use strict';

module.exports = function mapping(input, result) {

    const body = this.businessContext.rootData;

    const cumulation = result?.cumulation;

    if (result?.errorResponse?.code) {

        throw `${result.errorResponse.message} ${result.errorResponse.additionalErrorData?.message}`;
    }

    if (!cumulation) {

        return;
    }

    const isLimitExceeded = cumulation.triggersGroup.some(tg => tg.isLimitExceeded);
    body.cumulation.isLimitExceeded = isLimitExceeded;
    body.cumulation.checkDateTime = cumulation.checkDateTime;
};
