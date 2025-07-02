/**
 * @errorCode {errorCode} DraftCancelledOnlyCreator
 * @errorCode {errorCode} DraftCancelledTextOfComment
 */
module.exports = function rule({ exclusiveAssignedUser, body, commonBody }) {

    if (body.inquiry.creatorUserName !== this.applicationContext.originatingUser.username) {
        return {
            errorCode: 'DraftCancelledOnlyCreator'
        };
    }

    if (!body.inquiry.textOfComment) {
        return {
            errorCode: 'DraftCancelledTextOfComment'
        };
    }

    return true;
};
