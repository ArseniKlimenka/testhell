const summaryHelper = require('@config-rgsl/life-insurance/lib/summarySchemaHelper');

module.exports = function summary(input, Body) {

    return summaryHelper.generateSummary(input, Body, this.businessContext.configurationDimensions);

};
