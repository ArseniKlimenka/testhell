const { typeOfRequest } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

module.exports = function (input) {
    if (input.body.typeOfRequest !== typeOfRequest.Cancellation) {
        this.stopExecution();
    }
};
