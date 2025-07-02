const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function onChangeStrategy(input) {

    input.rowContext.payOffType = input.rowContext.strategy?.payOffType;

    this.view.rebind();

};
