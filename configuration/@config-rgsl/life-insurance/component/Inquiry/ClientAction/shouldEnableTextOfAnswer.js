'use strict';

module.exports = function shouldEnableTextOfAnswer(input, ambientProperties) {

    const userName = ambientProperties.applicationContext.currentUser().getUserName();
    const currentAssignee = input.componentContext.currentAssignee;
    return userName == currentAssignee;
};
