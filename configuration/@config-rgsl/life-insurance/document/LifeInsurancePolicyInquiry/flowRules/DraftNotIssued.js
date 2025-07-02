/**
 * @errorCode {errorCode} DraftCancelledTextOfanswer
 */
module.exports = function rule({ exclusiveAssignedUser, body, commonBody }) {

    if (!body.inquiry.textOfAnswer) {
        return {
            errorCode: 'DraftCancelledTextOfanswer'
        };
    }

    return true;
};
