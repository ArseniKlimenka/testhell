'use strict';

module.exports = {

    /**
    * @description To generate GUID
    * @returns {String} GUID
    */
    generate: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    /**
    * @description To check if string is a valid GUID
    * @param {String} GUID
    * @returns {boolean}
    */
    isValidGuid: function (guid) {
        if (guid.length === 0) {
            return true;
        }
        const mask = new RegExp('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
        return mask.test(guid);
    }

};
