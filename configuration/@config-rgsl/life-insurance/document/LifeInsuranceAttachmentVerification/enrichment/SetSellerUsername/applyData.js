'use strict';

module.exports = function applyData(body) {

    if (body.sellerUsername)
    { body.sellerUsername = this.applicationContext.originatingUser.username; }

};
