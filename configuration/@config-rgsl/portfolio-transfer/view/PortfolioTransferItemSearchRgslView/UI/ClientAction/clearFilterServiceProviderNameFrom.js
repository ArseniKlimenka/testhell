'use strict';

module.exports = async function clearFilterServiceProviderNameFrom(input) {

    input.data.request.data.criteria.serviceProviderNameFrom = undefined;
    input.data.request.data.criteria.serviceProviderCodeFrom = undefined;
};
