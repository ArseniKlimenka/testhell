/**
 * @errorCode {errorCode} DraftCancelledOnlyCreator
 * @errorCode {errorCode} DraftCancelledTextOfComment
 */
module.exports = function rule({ exclusiveAssignedUser, body, commonBody }) {

    if (body.creatorUserName !== this.applicationContext.originatingUser.username) {

        return {
            errorCode: 'DraftCancelledOnlyCreator'
        };
    }

    if (!body.textOfComment) {

        return {
            errorCode: 'DraftCancelledTextOfComment'
        };
    }

    return true;
};
