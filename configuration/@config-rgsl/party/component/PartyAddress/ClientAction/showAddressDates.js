'use strict';

module.exports = function showAddressDates(input, ambientProperties) {

    const addressesSource = this.view.getParentView().getContext() ?? input.rootContext;
    const addressesArray = addressesSource?.Body?.partyAddresses ?? addressesSource?.Body?.data?.partyAddresses;

    const rowContext = input.rowContext || {};

    if (rowContext.isSameAsRegistration) { return false; }

    const addressTypeCode = rowContext?.addressType?.addressTypeCode;
    const addressTypeCount = addressesArray
        ?.filter((item) => item.addressType.addressTypeCode == addressTypeCode)
        ?.length;

    return addressTypeCount > 0;

};
