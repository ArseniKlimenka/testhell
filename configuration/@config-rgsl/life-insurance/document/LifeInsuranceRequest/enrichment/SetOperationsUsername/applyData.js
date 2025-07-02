'use strict';

module.exports = function applyData(body) {

    if (!body.operationsUsername) {
        body.operationsUsername = this.applicationContext.originatingUser.username;
    }

};
