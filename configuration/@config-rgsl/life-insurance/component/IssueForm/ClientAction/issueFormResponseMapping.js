'use strict';

module.exports = function issueFormResponseMapping(input, ambientProperties) {

    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';

    if (isCollectivePolicy) {
        return;
    }

    const body = input.rootContext.Body;
    const productConf = body?.productConfiguration;
    const paperTypes = productConf?.paperTypes;

    if (input.data?.code && paperTypes && !paperTypes.includes(input.data.code.issueFormCode)) {
        delete input.data.code;
        delete input.data.phoneNumber;
        delete input.data.email;
        delete input.data.polciyHolderIsPayer;
    }

    if (input.response && input.response.data && input.response.data.length > 0) {
        const items = input.response.data.map(elem => elem.resultData);
        const filtered = paperTypes ? items.filter(_ => paperTypes.includes(_.issueFormCode)) : items;
        return filtered;
    }

    return [input.context.issueForm];

};
