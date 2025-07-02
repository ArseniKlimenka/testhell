'use strict';

const { calculateTotalEndowmentAmount } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');
const { endowmentAmountToRequireApproval } = require('@config-rgsl/claim-base/lib/claimConsts');

/**
 * @errorCode {errorCode} RejectionMustBeEmpty
 * @errorCode {errorCode} RejectionNoteMustBeEmpty
 * @errorCode {errorCode} PaymentDoesntReuqireApproval
 */

module.exports = function rule(input) {

    const validationErrors = [];

    const totalAmount = calculateTotalEndowmentAmount(input.body);

    if (totalAmount.amountInRubCurrency <= endowmentAmountToRequireApproval) {

        validationErrors.push({
            errorCode: 'PaymentDoesntReuqireApproval'
        });
    }

    const rejectionReason = input.body.mainAttributes?.rejectionReason;

    if (rejectionReason) {

        validationErrors.push({
            errorCode: 'RejectionMustBeEmpty',
            errorDataPath: '/Body/mainAttributes/rejectionReason'
        });
    }

    const rejectionNote = input.body.mainAttributes?.rejectionNote;

    if (rejectionNote) {

        validationErrors.push({
            errorCode: 'RejectionNoteMustBeEmpty',
            errorDataPath: '/Body/mainAttributes/rejectionNote'
        });
    }

    return validationErrors;
};
