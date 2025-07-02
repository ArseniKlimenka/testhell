'use strict';

module.exports = function onLoadAADocumentSearchView(input, ambientProperties) {

    input.context.request.data.criteria.documentType = 'AgentAgreement';
};
