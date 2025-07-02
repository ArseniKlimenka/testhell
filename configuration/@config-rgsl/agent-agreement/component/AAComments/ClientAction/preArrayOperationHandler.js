'use strict';

/**
 * @translationKey {translationKey} CommentCannotBeEmpty, CommentLengthTooLong
 *
 */
module.exports = async function preArrayOperationHandler(input, ambientProperties) {

    const { affectedRow, operationType } = input;

    if ((operationType === 'Edit' || operationType === 'Add')) {

        if (isNullOrWhitespace(affectedRow.comment)) {

            return await ambientProperties.services.confirmationDialog
                .showWarning(`${ambientProperties.configurationCodeName.toUpperCase()}.CommentCannotBeEmpty`, 'UI_BOOTSTRAP.##OK', undefined, 1).then((res) => {
                    return false;
                });
        }

        if (affectedRow.comment.length > 3000) {

            return await ambientProperties.services.confirmationDialog
                .showWarning(`${ambientProperties.configurationCodeName.toUpperCase()}.CommentLengthTooLong`, 'UI_BOOTSTRAP.##OK', undefined, 1).then((res) => {
                    return false;
                });
        }
    }

    return true;
};

function isNullOrWhitespace(text) {

    return !text || !(text.length > 0) || !/[\S]/.test(text);
}
