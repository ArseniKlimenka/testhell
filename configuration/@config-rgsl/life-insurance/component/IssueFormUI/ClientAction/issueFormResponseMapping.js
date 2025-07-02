'use strict';

module.exports = function issueFormResponseMapping(input) {

    const body = input.additionalContext.body;
    const productConf = body?.productConfiguration;
    const paperTypes = productConf?.paperTypes;

    if (body.issueForm?.code && paperTypes && !paperTypes.includes(body?.issueForm?.code?.issueFormCode)) {
        body.issueForm = undefined;
    }

    if (input.response && input.response.data && input.response.data.length > 0) {
        const items = input.response.data.map(elem => elem.resultData);
        const filtered = paperTypes ? items.filter(_ => paperTypes.includes(_.issueFormCode)) : items;
        return filtered;
    }

    return [input.context.issueForm];

};
