/**
 * Checks if attachment is in edit mode - used for hiding fields on editing attachment.
 */
module.exports = function hideFieldsOnEdit(input) {
    return input.context.Body.isEdit;
};
