const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function enableManualInputs(input, ambientProperties) {

    const partyCode = getValue(input, 'componentContext.partyCode');
    const parentComponent = this.getParentComponent() || {};
    const isPolicyHolder = getValue(parentComponent, 'context.isPolicyHolder');

    if (partyCode || isPolicyHolder)
    { return false; }
    return true;

};
