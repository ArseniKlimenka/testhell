const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function shouldEnableTextOfAnswer(input, ambientProperties) {

    if (this.view.areAllElementsDisabled()) {

        return false;
    }

    const userName = ambientProperties.applicationContext.currentUser().getUserName();
    const currentAssignee = input.context.ClientViewModel.currentAssignee;

    return userName === currentAssignee;
};
