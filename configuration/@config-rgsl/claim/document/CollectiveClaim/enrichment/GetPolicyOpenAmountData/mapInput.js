'use strict';

module.exports = function mapping(input) {

    const contractNumber = input.mainAttributes?.contract?.number;
    const eventDate = input.mainAttributes?.insuredEvent?.insuredEventDate;

    if (!contractNumber || !eventDate) {

        return;
    }

    return {
        data: {
            criteria: {
                contractNumber: contractNumber,
                atDate: eventDate
            }
        }
    };
};
