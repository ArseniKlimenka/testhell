'use strict';

module.exports = function applyData(body) {

    body.operationsUsername = this.applicationContext.originatingUser.username;

};
