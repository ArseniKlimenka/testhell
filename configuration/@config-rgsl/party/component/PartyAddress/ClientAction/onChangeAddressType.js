'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function onChangeAddressType(input, ambientProperties) {

    const addressTypeCode = getValue(input, 'context.addressType.addressTypeCode');

    if (addressTypeCode == 'R') {
        input.context.isSameAsRegistration = false;
    }
    if (['RE', 'FE', 'PE'].includes(addressTypeCode)) {
        input.context.isManualAddress = true;
    } else {
        input.context.isManualAddress = false;
    }

    this.view.reevaluateRules();

};
