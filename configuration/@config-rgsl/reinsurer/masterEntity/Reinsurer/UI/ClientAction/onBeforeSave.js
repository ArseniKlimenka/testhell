'use strict';

const checkForDuplicates = require('@config-rgsl/service-provider/lib/ServiceProviderDuplicatesHelper');

module.exports = async function onBeforeSave(input, ambientProperties) {
    const hasServiceProviderDuplicate = await checkForDuplicates(input, ambientProperties);

    if (hasServiceProviderDuplicate) {
        return false;
    }
};
