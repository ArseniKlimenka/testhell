/**
 * Checks if the attachment flow is 'Outgoing' (a printout) - used for disabling fields on editing printout.
 */
module.exports = function disableFieldsOnEditingPrintout(input) {
    return input.data.flow == 'Outgoing';
};
