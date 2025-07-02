const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function onTabLeave(input, ambientProperties) {

    if (isSaveOperationAvailable(this.view))
    { this.view.save(); }

};
