/**
 * @errorCode {errorCode} ErrorArrayNotEmpty
 */
module.exports = function rule({ exclusiveAssignedUser, body, commonBody }) {
    if (body.attachmentErrorArray && body.attachmentErrorArray.length > 0) {
        return {
            errorCode: 'ErrorArrayNotEmpty'
        };
    }
    return true;
};
