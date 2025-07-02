const { getItemUrl } = require('@config-rgsl/life-insurance/lib/infoViewHelper');

module.exports = function text10Visibility(input, ambientProperties) {

    return Boolean(getItemUrl(ambientProperties, 10));

};
