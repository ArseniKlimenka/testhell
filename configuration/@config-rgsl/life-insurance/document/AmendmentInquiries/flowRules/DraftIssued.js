/**
 * @errorCode {errorCode} DraftCancelledTextOfanswer
 */
module.exports = function rule({ exclusiveAssignedUser, body, commonBody }) {

    if (!body.textOfAnswer) {

        return {
            errorCode: 'DraftCancelledTextOfanswer'
        };
    }

    return true;
};
