module.exports = function mapping(input, sinkExchange) {

    if (input.debugData?.skipAmendmentActivation) {
        return;
    }

    const relationInfo = sinkExchange.resolveContext('relationInfo');
    if (relationInfo.mainStateCode !== 'Activated') {
        return;
    }

    const createdAmendmentNumber = sinkExchange.resolveContext('createdAmendmentNumber');
    const createdAmendmentConfigurationCodeName = sinkExchange.resolveContext('createdAmendmentConfigurationCodeName');

    const result = {
        businessNumber: createdAmendmentNumber,
        transition: {
            transitionName: 'Draft_to_Activated',
            configurationName: createdAmendmentConfigurationCodeName,
            configurationVersion: '1',
        },
    };

    return result;
};
