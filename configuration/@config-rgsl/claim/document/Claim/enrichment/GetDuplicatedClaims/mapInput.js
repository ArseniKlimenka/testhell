'use strict';

module.exports = function mapping(input) {

    const contractNumber = input.mainAttributes?.contract?.number;
    const insuredEventDate = input.mainAttributes?.insuredEvent?.insuredEventDate;

    if (!contractNumber || !insuredEventDate) {

        return;
    }

    return {
        data: {
            criteria: {
                contractNumber: contractNumber,
                insuredEventDate: insuredEventDate
            }
        },
        paging: {
            page: 0,
            pageSize: 15
        }
    };
};
