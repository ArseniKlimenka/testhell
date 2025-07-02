module.exports = function tabAttachmentsEnter(input) {

    if (['Viewer', 'PartyViewer', 'PaymentOrderViewer', 'ViewerAA', 'ViewClaim'].includes(input.context.WorkUnitActor.CurrentActor)) {
        this.disableTab('tabAttachments');
    }
    else {
        this.enableTab('tabAttachments');
    }

};
