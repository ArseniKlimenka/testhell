/**
 * @errorCode {errorCode} DraftCancelledOnlyCreator
 * @errorCode {errorCode} DraftCancelledTextOfCommentRequired
 */
module.exports = function rule({ exclusiveAssignedUser, body, commonBody }) {

    if (body.creatorUserName !== this.applicationContext.originatingUser.username) {

        return {
            errorCode: 'DraftCancelledOnlyCreator'
        };
    }

    if (!body.textOfComment) {

        return {
            errorCode: 'DraftCancelledTextOfCommentRequired'
        };
    }

    return true;
};
