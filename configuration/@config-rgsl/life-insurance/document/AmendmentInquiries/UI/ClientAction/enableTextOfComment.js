'use strict';

module.exports = function enableTextOfComment(input, ambientProperties) {

    if (this.view.areAllElementsDisabled()) {

        return false;
    }

    const userName = ambientProperties.applicationContext.currentUser().getUserName();
    const creatorUserName = input.context.Body.creatorUserName;
    return userName === creatorUserName;

};
