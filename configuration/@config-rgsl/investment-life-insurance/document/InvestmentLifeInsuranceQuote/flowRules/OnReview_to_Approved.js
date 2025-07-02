const { canGenerateNotePolicyNumberService } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

/**
 * @errorCode {errorCode} OnReview_to_Approved_ShouldHaveFutureContractNumber
 */

module.exports = function rule({ exclusiveAssignedUser, body, commonBody }) {

    const input = {};
    input.context = {};
    input.context.Body = body;
    if (canGenerateNotePolicyNumberService(input, this)) {
        return {
            errorCode: 'OnReview_to_Approved_ShouldHaveFutureContractNumber'
        };
    }

    return true;
};
