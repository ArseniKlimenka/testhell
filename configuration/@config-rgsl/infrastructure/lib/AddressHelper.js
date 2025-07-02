'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = {

    /**
    * @description Clears the address details
    * @param {Object} address
    * @returns {Object} address
    */
    clearAddressDetails: function (address) {
        address.country = undefined;
        address.region = undefined;
        address.area = undefined;
        address.city = undefined;
        address.settlement = undefined;
        address.street = undefined;
        address.house = undefined;
        address.houseExtension = undefined;
        address.flat = undefined;
        address.postalCode = undefined;
        address.codeOkato = undefined;
        address.codeKladr = undefined;
        address.streetType = undefined;
        address.settlementWithType = undefined;
        address.cityType = undefined;
        address.regionWithType = undefined;
        address.areaWithType = undefined;
        address.manualCountry = undefined;

        return address;
    },

    /**
    * @description Populates the address details from Dadata service response
    * @param {Object} address
    * @returns {Object} address
    */
    setAddressDetails: function (address) {

        // fullAddress is an object where we are holding the Dadata service response
        // it consists of two properties:
        // 'value' - short address description
        // 'data' - full address object
        const addressObject = getValue(address, 'fullAddress.data');
        if (!addressObject) { return; }

        address.country = addressObject.country;
        address.region = addressObject.region;
        address.area = addressObject.area;
        address.city = addressObject.city;
        address.settlement = addressObject.settlement;
        address.street = addressObject.street;
        address.house = addressObject.house;
        address.houseExtension = (addressObject.block_type && addressObject.block) ? addressObject.block_type + ' ' + addressObject.block : undefined;
        address.flat = addressObject.flat;
        address.postalCode = addressObject.postal_code;
        address.codeOkato = addressObject.okato;
        address.codeKladr = addressObject.kladr_id;
        address.streetType = addressObject.street_type;
        address.settlementWithType = addressObject.settlement_with_type;
        address.cityType = addressObject.city_type;
        address.regionWithType = addressObject.region_with_type;
        address.areaWithType = addressObject.area_with_type;

        return address;
    }
};
