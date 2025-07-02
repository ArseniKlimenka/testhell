const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} OnReview_to_InfoRequest_EmptyCommentOperations
 */

module.exports = function rule(input) {

    const currentUsername = this.applicationContext.originatingUser.username;
    const lastCommenterUsername = getValue(input, 'body.technicalInformation.lastCommenterUsername');
    const lastCommentId = getValue(input, 'body.technicalInformation.lastCommentId');
    const lastCommentIdTransition = getValue(input, 'commonBody.transitionResult.attributes.lastCommentId', -1);

    if (!(lastCommenterUsername == currentUsername && lastCommentId > lastCommentIdTransition)) {
        return {
            errorCode: 'OnReview_to_InfoRequest_EmptyCommentOperations'
        };
    }

    return true;

};
