'use strict';

const { deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function addressOnAfterGridAction(input, ambientProperties) {

    const allAddresses = input.componentContext;

    if (input.operationType == "Add") {

        const lastAddedAddress = allAddresses[allAddresses.length - 1];

        // only one address can have isSameAsRegistration flag for one address type
        if (lastAddedAddress.isSameAsRegistration) {

            allAddresses.forEach((item, idx, arr) => {
                if (item.addressType?.addressTypeCode == lastAddedAddress.addressType?.addressTypeCode &&
                    item.isSameAsRegistration &&
                    idx < arr.length - 1) {

                    item.isSameAsRegistration = false;
                }
            });
        }

        // when new registration address is added, none of other addresses can link to it (by isSameAsRegistration flag)
        if (lastAddedAddress.addressType?.addressTypeCode == 'R') {
            allAddresses.forEach((item, idx, arr) => {
                item.isSameAsRegistration = false;
            });
        }
    }

    const registrationAddresses = allAddresses
        ?.filter((item) => item.addressType.addressTypeCode == 'R')
        ?.sort((a, b) => (a.actualFrom > b.actualFrom || !b.actualFrom) ? -1 : 1);

    if (registrationAddresses?.length > 0) {

        const latestRegistrationAddress = registrationAddresses[0];

        allAddresses.forEach((item, idx, arr) => {

            if (item.isSameAsRegistration) {
                const itemAddressType = item.addressType;
                const newItem = deepCopy(latestRegistrationAddress);
                newItem.addressType = itemAddressType;
                newItem.isSameAsRegistration = true;
                arr[idx] = newItem;
            }
        });
    }

    allAddresses.sort((a, b) => {

        if (a.addressType.addressTypeCode > b.addressType.addressTypeCode) { return -1; }
        if (a.addressType.addressTypeCode < b.addressType.addressTypeCode) { return 1; }

        if (a.actualFrom > b.actualFrom || !b.actualFrom) { return -1; }
        if (a.actualFrom < b.actualFrom || !a.actualFrom) { return 1; }

        if (!a.actualTo || a.actualTo > b.actualTo) { return -1; }
        if (!b.actualTo || a.actualTo < b.actualTo) { return 1; }
    });

    allAddresses.forEach(function (item, idx, arr) {

        // skip first item
        if (idx == 0) { return; }

        // set actualTo as next one actualFrom -1 day
        if (item.addressType.addressTypeCode == arr[idx - 1].addressType.addressTypeCode) {

            if (!item.actualTo || item.actualTo >= arr[idx - 1].actualFrom) {
                item.actualTo = DateTimeUtils.addDays(arr[idx - 1].actualFrom, -1);
            }

            // actualFrom should be less than actualTo of next address at least for one day
            if (item.actualFrom >= item.actualTo) {
                item.actualFrom = DateTimeUtils.addDays(item.actualTo, -1);
            }
        }

    });
};
