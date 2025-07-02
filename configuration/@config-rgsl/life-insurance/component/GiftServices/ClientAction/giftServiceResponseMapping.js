'use strict';

module.exports = function giftServiceResponseMapping(input) {

    const resultData = input.response.data.map(item => item.resultData);

    const body = input.context.Body;

    const productConfiguration = body?.productConfiguration;
    const giftServicesLinkedToProduct = productConfiguration.giftServices ?? [];

    const selectedGiftServices = resultData.filter(x => giftServicesLinkedToProduct.includes(x.giftServiceCode));

    const preparedSelectedGiftServices = selectedGiftServices.map(x => {
        return {
            giftServiceDescription: x.giftServiceDescription,
            giftServiceCodes: [x.giftServiceCode]
        };
    });

    return preparedSelectedGiftServices;

};
