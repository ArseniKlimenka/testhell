/**
 * @errorCode {errorCode} OnReview_to_InfoRequest_EmptyCommentOperations
 */

module.exports = function rule(input) {

    const currentUsername = this.applicationContext.originatingUser.username;
    const lastCommenterUsername = input.body?.technicalInformation?.lastCommenterUsername;
    const lastCommentId = input.body?.technicalInformation?.lastCommentId;
    const lastCommentIdTransition = input.commonBody?.transitionResult?.attributes?.lastCommentId ?? -1;

    if (!(lastCommenterUsername == currentUsername && lastCommentId > lastCommentIdTransition)) {
        return {
            errorCode: 'OnReview_to_InfoRequest_EmptyCommentOperations'
        };
    }

    return true;

};
