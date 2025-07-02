'use strict';

module.exports = function enableTextOfComment(input, ambientProperties) {

    const userName = ambientProperties.applicationContext.currentUser().getUserName();
    const creatorUserName = input.componentContext.creatorUserName;
    return userName == creatorUserName;
};
