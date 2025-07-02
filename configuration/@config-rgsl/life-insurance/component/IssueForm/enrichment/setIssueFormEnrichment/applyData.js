'use strict';

module.exports = function applyData(input, dataSourceResponse) {

    const body = this.businessContext.rootData;

    if (body.issueForm?.code?.issueFormCode) {
        return;
    }

    body.issueForm = {};

    const productConf = body?.productConfiguration ?? {};

    const items = dataSourceResponse
        .data
        .map(_ => _.resultData)
        .filter(_ => productConf?.paperTypes?.includes(_.issueFormCode)) ?? [];

    body.issueForm.code = items[0];
};
