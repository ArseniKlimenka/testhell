'use strict';

module.exports = function applyData(input, dataSourceResponse) {

    const body = this.businessContext.rootData;

    if (dataSourceResponse?.data?.length > 0 && body?.giftServices?.selectedGiftServices?.giftServiceCodes) {
        const selectedGidtService = dataSourceResponse.data.filter(i => i.resultData.giftServiceCode == body.giftServices.selectedGiftServices.giftServiceCodes[0]);
        const giftServiceDescription = selectedGidtService[0]?.resultData?.giftServiceDescription;

        body.giftServices.selectedGiftServices.giftServiceDescription = giftServiceDescription;
    }

};
