/**
 * Checks if attachments are being added - used for hiding fields on adding attachments.
 */
module.exports = function hideFieldsOnAdd(input) {
    return !input.context.Body.isEdit;
};
