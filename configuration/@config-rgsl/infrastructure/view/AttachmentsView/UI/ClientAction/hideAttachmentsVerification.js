module.exports = function hideAttachmentsVerification(input, ambientProperties) {

    const parentView = this.view.getParentView();

    // hide on inline master entities
    if (parentView.getParentView())
    { return false; }

    // hide if there are no data
    const attachmentsVerificationArray = input.context.Body.attachmentsVerification || [];
    if (attachmentsVerificationArray.length == 0)
    { return false; }

    return true;

};
