/**
 * @errorCode {errorCode} ErrorArrayEmpty
 */
module.exports = function rule({ exclusiveAssignedUser, body, commonBody }) {
    if (body.attachmentErrorArray == undefined || (body.attachmentErrorArray && body.attachmentErrorArray.length == 0)) {
        return {
            errorCode: 'ErrorArrayEmpty'
        };
    }
    return true;
};
