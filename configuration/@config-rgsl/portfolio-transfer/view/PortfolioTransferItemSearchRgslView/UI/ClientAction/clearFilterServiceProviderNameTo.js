'use strict';

module.exports = async function clearFilterServiceProviderNameTo(input) {

    input.data.request.data.criteria.serviceProviderNameTo = undefined;
    input.data.request.data.criteria.serviceProviderCodeTo = undefined;
};
