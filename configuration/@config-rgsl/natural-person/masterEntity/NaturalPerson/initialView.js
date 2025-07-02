const { naturalPersonDefaultValue } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function mapDetailsGetInitViewModel(input) {

    if (!input.Code) {
        input.Body = naturalPersonDefaultValue;
    }

    return input;

};
