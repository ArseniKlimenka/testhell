const { legalEntityDefaultValue } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function mapDetailsGetInitViewModel(input) {

    if (input.Body && !input.Code) {

        input.Body = legalEntityDefaultValue;

    }

    return input;
};
