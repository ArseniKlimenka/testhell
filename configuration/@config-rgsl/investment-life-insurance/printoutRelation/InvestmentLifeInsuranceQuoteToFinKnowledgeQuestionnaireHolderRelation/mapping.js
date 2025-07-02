'use strict';

const { finKnowledgeQuestionnaireHolderMapping } = require("@config-rgsl/life-insurance/lib/finKnowledgeQuestionnaireHolder");

module.exports = function mapping(input) {

    return finKnowledgeQuestionnaireHolderMapping(input, this);
};
