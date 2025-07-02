const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = async function onLoadDocumentAction() {

    const isDocumentLocked = !isSaveOperationAvailable(this.view);

    if (isDocumentLocked) {

        this.view.disableAllElements();
        return;
    }
};
